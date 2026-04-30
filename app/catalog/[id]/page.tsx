"use client";

import React, { useState, useEffect } from "react";
import {
    MapPin,
    ChevronDown,
    CheckCircle2,
    Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApartmentList } from "@/components/custom/ApartmentList";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

type ProjectDetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
    const [projectData, setProjectData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const resolvedParams = await params;
            const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";
            try {
                const response = await fetch(`${apiUrl}/projects/${resolvedParams.id}/full`);
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
                    <div className="rounded-3xl border border-red-100 bg-white p-8 text-red-600 font-bold">
                        Project not found
                    </div>
                </div>
            </div>
        );
    }

    const gallery = projectData.media && projectData.media.length > 0
        ? projectData.media.map((item: any) => item.imageUrl)
        : [projectData.imageUrl || "https://picsum.photos/seed/project/1200/800"];

    const fallbackQuery = `${projectData.location} ${projectData.district || ""}`;
    const mapSrc = projectData.mapEmbedUrl && projectData.mapEmbedUrl.includes("http")
        ? projectData.mapEmbedUrl
        : `https://www.google.com/maps?q=${encodeURIComponent(projectData.mapEmbedUrl || fallbackQuery)}&output=embed`;

    return (
        <div className="pt-16 md:pt-20 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row mb-10 border border-slate-100">
                    <div className="md:w-1/2 relative h-[400px] md:h-[550px] bg-slate-200">
                        <Carousel opts={{ loop: true }} className="h-full w-full">
                            <CarouselContent className="ml-0 h-full">
                                {gallery.map((img: string, index: number) => (
                                    <CarouselItem key={index} className="pl-0 h-full">
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
                                <>
                                    <CarouselPrevious className="left-3" />
                                    <CarouselNext className="right-3" />
                                </>
                            )}
                        </Carousel>
                        <Badge className="absolute top-6 left-6 bg-[#F97316] text-white border-none px-4 py-1 font-bold z-10">
                            PREMIUM REAL ESTATE
                        </Badge>
                    </div>

                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <h1 className="text-4xl font-black text-[#1E3A8A] mb-2 uppercase tracking-tight leading-none">
                            {projectData.name}
                        </h1>

                        <div className="flex items-center text-[#F97316] font-bold mb-6">
                            <MapPin className="w-4 h-4 mr-2" />
                            {projectData.location}{projectData.district ? `, ${projectData.district}` : ""}
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-8">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Delivery</p>
                                <p className="text-[#1E3A8A] font-bold text-sm">{projectData.deliveryDate}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Floors</p>
                                <p className="text-[#1E3A8A] font-bold text-sm">{projectData.totalFloors || "—"}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Units</p>
                                <p className="text-[#1E3A8A] font-bold text-sm">{projectData.totalUnits || projectData.apartments?.length || 0}</p>
                            </div>
                        </div>

                        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
                            <CollapsibleTrigger asChild>
                                <Button variant="outline" className="w-full justify-between rounded-xl h-12 border-slate-200 text-[#1E3A8A] font-bold uppercase text-[11px] tracking-widest">
                                    {isOpen ? "Скрыть детали" : "Описание и удобства"}
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pt-4 space-y-4 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
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
                                                <span className="text-[10px] font-bold text-slate-700 uppercase leading-tight">{adv}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>

                {projectData.media?.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mb-10">
                        {projectData.media.map((m: any, i: number) => (
                            <div key={i} className="h-24 rounded-xl overflow-hidden border border-slate-200">
                                <img src={m.imageUrl} className="w-full h-full object-cover" alt="thumb" />
                            </div>
                        ))}
                    </div>
                )}

                {projectData.videoUrl && (
                    <div className="mb-10 rounded-3xl overflow-hidden border border-slate-200 bg-black aspect-video">
                        <video controls className="w-full h-full">
                            <source src={projectData.videoUrl} type="video/mp4" />
                        </video>
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

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:p-8">
                    <h2 className="text-2xl font-black text-[#1E3A8A] mb-6 uppercase">Available Residences</h2>
                    <ApartmentList
                        projectId={projectData.id}
                        projectName={projectData.name}
                        apartments={projectData.apartments || []}
                    />
                </div>
            </div>
        </div>
    );
}