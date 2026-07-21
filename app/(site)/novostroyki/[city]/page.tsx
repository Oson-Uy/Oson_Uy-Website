import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getSiteUrl } from "@/lib/site";
import { minPricePerM2FromApiProject } from "@/lib/project-price";
import { BRAND_IMAGE_OG_PATH } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  collectionPageSchema,
  faqSchema,
  graph,
} from "@/lib/seo/schema";
import {
  CITIES,
  CITY_SLUGS,
  getCity,
  getCityContent,
} from "@/content/cities";
import { RevealSection, Reveal, RevealItem } from "@/components/motion/Reveal";

export const revalidate = 600;

type PageProps = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

type ApiProject = {
  id: number;
  name: string;
  location?: string;
  district?: string;
  imageUrl?: string;
  media?: { imageUrl?: string }[];
  [k: string]: unknown;
};

async function fetchCityProjects(match: string): Promise<ApiProject[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";
  try {
    const res = await fetch(`${apiUrl}/projects`, { next: { revalidate: 600 } });
    if (!res.ok) return [];
    const all = (await res.json()) as ApiProject[];
    const m = match.toLowerCase();
    return all.filter((p) => (p.location ?? "").toLowerCase().includes(m));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const c = getCity(slug);
  if (!c) return {};
  const locale = await getLocale();
  const t = getCityContent(c, locale);
  const canonical = `${getSiteUrl()}/novostroyki/${c.slug}`;
  const ogImage = absoluteUrl(BRAND_IMAGE_OG_PATH);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: canonical,
      type: "website",
      siteName: "Oson Uy",
      locale,
      images: [{ url: ogImage, alt: t.h1 }],
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDescription, images: [ogImage] },
  };
}

function fmtFrom(p: ApiProject): string | null {
  const v = minPricePerM2FromApiProject(p as never);
  if (!v || v <= 0) return null;
  return `${Math.round(v).toLocaleString("ru-RU")} сум/м²`;
}

export default async function CityPage({ params }: PageProps) {
  const { city: slug } = await params;
  const c = getCity(slug);
  if (!c) notFound();

  const locale = await getLocale();
  const t = getCityContent(c, locale);
  const site = getSiteUrl();
  const url = `${site}/novostroyki/${c.slug}`;
  const projects = await fetchCityProjects(c.match);

  const jsonLd = graph(
    collectionPageSchema({ url, name: t.h1, description: t.metaDescription, numberOfItems: projects.length }),
    breadcrumbSchema([
      { name: "Главная", url: "/" },
      { name: "Каталог новостроек", url: "/catalog" },
      { name: t.h1, url: `/novostroyki/${c.slug}` },
    ]),
    faqSchema(t.faq),
  );

  const others = CITIES.filter((x) => x.slug !== c.slug);

  return (
    <div className="pb-16">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <RevealSection className="bg-gradient-to-br from-[#1E3A8A] to-[#2B4CB8] pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-[1250px] px-5">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold text-blue-100/70">
            <Link href="/" className="hover:text-white">Главная</Link><span>/</span>
            <Link href="/catalog" className="hover:text-white">Каталог</Link><span>/</span>
            <span className="text-white">{t.name}</span>
          </nav>
          <h1 className="max-w-3xl text-4xl md:text-5xl font-black tracking-tight text-white">{t.h1}</h1>
          <div className="mt-4 max-w-3xl space-y-3 text-[15px] leading-relaxed text-blue-100/85">
            {t.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <Link href={`/catalog?location=${encodeURIComponent(c.match)}`} className="mt-7 inline-flex items-center rounded-2xl bg-[#F97316] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600">
            Все новостройки {t.name}
          </Link>
        </div>
      </RevealSection>

      {/* Projects */}
      <RevealSection className="py-14 md:py-20">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#1E3A8A]">
            Жилые комплексы — {t.name}
          </h2>
          {projects.length === 0 ? (
            <p className="mt-6 rounded-[2rem] border-2 border-dashed border-slate-200 py-12 text-center font-medium text-slate-400">
              Скоро здесь появятся новостройки этого города. Посмотрите{" "}
              <Link href="/catalog" className="font-bold text-[#1E3A8A] underline">весь каталог</Link>.
            </p>
          ) : (
            <Reveal stagger={0.08} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 12).map((p) => {
                const img = p.imageUrl || p.media?.[0]?.imageUrl || "";
                const price = fmtFrom(p);
                return (
                  <RevealItem key={p.id} className="h-full">
                    <Link href={`/catalog/${p.id}`} className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                      <div className="relative h-52 overflow-hidden bg-slate-100">
                        {img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : null}
                      </div>
                      <div className="p-5">
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{p.location}{p.district ? ` · ${p.district}` : ""}</p>
                        <h3 className="mt-1 text-lg font-black text-slate-900 group-hover:text-[#1E3A8A]">{p.name}</h3>
                        {price && <p className="mt-2 text-sm font-bold text-[#F97316]">от {price}</p>}
                      </div>
                    </Link>
                  </RevealItem>
                );
              })}
            </Reveal>
          )}
        </div>
      </RevealSection>

      {/* Why */}
      <RevealSection className="bg-slate-50 py-14 md:py-20">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#1E3A8A]">
            Почему стоит купить новостройку в городе {t.name}
          </h2>
          <Reveal stagger={0.1} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.why.map((w, i) => (
              <RevealItem key={i} className="h-full">
                <div className="h-full rounded-[2rem] border border-slate-100 bg-white p-6">
                  <h3 className="text-base font-black text-slate-900">{w.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{w.text}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </RevealSection>

      {/* FAQ */}
      <RevealSection className="py-14 md:py-20">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#1E3A8A]">Частые вопросы</h2>
          <div className="mt-8 max-w-3xl space-y-3">
            {t.faq.map((item, i) => (
              <details key={i} className="group rounded-2xl border border-slate-100 bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-black text-slate-900">
                  {item.q}<span className="text-[#1E3A8A] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Other cities */}
      <RevealSection className="border-t border-slate-100 py-12">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-lg font-black text-[#1E3A8A]">Новостройки в других городах</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {others.map((x) => {
              const xt = getCityContent(x, locale);
              return (
                <Link key={x.slug} href={`/novostroyki/${x.slug}`} className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]">
                  {xt.h1}
                </Link>
              );
            })}
            <Link href="/catalog" className="rounded-full bg-[#1E3A8A] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-900">
              Весь каталог
            </Link>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
