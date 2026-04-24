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

    const onSearch = () => {
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (district) params.set("district", district);
        if (monthlyPayment) params.set("monthlyPayment", monthlyPayment);
        if (budget) params.set("budget", budget);
        if (area) params.set("area", area);
        router.push(`/catalog?${params.toString()}`);
    };

    const inputClasses = "h-12 w-full bg-blue-800/40 border border-blue-700/50 rounded-2xl pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 ring-accent/50 focus:bg-blue-800/80 transition-all placeholder:text-white/30 appearance-none";
    const labelClasses = "text-[10px] uppercase tracking-[0.15em] font-black text-white/50 ml-2 mb-1 block";

    return (
        <div className="bg-primary p-4 lg:p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(30,58,138,0.4)] max-w-6xl mx-auto w-full border border-white/10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end relative z-10">

                <div className="space-y-1">
                    <label className={labelClasses}>Region</label>
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-accent h-4 w-4 transition-transform group-focus-within:scale-110" />
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
                                <option key={region} className="bg-blue-900" value={region}>{region}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className={labelClasses}>City / District</label>
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-accent h-4 w-4 transition-transform group-focus-within:scale-110" />
                        <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className={`${inputClasses} cursor-pointer`}
                        >
                            {districtsForRegion.map((item) => (
                                <option key={item} className="bg-blue-900" value={item}>{item}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className={labelClasses}>{t("monthly")}</label>
                    <div className="relative group">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-accent h-4 w-4 transition-transform group-focus-within:scale-110" />
                        <input
                            value={monthlyPayment}
                            onChange={(e) => setMonthlyPayment(e.target.value)}
                            placeholder="UZS / month"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className={labelClasses}>{t("budget")}</label>
                    <div className="relative group">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-accent h-4 w-4 transition-transform group-focus-within:scale-110" />
                        <input
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="Total UZS"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-2 lg:gap-4">
                    <div className="space-y-1">
                        <label className={labelClasses}>{t("area")}</label>
                        <div className="relative group">
                            <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-accent h-4 w-4 transition-transform group-focus-within:scale-110" />
                            <input
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                placeholder="m²"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <Button
                        onClick={onSearch}
                        variant="cta"
                        className="h-12 w-12 lg:w-14 rounded-2xl bg-accent hover:bg-accent/90 text-white flex items-center justify-center p-0 shadow-lg shadow-orange-900/40 active:scale-90 transition-all self-end mb-[1px]"
                    >
                        <Search className="h-6 w-6 stroke-[2.5px]" />
                    </Button>
                </div>

            </div>
        </div>
    );
}