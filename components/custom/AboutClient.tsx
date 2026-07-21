"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

type FounderT = {
    name: string;
    role: string;
    location: string;
    bio1: string;
    bio2: string;
    bio3: string;
};

type AboutT = {
    trustScore: string;
    title1: string;
    titleAccent: string;
    description: string;
    learnMore: string;
    trustedBy: string;
    quote: string;
    founderEyebrow: string;
    founderTitle: string;
    founder1: FounderT;
    founder2: FounderT;
    startJourney: string;
};

function useInView(threshold = 0.2) {
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

function RevealWords({
    text,
    visible,
    className,
    baseDelay = 0,
    stagger = 45,
}: {
    text: string;
    visible: boolean;
    className?: string;
    baseDelay?: number;
    stagger?: number;
}) {
    const words = useMemo(() => text.split(" "), [text]);
    return (
        <span className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-top pb-[0.15em] -mb-[0.15em]">
                    <span
                        className="inline-block transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                        style={{
                            transform: visible ? "translateY(0%)" : "translateY(115%)",
                            transitionDelay: `${baseDelay + i * stagger}ms`,
                        }}
                    >
                        {word}
                        {i < words.length - 1 ? "\u00A0" : ""}
                    </span>
                </span>
            ))}
        </span>
    );
}

function RevealBlock({
    visible,
    delay = 0,
    className,
    children,
}: {
    visible: boolean;
    delay?: number;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${className ?? ""}`}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(28px)",
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

function RevealImage({
    src,
    alt,
    className,
    curtainColor = "#0B0F1A",
    visible,
    delay = 0,
}: {
    src: string;
    alt: string;
    className?: string;
    curtainColor?: string;
    visible: boolean;
    delay?: number;
}) {
    return (
        <div className={`relative overflow-hidden ${className ?? ""}`}>
            <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                    transform: visible ? "scale(1)" : "scale(1.15)",
                    transitionDelay: `${delay}ms`,
                }}
            />
            <div
                className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.83,0,0.17,1)]"
                style={{
                    backgroundColor: curtainColor,
                    transform: visible ? "translateY(-100%)" : "translateY(0%)",
                    transitionDelay: `${delay}ms`,
                }}
            />
        </div>
    );
}

export default function AboutClient({ t }: { t: AboutT }) {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const [heroMounted, setHeroMounted] = useState(false);
    const imgParallaxRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const raf = requestAnimationFrame(() => setHeroMounted(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                if (imgParallaxRef.current) {
                    const y = window.scrollY;
                    imgParallaxRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.08)`;
                }
                ticking = false;
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const who = useInView(0.25);
    const whoImgTop = useInView(0.2);
    const whoImgBottom = useInView(0.2);
    const founder = useInView(0.25);
    const founder1Img = useInView(0.25);
    const founder2Img = useInView(0.25);
    const cta = useInView(0.3);

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <div ref={heroRef} className="relative min-h-[80vh] md:min-h-[92vh] w-full overflow-hidden">
                <img
                    ref={imgParallaxRef}
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
                    alt="Modern architecture in Uzbekistan"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ transform: "translate3d(0,0,0) scale(1.08)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/40 via-transparent to-transparent" />

                <div className="relative z-10 flex h-full min-h-[80vh] md:min-h-[92vh] flex-col justify-end px-4 md:px-8 pb-14 md:pb-20">
                    <div className="max-w-[1200px] mx-auto w-full">
                        <RevealBlock visible={heroMounted} delay={100} className="mb-6 md:mb-8">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                                </span>
                                <span className="text-[11px] font-black uppercase tracking-widest text-white">
                                    {t.trustScore}
                                </span>
                            </div>
                        </RevealBlock>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] md:leading-[0.95] max-w-4xl">
                            <RevealWords text={t.title1} visible={heroMounted} baseDelay={200} />{" "}
                            <RevealWords
                                text={t.titleAccent}
                                visible={heroMounted}
                                baseDelay={200 + t.title1.split(" ").length * 45}
                                className="italic font-serif text-[#F97316] font-normal"
                            />
                        </h1>

                        <RevealBlock visible={heroMounted} delay={650} className="mt-6 md:mt-8">
                            <p className="text-base md:text-xl text-white/75 font-medium leading-relaxed max-w-2xl">
                                {t.description}
                            </p>
                        </RevealBlock>

                    </div>
                </div>
            </div>

            <div ref={founder.ref} className="bg-[#F7F4EE] py-24 md:py-32">
                <div className="max-w-[1200px] mx-auto px-4 md:px-0">
                    <RevealBlock visible={founder.visible} className="text-center">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1E3A8A] mb-4">
                            {t.founderEyebrow}
                        </p>
                    </RevealBlock>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#1E3A8A] tracking-tight text-center mb-16 md:mb-20">
                        <RevealWords text={t.founderTitle} visible={founder.visible} baseDelay={80} />
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
                        <div className="md:col-span-7 order-2 md:order-1">
                            <RevealBlock visible={founder.visible} delay={100}>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1">
                                    {t.founder1.name}
                                </h3>
                                <p className="text-sm font-bold text-[#F97316] uppercase tracking-widest mb-3">
                                    {t.founder1.role}
                                </p>
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 mb-8">
                                    <MapPin className="h-3.5 w-3.5 text-[#1E3A8A]" />
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                                        {t.founder1.location}
                                    </span>
                                </div>
                            </RevealBlock>

                            <div className="space-y-5 text-slate-600 font-medium leading-relaxed text-base md:text-lg max-w-xl">
                                <RevealBlock visible={founder.visible} delay={220}><p>{t.founder1.bio1}</p></RevealBlock>
                                <RevealBlock visible={founder.visible} delay={340}><p>{t.founder1.bio2}</p></RevealBlock>
                                <RevealBlock visible={founder.visible} delay={460}><p>{t.founder1.bio3}</p></RevealBlock>
                            </div>
                        </div>

                        <div ref={founder1Img.ref} className="md:col-span-5 order-1 md:order-2">
                            <RevealImage
                                src="/AboutPageImgs/founder1.jpg"
                                alt={t.founder1.name}
                                className="rounded-[2.5rem] shadow-2xl shadow-slate-900/10 aspect-[4/5] bg-slate-200"
                                curtainColor="#F7F4EE"
                                visible={founder1Img.visible}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center mt-20 md:mt-28">
                        <div ref={founder2Img.ref} className="md:col-span-5 order-1">
                            <RevealImage
                                src="/AboutPageImgs/founder3.jpg"
                                alt={t.founder2.name}
                                className="rounded-[2.5rem] shadow-2xl shadow-slate-900/10 aspect-[4/5] bg-slate-200"
                                curtainColor="#F7F4EE"
                                visible={founder2Img.visible}
                            />
                        </div>

                        <div className="md:col-span-7 order-2">
                            <RevealBlock visible={founder.visible} delay={100}>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1">
                                    {t.founder2.name}
                                </h3>
                                <p className="text-sm font-bold text-[#F97316] uppercase tracking-widest mb-3">
                                    {t.founder2.role}
                                </p>
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 mb-8">
                                    <MapPin className="h-3.5 w-3.5 text-[#1E3A8A]" />
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                                        {t.founder2.location}
                                    </span>
                                </div>
                            </RevealBlock>

                            <div className="space-y-5 text-slate-600 font-medium leading-relaxed text-base md:text-lg max-w-xl">
                                <RevealBlock visible={founder.visible} delay={220}><p>{t.founder2.bio1}</p></RevealBlock>
                                <RevealBlock visible={founder.visible} delay={340}><p>{t.founder2.bio2}</p></RevealBlock>
                                <RevealBlock visible={founder.visible} delay={460}><p>{t.founder2.bio3}</p></RevealBlock>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}