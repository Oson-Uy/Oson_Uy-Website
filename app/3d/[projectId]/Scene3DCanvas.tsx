"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, useGLTF, AdaptiveDpr, Preload } from "@react-three/drei";
import * as THREE from "three";
import type { Apartment3D, SceneManifest } from "./SceneViewer";

type Props = {
  manifest: SceneManifest;
  meshNodeToApt: Map<string, Apartment3D>;
  statusColor: Record<string, number>;
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  onHover: (id: number | null) => void;
  spawnPosition: number[] | null;
  spawnTarget: number[] | null;
};

function Model({
  manifest,
  meshNodeToApt,
  statusColor,
  selectedId,
  onSelect,
  onHover,
}: Omit<Props, "spawnPosition" | "spawnTarget">) {
  const { scene } = useGLTF(manifest.url, true); // draco decoder enabled
  const registry = useRef<Map<number, THREE.Mesh[]>>(new Map());
  const [localHover, setLocalHover] = useState<number | null>(null);

  // Clone once so cached GLTF (drei cache) isn't mutated across mounts
  const root = useMemo(() => scene.clone(true), [scene]);

  // Tag meshes with apartmentId + apply status colors
  useEffect(() => {
    const reg = new Map<number, THREE.Mesh[]>();
    root.traverse((obj) => {
      const apt = meshNodeToApt.get(obj.name);
      if (!apt) return;
      obj.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!(mesh as THREE.Mesh).isMesh) return;
        mesh.userData.apartmentId = apt.id;
        const mat = (
          Array.isArray(mesh.material) ? mesh.material[0] : mesh.material
        ) as THREE.MeshStandardMaterial;
        const cloned = mat.clone();
        const color = statusColor[apt.status] ?? 0x94a3b8;
        cloned.color = new THREE.Color(color);
        cloned.emissive = new THREE.Color(color);
        cloned.emissiveIntensity = 0;
        cloned.transparent = true;
        cloned.opacity = 0.96;
        mesh.material = cloned;
        const list = reg.get(apt.id) ?? [];
        list.push(mesh);
        reg.set(apt.id, list);
      });
    });
    registry.current = reg;
  }, [root, meshNodeToApt, statusColor]);

  // Highlight selected / hovered
  useEffect(() => {
    for (const [id, meshes] of registry.current) {
      const intensity = id === selectedId ? 0.55 : id === localHover ? 0.28 : 0;
      for (const m of meshes) {
        const mat = m.material as THREE.MeshStandardMaterial;
        if (mat?.emissive) mat.emissiveIntensity = intensity;
      }
    }
  }, [selectedId, localHover]);

  const pick = (e: ThreeEvent<MouseEvent>): number | null => {
    let o: THREE.Object3D | null = e.object;
    while (o) {
      const id = o.userData?.apartmentId;
      if (typeof id === "number") return id;
      o = o.parent;
    }
    return null;
  };

  return (
    <primitive
      object={root}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        const id = pick(e);
        onSelect(id);
      }}
      onPointerMove={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        const id = pick(e);
        setLocalHover(id);
        onHover(id);
        document.body.style.cursor = id != null ? "pointer" : "default";
      }}
      onPointerOut={() => {
        setLocalHover(null);
        onHover(null);
        document.body.style.cursor = "default";
      }}
    />
  );
}

export default function Scene3DCanvas(props: Props) {
  const { manifest, spawnTarget } = props;
  const center = (spawnTarget ?? manifest.center ?? [0, 0, 0]) as number[];
  const size = manifest.bbox
    ? Math.max(
        manifest.bbox[1][0] - manifest.bbox[0][0],
        manifest.bbox[1][1] - manifest.bbox[0][1],
        manifest.bbox[1][2] - manifest.bbox[0][2],
      )
    : 30;
  const dist = Math.max(size, 5) * 1.7;
  const camPos: [number, number, number] = props.spawnPosition
    ? [props.spawnPosition[0], props.spawnPosition[1], props.spawnPosition[2]]
    : [center[0] + dist, center[1] + dist * 0.75, center[2] + dist];

  return (
    <Canvas
      shadows={false}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: camPos, fov: 50, near: 0.1, far: dist * 50 }}
      onPointerMissed={() => props.onSelect(null)}
    >
      <color attach="background" args={["#0b1020"]} />
      <hemisphereLight args={[0xffffff, 0x32384a, 1.0]} />
      <directionalLight position={[dist, dist * 1.5, dist]} intensity={1.4} />
      <directionalLight position={[-dist, dist, -dist]} intensity={0.5} />
      <Suspense fallback={null}>
        <Model
          manifest={manifest}
          meshNodeToApt={props.meshNodeToApt}
          statusColor={props.statusColor}
          selectedId={props.selectedId}
          onSelect={props.onSelect}
          onHover={props.onHover}
        />
        <Preload all />
      </Suspense>
      <OrbitControls
        makeDefault
        target={[center[0], center[1], center[2]]}
        enableDamping
        dampingFactor={0.08}
        maxPolarAngle={Math.PI * 0.495}
        minDistance={Math.max(size * 0.05, 1)}
        maxDistance={dist * 6}
      />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
