"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ProjectCard } from "@/components/custom/ProjectCard";
import { LeadModal } from "@/components/custom/LeadModal";
import { PROJECTS } from "@/lib/data";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { FilterBar } from "@/components/custom/FilterBar";
import { formatUzPhoneInput } from "@/lib/phone";

export default function Home() {
    const t = useTranslations("Home");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [featuredProjects, setFeaturedProjects] = useState(PROJECTS.filter((p) => p.isPopular));
    const [consultPhone, setConsultPhone] = useState("+998");

    useEffect(() => {
        void (async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";
                const response = await fetch(`${apiUrl}/projects`, { cache: "no-store" });
                if (!response.ok) return;
                const data = (await response.json()) as Array<{
                    id: number;
                    name: string;
                    location: string;
                    deliveryDate: string;
                    imageUrl?: string;
                    apartments: Array<{ id: number; rooms: number; area: number; floor: number; price: number; imageUrl?: string }>;
                    developer?: { name: string };
                }>;
                const mapped = data.map((project) => ({
                    id: String(project.id),
                    name: project.name,
                    description: "",
                    image: project.imageUrl || "https://picsum.photos/seed/project/1200/800",
                    location: (["Tashkent", "Samarkand", "Bukhara"].includes(project.location)
                        ? project.location
                        : "Tashkent") as "Tashkent" | "Samarkand" | "Bukhara",
                    developer: {
                        name: project.developer?.name ?? "Developer",
                        verified: true,
                        logo: "https://picsum.photos/seed/dev/100/100",
                    },
                    deliveryDate: project.deliveryDate,
                    tags: [],
                    images: [project.imageUrl || "https://picsum.photos/seed/project/1200/800"],
                    mainImage: project.imageUrl || "https://picsum.photos/seed/project/1200/800",
                    priceFrom: project.apartments.length
                        ? Math.min(...project.apartments.map((apt) => apt.price))
                        : 0,
                    apartments: project.apartments.map((apt) => ({
                        id: String(apt.id),
                        projectId: String(project.id),
                        rooms: apt.rooms,
                        area: apt.area,
                        floor: apt.floor,
                        price: apt.price,
                        status: "available" as const,
                        layoutImage: apt.imageUrl || "https://picsum.photos/seed/layout/600/400",
                    })),
                    floors: project.apartments.length
                        ? Math.max(...project.apartments.map((apt) => apt.floor))
                        : 0,
                    district: project.location,
                    isPopular: true,
                }));
                if (mapped.length) setFeaturedProjects(mapped);
            } catch {
                // Keep local fallback data
            }
        })();
    }, []);

    return (
        <div className="flex flex-col w-full min-h-screen pt-20 md:pt-16">
            <section className="relative min-h-[88vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://picsum.photos/seed/central-asia/1920/1080?blur=1"
                        className="w-full h-full object-cover"
                        alt="Hero background"
                    />
                    <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-transparent to-slate-50"></div>
                </div>

                <div className="relative pt-10 pb-6 md:pt-7 md:pb-7 z-10 w-full px-4 text-center max-w-5xl mx-auto space-y-6 md:space-y-10 group">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] drop-shadow-2xl">
                            {t("heroLine1")}
                            <span className="text-accent">{t("heroAccent")}</span>
                            <br />
                            {t("heroLine2")}
                        </h1>
                        <p className="text-white/85 text-base sm:text-lg md:text-2xl font-medium max-w-2xl mx-auto tracking-tight leading-relaxed">
                            {t("heroSubtitle")}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <FilterBar />
                    </motion.div>
                </div>
            </section>

            <section className="py-32 bg-slate-50">
                <div className="w-full px-4 md:px-8 max-w-7xl mx-auto space-y-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="space-y-3">
                            <h2 className="text-5xl font-black text-primary tracking-tight">
                                {t("featuredTitle")}
                            </h2>
                            <div className="h-1.5 w-24 bg-accent rounded-full"></div>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs pt-2">
                                {t("featuredSubtitle")}
                            </p>
                        </div>
                        <Link
                            href="/catalog"
                            className="text-accent font-bold text-lg gap-2 p-0 hover:no-underline hover:translate-x-2 transition-transform"
                        >
                            {t("viewCatalog")}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="text-center md:text-left space-y-2">
                        <div className="text-5xl font-black text-primary tracking-tight">
                            1,250+
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                            {t("availableProjects")}
                        </div>
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <div className="text-5xl font-black text-primary tracking-tight">
                            {t("launchCity")}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                            {t("launchCityLabel")}
                        </div>
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <div className="text-5xl font-black text-primary tracking-tight">
                            15min
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                            {t("responseTime")}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 px-4 bg-slate-50">
                <div className="max-w-6xl mx-auto bg-white border-2 border-primary/5 p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-blue-900/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tight leading-[1.1]">
                            {t("consultTitle1")}{" "}
                            <span className="text-accent">{t("consultTitleAccent")}</span>{" "}
                            {t("consultTitle2")}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                            {t("consultSubtitle")}
                        </p>
                    </div>
                    <div className="w-full md:w-auto shrink-0 bg-primary p-10 rounded-[3rem] shadow-2xl shadow-blue-900/20 text-white space-y-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest opacity-60">
                                    {t("yourName")}
                                </label>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-blue-800/50 border border-blue-700/50 rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 ring-accent"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest opacity-60">
                                    {t("phone")}
                                </label>
                                <input
                                    type="text"
                                    value={consultPhone}
                                    onChange={(event) =>
                                        setConsultPhone(formatUzPhoneInput(event.target.value))
                                    }
                                    placeholder="+998 90 123 45 67"
                                    className="w-full bg-blue-800/50 border border-blue-700/50 rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 ring-accent"
                                />
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            variant="cta"
                            className="w-full text-white h-16 rounded-xl font-black text-xl shadow-xl shadow-orange-900/20 transition-all active:scale-95 border-none"
                        >
                            {t("inquiryNow")}
                        </Button>
                    </div>
                </div>
            </section>
            
            <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
