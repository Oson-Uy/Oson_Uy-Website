"use client";

import React, { useEffect, useRef, useState } from "react";
import { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProjectGridProps {
    projects: Project[];
}

function useInView(threshold = 0.1) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
}

function AnimatedCard({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const { ref, visible } = useInView(0.1);
    return (
        <div
            ref={ref}
            className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(32px)",
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

export function ProjectGrid({ projects }: ProjectGridProps) {
    const t = useTranslations("Catalog");
    const [visibleCount, setVisibleCount] = useState(9);
    const [prevCount, setPrevCount] = useState(0);

    const hasMore = visibleCount < projects.length;

    const showMore = () => {
        setPrevCount(visibleCount);
        setVisibleCount((prev) => prev + 9);
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.slice(0, visibleCount).map((project, i) => {
                    const batchIndex = Math.max(i - prevCount, 0);
                    const delay = Math.min(batchIndex, 8) * 90;

                    return (
                        <AnimatedCard key={project.id} delay={delay}>
                            <ProjectCard project={project} />
                        </AnimatedCard>
                    );
                })}
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