"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { RefreshCw } from "lucide-react";
import { ProjectCard } from "@/components/custom/ProjectCard";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import type { Project } from "@/types";

const VISIBLE = 3;

/** Fisher–Yates shuffle (returns a new array). */
function shuffle<T>(input: T[]): T[] {
    const arr = [...input];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

type Props = {
    projects: Project[];
};

/**
 * Home "Популярные проекты" section: shows exactly {@link VISIBLE} projects and
 * a "Смотреть ещё" button that rotates to a different trio on every click,
 * cycling through a shuffled copy of the full list so each press feels fresh.
 */
export function FeaturedProjectsShowcase({ projects }: Props) {
    const t = useTranslations("Home");
    const ordered = useMemo(() => shuffle(projects), [projects]);
    const [offset, setOffset] = useState(0);

    if (!projects.length) return null;

    const count = Math.min(VISIBLE, ordered.length);
    const visible = Array.from(
        { length: count },
        (_, i) => ordered[(offset + i) % ordered.length],
    );
    const hasMore = ordered.length > VISIBLE;

    return (
        <div className="space-y-10">
            <motion.div
                key={offset}
                initial="hidden"
                animate="show"
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.12 } },
                }}
                className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
                {visible.map((project) => (
                    <motion.div
                        key={project.id}
                        variants={{
                            hidden: { opacity: 0, y: 28 },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                            },
                        }}
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </motion.div>

            {hasMore && (
                <div className="flex justify-center">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOffset((o) => (o + VISIBLE) % ordered.length)}
                        className="group h-14 gap-2 rounded-2xl border-slate-200 bg-white px-8 text-base font-black text-primary shadow-lg hover:border-primary hover:bg-primary hover:text-white"
                    >
                        <RefreshCw className="size-5 transition-transform duration-500 group-hover:rotate-180" />
                        {t("showMore")}
                    </Button>
                </div>
            )}
        </div>
    );
}
