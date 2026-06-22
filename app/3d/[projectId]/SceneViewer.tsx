"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

export type Apartment3D = {
  id: number;
  meshNode: string | null;
  status: string;
  priceUzs: number | null;
  pricePerM2Uzs: number | null;
  areaSqm: number;
  rooms: number;
  floor: number;
  number: string;
  sectionKey: string;
  buildingId: number | null;
};

export type ScenePayload = {
  projectId: number;
  status: string;
  version: number;
  manifestUrl: string | null;
  spawnPosition: number[] | null;
  spawnTarget: number[] | null;
  apartments: Apartment3D[];
};

export type SceneManifest = {
  url: string;
  center: number[];
  bbox: [number[], number[]] | null;
  triangles?: number;
  nodes: { node: string; kind: string; ref?: string; centroid?: number[] }[];
};

const STATUS_COLOR: Record<string, number> = {
  AVAILABLE: 0x10b981,
  RESERVED: 0xf59e0b,
  BOOKED: 0xf59e0b,
  INSTALLMENT: 0x3b82f6,
  MORTGAGE: 0x8b5cf6,
  SOLD: 0xef4444,
  RENTED: 0x6366f1,
  UNAVAILABLE: 0x94a3b8,
};
const STATUS_LABEL: Record<string, string> = {
  AVAILABLE: "Свободна",
  RESERVED: "Забронирована",
  BOOKED: "Забронирована",
  INSTALLMENT: "В рассрочке",
  MORTGAGE: "В ипотеке",
  SOLD: "Продана",
  RENTED: "Аренда",
  UNAVAILABLE: "Недоступна",
};

const Scene3DCanvas = dynamic(() => import("./Scene3DCanvas"), {
  ssr: false,
  loading: () => <CanvasSkeleton />,
});

function fmt(v: number | null) {
  return v == null ? "—" : Number(v).toLocaleString("ru-RU");
}

export default function SceneViewer({
  projectId,
  scene,
  apiBase,
}: {
  projectId: number;
  scene: ScenePayload;
  apiBase: string;
}) {
  const [manifest, setManifest] = useState<SceneManifest | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apartmentById = useMemo(() => {
    const m = new Map<number, Apartment3D>();
    for (const a of scene.apartments) m.set(a.id, a);
    return m;
  }, [scene.apartments]);

  const meshNodeToApt = useMemo(() => {
    const m = new Map<string, Apartment3D>();
    for (const a of scene.apartments) if (a.meshNode) m.set(a.meshNode, a);
    return m;
  }, [scene.apartments]);

  useEffect(() => {
    if (scene.status !== "READY" || !scene.manifestUrl) return;
    let alive = true;
    fetch(scene.manifestUrl, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("manifest"))))
      .then((m: SceneManifest) => alive && setManifest(m))
      .catch(() => alive && setError("Не удалось загрузить 3D-модель"));
    return () => {
      alive = false;
    };
  }, [scene.status, scene.manifestUrl]);

  const selected = selectedId != null ? apartmentById.get(selectedId) : null;

  if (scene.status !== "READY") {
    return (
      <Centered>
        <p className="text-lg font-black text-white">3D-модель ещё не опубликована</p>
        <p className="mt-1 text-sm text-white/60">
          Застройщик пока не загрузил 3D-модель этого проекта.
        </p>
        <BackLink projectId={projectId} />
      </Centered>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0b1020]">
      {error ? (
        <Centered>
          <p className="text-lg font-black text-white">{error}</p>
          <BackLink projectId={projectId} />
        </Centered>
      ) : manifest ? (
        <Scene3DCanvas
          manifest={manifest}
          meshNodeToApt={meshNodeToApt}
          statusColor={STATUS_COLOR}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onHover={setHoverId}
          spawnPosition={scene.spawnPosition}
          spawnTarget={scene.spawnTarget}
        />
      ) : (
        <CanvasSkeleton />
      )}

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4">
        <Link
          href={`/catalog/${projectId}`}
          className="pointer-events-auto rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
        >
          ← Назад к проекту
        </Link>
        <div className="pointer-events-auto rounded-2xl bg-white/10 px-4 py-2 text-xs font-bold text-white/80 backdrop-blur">
          {scene.apartments.length} квартир · ЛКМ — выбрать
        </div>
      </div>

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
        {(["AVAILABLE", "RESERVED", "INSTALLMENT", "SOLD"] as const).map((s) => (
          <span
            key={s}
            className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[11px] font-bold text-white backdrop-blur"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: `#${STATUS_COLOR[s].toString(16).padStart(6, "0")}` }}
            />
            {STATUS_LABEL[s]}
          </span>
        ))}
      </div>

      {/* Hover chip */}
      {hoverId != null && hoverId !== selectedId ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-2xl bg-black/60 px-4 py-2 text-sm font-bold text-white backdrop-blur">
          №{apartmentById.get(hoverId)?.number} ·{" "}
          {STATUS_LABEL[apartmentById.get(hoverId)?.status ?? ""]}
        </div>
      ) : null}

      {/* Details panel */}
      {selected ? (
        <div className="absolute right-4 top-20 z-30 w-80 max-w-[88vw] rounded-[1.75rem] border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-black text-[#1E3A8A]">
                Квартира №{selected.number}
              </p>
              <p className="mt-0.5 text-sm font-bold text-slate-500">
                {selected.sectionKey ? `Блок ${selected.sectionKey} · ` : ""}
                {selected.floor} этаж · {selected.rooms}-комн · {selected.areaSqm} м²
              </p>
            </div>
            <button
              onClick={() => setSelectedId(null)}
              className="rounded-full bg-slate-100 px-2 py-1 text-sm font-black text-slate-500 hover:bg-slate-200"
            >
              ✕
            </button>
          </div>

          <span
            className="mt-3 inline-block rounded-full px-3 py-1 text-[11px] font-black uppercase text-white"
            style={{
              backgroundColor: `#${(STATUS_COLOR[selected.status] ?? 0x94a3b8)
                .toString(16)
                .padStart(6, "0")}`,
            }}
          >
            {STATUS_LABEL[selected.status] ?? selected.status}
          </span>

          <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
            <Row label="Стоимость" value={selected.priceUzs ? `${fmt(selected.priceUzs)} сум` : "Цена договорная"} highlight />
            <Row label="Цена за м²" value={selected.pricePerM2Uzs ? `${fmt(selected.pricePerM2Uzs)} сум` : "—"} />
            <Row label="Площадь" value={`${selected.areaSqm} м²`} />
            <Row label="Комнат" value={String(selected.rooms)} />
            <Row label="Этаж" value={String(selected.floor)} />
          </div>

          <Link
            href={`/catalog/${projectId}`}
            className="mt-5 block rounded-2xl bg-[#F97316] py-3 text-center text-sm font-black text-white transition hover:bg-orange-600"
          >
            Подробнее о проекте
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-bold text-slate-400">{label}</span>
      <span className={`text-sm font-black ${highlight ? "text-emerald-600" : "text-slate-800"}`}>
        {value}
      </span>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0b1020] px-6 text-center">
      {children}
    </div>
  );
}

function BackLink({ projectId }: { projectId: number }) {
  return (
    <Link
      href={`/catalog/${projectId}`}
      className="mt-6 rounded-2xl bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20"
    >
      ← Вернуться к проекту
    </Link>
  );
}

function CanvasSkeleton() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0b1020]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
    </div>
  );
}
