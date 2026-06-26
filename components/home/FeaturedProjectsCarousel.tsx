"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/custom/ProjectCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const AUTOPLAY_DELAY_MS = 2000;
const IDLE_RESUME_MS = 8000;

type FeaturedProjectsCarouselProps = {
    projects: Project[];
};

export function FeaturedProjectsCarousel({ projects }: FeaturedProjectsCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [snapCount, setSnapCount] = useState(0);

    const autoplay = useRef(
        Autoplay({
            delay: AUTOPLAY_DELAY_MS,
            stopOnInteraction: true,
        }),
    );
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const pauseAndScheduleResume = useCallback(() => {
        autoplay.current.stop();

        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
        }

        idleTimerRef.current = setTimeout(() => {
            autoplay.current.play();
        }, IDLE_RESUME_MS);
    }, []);

    useEffect(() => {
        if (!api) return;

        const updateSnaps = () => {
            setSnapCount(api.scrollSnapList().length);
            setCurrent(api.selectedScrollSnap());
        };

        updateSnaps();
        api.on("reInit", updateSnaps);
        api.on("select", updateSnaps);
        api.on("pointerDown", pauseAndScheduleResume);

        return () => {
            api.off("reInit", updateSnaps);
            api.off("select", updateSnaps);
            api.off("pointerDown", pauseAndScheduleResume);
            if (idleTimerRef.current) {
                clearTimeout(idleTimerRef.current);
            }
        };
    }, [api, pauseAndScheduleResume]);

    const scrollTo = (index: number) => {
        api?.scrollTo(index);
        pauseAndScheduleResume();
    };

    const scrollPrev = () => {
        api?.scrollPrev();
        pauseAndScheduleResume();
    };

    const scrollNext = () => {
        api?.scrollNext();
        pauseAndScheduleResume();
    };

    const showControls = snapCount > 1;

    if (!projects.length) return null;

    const navButtonClassName =
        "hidden shrink-0 size-11 rounded-full border-slate-200 bg-white text-primary shadow-lg hover:border-primary hover:bg-primary hover:text-white md:flex";

    return (
        <div className="space-y-8">
            <div className="relative">
                {showControls ? (
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Previous slide"
                        onClick={scrollPrev}
                        className="hidden md:flex absolute -left-4 xl:-left-14 top-1/2 -translate-y-1/2 z-10 shrink-0 size-11 rounded-full border-slate-200 bg-white text-primary shadow-lg hover:border-primary hover:bg-primary hover:text-white"
                    >
                        <ChevronLeft className="size-5" />
                    </Button>
                ) : null}

                <Carousel
                    setApi={setApi}
                    opts={{ loop: true, align: "start" }}
                    plugins={[autoplay.current]}
                    className="w-full md:px-8 xl:px-0"
                >
                    <CarouselContent className="-ml-4 md:-ml-6 lg:-ml-10">
                        {projects.map((project) => (
                            <CarouselItem
                                key={project.id}
                                className="pl-4 md:pl-6 lg:pl-10 basis-full md:basis-1/2"
                            >
                                <ProjectCard project={project} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {showControls ? (
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Next slide"
                        onClick={scrollNext}
                        className="hidden md:flex absolute -right-4 xl:-right-14 top-1/2 -translate-y-1/2 z-10 shrink-0 size-11 rounded-full border-slate-200 bg-white text-primary shadow-lg hover:border-primary hover:bg-primary hover:text-white"
                    >
                        <ChevronRight className="size-5" />
                    </Button>
                ) : null}
            </div>

            {showControls ? (
                <div className="flex justify-center gap-2">
                    {Array.from({ length: snapCount }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                current === index
                                    ? "w-8 bg-accent"
                                    : "w-1.5 bg-slate-300 hover:bg-slate-400",
                            )}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
}
