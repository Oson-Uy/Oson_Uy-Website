"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { ProjectCard } from "@/components/custom/ProjectCard";
import { LeadModal } from "@/components/custom/LeadModal";
import { PROJECTS } from "@/lib/data";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FilterBar } from "@/components/custom/FilterBar";
import { formatUzPhoneInput } from "@/lib/phone";

const REGION_VIDEOS: Record<string, string> = {
    "Tashkent Region": "/videos/tashkent.mp4",
    "Samarkand Region": "/videos/samarkand.mp4",
    "Bukhara Region": "/videos/bukhara.mp4",
};

export default function Home() {
    const t = useTranslations("Home");
    const tFilter = useTranslations("FilterBar");

    const filterBarTranslations = {
        region: tFilter("region"),
        district: tFilter("district"),
        price_from: tFilter("price_from"),
        price_to: tFilter("price_to"),
        area_from: tFilter("area_from"),
        area_to: tFilter("area_to"),
        search_button: tFilter("search_button"),
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [featuredProjects, setFeaturedProjects] = useState(PROJECTS.filter((p) => p.isPopular));
    const [consultName, setConsultName] = useState("");
    const [consultPhone, setConsultPhone] = useState("+998");
    const [consultProjectId, setConsultProjectId] = useState<number | null>(null);
    const [activeLocation, setActiveLocation] = useState("Tashkent Region");
    const videoSrc = REGION_VIDEOS[activeLocation] || REGION_VIDEOS["Tashkent Region"];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";
                const response = await fetch(`${apiUrl}/projects`, { cache: "no-store" });
                if (!response.ok) return;
                const data = await response.json();

                const mapped = data.map((project: any) => ({
                    id: String(project.id),
                    name: project.name,
                    description: "",
                    image: project.imageUrl || "https://picsum.photos/seed/project/1200/800",
                    location: project.location,
                    developer: {
                        name: project.developer?.name ?? "Developer",
                        verified: true,
                        logo: "https://picsum.photos/seed/dev/100/100",
                    },
                    deliveryDate: project.deliveryDate,
                    tags: [],
                    images: project.media?.length
                        ? project.media.map((item: any) => item.imageUrl)
                        : [project.imageUrl || "https://picsum.photos/seed/project/1200/800"],
                    mainImage: project.imageUrl || "https://picsum.photos/seed/project/1200/800",
                    priceFrom: project.apartments.length
                        ? Math.min(...project.apartments.map((apt: any) => apt.price))
                        : 0,
                    apartments: project.apartments.map((apt: any) => ({
                        id: String(apt.id),
                        projectId: String(project.id),
                        rooms: apt.rooms,
                        area: apt.area,
                        floor: apt.floor,
                        price: apt.price,
                        status: "available" as const,
                        layoutImage: apt.imageUrl || "https://picsum.photos/seed/layout/600/400",
                    })),
                    isPopular: Boolean(project.topInCatalog || project.topInHome),
                    badgeVerified: project.badgeVerified ?? false,
                    badgeTrusted: project.badgeTrusted ?? false,
                    avgRating: project.avgRating ?? null,
                    reviewsCount: project.reviewsCount ?? 0,
                }));

                if (mapped.length) {
                    setFeaturedProjects(mapped.sort((a: any, b: any) => (b.isPopular ? 1 : -1)));
                    setConsultProjectId(Number(mapped[0].id));
                }
            } catch (err) {
                console.error("Failed to fetch projects", err);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="flex flex-col w-full min-h-screen md:pt-16 lg:pt-0">
            <section className="relative min-h-[98vh] md:h-[92vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.video
                            key={videoSrc}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            autoPlay
                            loop
                            muted
                            playsInline
                            src={videoSrc}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-transparent to-slate-50"></div>
                </div>

                <div className="relative pb-6 md:pt-7 md:pb-7 z-10 w-full px-4 text-center max-w-5xl mx-auto space-y-6 md:space-y-10 group">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl pt-10 sm:text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] drop-shadow-2xl">
                            {t("heroLine1")}{" "}
                            <span className="text-accent">{t("heroAccent")}</span>
                            <br />
                            <span className="text-7xl">{t("heroLine2")}</span>
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
                        <FilterBar
                            translations={filterBarTranslations}
                            onLocationChange={(loc) => setActiveLocation(loc)}
                        />
                    </motion.div>
                </div>
            </section>

            <section className="py-20 md:py-32 bg-slate-50">
                <div className="w-full px-4 md:px-8 max-w-7xl mx-auto space-y-10 md:space-y-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-32 px-4 bg-slate-50">
                <div className="max-w-6xl mx-auto bg-white border-2 border-primary/5 p-6 sm:p-12 md:p-20 rounded-[2rem] md:rounded-[4rem] shadow-2xl shadow-blue-900/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-primary tracking-tight leading-[1.1]">
                            {t("consultTitle1") || "Персональная"} <span className="text-accent">{t("consultTitleAccent") || "консультация"}</span> {t("consultTitle2") || "по любому проекту"}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                            {t("consultSubtitle") || "Выберите интересующий вас жилой комплекс и получите подробную информацию от наших экспертов."}
                        </p>
                    </div>
                    <div className="w-full md:w-auto shrink-0 bg-primary p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl shadow-blue-900/20 text-white space-y-6 sm:space-y-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest opacity-60">
                                    {t("selectProject") || "Выберите проект"}
                                </label>
                                <select
                                    value={consultProjectId ?? ""}
                                    onChange={(e) => setConsultProjectId(Number(e.target.value))}
                                    className="w-full bg-blue-800/50 border border-blue-700/50 rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 ring-accent text-white appearance-none cursor-pointer"
                                >
                                    {featuredProjects.map((p) => (
                                        <option key={p.id} value={p.id} className="text-primary">
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest opacity-60">
                                    {t("yourName")}
                                </label>
                                <input
                                    type="text"
                                    value={consultName}
                                    onChange={(e) => setConsultName(e.target.value)}
                                    placeholder="Full Name"
                                    className="w-full bg-blue-800/50 border border-blue-700/50 rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 ring-accent text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest opacity-60">
                                    {t("phone")}
                                </label>
                                <input
                                    type="text"
                                    value={consultPhone}
                                    onChange={(e) => setConsultPhone(formatUzPhoneInput(e.target.value))}
                                    placeholder="+998 90 123 45 67"
                                    className="w-full bg-blue-800/50 border border-blue-700/50 rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 ring-accent text-white"
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

            <LeadModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialName={consultName}
                initialPhone={consultPhone}
                projectId={consultProjectId ?? undefined}
            />
        </div>
    );
}