"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal, Search, RotateCcw, X } from "lucide-react";
import { formatMoneyInput } from "@/lib/currency";

type FilterDrawerProps = {
  translations: {
    filters: string;
    title: string;
    description: string;
    apply: string;
    reset: string;
    from: string;
    to: string;
    verified: string;
    popular: string;
    area_from: string;
    area_to: string;
    pricePerM2Label: string;
    areaLabel: string;
    additionalLabel: string;
  };
};

export function FilterDrawer({ translations }: FilterDrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    pricePerM2Min: searchParams.get("pricePerM2Min") || "",
    pricePerM2Max: searchParams.get("pricePerM2Max") || "",
    areaMin: searchParams.get("areaMin") || "",
    areaMax: searchParams.get("areaMax") || "",
    verified: searchParams.get("verified") === "true",
    popular: searchParams.get("popular") === "true",
  });

  useEffect(() => {
    setFilters({
      pricePerM2Min: searchParams.get("pricePerM2Min") || "",
      pricePerM2Max: searchParams.get("pricePerM2Max") || "",
      areaMin: searchParams.get("areaMin") || "",
      areaMax: searchParams.get("areaMax") || "",
      verified: searchParams.get("verified") === "true",
      popular: searchParams.get("popular") === "true",
    });
  }, [searchParams]);

  const handleChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
      else params.delete(key);
    });
    router.push(`/catalog?${params.toString()}`);
    setOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      pricePerM2Min: "",
      pricePerM2Max: "",
      areaMin: "",
      areaMax: "",
      verified: false,
      popular: false,
    });
    router.push("/catalog");
    setOpen(false);
  };

  const inputClasses = "h-12 bg-slate-50/50 border-slate-200 focus:border-accent focus:ring-accent/10 transition-all font-bold text-primary";
  const labelHeaderClasses = "text-xs font-black uppercase tracking-[0.15em] text-slate-400";

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 border-primary text-primary hover:bg-primary/5 h-11 px-5 font-black uppercase tracking-widest text-[10px]"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {translations.filters}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-full sm:w-[450px] rounded-none border-l shadow-2xl outline-none">
        <div className="flex flex-col h-full bg-white">
          <DrawerHeader className="border-b p-6 flex justify-between items-center text-left">
            <div className="space-y-1">
              <DrawerTitle className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">
                {translations.title}
              </DrawerTitle>
              <DrawerDescription className="font-medium text-slate-500">{translations.description}</DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-400" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar text-left">
            <div className="space-y-5">
              <Label className={labelHeaderClasses}>
                {translations.pricePerM2Label}
              </Label>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder={translations.from}
                  value={filters.pricePerM2Min}
                  onChange={(e) =>
                    handleChange(
                      "pricePerM2Min",
                      formatMoneyInput(e.target.value),
                    )
                  }
                  className={inputClasses}
                />
                <Input
                  type="text"
                  placeholder={translations.to}
                  value={filters.pricePerM2Max}
                  onChange={(e) =>
                    handleChange(
                      "pricePerM2Max",
                      formatMoneyInput(e.target.value),
                    )
                  }
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="space-y-5">
              <Label className={labelHeaderClasses}>
                {translations.areaLabel}
              </Label>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder={translations.area_from}
                  value={filters.areaMin}
                  onChange={(e) => handleChange("areaMin", e.target.value)}
                  className={inputClasses}
                />
                <Input
                  type="number"
                  placeholder={translations.area_to}
                  value={filters.areaMax}
                  onChange={(e) => handleChange("areaMax", e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="space-y-5">
              <Label className={labelHeaderClasses}>
                {translations.additionalLabel}
              </Label>
              <div className="space-y-3">
                <div
                  className="flex items-center space-x-3 bg-slate-50 p-5 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                  onClick={() => handleChange("verified", !filters.verified)}
                >
                  <Checkbox
                    id="verified"
                    checked={filters.verified}
                    onCheckedChange={(c) => handleChange("verified", !!c)}
                    onClick={(e) => e.stopPropagation()}
                    className="h-5 w-5 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                  />
                  <label
                    htmlFor="verified"
                    className="text-sm font-bold cursor-pointer select-none text-slate-700"
                  >
                    {translations.verified}
                  </label>
                </div>
                <div
                  className="flex items-center space-x-3 bg-slate-50 p-5 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                  onClick={() => handleChange("popular", !filters.popular)}
                >
                  <Checkbox
                    id="popular"
                    checked={filters.popular}
                    onCheckedChange={(c) => handleChange("popular", !!c)}
                    onClick={(e) => e.stopPropagation()}
                    className="h-5 w-5 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                  <label
                    htmlFor="popular"
                    className="text-sm font-bold cursor-pointer select-none text-slate-700"
                  >
                    {translations.popular}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="border-t p-8 gap-4 bg-slate-50/50">
            <Button
              onClick={applyFilters}
              className="w-full h-14 text-sm font-black uppercase tracking-widest bg-accent hover:bg-orange-600 shadow-xl shadow-orange-900/10 transition-all active:scale-[0.98]"
            >
              <Search className="mr-2 h-4 w-4" /> {translations.apply}
            </Button>
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="w-full h-12 text-slate-400 font-bold hover:text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest text-[10px]"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> {translations.reset}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
