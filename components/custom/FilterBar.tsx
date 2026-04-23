"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, DollarSign, Ruler } from "lucide-react";
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

    const onSearch = () => {
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (district) params.set("district", district);
        if (monthlyPayment) params.set("monthlyPayment", monthlyPayment);
        if (budget) params.set("budget", budget);
        if (area) params.set("area", area);
        router.push(`/catalog?${params.toString()}`);
    };

    return (
        <div className="bg-primary p-5 rounded-[1.5rem] shadow-2xl shadow-blue-900/20 flex flex-col gap-4 max-w-6xl mx-auto w-full border border-white/10 text-white">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70 ml-1">Region</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-accent h-4 w-4 transition-colors" />
                        <select
                            value={location}
                            onChange={(e) => {
                                const nextRegion = e.target.value;
                                setLocation(nextRegion);
                                const nextDistricts = REGION_CITY_MAP[nextRegion] ?? [];
                                setDistrict(nextDistricts[0] ?? "");
                            }}
                            className="h-11 w-full bg-blue-800/50 border border-blue-700/50 rounded-xl pl-10 pr-4 text-sm outline-none focus:ring-2 ring-accent/50 appearance-none cursor-pointer"
                        >
                            {Object.keys(REGION_CITY_MAP).map((region) => (
                                <option key={region} className="bg-primary" value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70 ml-1">City / District</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-accent h-4 w-4 transition-colors" />
                        <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="h-11 w-full bg-blue-800/50 border border-blue-700/50 rounded-xl pl-10 pr-4 text-sm outline-none focus:ring-2 ring-accent/50 appearance-none cursor-pointer"
                        >
                            {districtsForRegion.map((item) => (
                                <option key={item} className="bg-primary" value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70 ml-1">{t("monthly")}</label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-accent h-4 w-4 transition-colors" />
                        <input
                            value={monthlyPayment}
                            onChange={(e) => setMonthlyPayment(e.target.value)}
                            type="number"
                            min={0}
                            placeholder="UZS / month"
                            className="h-11 w-full bg-blue-800/50 border border-blue-700/50 rounded-xl pl-10 pr-4 text-sm outline-none focus:ring-2 ring-accent/50"
                        />
                    </div>
                </div>
                <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70 ml-1">{t("budget")}</label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-accent h-4 w-4 transition-colors" />
                        <input
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            type="number"
                            min={0}
                            placeholder="UZS"
                            className="h-11 w-full bg-blue-800/50 border border-blue-700/50 rounded-xl pl-10 pr-4 text-sm outline-none focus:ring-2 ring-accent/50"
                        />
                    </div>
                </div>
                <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70 ml-1">{t("area")}</label>
                    <div className="relative">
                        <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-accent h-4 w-4 transition-colors" />
                        <input
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            type="number"
                            min={0}
                            placeholder="например 60"
                            className="h-11 w-full bg-blue-800/50 border border-blue-700/50 rounded-xl pl-10 pr-4 text-sm outline-none focus:ring-2 ring-accent/50"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <Button onClick={onSearch} variant="cta" className="w-full md:w-auto px-10 h-11 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20 active:scale-95 border-none">
                    <Search className="h-5 w-5" />
                    {t("cta")}
                </Button>
            </div>
        </div>
    );
}
