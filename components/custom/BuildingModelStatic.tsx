"use client";

import { Canvas, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Html,
  PerspectiveCamera,
  RoundedBox,
  useCursor,
} from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import * as THREE from "three";
import type { ProjectFloor } from "@/types";
import {
  isRetailStory,
  minFloorInProject,
  residentialStoryNumber,
} from "@/lib/floorDisplay";

export type BuildingModelStaticProps = {
  floors: ProjectFloor[];
  hoverId: number | null;
  onHover: (id: number | null) => void;
  onPick: (floor: ProjectFloor) => void;
};

const FH = 0.2;
const W = 4.6;
const D_CORE = 0.58;
const BALCONY_D = 0.38;
const D_TOTAL = D_CORE + BALCONY_D;
const BAYS = 6;
const ROT_Y = 0;

/** Светлый «белый» фасад */
const C = {
  panelLight: "#ffffff",
  panelMid: "#f7f7f5",
  bandDark: "#c5c9d0",
  bandDeep: "#aeb3bd",
  frameEdge: "#b8a99a",
  glass: "#e8eef4",
  accentRed: "#e85d5d",
  balcony: "#e8eaef",
  rail: "#94a3b8",
  sill: "#f1f3f6",
  recess: "#9aa3ad",
};

function CameraFit({
  buildingRef,
  deps,
}: {
  buildingRef: React.RefObject<THREE.Group | null>;
  deps: unknown[];
}) {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    const g = buildingRef.current;
    if (!g) return;
    if (size.width < 4 || size.height < 4) return;

    g.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(g);
    if (box.isEmpty()) return;

    const center = box.getCenter(new THREE.Vector3());
    const sizeVec = box.getSize(new THREE.Vector3());
    if (
      !Number.isFinite(center.x) ||
      !Number.isFinite(sizeVec.x) ||
      sizeVec.x <= 0 ||
      sizeVec.y <= 0
    ) {
      return;
    }

    const persp = camera as THREE.PerspectiveCamera;
    const vFov = (persp.fov * Math.PI) / 180;
    const aspect = size.width / Math.max(size.height, 1e-6);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const tanHalfV = Math.tan(vFov / 2);
    const tanHalfH = Math.max(Math.tan(hFov / 2), 1e-4);

    const halfH = sizeVec.y * 0.5;
    const halfW = Math.max(sizeVec.x, sizeVec.z) * 0.5;
    const distV = halfH / tanHalfV;
    const distH = halfW / tanHalfH;
    const dist = Math.max(distV, distH) * 1.025;
    if (!Number.isFinite(dist) || dist <= 0) return;

    /** Почти фронтально — как на референсе, ровный горизонт */
    const offset = new THREE.Vector3(0.06, 0.12, 0.992).normalize().multiplyScalar(dist);
    persp.position.copy(center.clone().add(offset));
    persp.up.set(0, 1, 0);
    persp.lookAt(center);
    persp.near = Math.max(dist / 250, 0.04);
    persp.far = dist * 60;
    persp.updateProjectionMatrix();
  }, [camera, size.height, size.width, buildingRef, ...deps]);

  return null;
}

function SideFacadeWindows({
  nFloors,
  floorCentersY,
  slabHeights,
}: {
  nFloors: number;
  floorCentersY: number[];
  slabHeights: number[];
}) {
  const rows = Math.max(nFloors, 1);
  const cols = 5;
  const faceX = W / 2 - 0.015;
  const spanZ = D_CORE * 0.82;
  const z0 = -spanZ / 2 + spanZ / (cols - 1) / 2;
  const winW = spanZ / cols - 0.06;

  const nodes: ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const y = floorCentersY[r] ?? 0;
    const winH = Math.max((slabHeights[r] ?? FH) * 0.52, FH * 0.4);
    for (let c = 0; c < cols; c++) {
      const z = z0 + (c * spanZ) / Math.max(cols - 1, 1);
      nodes.push(
        <group key={`${r}-${c}`} position={[faceX, y, z]}>
          <mesh castShadow>
            <boxGeometry args={[0.04, winH + 0.04, winW + 0.04]} />
            <meshStandardMaterial color={C.sill} roughness={0.72} />
          </mesh>
          <mesh position={[0.022, 0, 0]}>
            <planeGeometry args={[0.01, winH]} />
            <meshStandardMaterial
              color={C.glass}
              roughness={0.28}
              metalness={0.1}
            />
          </mesh>
        </group>,
      );
    }
  }
  return <>{nodes}</>;
}

function BuildingScene({
  floors,
  hoverId,
  onHover,
  onPick,
}: BuildingModelStaticProps) {
  const t = useTranslations("FloorTower");
  const buildingRef = useRef<THREE.Group>(null);
  useCursor(hoverId !== null);

  const sorted = useMemo(
    () => [...floors].sort((a, b) => b.floor - a.floor),
    [floors],
  );
  const minProjectFloor = useMemo(() => minFloorInProject(floors), [floors]);
  const n = sorted.length;
  /** Нижний ярус в модели — высокий торговый (магазины); остальные — типовая высота этажа. */
  const RETAIL_MUL = 2.78;
  const { slabHeights, floorCentersY, totalStack, retailExtra } = useMemo(() => {
    if (n === 0) {
      return {
        slabHeights: [] as number[],
        floorCentersY: [] as number[],
        totalStack: 0,
        retailExtra: 0,
      };
    }
    const h = sorted.map((_, idx) => (idx === n - 1 ? FH * RETAIL_MUL : FH));
    const sum = h.reduce((a, b) => a + b, 0);
    const centers: number[] = new Array(n);
    let acc = -sum / 2;
    for (let idx = n - 1; idx >= 0; idx--) {
      const hh = h[idx]!;
      centers[idx] = acc + hh / 2;
      acc += hh;
    }
    return {
      slabHeights: h,
      floorCentersY: centers,
      totalStack: sum,
      retailExtra: FH * (RETAIL_MUL - 1),
    };
  }, [n, sorted, RETAIL_MUL]);

  const topY = totalStack / 2;
  const botY = -totalStack / 2;
  const groundY = botY - FH * 1.35 - retailExtra * 0.35;
  const totalHeight = totalStack + 0.48;
  const pilasterY = 0;
  const fitDeps = [n, sorted.map((f) => f.id).join(","), String(RETAIL_MUL)];

  const baySpan = (W * 0.92) / BAYS;
  const x0 = -((BAYS - 1) * baySpan) / 2;
  const hitZ = D_CORE / 2 + BALCONY_D + 0.12;

  return (
    <>
      <color attach="background" args={["#f4f6f9"]} />

      <hemisphereLight intensity={0.82} groundColor="#ebe8e4" color="#ffffff" />
      <directionalLight
        position={[2, 18, 12]}
        intensity={0.85}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={12}
        shadow-camera-bottom={-8}
        shadow-bias={-0.00015}
        shadow-radius={3}
      />
      <directionalLight position={[-4, 10, -2]} intensity={0.45} color="#f0f4ff" />
      <ambientLight intensity={0.45} />

      <group ref={buildingRef}>
        <group rotation={[0, ROT_Y, 0]} position={[0, 0, 0]}>
          {Array.from({ length: BAYS + 1 }).map((_, i) => {
            const x = -W * 0.46 + (i * (W * 0.92)) / BAYS;
            return (
              <mesh
                key={`p-${i}`}
                position={[x, pilasterY, D_CORE / 2 - 0.01]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[0.09, totalHeight, 0.055]} />
                <meshStandardMaterial color={C.bandDark} roughness={0.78} />
              </mesh>
            );
          })}

          {sorted.map((f, idx) => {
            const y = floorCentersY[idx] ?? 0;
            const hov = hoverId === f.id;
            const isRetail = idx === n - 1;
            const floorH = slabHeights[idx] ?? FH;
            const bodyY = isRetail ? -FH * 0.04 : 0;
            const hitH = Math.max(floorH * 1.15, FH * 1.1);
            const panelTint = idx % 2 === 0 ? C.panelLight : C.panelMid;
            const faceZ = D_CORE / 2 + 0.018;
            const wallD = 0.052;
            let botH: number;
            let winHR: number;
            let topH: number;
            if (isRetail) {
              botH = floorH * 0.07;
              winHR = floorH * 0.8;
              topH = floorH * 0.13;
            } else {
              botH = floorH * 0.17;
              winHR = floorH * 0.5;
              topH = floorH * 0.33;
            }
            const y0 = bodyY - floorH * 0.5;

            return (
              <group key={f.id} position={[0, y, 0]}>
                <mesh
                  position={[0, bodyY, hitZ]}
                  renderOrder={100}
                  onClick={(e) => {
                    e.stopPropagation();
                    onPick(f);
                  }}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    onHover(f.id);
                  }}
                  onPointerOut={(e) => {
                    e.stopPropagation();
                    onHover(null);
                  }}
                >
                  <planeGeometry args={[W * 0.99, hitH]} />
                  <meshBasicMaterial
                    transparent
                    opacity={0}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                  />
                </mesh>

                {hov ? (
                  <Html
                    position={[0, bodyY + floorH * 0.12, hitZ + 0.06]}
                    center
                    distanceFactor={6}
                    style={{ pointerEvents: "none" }}
                    zIndexRange={[200, 0]}
                  >
                    <div className="rounded border border-slate-700/25 bg-slate-900/88 px-1.5 py-0.5 text-[9px] font-semibold leading-tight tracking-wide text-white shadow-sm">
                      {isRetailStory(f, minProjectFloor)
                        ? t("floorRetail")
                        : t("floorLabel", {
                            n: residentialStoryNumber(f, minProjectFloor),
                          })}
                    </div>
                  </Html>
                ) : null}

                <RoundedBox
                  args={[W * 0.96, floorH * 0.86, D_CORE * 0.78]}
                  radius={0.014}
                  smoothness={2}
                  position={[0, bodyY, -BALCONY_D * 0.42]}
                  castShadow
                  receiveShadow
                >
                  <meshStandardMaterial
                    color={hov ? "#e8edf5" : panelTint}
                    roughness={0.52}
                    metalness={0.02}
                    emissive={hov ? "#fed7aa" : "#000000"}
                    emissiveIntensity={hov ? 0.12 : 0}
                  />
                </RoundedBox>

                {/* Тонкая плита балкона под рядом окон — не «ленточный» фасад */}
                <mesh
                  position={[0, y0 + botH * 0.35, faceZ + 0.09]}
                  castShadow
                  receiveShadow
                >
                  <boxGeometry args={[W * 0.91, 0.024, 0.13]} />
                  <meshStandardMaterial
                    color={hov ? "#f1f4f8" : C.balcony}
                    roughness={0.55}
                    metalness={0.06}
                  />
                </mesh>
                <mesh
                  position={[0, y0 + botH + winHR * 0.82, faceZ + 0.16]}
                  castShadow
                >
                  <boxGeometry args={[W * 0.89, 0.038, 0.022]} />
                  <meshStandardMaterial color={C.rail} roughness={0.4} metalness={0.32} />
                </mesh>

                {Array.from({ length: BAYS }).map((_, bi) => {
                  const x = x0 + bi * baySpan;
                  const bw = baySpan * 0.9;
                  const topCy = y0 + botH + winHR + topH / 2;
                  const botCy = y0 + botH / 2;
                  const winCy = y0 + botH + winHR / 2;
                  const gw = baySpan * 0.74;
                  const gh = winHR * 0.86;
                  const showAc = bi % 2 === 0 && !isRetail;
                  const recessC = faceZ - wallD * 0.5 - 0.055;

                  return (
                    <group key={bi}>
                      <mesh position={[x, topCy, faceZ - wallD / 2]} castShadow receiveShadow>
                        <boxGeometry args={[bw, topH, wallD]} />
                        <meshStandardMaterial color={panelTint} roughness={0.58} metalness={0.02} />
                      </mesh>
                      <mesh position={[x, botCy, faceZ - wallD / 2]} castShadow receiveShadow>
                        <boxGeometry args={[bw, botH, wallD]} />
                        <meshStandardMaterial color={C.sill} roughness={0.6} metalness={0.02} />
                      </mesh>

                      <group position={[x, winCy, recessC]}>
                        <mesh position={[0, 0, -0.03]}>
                          <boxGeometry args={[gw + 0.06, gh + 0.06, 0.034]} />
                          <meshStandardMaterial color={C.recess} roughness={0.85} />
                        </mesh>
                        {(() => {
                          const ft = 0.02;
                          const fz = -0.01;
                          return (
                            <>
                              <mesh position={[0, gh / 2 + ft / 2, fz]}>
                                <boxGeometry args={[gw + ft * 2, ft, 0.026]} />
                                <meshStandardMaterial color={C.frameEdge} roughness={0.62} />
                              </mesh>
                              <mesh position={[0, -gh / 2 - ft / 2, fz]}>
                                <boxGeometry args={[gw + ft * 2, ft, 0.026]} />
                                <meshStandardMaterial color={C.frameEdge} roughness={0.62} />
                              </mesh>
                              <mesh position={[-gw / 2 - ft / 2, 0, fz]}>
                                <boxGeometry args={[ft, gh + ft * 2, 0.026]} />
                                <meshStandardMaterial color={C.frameEdge} roughness={0.62} />
                              </mesh>
                              <mesh position={[gw / 2 + ft / 2, 0, fz]}>
                                <boxGeometry args={[ft, gh + ft * 2, 0.026]} />
                                <meshStandardMaterial color={C.frameEdge} roughness={0.62} />
                              </mesh>
                            </>
                          );
                        })()}
                        <mesh position={[0, 0, 0.016]}>
                          <planeGeometry args={[gw * 0.9, gh * 0.9]} />
                          <meshStandardMaterial
                            color={isRetail ? "#e8f0f8" : C.glass}
                            roughness={0.18}
                            metalness={0.14}
                          />
                        </mesh>
                        {showAc ? (
                          <mesh position={[gw * 0.36, -gh * 0.3, 0.03]}>
                            <boxGeometry args={[0.065, 0.052, 0.04]} />
                            <meshStandardMaterial
                              color={C.accentRed}
                              roughness={0.52}
                              metalness={0.14}
                            />
                          </mesh>
                        ) : null}
                      </group>
                    </group>
                  );
                })}
              </group>
            );
          })}

          <SideFacadeWindows
            nFloors={n}
            floorCentersY={floorCentersY}
            slabHeights={slabHeights}
          />

          <mesh position={[0, topY + FH * 0.82, -0.06]} castShadow receiveShadow>
            <boxGeometry args={[W + 0.12, 0.1, D_TOTAL + 0.08]} />
            <meshStandardMaterial color={C.bandDark} roughness={0.7} metalness={0.1} />
          </mesh>
          {[
            [-1.1, 0.14, -0.2],
            [0.35, 0.18, 0.12],
            [1.25, 0.12, -0.08],
          ].map(([px, ph, pz], i) => (
            <mesh
              key={i}
              position={[px as number, topY + FH * 0.98 + (ph as number) / 2, (pz as number) - 0.06]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.85, ph as number, 0.65]} />
              <meshStandardMaterial color={C.bandDeep} roughness={0.76} />
            </mesh>
          ))}

          <mesh
            position={[0, botY - FH * 0.62 - retailExtra * 0.22, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[W + 0.1, 0.26, D_TOTAL + 0.06]} />
            <meshStandardMaterial color={C.bandDark} roughness={0.82} />
          </mesh>

          {[-W * 0.34, W * 0.34].map((x, i) => (
            <group
              key={i}
              position={[x, botY - FH * 0.02 - retailExtra * 0.18, D_CORE / 2 + 0.14]}
            >
              <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.52, 0.12, 0.32]} />
                <meshStandardMaterial color={C.bandDark} roughness={0.52} metalness={0.18} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, groundY, 0]}
        receiveShadow
      >
        <planeGeometry args={[5.5, 5.5]} />
        <meshStandardMaterial color="#d2d6de" roughness={0.9} />
      </mesh>

      <ContactShadows
        frames={1}
        position={[0, groundY + 0.02, 0]}
        opacity={0.22}
        scale={7}
        blur={2.8}
        far={4}
      />

      <CameraFit buildingRef={buildingRef} deps={fitDeps} />
    </>
  );
}

export function BuildingModelStatic(props: BuildingModelStaticProps) {
  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-h-[min(520px,70vh)] min-h-[300px] overflow-hidden rounded-xl border border-slate-200/90 bg-[#f4f6f9] shadow-inner sm:aspect-[5/3] sm:rounded-2xl md:max-h-[580px]"
      onPointerLeave={() => props.onHover(null)}
    >
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault fov={29} near={0.05} far={160} />
        <BuildingScene {...props} />
      </Canvas>
    </div>
  );
}
