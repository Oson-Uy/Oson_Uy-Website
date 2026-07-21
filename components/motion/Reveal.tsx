"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    className?: string;
    /** Vertical offset (px) the content rises from. */
    y?: number;
    /** Delay before the reveal starts (s). */
    delay?: number;
    /** Animation duration (s). */
    duration?: number;
    /** Render as a list container that staggers its <Reveal.Item> children. */
    stagger?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades + rises content into view on scroll, once. Respects reduced-motion via
 * Framer's built-in handling of `prefers-reduced-motion`. Use for section-level
 * entrances so the site feels smooth without being noisy.
 */
export function Reveal({
    children,
    className,
    y = 24,
    delay = 0,
    duration = 0.6,
    stagger,
}: RevealProps) {
    if (stagger) {
        return (
            <motion.div
                className={className}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
                }}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration, ease: EASE, delay }}
        >
            {children}
        </motion.div>
    );
}

/**
 * A <section> whose background/layout stays put while only its content fades +
 * rises into view once. Drop-in replacement for a plain <section> — the colored
 * band no longer slides as a whole (feels intentional, not templated). The
 * inner wrapper is a full-width block, so layout is unchanged.
 */
export function RevealSection({
    children,
    className,
    id,
    y = 28,
}: {
    children: ReactNode;
    className?: string;
    id?: string;
    y?: number;
}) {
    return (
        <section id={id} className={className}>
            <motion.div
                initial={{ opacity: 0, y }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.65, ease: EASE }}
            >
                {children}
            </motion.div>
        </section>
    );
}

/** A single item inside a staggered <Reveal stagger={...}> container. */
export function RevealItem({
    children,
    className,
    y = 20,
}: {
    children: ReactNode;
    className?: string;
    y?: number;
}) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
            }}
        >
            {children}
        </motion.div>
    );
}
