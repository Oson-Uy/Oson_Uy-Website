import React, { useMemo, useState } from "react";
import { MapPin, Star } from "lucide-react";
import { Project } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LeadModal } from "@/components/custom/LeadModal";
import { formatUzs } from "@/lib/currency";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const t = useTranslations("ProjectCard");
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const gallery = useMemo(
        () => (project.images.length ? project.images : [project.image]),
        [project.images, project.image],
    );

    return (
        <Card className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 border border-slate-200 flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden">
                <Carousel opts={{ loop: true, duration: 30 }} className="h-full w-full">
                    <CarouselContent className="ml-0 h-full">
                        {gallery.map((image, index) => (
                            <CarouselItem key={`${project.id}-${index}`} className="pl-0 h-full">
                                <img
                                    src={image}
                                    alt={`${project.name} ${index + 1}`}
                                    className="h-full w-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {gallery.length > 1 && (
                        <>
                            <CarouselPrevious className="left-3 bg-white/85 text-slate-700 hover:bg-white border-none" />
                            <CarouselNext className="right-3 bg-white/85 text-slate-700 hover:bg-white border-none" />
                        </>
                    )}
                </Carousel>
                {project.isPopular && (
                    <Badge className="absolute top-4 left-4 bg-[#FB7185] text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 border-none uppercase tracking-wider">
                        {t("popular")}
                    </Badge>
                )}
                {project.badgeTrusted && (
                    <Badge className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 border-none uppercase tracking-wider">
                        Trusted
                    </Badge>
                )}
            </div>
            <CardContent className="p-5 flex-1 flex flex-col">
                <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-[#1E3A8A] leading-tight">
                        {project.name}
                    </h3>
                    <span className="text-lg font-black text-[#F97316] tracking-tight">
                        {formatUzs(project.priceFrom)}
                    </span>
                </div>

                <p className="text-sm text-slate-500 mb-3 leading-relaxed flex items-center gap-1.5 font-medium">
                    <MapPin className="h-3 w-3 text-[#1E3A8A]" /> {project.district},{" "}
                    {project.location}
                </p>
                {project.badgeVerified && (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                        Verified developer
                    </p>
                )}

                <div className="mb-5 flex items-center gap-2 text-sm text-slate-600">
                    <Star className="h-4 w-4 text-[#F97316]" />
                    <span className="font-semibold text-slate-800">
                        {project.avgRating ? project.avgRating.toFixed(1) : "—"}
                    </span>
                    <span>({project.reviewsCount ?? 0} отзывов)</span>
                </div>

                <div className="mt-auto flex gap-3">
                    <Link href={`/catalog/${project.id}`} className="flex-1">
                        <Button
                            variant="ghost"
                            className="w-full bg-slate-50 border border-slate-200 text-[#1E3A8A] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-100 h-10"
                        >
                            {t("details")}
                        </Button>
                    </Link>
                    <Button
                        onClick={() => setIsLeadModalOpen(true)}
                        className="flex-1 bg-[#F97316] hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl h-10"
                    >
                        {t("inquiry")}
                    </Button>
                </div>
            </CardContent>
            <LeadModal
                isOpen={isLeadModalOpen}
                onClose={() => setIsLeadModalOpen(false)}
                projectName={project.name}
                projectId={Number(project.id)}
            />
        </Card>
    );
};
