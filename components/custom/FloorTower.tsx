"use client";

import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { formatUzs, formatUzsPerM2 } from "@/lib/currency";
import { LeadModal } from "@/components/custom/LeadModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProjectFloor } from "@/types";
import { Building2 } from "lucide-react";

type FloorTowerProps = {
  projectId: number;
  projectName: string;
  floors: ProjectFloor[];
  totalFloorsHint?: number | null;
};

const BRICK_BG = {
  backgroundColor: "#a84a4a",
  backgroundImage: `
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 6px,
      rgba(45, 25, 25, 0.14) 6px,
      rgba(45, 25, 25, 0.14) 7px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 11px,
      rgba(30, 15, 15, 0.08) 11px,
      rgba(30, 15, 15, 0.08) 12px
    ),
    linear-gradient(180deg, #b85c5c 0%, #9a4040 45%, #8f3838 100%)
  `,
} as const;

/** Окна с белыми рамами, как на макете. */
function BrickWindowGrid({
  muted,
  cols = 14,
  floorSeed = 0,
}: {
  muted?: boolean;
  cols?: number;
  floorSeed?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 grid gap-x-1 gap-y-1.5 px-2 py-2 sm:gap-x-1.5 sm:px-3 sm:py-2.5",
        muted ? "opacity-45" : "",
      )}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: "repeat(2, minmax(0, 1fr))",
      }}
      aria-hidden
    >
      {Array.from({ length: cols * 2 }).map((_, i) => {
        const col = i % cols;
        const isStairSlit =
          !muted && (col === 3 || col === cols - 4) && i >= cols;
        if (isStairSlit) {
          return (
            <div
              key={i}
              className="col-span-1 flex items-center justify-center"
            >
              <div className="h-1.5 w-[70%] rounded-[1px] border border-white bg-sky-100/90 shadow-inner sm:h-2" />
            </div>
          );
        }
        if ((col === 3 || col === cols - 4) && i < cols) {
          return (
            <div
              key={i}
              className="rounded-[2px] border-2 border-white bg-sky-50/95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] sm:border-[3px]"
            />
          );
        }
        const slight =
          !muted && (i + floorSeed + col) % 6 === 0 ? "opacity-90" : "";
        return (
          <div
            key={i}
            className={cn(
              "rounded-[2px] border-2 border-white shadow-sm sm:rounded-[3px] sm:border-[3px]",
              muted
                ? "border-white/25 bg-slate-500/40"
                : "bg-gradient-to-b from-sky-50 to-sky-200/90",
              slight,
            )}
          />
        );
      })}
    </div>
  );
}

/** Вертикальные бежевые полосы «кирпич другого тона», как на макете. */
function TanBrickPillars() {
  const stops = [11, 32, 54, 76];
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] mix-blend-multiply"
      aria-hidden
    >
      {stops.map((left) => (
        <div
          key={left}
          className="absolute top-0 bottom-0 w-[10%] max-w-[52px] -translate-x-1/2"
          style={{
            left: `${left}%`,
            background:
              "linear-gradient(90deg, rgba(180,140,95,0.55) 0%, rgba(220,190,145,0.75) 40%, rgba(180,140,95,0.55) 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(90,60,40,0.15), inset 2px 0 4px rgba(255,255,255,0.12)",
          }}
        />
      ))}
    </div>
  );
}

function EntranceCanopy({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center",
        side === "left" ? "translate-x-1" : "-translate-x-1",
      )}
    >
      <div className="flex h-8 w-[4.5rem] items-end justify-center gap-2 sm:w-[5.5rem]">
        <div className="h-full w-1 rounded-[1px] bg-white shadow-md sm:w-1.5" />
        <div className="h-full w-1 rounded-[1px] bg-white shadow-md sm:w-1.5" />
      </div>
      <div className="-mt-px flex h-2.5 w-[5rem] items-center justify-center rounded-[2px] border border-slate-600 bg-gradient-to-b from-[#9ca3af] to-[#6b7280] shadow-md sm:h-3 sm:w-[6rem]" />
    </div>
  );
}

export function FloorTower({
  projectId,
  projectName,
  floors,
  totalFloorsHint,
}: FloorTowerProps) {
  const t = useTranslations("FloorTower");
  const [activeFloor, setActiveFloor] = useState<ProjectFloor | null>(null);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadFloorId, setLeadFloorId] = useState<number | undefined>();
  const [hoverId, setHoverId] = useState<number | null>(null);

  const sorted = useMemo(() => {
    return [...floors].sort((a, b) => b.floor - a.floor);
  }, [floors]);

  const placeholderCount = useMemo(() => {
    if (!totalFloorsHint || totalFloorsHint <= sorted.length) return 0;
    return Math.min(totalFloorsHint - sorted.length, 24);
  }, [totalFloorsHint, sorted.length]);

  if (!sorted.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center">
        <Building2 className="mx-auto mb-3 h-10 w-10 text-slate-300" />
        <p className="text-sm font-bold text-slate-500">{t("empty")}</p>
      </div>
    );
  }

  const n = sorted.length;

  return (
    <>
      <div className="mx-auto mb-8 max-w-2xl space-y-3 text-center sm:mb-10">
        <h3 className="text-xl font-black uppercase tracking-tight text-[#1E3A8A] sm:text-2xl md:text-3xl">
          {t("title")}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          {t("description")}
        </p>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 sm:text-sm">
          {t("hint")}
        </p>
      </div>

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
        <div
          className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(180deg,#e2e8f0_0%,#cbd5e1_40%,#94a3b8_85%,transparent_100%)] opacity-80"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-[min(100%,600px)] -translate-x-1/2 rounded-[100%] bg-slate-900/18 blur-2xl"
          aria-hidden
        />

        <div className="relative w-full px-2 pb-20 pt-2 sm:px-4 [perspective:1600px] [perspective-origin:50%_100%]">
          <div
            className="relative mx-auto w-full max-w-[min(100%,580px)] sm:max-w-[600px]"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(5deg)",
              filter: "drop-shadow(0 28px 36px rgba(30,20,20,0.28))",
            }}
          >
            {/* Плоская крыша с парапетом */}
            <div className="relative z-30 mx-auto w-[calc(100%+6px)] -translate-x-[3px] sm:w-[calc(100%+8px)] sm:-translate-x-1">
              <div
                className="h-2 rounded-t-[4px] border-x-2 border-t-2 border-[#57534e] bg-[#78716c] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                aria-hidden
              />
              <div
                className="-mt-px h-2.5 border-x-[6px] border-t border-[#44403c] bg-gradient-to-b from-[#a8a29e] to-[#78716c]"
                aria-hidden
              />
            </div>

            <div className="relative z-20 -mt-px overflow-hidden rounded-t-[2px] border-x-[10px] border-t-2 border-[#3d2b22] shadow-[0_24px_40px_-16px_rgba(30,20,20,0.45)]">
              <div
                className="pointer-events-none absolute inset-0 z-0"
                style={BRICK_BG}
                aria-hidden
              />
              <TanBrickPillars />
              <div
                className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-white/10 via-transparent to-black/15"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-4 bg-gradient-to-r from-black/25 to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-[3] w-3 bg-gradient-to-l from-black/15 to-transparent"
                aria-hidden
              />

              <div className="relative z-10 flex flex-col">
                {sorted.map((f, idx) => {
                  const total = f.pricePerM2 * f.areaSqm;
                  const isHover = hoverId === f.id;
                  const isTop = idx === 0;
                  const isGround = idx === n - 1;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveFloor(f)}
                      onMouseEnter={() => setHoverId(f.id)}
                      onMouseLeave={() => setHoverId(null)}
                      className={cn(
                        "group relative w-full cursor-pointer overflow-hidden border-b-2 border-[#4a2c2c]/70 text-left outline-none transition-[transform,box-shadow] duration-200",
                        "bg-transparent",
                        isGround ? "border-b-transparent" : "",
                        isTop && "pt-0.5",
                        isHover &&
                          "z-20 ring-2 ring-[#F97316] ring-offset-2 ring-offset-[#8f3838]",
                      )}
                      style={{
                        transform: isHover ? "translateZ(3px)" : "translateZ(0)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <BrickWindowGrid
                        cols={14}
                        floorSeed={f.floor + idx * 5}
                      />
                      {isHover ? (
                        <div className="pointer-events-none absolute inset-0 z-[8] bg-amber-400/15" />
                      ) : null}

                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-1 bg-[#3d2b22]/55"
                        aria-hidden
                      />

                      <div
                        className={cn(
                          "relative z-10 mx-1.5 mb-1 mt-1 flex min-h-[56px] items-stretch gap-2 rounded-sm border border-[#5c4033]/60 bg-[#f5f0e6]/95 px-2 py-1.5 shadow-md sm:mx-2 sm:min-h-[60px] sm:py-2",
                          isGround && "min-h-[64px] sm:min-h-[68px]",
                        )}
                      >
                        <div className="flex w-11 shrink-0 flex-col justify-center border-r border-[#5c4033]/25 pr-2 text-center sm:w-12">
                          <span className="text-[7px] font-black uppercase tracking-wider text-[#5c4033]/80">
                            {t("floorShort")}
                          </span>
                          <span className="text-base font-black tabular-nums text-[#1e293b] sm:text-lg">
                            {f.floor}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 py-0.5">
                          {f.title ? (
                            <p className="mb-0.5 truncate text-[10px] font-bold text-[#334155] sm:text-xs">
                              {f.title}
                            </p>
                          ) : (
                            <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-[#64748b]">
                              {t("floorBand")}
                            </p>
                          )}
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <span className="text-xs font-black tabular-nums text-[#1E3A8A] sm:text-sm">
                              {formatUzs(total)}
                            </span>
                            <span className="text-[9px] font-semibold text-[#64748b]">
                              {formatUzsPerM2(f.pricePerM2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isGround ? (
                        <div className="relative z-10 px-3 pb-2 pt-1">
                          <div className="flex items-end justify-between gap-2 px-2 sm:justify-around sm:px-6">
                            <EntranceCanopy side="left" />
                            <EntranceCanopy side="right" />
                          </div>
                        </div>
                      ) : null}
                    </button>
                  );
                })}

                {placeholderCount > 0
                  ? Array.from({ length: placeholderCount }).map((_, i) => (
                      <div
                        key={`ph-${i}`}
                        className="relative min-h-[48px] overflow-hidden border-b-2 border-dashed border-[#5c3d3d]/50"
                        style={{ opacity: 0.55 - i * 0.02 }}
                      >
                        <BrickWindowGrid muted cols={14} floorSeed={i} />
                        <div className="relative z-10 flex items-center justify-center py-2.5">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#f5f0e6]/50">
                            {t("placeholder")}
                          </span>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>

            {/* Тёмный цоколь */}
            <div
              className="relative z-10 -mt-px flex h-4 w-full items-center justify-center border-x-[10px] border-[#2d1810] bg-gradient-to-b from-[#5c4033] via-[#4a3228] to-[#2d1810] shadow-inner"
              aria-hidden
            >
              <div className="h-0.5 w-1/3 rounded-full bg-black/25" />
            </div>

            {/* Плитка и газоны как у макета */}
            <div
              className="relative z-10 mx-auto -mt-px h-14 w-full rounded-b-lg border-x-[10px] border-b-2 border-[#57534e] bg-[#9ca3af] shadow-[0_12px_20px_-8px_rgba(0,0,0,0.25)]"
              style={{ transform: "translateZ(1px)" }}
            >
              <div
                className="pointer-events-none absolute bottom-2 left-[8%] h-5 w-10 rounded-[2px] border border-white/40 bg-[#4ade80] shadow-sm sm:left-[12%] sm:h-6 sm:w-14"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute bottom-2 left-1/2 h-5 w-12 -translate-x-1/2 rounded-[2px] border border-white/40 bg-[#4ade80] shadow-sm sm:h-6 sm:w-16"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute bottom-2 right-[8%] h-5 w-10 rounded-[2px] border border-white/40 bg-[#4ade80] shadow-sm sm:right-[12%] sm:h-6 sm:w-14"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute top-1 left-0 right-0 h-px bg-white/25"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={activeFloor !== null}
        onOpenChange={(open) => !open && setActiveFloor(null)}
      >
        <DialogContent className="max-w-lg overflow-hidden rounded-[2rem] border-none p-0">
          {activeFloor ? (
            <>
              <div className="relative aspect-[16/10] w-full bg-slate-200">
                <img
                  src={
                    activeFloor.sampleImageUrl ||
                    "https://picsum.photos/seed/floor/1200/800"
                  }
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://picsum.photos/seed/floor/1200/800";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16">
                  <DialogHeader className="space-y-0 text-left">
                    <DialogTitle className="text-2xl font-black uppercase italic text-white">
                      {t("floorLabel", { n: activeFloor.floor })}
                      {activeFloor.title ? ` · ${activeFloor.title}` : ""}
                    </DialogTitle>
                  </DialogHeader>
                </div>
              </div>
              <div className="space-y-4 p-6 md:p-8">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      {t("pricePerM2")}
                    </p>
                    <p className="mt-1 text-lg font-black text-[#1E3A8A]">
                      {formatUzsPerM2(activeFloor.pricePerM2)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      {t("area")}
                    </p>
                    <p className="mt-1 text-lg font-black text-[#1E3A8A]">
                      {activeFloor.areaSqm} m²
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-orange-800/70">
                    {t("indicativeTotal")}
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#F97316]">
                    {formatUzs(activeFloor.pricePerM2 * activeFloor.areaSqm)}
                  </p>
                </div>
                <Button
                  type="button"
                  className="h-14 w-full rounded-2xl bg-[#F97316] text-base font-black uppercase tracking-wide text-white shadow-lg shadow-orange-900/15 hover:bg-orange-600"
                  onClick={() => {
                    setLeadFloorId(activeFloor.id);
                    setActiveFloor(null);
                    setLeadOpen(true);
                  }}
                >
                  {t("cta")}
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <LeadModal
        isOpen={leadOpen}
        onClose={() => {
          setLeadOpen(false);
          setLeadFloorId(undefined);
        }}
        projectId={projectId}
        projectName={projectName}
        floorId={leadFloorId}
      />
    </>
  );
}
