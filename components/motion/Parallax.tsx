"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

/**
 * Smoothly translates its children on scroll for a depth/parallax effect,
 * driven by the element's own progress through the viewport (GPU transform,
 * no scroll listeners). Keep `speed` small (0.1–0.3) so motion stays elegant.
 */
export function Parallax({
    children,
    className,
    speed = 0.2,
}: {
    children: ReactNode;
    className?: string;
    speed?: number;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [`${speed * 100}px`, `${-speed * 100}px`],
    );

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    );
}

/**
 * Full-bleed parallax background image for hero sections. The image is scaled
 * beyond its box so the vertical drift never reveals an edge. Overlay content
 * is passed as children and sits above the image.
 */
export function ParallaxHero({
    src,
    alt,
    className,
    overlayClassName,
    children,
    speed = 0.18,
}: {
    src: string;
    alt: string;
    className?: string;
    overlayClassName?: string;
    children?: ReactNode;
    speed?: number;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
            <motion.img
                src={src}
                alt={alt}
                aria-hidden={alt ? undefined : true}
                className="absolute inset-0 h-full w-full scale-125 object-cover"
                style={{ y }}
            />
            {overlayClassName ? <div className={overlayClassName} /> : null}
            {children}
        </div>
    );
}
