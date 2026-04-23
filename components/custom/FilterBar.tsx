"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, DollarSign, Ruler } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const UZBEKISTAN_REGIONS = [
    "Tashkent City",
    "Tashkent Region",
    "Samarkand Region",
    "Bukhara Region",
    "Andijan Region",
    "Fergana Region",
    "Namangan Region",
    "Jizzakh Region",
    "Sirdarya Region",
    "Kashkadarya Region",
    "Surkhandarya Region",
    "Navoi Region",
    "Khorezm Region",
    "Republic of Karakalpakstan",
];

export function FilterBar() {
    const t = useTranslations("Filter");
    const router = useRouter();
    const [location, setLocation] = useState("Samarkand Region");
    const [currency, setCurrency] = useState("USD");
    const [monthlyPayment, setMonthlyPayment] = useState("");
    const [budget, setBudget] = useState("");
    const [area, setArea] = useState("");

    const onSearch = () => {
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (currency) params.set("currency", currency);
        if (monthlyPayment) params.set("monthlyPayment", monthlyPayment);
        if (budget) params.set("budget", budget);
        if (area) params.set("area", area);
        router.push(`/catalog?${params.toString()}`);
    };

    return (
        <div className="bg-primary p-5 rounded-[1.5rem] shadow-2xl shadow-blue-900/20 flex flex-col gap-4 max-w-6xl mx-auto w-full border border-white/10 text-white">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70 ml-1">{t("city")}</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-accent h-4 w-4 transition-colors" />
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="h-11 w-full bg-blue-800/50 border border-blue-700/50 rounded-xl pl-10 pr-4 text-sm outline-none focus:ring-2 ring-accent/50 appearance-none cursor-pointer"
                        >
                            {UZBEKISTAN_REGIONS.map((region) => (
                                <option key={region} className="bg-primary" value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70 ml-1">Currency</label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-accent h-4 w-4 transition-colors" />
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="h-11 w-full bg-blue-800/50 border border-blue-700/50 rounded-xl pl-10 pr-4 text-sm outline-none focus:ring-2 ring-accent/50 appearance-none cursor-pointer"
                        >
                            <option className="bg-primary" value="USD">USD</option>
                            <option className="bg-primary" value="UZS">UZS</option>
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
                            placeholder={`${currency} / month`}
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
                            placeholder={currency}
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
