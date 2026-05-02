"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Landmark, Ruler, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMoneyInput } from "@/lib/currency";
import { UZB_LOCATIONS } from "@/lib/locations";

type FilterBarProps = {
    translations: {
        region: string;
        district: string;
        price_from: string;
        price_to: string;
        area_from: string;
        area_to: string;
        search_button: string;
    };
    onLocationChange?: (location: string) => void;
};

export function FilterBar({ translations, onLocationChange }: FilterBarProps) {
    const router = useRouter();
    const [location, setLocation] = useState(UZB_LOCATIONS[0].region);
    const [district, setDistrict] = useState(UZB_LOCATIONS[0].districts[0]);
    const [pricePerM2Min, setPricePerM2Min] = useState("");
    const [pricePerM2Max, setPricePerM2Max] = useState("");
    const [areaMin, setAreaMin] = useState("");
    const [areaMax, setAreaMax] = useState("");

    const districtsForRegion = UZB_LOCATIONS.find(l => l.region === location)?.districts ?? [];

    const onSearch = () => {
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (district) params.set("district", district);
        if (pricePerM2Min) params.set("pricePerM2Min", pricePerM2Min.replace(/\s/g, ""));
        if (pricePerM2Max) params.set("pricePerM2Max", pricePerM2Max.replace(/\s/g, ""));
        if (areaMin) params.set("areaMin", areaMin);
        if (areaMax) params.set("areaMax", areaMax);
        router.push(`/catalog?${params.toString()}`);
    };

    const inputClasses = "h-11 w-full bg-blue-900/40 border border-blue-500/30 rounded-xl pl-10 pr-4 text-sm font-semibold outline-none focus:ring-2 ring-accent/60 focus:bg-blue-800/50 transition-all placeholder:text-white/35 appearance-none text-white";
    const labelClasses = "text-[10px] font-bold text-white/55 ml-2 mb-1 block uppercase tracking-wider";
    const iconClasses = "absolute left-3.5 top-1/2 -translate-y-1/2 text-accent h-4 w-4 pointer-events-none z-10 opacity-90";

    return (
        <div className="bg-primary/95 backdrop-blur-2xl p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] max-w-[1000px] mx-auto w-full border border-white/10 text-white flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
                <div className="flex flex-col gap-3">
                    <div className="space-y-1">
                        <label className={labelClasses}>{translations.region}</label>
                        <div className="relative group">
                            <MapPin className={iconClasses} />
                            <select
                                value={location}
                                onChange={(e) => {
                                    const nextRegion = e.target.value;
                                    setLocation(nextRegion);
                                    setDistrict(UZB_LOCATIONS.find(l => l.region === nextRegion)?.districts[0] ?? "");
                                    if (onLocationChange) onLocationChange(nextRegion);
                                }}
                                className={`${inputClasses} cursor-pointer pr-10`}
                            >
                                {UZB_LOCATIONS.map((l) => (
                                    <option key={l.region} className="bg-slate-900 text-white" value={l.region}>{l.region}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className={labelClasses}>{translations.district}</label>
                        <div className="relative group">
                            <MapPin className={iconClasses} />
                            <select
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className={`${inputClasses} cursor-pointer pr-10`}
                            >
                                {districtsForRegion.map((item) => (
                                    <option key={item} className="bg-slate-900 text-white" value={item}>{item}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="space-y-1">
                        <label className={labelClasses}>{translations.price_from}</label>
                        <div className="relative">
                            <Landmark className={iconClasses} />
                            <input
                                value={pricePerM2Min}
                                onChange={(e) => setPricePerM2Min(formatMoneyInput(e.target.value))}
                                placeholder="0 сум"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className={labelClasses}>{translations.price_to}</label>
                        <div className="relative">
                            <Landmark className={iconClasses} />
                            <input
                                value={pricePerM2Max}
                                onChange={(e) => setPricePerM2Max(formatMoneyInput(e.target.value))}
                                placeholder="10 000 000 сум"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="space-y-1">
                        <label className={labelClasses}>{translations.area_from}</label>
                        <div className="relative">
                            <Ruler className={iconClasses} />
                            <input
                                value={areaMin}
                                onChange={(e) => setAreaMin(e.target.value.replace(/\D/g, ""))}
                                placeholder="50"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className={labelClasses}>{translations.area_to}</label>
                        <div className="relative">
                            <Ruler className={iconClasses} />
                            <input
                                value={areaMax}
                                onChange={(e) => setAreaMax(e.target.value.replace(/\D/g, ""))}
                                placeholder="120"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <Button
                    onClick={onSearch}
                    className="h-11 w-full md:w-[350px] rounded-xl bg-accent hover:bg-accent/90 text-white flex items-center justify-center gap-2 px-8 shadow-[0_10px_25px_rgba(249,115,22,0.4)] active:scale-[0.98] transition-all font-bold uppercase tracking-[0.1em] text-xs"
                >
                    <Search className="h-5 w-5 stroke-[3px] shrink-0" />
                    <span>{translations.search_button}</span>
                </Button>
            </div>
        </div>
    );
}