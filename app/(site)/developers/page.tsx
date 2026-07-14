import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getSiteUrl, absoluteUrl } from "@/lib/site";
import { BRAND_IMAGE_OG_PATH } from "@/lib/brand";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, collectionPageSchema, graph } from "@/lib/seo/schema";
import { fetchDeveloperList, devHref } from "@/lib/developers";

export const revalidate = 600;

const T = {
  ru: { title: "Застройщики Узбекистана", subtitle: "Проверенные застройщики новостроек: проекты, репутация и контакты в одном месте.", home: "Главная", devs: "Застройщики", projects: "проектов" },
  uz: { title: "O‘zbekiston quruvchilari", subtitle: "Tekshirilgan yangi uy quruvchilari: loyihalar, obro‘ va kontaktlar.", home: "Bosh sahifa", devs: "Quruvchilar", projects: "loyiha" },
  en: { title: "Developers in Uzbekistan", subtitle: "Verified new-build developers: projects, reputation and contacts in one place.", home: "Home", devs: "Developers", projects: "projects" },
} as const;
const tr = (l: string) => T[(l as keyof typeof T)] ?? T.ru;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = tr(locale);
  const canonical = `${getSiteUrl()}/developers`;
  const ogImage = absoluteUrl(BRAND_IMAGE_OG_PATH);
  return {
    title: `${t.title} — Oson Uy`,
    description: t.subtitle,
    alternates: { canonical },
    openGraph: { title: t.title, description: t.subtitle, url: canonical, type: "website", siteName: "Oson Uy", locale, images: [{ url: ogImage }] },
    twitter: { card: "summary_large_image", title: t.title, description: t.subtitle, images: [ogImage] },
  };
}

export default async function DevelopersIndex() {
  const locale = await getLocale();
  const t = tr(locale);
  const devs = await fetchDeveloperList();
  const url = `${getSiteUrl()}/developers`;

  const jsonLd = graph(
    collectionPageSchema({ url, name: t.title, description: t.subtitle, numberOfItems: devs.length }),
    breadcrumbSchema([
      { name: t.home, url: "/" },
      { name: t.devs, url: "/developers" },
    ]),
  );

  return (
    <div className="pb-16">
      <JsonLd data={jsonLd} />
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#2B4CB8] pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="container mx-auto max-w-[1250px] px-5">
          <nav className="mb-4 flex items-center gap-2 text-xs font-bold text-blue-100/70">
            <Link href="/" className="hover:text-white">{t.home}</Link><span>/</span><span className="text-white">{t.devs}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">{t.title}</h1>
          <p className="mt-3 max-w-2xl text-base font-medium text-blue-100/85">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-[1250px] px-5">
          {devs.length === 0 ? (
            <p className="rounded-3xl border-2 border-dashed border-slate-200 py-12 text-center font-medium text-slate-400">
              Список застройщиков скоро появится.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {devs.map((d) => (
                <Link key={d.id} href={devHref(d)} className="group flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    {d.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={d.logoUrl} alt={d.name} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-lg font-black text-[#1E3A8A]">{d.name.slice(0, 1)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-black text-slate-900 group-hover:text-[#1E3A8A]">{d.name}</h2>
                    <p className="text-[13px] font-semibold text-slate-400">{d.projectsCount} {t.projects}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
