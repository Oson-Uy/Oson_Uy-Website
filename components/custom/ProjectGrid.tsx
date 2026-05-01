"use client";

import React, { useState } from "react";
import { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProjectGridProps {
    projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
    const t = useTranslations("Catalog");
    const [visibleCount, setVisibleCount] = useState(10);

    const hasMore = visibleCount < projects.length;

    const showMore = () => {
        setVisibleCount((prev) => prev + 10);
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.slice(0, visibleCount).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-8">
                    <Button
                        onClick={showMore}
                        className="h-16 px-12 rounded-2xl bg-white border-2 border-primary text-primary font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl shadow-blue-900/5 active:scale-95 flex items-center gap-3"
                    >
                        {t("showMore") || "Показать еще"}
                        <ChevronDown className="h-5 w-5" />
                    </Button>
                </div>
            )}
        </div>
    );
}
