"use client";

import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { formatUzs, formatUzsPerM2 } from "@/lib/currency";
import { LeadModal } from "@/components/custom/LeadModal";
import { BuildingModelStatic } from "@/components/custom/BuildingModelStatic";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProjectFloor } from "@/types";
import {
  isRetailStory,
  minFloorInProject,
  residentialStoryNumber,
} from "@/lib/floorDisplay";
import { Building2 } from "lucide-react";

type FloorTowerProps = {
  projectId: number;
  projectName: string;
  floors: ProjectFloor[];
  totalFloorsHint?: number | null;
};

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

  const minProjectFloor = useMemo(() => minFloorInProject(floors), [floors]);

  const floorTitle = (f: ProjectFloor) =>
    isRetailStory(f, minProjectFloor)
      ? t("floorRetail")
      : t("floorLabel", { n: residentialStoryNumber(f, minProjectFloor) });

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

      <div className="relative mx-auto w-full max-w-3xl px-1 sm:px-2">
        <div
          className="pointer-events-none absolute -inset-x-4 -bottom-8 top-1/3 rounded-[2rem] bg-[radial-gradient(ellipse_80%_60%_at_50%_75%,rgba(249,115,22,0.08),transparent_65%)]"
          aria-hidden
        />

        <BuildingModelStatic
          floors={sorted}
          hoverId={hoverId}
          onHover={setHoverId}
          onPick={setActiveFloor}
        />

        <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {t("pickerHint")}
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {sorted.map((f) => {
            const total = f.pricePerM2 * f.areaSqm;
            const active = hoverId === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFloor(f)}
                onMouseEnter={() => setHoverId(f.id)}
                onMouseLeave={() => setHoverId(null)}
                className={cn(
                  "min-w-[5.5rem] rounded-xl border px-3 py-2 text-left shadow-sm transition-all sm:min-w-[6rem]",
                  active
                    ? "border-[#F97316] bg-orange-50 ring-2 ring-[#F97316]/25"
                    : "border-slate-200 bg-white hover:border-slate-300",
                )}
              >
                <span className="block text-[10px] font-black uppercase tracking-wide text-[#1E3A8A]">
                  {floorTitle(f)}
                </span>
                <span className="mt-0.5 block text-xs font-black tabular-nums text-slate-800">
                  {formatUzs(total)}
                </span>
                <span className="text-[9px] font-semibold text-slate-500">
                  {formatUzsPerM2(f.pricePerM2)}
                </span>
              </button>
            );
          })}
        </div>

        {placeholderCount > 0 ? (
          <p className="mt-4 text-center text-xs text-slate-400">
            {t("placeholderMore", { count: placeholderCount })}
          </p>
        ) : null}
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
                      {floorTitle(activeFloor)}
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
