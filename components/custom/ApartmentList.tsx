"use client";

import { useState } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/custom/LeadModal";
import { formatUzs } from "@/lib/currency";

type Apartment = {
  id: number;
  rooms: number;
  area: number;
  floor: number;
  price: number;
};

type ApartmentListProps = {
  projectId: number;
  projectName: string;
  apartments: Apartment[];
};

export function ApartmentList({
  projectId,
  projectName,
  apartments,
}: ApartmentListProps) {
  const [selectedApartmentId, setSelectedApartmentId] = useState<number | null>(
    null,
  );

  return (
    <>
      <div className="space-y-4 mt-4">
        {apartments.map((apt) => (
          <div
            key={apt.id}
            className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 p-6 bg-white border border-slate-100 rounded-2xl hover:border-[#F97316]/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-[#F97316]" />
              </div>
              <div>
                <div className="font-bold text-[#1E3A8A]">
                  {apt.rooms}-room apartment
                </div>
                <div className="text-[10px] text-slate-400 uppercase">
                  Apartment #{apt.id}
                </div>
              </div>
            </div>

            <div className="flex md:block justify-between items-center">
              <span className="md:hidden text-slate-400 text-xs">Area:</span>
              <span className="font-bold text-[#1E3A8A]">{apt.area} m²</span>
            </div>

            <div className="flex md:block justify-between items-center">
              <span className="md:hidden text-slate-400 text-xs">Floor:</span>
              <span className="text-slate-600 font-medium">{apt.floor}</span>
            </div>

            <div className="flex md:block justify-between items-center">
              <span className="md:hidden text-slate-400 text-xs">Price:</span>
              <span className="text-xl font-extrabold text-[#1E3A8A]">
                {formatUzs(apt.price)}
              </span>
            </div>

            <div className="text-right">
              <Button
                onClick={() => setSelectedApartmentId(apt.id)}
                className="bg-[#1E3A8A] hover:bg-[#3C55BE] text-white rounded-xl px-8 w-full md:w-auto"
              >
                Select
              </Button>
            </div>
          </div>
        ))}
      </div>
      <LeadModal
        isOpen={selectedApartmentId !== null}
        onClose={() => setSelectedApartmentId(null)}
        projectId={projectId}
        projectName={projectName}
        apartmentId={selectedApartmentId ?? undefined}
      />
    </>
  );
}
