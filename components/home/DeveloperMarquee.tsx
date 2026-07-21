"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { developerSlug } from "@/lib/slug";

const LABEL: Record<string, string> = {
  ru: "С кем мы работаем",
  uz: "Biz kim bilan ishlaymiz",
  en: "Who we work with",
};

type Dev = {
  id: number;
  name: string;
  logoUrl: string | null;
  projectsCount: number;
};

/**
 * Continuously auto-scrolling carousel of verified developer logos, placed
 * between the hero and the featured projects on the home page. Logos are
 * slightly dimmed and become fully opaque (and lift) on hover; hovering the
 * strip pauses the scroll so a logo can be clicked → developer page.
 */
export default function DeveloperMarquee() {
  const locale = useLocale();
  const [devs, setDevs] = useState<Dev[]>([]);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";
    let alive = true;
    fetch(`${API}/developers/public`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Dev[]) => {
        if (alive) setDevs(Array.isArray(data) ? data.filter((d) => d.logoUrl) : []);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (devs.length < 2) return null;

  // Duplicate the list so translateX(-50%) loops seamlessly.
  const loop = [...devs, ...devs];
  const label = LABEL[locale] ?? LABEL.ru;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto mb-7 max-w-[1250px] px-5">
        <p className="text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          {label}
        </p>
      </div>

      <div
        className="oson-marquee-group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="oson-marquee flex w-max items-center gap-5 md:gap-7">
          {loop.map((d, i) => (
            <Link
              key={`${d.id}-${i}`}
              href={`/developers/${developerSlug(d.name, d.id)}`}
              title={d.name}
              aria-label={d.name}
              className="group/logo flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-white opacity-70 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:opacity-100 hover:shadow-xl md:h-24 md:w-24"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.logoUrl as string}
                alt={d.name}
                loading="lazy"
                className="h-full w-full scale-105 object-cover transition-transform duration-300 group-hover/logo:scale-110"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
