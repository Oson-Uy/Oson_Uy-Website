"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, DollarSign, Ruler, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

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
    const t = useTranslations("Filter");
    const router = useRouter();
    const [location, setLocation] = useState("Samarkand Region");
    const [district, setDistrict] = useState("Samarkand");
    const [monthlyPayment, setMonthlyPayment] = useState("");
    const [budget, setBudget] = useState("");
    const [area, setArea] = useState("");

    const districtsForRegion = REGION_CITY_MAP[location] ?? [];

    const formatNumber = (val: string) => {
        const num = val.replace(/\D/g, "");
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const onSearch = () => {
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (district) params.set("district", district);
        if (monthlyPayment) params.set("monthlyPayment", monthlyPayment.replace(/\s/g, ""));
        if (budget) params.set("budget", budget.replace(/\s/g, ""));
        if (area) params.set("area", area);
        router.push(`/catalog?${params.toString()}`);
    };

    const inputClasses = "h-16 w-full bg-blue-900/40 border border-blue-500/30 rounded-2xl pl-12 pr-4 text-[16px] font-semibold outline-none focus:ring-2 ring-accent/60 focus:bg-blue-800/50 transition-all placeholder:text-white/30 appearance-none text-white shadow-lg";
    const areaInputClasses = "h-16 w-full bg-blue-900/50 border-2 border-blue-400/50 rounded-2xl pl-12 pr-4 text-[17px] font-bold outline-none focus:ring-2 ring-accent focus:bg-blue-800/60 transition-all placeholder:text-white/40 appearance-none text-white shadow-xl";
    const labelClasses = "text-[11px] uppercase tracking-[0.2em] font-black text-white/40 ml-4 mb-2.5 block whitespace-nowrap";
    const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-accent h-6 w-6 pointer-events-none z-10 opacity-90";

    return (
        <div className="bg-primary/95 backdrop-blur-2xl p-8 lg:p-10 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] max-w-[1450px] mx-auto w-full border border-white/10 text-white relative flex flex-col gap-8 text-left">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent rounded-[3.5rem] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-end relative z-10">
                <div className="lg:col-span-3 space-y-1">
                    <label className={labelClasses}>Region</label>
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
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-1">
                    <label className={labelClasses}>District</label>
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
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-1">
                    <label className={labelClasses}>{t("monthly")}</label>
                    <div className="relative">
                        <DollarSign className={iconClasses} />
                        <input
                            value={monthlyPayment}
                            onChange={(e) => setMonthlyPayment(formatNumber(e.target.value))}
                            placeholder="Price from"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-1">
                    <label className={labelClasses}>{t("budget")}</label>
                    <div className="relative">
                        <DollarSign className={iconClasses} />
                        <input
                            value={budget}
                            onChange={(e) => setBudget(formatNumber(e.target.value))}
                            placeholder="Total up to"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="lg:col-span-3 md:col-span-2 space-y-1">
                    <label className={labelClasses}>{t("area")} (m²)</label>
                    <div className="relative group">
                        <Ruler className={`${iconClasses} group-focus-within:scale-110 transition-transform`} />
                        <input
                            value={area}
                            onChange={(e) => setArea(e.target.value.replace(/\D/g, ""))}
                            placeholder="Enter area..."
                            className={areaInputClasses}
                        />
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center pt-4">
                <Button
                    onClick={onSearch}
                    className="h-16 w-full md:w-[450px] rounded-[2rem] bg-accent hover:bg-accent/90 text-white flex items-center justify-center gap-4 px-10 shadow-[0_20px_50px_rgba(249,115,22,0.3)] active:scale-[0.98] transition-all font-black uppercase tracking-[0.2em] text-[16px]"
                >
                    <Search className="h-6 w-6 stroke-[4px] shrink-0" />
                    <span>{t("search") || "Поиск недвижимости"}</span>
                </Button>
            </div>
        </div>
    );
}