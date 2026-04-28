"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Landmark, Ruler, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMoneyInput } from "@/lib/currency";

const REGION_CITY_MAP: Record<string, string[]> = {
    "Tashkent Region": ["Tashkent", "Chirchiq", "Angren", "Yangiyul"],
    "Samarkand Region": ["Samarkand", "Urgut", "Kattakurgan"],
    "Bukhara Region": ["Bukhara", "Gijduvan", "Kagan"],
    "Andijan Region": ["Andijan", "Asaka", "Khanabad"],
    "Fergana Region": ["Fergana", "Kokand", "Margilan"],
    "Namangan Region": ["Namangan", "Chust", "Chartak"],
    "Jizzakh Region": ["Jizzakh", "Gallaorol", "Zomin"],
    "Sirdarya Region": ["Gulistan", "Yangiyer", "Shirin"],
    "Kashkadarya Region": ["Karshi", "Shakhrisabz", "Kitab"],
    "Surkhandarya Region": ["Termez", "Denau", "Sherabad"],
    "Navoi Region": ["Navoi", "Zarafshan", "Karmana"],
    "Khorezm Region": ["Urgench", "Khiva", "Pitnak"],
    "Republic of Karakalpakstan": ["Nukus", "Khodjeyli", "Turtkul"],
};

export function FilterBar() {
    const router = useRouter();
    const [location, setLocation] = useState("Samarkand Region");
    const [district, setDistrict] = useState("Samarkand");
    const [pricePerM2Min, setPricePerM2Min] = useState("");
    const [pricePerM2Max, setPricePerM2Max] = useState("");
    const [areaMin, setAreaMin] = useState("");
    const [areaMax, setAreaMax] = useState("");

    const districtsForRegion = REGION_CITY_MAP[location] ?? [];

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

    const inputClasses = "h-10 md:h-12 w-full bg-blue-900/40 border border-blue-500/30 rounded-xl pl-9 md:pl-10 pr-3 text-sm font-semibold outline-none focus:ring-2 ring-accent/60 focus:bg-blue-800/50 transition-all placeholder:text-white/35 appearance-none text-white";
    const labelClasses = "text-[9px] md:text-[10px] font-bold text-white/55 ml-2 mb-1 md:mb-1.5 block whitespace-nowrap";
    const iconClasses = "absolute left-3 top-1/2 -translate-y-1/2 text-accent h-3.5 w-3.5 md:h-4 md:w-4 pointer-events-none z-10 opacity-90";

    return (
        <div className="bg-primary/95 backdrop-blur-2xl p-3 md:p-4 lg:p-5 rounded-[1.25rem] md:rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.35)] max-w-[1080px] mx-auto w-full border border-white/10 text-white relative flex flex-col gap-3 md:gap-4 text-left">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent rounded-[3.5rem] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-14 gap-2.5 md:gap-3 items-end relative z-10">
                <div className="lg:col-span-2 space-y-1">
                    <label className={labelClasses}>Регион</label>
                    <div className="relative group">
                        <MapPin className={iconClasses} />
                        <select
                            value={location}
                            onChange={(e) => {
                                const nextRegion = e.target.value;
                                setLocation(nextRegion);
                                setDistrict(REGION_CITY_MAP[nextRegion]?.[0] ?? "");
                            }}
                            className={`${inputClasses} cursor-pointer`}
                        >
                            {Object.keys(REGION_CITY_MAP).map((region) => (
                                <option key={region} className="bg-slate-900 text-white" value={region}>{region}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-white/40 pointer-events-none" />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-1">
                    <label className={labelClasses}>Район</label>
                    <div className="relative group">
                        <MapPin className={iconClasses} />
                        <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className={`${inputClasses} cursor-pointer`}
                        >
                            {districtsForRegion.map((item) => (
                                <option key={item} className="bg-slate-900 text-white" value={item}>{item}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-white/40 pointer-events-none" />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-1">
                    <label className={labelClasses}>Цена/м² от (сум)</label>
                    <div className="relative">
                        <Landmark className={iconClasses} />
                        <input
                            value={pricePerM2Min}
                            onChange={(e) => setPricePerM2Min(formatMoneyInput(e.target.value))}
                            placeholder="Минимум, сум"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-1">
                    <label className={labelClasses}>Цена/м² до (сум)</label>
                    <div className="relative">
                        <Landmark className={iconClasses} />
                        <input
                            value={pricePerM2Max}
                            onChange={(e) => setPricePerM2Max(formatMoneyInput(e.target.value))}
                            placeholder="Максимум, сум"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-1">
                    <label className={labelClasses}>Площадь от, м²</label>
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

                <div className="lg:col-span-2 space-y-1">
                    <label className={labelClasses}>Площадь до, м²</label>
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
            
            <div className="flex justify-center pt-0.5 md:pt-1">
                <Button
                    onClick={onSearch}
                    className="h-10 md:h-12 w-full md:w-[320px] rounded-xl bg-accent hover:bg-accent/90 text-white flex items-center justify-center gap-2 px-6 shadow-[0_12px_32px_rgba(249,115,22,0.3)] active:scale-[0.98] transition-all font-black uppercase tracking-[0.12em] text-[11px] md:text-xs"
                >
                    <Search className="h-3.5 w-3.5 md:h-4 md:w-4 stroke-[3px] shrink-0" />
                    <span>Найти</span>
                </Button>
            </div>
        </div>
    );
}