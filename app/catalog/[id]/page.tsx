"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
    MapPin,
    ChevronDown,
    CheckCircle2,
    Loader2,
    Star,
    QrCode,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApartmentList } from "@/components/custom/ApartmentList";
import { FloorTower } from "@/components/custom/FloorTower";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { LeadModal } from "@/components/custom/LeadModal";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type ProjectDetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
    const t = useTranslations("ProjectDetails");
    const [projectData, setProjectData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const resolvedParams = await params;
            const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";
            try {
                const response = await fetch(`${apiUrl}/projects/${resolvedParams.id}/full`, { cache: 'no-store' });
                if (response.ok) {
                    const data = await response.json();
                    setProjectData(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params]);

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const gallery = useMemo(() => {
        if (!projectData) return [];
        return projectData.media && projectData.media.length > 0
            ? projectData.media.map((item: any) => item.imageUrl)
            : [projectData.imageUrl || "https://picsum.photos/seed/project/1200/800"];
    }, [projectData]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <Loader2 className="h-10 w-10 animate-spin text-[#1E3A8A]" />
            </div>
        );
    }

    if (!projectData) {
        return (
            <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="rounded-3xl border border-red-100 bg-white p-8 text-red-600 font-bold text-center uppercase tracking-widest">
                        {t("notFound")}
                    </div>
                </div>
            </div>
        );
    }

    const apiFloors = projectData.floors ?? [];
    const hasFloors = apiFloors.length > 0;

    const fallbackQuery = `${projectData.location} ${projectData.district || ""}`;
    const mapSrc = projectData.mapEmbedUrl && projectData.mapEmbedUrl.includes("http")
        ? projectData.mapEmbedUrl
        : `https://www.google.com/maps?q=${encodeURIComponent(projectData.mapEmbedUrl || fallbackQuery)}&output=embed`;

    return (
        <div className="pt-16 md:pt-20 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col md:flex-row mb-10 border border-slate-100">
                    <div className="md:w-1/2 relative bg-slate-200 group">
                        <div className="aspect-[16/10] md:aspect-auto md:h-[550px] w-full overflow-hidden">
                            <Carousel
                                setApi={setApi}
                                opts={{ loop: true, align: "start" }}
                                className="h-full w-full"
                            >
                                <CarouselContent className="m-0 h-full flex">
                                    {gallery.map((img: string, index: number) => (
                                        <CarouselItem key={index} className="p-0 h-full basis-full grow-0 shrink-0">
                                            <div className="relative h-full w-full">
                                                <img
                                                    src={img}
                                                    alt={projectData.name}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/error/1200/800'; }}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                {gallery.length > 1 && (
                                    <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5 z-20">
                                        {Array.from({ length: count }).map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    api?.scrollTo(i);
                                                }}
                                                className={cn(
                                                    "h-1 rounded-full transition-all duration-300",
                                                    current === i
                                                        ? "w-5 bg-white shadow-lg"
                                                        : "w-1 bg-white/40 hover:bg-white/60"
                                                )}
                                            />
                                        ))}
                                    </div>
                                )}

                                {gallery.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.preventDefault(); api?.scrollPrev(); }}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.preventDefault(); api?.scrollNext(); }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </>
                                )}
                            </Carousel>
                        </div>

                        <div className="absolute top-3 left-3 md:top-6 md:left-6 flex flex-col gap-1.5 z-10">
                            {(projectData.topInCatalog || projectData.topInHome) && (
                                <Badge className="bg-[#FB7185] text-white border-none px-2.5 py-0.5 md:px-4 md:py-1.5 text-[9px] md:text-xs font-black uppercase tracking-widest shadow-xl shadow-rose-900/20">
                                    Popular
                                </Badge>
                            )}
                            <Badge className="bg-[#F97316] text-white border-none px-2.5 py-0.5 md:px-4 md:py-1.5 text-[9px] md:text-xs font-black uppercase tracking-widest shadow-xl shadow-orange-900/20">
                                {projectData.plan || "PREMIUM"}
                            </Badge>
                        </div>
                    </div>

                    <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <h1 className="text-2xl md:text-4xl font-black text-[#1E3A8A] uppercase tracking-tight leading-none">
                                {projectData.name}
                            </h1>
                            {(projectData.plan === "PRO" || projectData.plan === "ULTIMATE") && (
                                <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-emerald-500 shadow-sm" />
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center text-[#F97316] font-bold text-sm md:text-base">
                                <MapPin className="w-4 h-4 mr-2" />
                                {projectData.location}{projectData.district ? `, ${projectData.district}` : ""}
                            </div>
                            {projectData.avgRating ? (
                                <div className="flex items-center bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                                    <Star className="h-4 w-4 fill-orange-400 text-orange-400 mr-1.5" />
                                    <span className="font-bold text-orange-700">{projectData.avgRating.toFixed(1)}</span>
                                    <span className="text-orange-400 text-[10px] md:text-xs ml-1 font-semibold">({projectData.reviewsCount} {t("noComment").toLowerCase()})</span>
                                </div>
                            ) : null}
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                            <div className="bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100 text-center flex flex-col justify-center">
                                <p className="text-[9px] md:text-[10px] uppercase font-black text-slate-400 mb-1">{t("delivery")}</p>
                                <p className="text-[#1E3A8A] font-bold text-xs md:text-sm leading-tight">{projectData.deliveryDate}</p>
                            </div>
                            <div className="bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100 text-center flex flex-col justify-center">
                                <p className="text-[9px] md:text-[10px] uppercase font-black text-slate-400 mb-1">{t("floors")}</p>
                                <p className="text-[#1E3A8A] font-bold text-xs md:text-sm leading-tight">{projectData.totalFloors || "—"}</p>
                            </div>
                            <div className="bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100 text-center flex flex-col justify-center">
                                <p className="text-[9px] md:text-[10px] uppercase font-black text-slate-400 mb-1">{t("units")}</p>
                                <p className="text-[#1E3A8A] font-bold text-xs md:text-sm leading-tight">{projectData.totalUnits || apiFloors.length || projectData.apartments?.length || 0}</p>
                            </div>
                            {projectData.qrCodeUrl ? (
                                <div
                                    onClick={() => setIsQrModalOpen(true)}
                                    className="bg-[#1E3A8A] p-2 rounded-2xl border border-[#1E3A8A] text-center flex flex-col items-center justify-center group cursor-pointer hover:bg-[#3C55BE] transition-colors relative"
                                >
                                    <img
                                        src={projectData.qrCodeUrl}
                                        className="h-8 w-8 md:h-10 md:w-10 bg-white p-1 rounded-lg shadow-lg mb-1"
                                        alt="QR"
                                    />
                                    <p className="text-[8px] uppercase font-black text-white/80 leading-tight">{t("qrTitle")}</p>
                                </div>
                            ) : (
                                <div className="bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100 text-center flex flex-col justify-center">
                                    <p className="text-[9px] md:text-[10px] uppercase font-black text-slate-400 mb-1">{t("status")}</p>
                                    <p className="text-emerald-600 font-bold text-[10px] md:text-xs uppercase tracking-tighter">{t("available")}</p>
                                </div>
                            )}
                        </div>

                        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
                            <CollapsibleTrigger asChild>
                                <Button variant="outline" className="w-full justify-between rounded-xl h-11 border-slate-200 text-[#1E3A8A] font-bold uppercase text-[10px] tracking-widest">
                                    {isOpen ? t("hideDetails") : t("showDetails")}
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pt-4 space-y-4 overflow-hidden">
                                {projectData.description && (
                                    <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                                        {projectData.description}
                                    </p>
                                )}
                                {projectData.advantages && (
                                    <div className="grid grid-cols-2 gap-2">
                                        {projectData.advantages.map((adv: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-100 shadow-sm">
                                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                                <span className="text-[9px] font-bold text-slate-700 uppercase leading-tight">{adv}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CollapsibleContent>
                        </Collapsible>

                        <div className="flex flex-col sm:flex-row gap-3 mt-8">
                            <Button
                                onClick={() => setIsLeadModalOpen(true)}
                                className="flex-1 h-14 bg-[#F97316] hover:bg-orange-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-orange-900/10 transition-all active:scale-[0.98] uppercase tracking-wider"
                            >
                                {t("close") === "Close" ? "Request a Call" : "Оставить заявку"}
                            </Button>
                            {projectData.qrCodeUrl && (
                                <button
                                    onClick={() => setIsQrModalOpen(true)}
                                    className="h-14 w-14 cursor-pointer bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center text-[#1E3A8A] hover:bg-slate-50 transition-all shadow-sm"
                                >
                                    <QrCode className="h-6 w-6" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
                    <DialogContent className="max-w-xs sm:max-w-md rounded-[2.5rem] border-none shadow-2xl p-10 flex flex-col items-center">
                        <DialogHeader className="mb-6 text-center w-full">
                            <DialogTitle className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">{t("qrTitle")}</DialogTitle>
                            <p className="text-slate-500 text-sm font-medium mt-1">{t("qrSubtitle")}</p>
                        </DialogHeader>
                        <div className="bg-white p-8 rounded-[2rem] shadow-inner border border-slate-50 w-full flex justify-center">
                            <img
                                src={projectData.qrCodeUrl}
                                alt="QR Code Large"
                                className="w-full max-w-[250px] aspect-square object-contain"
                            />
                        </div>
                        <Button
                            onClick={() => setIsQrModalOpen(false)}
                            className="mt-8 w-full h-14 bg-slate-200 hover:bg-slate-400 cursor-pointer text-slate-600 font-bold rounded-2xl uppercase tracking-widest text-xs"
                        >
                            {t("close")}
                        </Button>
                    </DialogContent>
                </Dialog>

                {projectData.media?.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                        {projectData.media.map((m: any, i: number) => (
                            <div key={i} className="h-24 md:h-32 rounded-xl overflow-hidden border border-slate-200">
                                <img src={m.imageUrl} className="w-full h-full object-cover" alt="thumb" />
                            </div>
                        ))}
                    </div>
                )}

                {projectData.videoUrl && (
                    <div className="mb-12 bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="w-full md:w-[350px] shrink-0">
                                <div className="rounded-3xl overflow-hidden shadow-2xl bg-black border border-slate-200">
                                    <VideoPlayer url={projectData.videoUrl} />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight italic">{t("videoReview")}</h2>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    {t("videoReviewText")}
                                </p>
                                <div className="pt-4 flex items-center gap-3 text-emerald-600 font-bold text-sm">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>{t("exclusiveFootage")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-10 rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                    <iframe
                        src={mapSrc}
                        className="w-full h-80"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 mb-10">
                    <h2 className="text-2xl font-black text-[#1E3A8A] mb-6 uppercase">
                        {hasFloors ? t("floorStackTitle") : t("availableResidences")}
                    </h2>
                    {hasFloors ? (
                        <FloorTower
                            projectId={projectData.id}
                            projectName={projectData.name}
                            floors={apiFloors}
                            totalFloorsHint={projectData.totalFloors}
                        />
                    ) : (
                        <ApartmentList
                            projectId={projectData.id}
                            projectName={projectData.name}
                            apartments={projectData.apartments || []}
                        />
                    )}
                </div>

                {projectData.reviews?.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-[#1E3A8A] uppercase">{t("customerReviews")}</h2>
                            <div className="flex items-center gap-2">
                                <Star className="h-6 w-6 fill-orange-400 text-orange-400" />
                                <span className="text-2xl font-black text-slate-800">{projectData.avgRating?.toFixed(1)}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projectData.reviews.map((review: any, i: number) => (
                                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative">
                                    <div className="flex text-orange-400 mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className={`h-4 w-4 ${star <= review.rating ? "fill-orange-400" : "fill-slate-200 text-slate-200"}`} viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-slate-700 italic text-sm leading-relaxed">
                                        &quot;{review.comment || t("noComment")}&quot;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <LeadModal
                isOpen={isLeadModalOpen}
                onClose={() => setIsLeadModalOpen(false)}
                projectId={projectData.id}
                projectName={projectData.name}
            />
        </div>
    );
}

function VideoPlayer({ url }: { url: string }) {
    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const isInstagram = url.includes("instagram.com");
    const getInstagramEmbed = (url: string) => {
        const cleanUrl = url.split("?")[0];
        return `${cleanUrl.endsWith("/") ? cleanUrl : cleanUrl + "/"}embed`;
    };

    const youtubeId = getYoutubeId(url);

    if (youtubeId) {
        return (
            <div className="aspect-video w-full bg-slate-900">
                <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    if (isInstagram) {
        return (
            <div className="w-full bg-black flex justify-center">
                <iframe
                    src={getInstagramEmbed(url)}
                    className="w-full h-[550px] md:h-[650px]"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    allow="encrypted-media"
                />
            </div>
        );
    }

    return (
        <div className="aspect-[9/16] w-full bg-black">
            <video controls className="w-full h-full object-cover">
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}