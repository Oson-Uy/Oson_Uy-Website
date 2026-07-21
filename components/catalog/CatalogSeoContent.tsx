import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getCatalogContent } from "@/content/catalog";
import { RevealSection } from "@/components/motion/Reveal";

/**
 * Server-rendered SEO copy for the catalogue page: intro, a buyer's guide,
 * city links and an FAQ (the same FAQ powers the FAQPage JSON-LD upstream).
 */
export default async function CatalogSeoContent() {
  const locale = await getLocale();
  const c = getCatalogContent(locale);

  return (
    <div className="mt-20 border-t border-slate-100 pt-16">
      {/* Intro */}
      <RevealSection className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#1E3A8A]">
          {c.intro.title}
        </h2>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-600">
          {c.intro.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </RevealSection>

      {/* Buyer's guide */}
      <RevealSection className="mt-14">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#1E3A8A]">
          {c.guide.title}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.guide.steps.map((s, i) => (
            <div key={i} className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-black text-slate-900">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* City links */}
      <RevealSection className="mt-14">
        <h2 className="text-xl font-black tracking-tight text-[#1E3A8A]">{c.cities.title}</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {c.cities.items.map((city, i) => (
            <Link
              key={i}
              href={city.href}
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </RevealSection>

      {/* FAQ */}
      <RevealSection className="mt-14">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#1E3A8A]">
          {c.faqTitle}
        </h2>
        <div className="mt-8 space-y-3">
          {c.faq.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-slate-100 bg-white p-5 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-black text-slate-900">
                {item.q}
                <span className="text-[#1E3A8A] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </RevealSection>
    </div>
  );
}
