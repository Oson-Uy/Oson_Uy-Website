import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getHomeContent } from "@/content/home";

/**
 * Server-rendered long-form SEO content for the home page.
 * Placed below the interactive hero so crawlers index the full copy while the
 * above-the-fold experience stays fast. On-brand with the marketing site
 * (navy #1E3A8A primary, orange accent, 1250px container).
 */
export default async function HomeSeoContent() {
  const locale = await getLocale();
  const c = getHomeContent(locale);

  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="border-t border-slate-100 py-16 md:py-24">
        <div className="container mx-auto max-w-[1250px] px-5">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1E3A8A]">
              {c.intro.title}
            </h2>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-slate-700">
              {c.intro.lead}
            </p>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-600">
              {c.intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1E3A8A]">
            {c.advantages.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base font-medium text-slate-600">
            {c.advantages.subtitle}
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.advantages.items.map((it, i) => (
              <article
                key={i}
                className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E3A8A]/10 text-lg font-black text-[#1E3A8A]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-black text-slate-900">{it.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{it.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why / protection */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1E3A8A]">
            {c.why.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base font-medium text-slate-600">{c.why.subtitle}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {c.why.items.map((it, i) => (
              <div key={i} className="flex gap-4 rounded-[2rem] border border-slate-100 bg-white p-6">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                </span>
                <div>
                  <h3 className="text-base font-black text-slate-900">{it.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">{it.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance: instalment / mortgage / investment */}
      <section className="bg-[#1E3A8A] py-16 md:py-24">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            {c.finance.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base font-medium text-blue-100/80">
            {c.finance.subtitle}
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {c.finance.cards.map((card, i) => (
              <div key={i} className="flex flex-col rounded-[2rem] bg-white p-7 shadow-xl">
                <h3 className="text-xl font-black text-[#1E3A8A]">{card.title}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate-600">{card.text}</p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex items-center gap-2 self-start rounded-xl bg-[#F97316] px-5 py-2.5 text-sm font-black text-white transition hover:bg-orange-600"
                >
                  {card.cta}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1E3A8A]">
            {c.cities.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base font-medium text-slate-600">{c.cities.subtitle}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.cities.items.map((city, i) => (
              <Link
                key={i}
                href={city.href}
                className="group flex flex-col rounded-[2rem] border border-slate-100 bg-white p-6 transition hover:-translate-y-1 hover:border-[#1E3A8A] hover:shadow-xl"
              >
                <h3 className="flex items-center gap-2 text-lg font-black text-slate-900 group-hover:text-[#1E3A8A]">
                  {city.name}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#F97316]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{city.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 py-14">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="sr-only">{c.stats.title}</h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {c.stats.items.map((s, i) => (
              <div key={i} className="rounded-[2rem] border border-slate-100 bg-white p-6 text-center">
                <p className="text-3xl md:text-4xl font-black text-[#F97316]">{s.value}</p>
                <p className="mt-2 text-[13px] font-semibold leading-snug text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1250px] px-5">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1E3A8A] to-[#2B4CB8] px-6 py-12 text-center md:px-16 md:py-16">
            <h2 className="mx-auto max-w-2xl text-3xl md:text-4xl font-black tracking-tight text-white">
              {c.closing.title}
            </h2>
            <div className="mx-auto mt-4 max-w-2xl space-y-3 text-[15px] leading-relaxed text-blue-100/85">
              {c.closing.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={c.closing.primary.href}
                className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#F97316] px-8 text-sm font-black uppercase tracking-widest text-white shadow-xl transition hover:bg-orange-600"
              >
                {c.closing.primary.label}
              </Link>
              <Link
                href={c.closing.secondary.href}
                className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/25 px-8 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white/10"
              >
                {c.closing.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
