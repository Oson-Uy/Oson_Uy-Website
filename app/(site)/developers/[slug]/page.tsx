import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getSiteUrl, absoluteUrl } from "@/lib/site";
import { BRAND_IMAGE_OG_PATH } from "@/lib/brand";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, graph, clean, abs } from "@/lib/seo/schema";
import {
  fetchDeveloper,
  fetchDeveloperList,
  devHref,
} from "@/lib/developers";
import { developerSlug, idFromSlug } from "@/lib/slug";

export const revalidate = 600;
export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const devs = await fetchDeveloperList();
  return devs.map((d) => ({ slug: developerSlug(d.name, d.id) }));
}

const T = {
  ru: { home: "Главная", devs: "Застройщики", projectsBy: "Проекты застройщика", projects: "проектов", verified: "Проверенный застройщик", contacts: "Контакты", website: "Сайт", phone: "Телефон", address: "Адрес", faqTitle: "Частые вопросы", cta: "Смотреть все новостройки", units: "квартир", other: "Другие застройщики" },
  uz: { home: "Bosh sahifa", devs: "Quruvchilar", projectsBy: "Quruvchi loyihalari", projects: "loyiha", verified: "Tekshirilgan quruvchi", contacts: "Kontaktlar", website: "Sayt", phone: "Telefon", address: "Manzil", faqTitle: "Savollar", cta: "Barcha yangi uylarni ko‘rish", units: "kvartira", other: "Boshqa quruvchilar" },
  en: { home: "Home", devs: "Developers", projectsBy: "Developer projects", projects: "projects", verified: "Verified developer", contacts: "Contacts", website: "Website", phone: "Phone", address: "Address", faqTitle: "FAQ", cta: "Browse all new builds", units: "units", other: "Other developers" },
} as const;
const tr = (l: string) => T[(l as keyof typeof T)] ?? T.ru;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = idFromSlug(slug);
  if (!id) return {};
  const d = await fetchDeveloper(id);
  if (!d) return {};
  const locale = await getLocale();
  const canonical = `${getSiteUrl()}${devHref(d)}`;
  const title = `${d.name} — застройщик, новостройки и проекты | Oson Uy`;
  const description =
    d.description?.slice(0, 300) ||
    `${d.name}: ${d.projectsCount} проект(ов) новостроек в Узбекистане. Отзывы, контакты и квартиры от застройщика на Oson Uy.`;
  const ogImage = d.logoUrl || absoluteUrl(BRAND_IMAGE_OG_PATH);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "profile", siteName: "Oson Uy", locale, images: [{ url: ogImage, alt: d.name }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function DeveloperPage({ params }: PageProps) {
  const { slug } = await params;
  const id = idFromSlug(slug);
  if (!id) notFound();
  const d = await fetchDeveloper(id);
  if (!d) notFound();

  const locale = await getLocale();
  const t = tr(locale);
  const site = getSiteUrl();
  const url = `${site}${devHref(d)}`;

  const faq = [
    { q: `Сколько проектов у застройщика ${d.name}?`, a: `На Oson Uy у застройщика ${d.name} представлено ${d.projectsCount} проект(ов) новостроек. Все проекты с открытыми ценами и планировками.` },
    { q: `Как связаться с застройщиком ${d.name}?`, a: `Откройте страницу любого проекта застройщика ${d.name} на Oson Uy и свяжитесь с отделом продаж напрямую — без посредников и комиссий.` },
    { q: `Надёжен ли застройщик ${d.name}?`, a: d.verified ? `${d.name} — проверенный застройщик на Oson Uy с активной подпиской. Мы подтверждаем документы и реальный ход строительства.` : `Изучите проекты застройщика ${d.name}, отзывы покупателей и реальные фото хода строительства на страницах ЖК.` },
  ];

  const jsonLd = graph(
    clean({
      "@type": "RealEstateAgent",
      "@id": `${url}#developer`,
      name: d.name,
      url,
      image: abs(d.logoUrl) || undefined,
      logo: abs(d.logoUrl) || undefined,
      description: d.description || undefined,
      telephone: d.phone || undefined,
      address: (d.legalAddress || d.officeAddress)
        ? { "@type": "PostalAddress", addressCountry: "UZ", streetAddress: d.legalAddress || d.officeAddress }
        : { "@type": "PostalAddress", addressCountry: "UZ" },
      sameAs: d.website ? [d.website] : undefined,
      makesOffer: d.projects.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "ApartmentComplex", name: p.name, url: `${site}/catalog/${p.id}` },
      })),
    }),
    breadcrumbSchema([
      { name: t.home, url: "/" },
      { name: t.devs, url: "/developers" },
      { name: d.name, url: devHref(d) },
    ]),
    faqSchema(faq),
  );

  const others = (await fetchDeveloperList()).filter((x) => x.id !== d.id).slice(0, 6);

  return (
    <div className="pb-16">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#2B4CB8] pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="container mx-auto max-w-[1250px] px-5">
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-bold text-blue-100/70">
            <Link href="/" className="hover:text-white">{t.home}</Link><span>/</span>
            <Link href="/developers" className="hover:text-white">{t.devs}</Link><span>/</span>
            <span className="text-white">{d.name}</span>
          </nav>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[2rem] border-2 border-white/20 bg-white">
              {d.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={d.logoUrl} alt={d.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-black text-[#1E3A8A]">{d.name.slice(0, 1)}</span>
              )}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">{d.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                {d.verified && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white">
                    ✓ {t.verified}
                  </span>
                )}
                <span className="text-sm font-bold text-blue-100/85">{d.projectsCount} {t.projects}</span>
              </div>
            </div>
          </div>
          {d.description && (
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-blue-100/85">{d.description}</p>
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#1E3A8A]">{t.projectsBy}</h2>
          {d.projects.length === 0 ? (
            <p className="mt-6 rounded-[2rem] border-2 border-dashed border-slate-200 py-12 text-center font-medium text-slate-400">
              Проекты появятся здесь. <Link href="/catalog" className="font-bold text-[#1E3A8A] underline">Весь каталог</Link>.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {d.projects.map((p) => (
                <Link key={p.id} href={`/catalog/${p.id}`} className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imageUrl} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{p.location}{p.district ? ` · ${p.district}` : ""}</p>
                    <h3 className="mt-1 text-lg font-black text-slate-900 group-hover:text-[#1E3A8A]">{p.name}</h3>
                    {p.totalUnits ? <p className="mt-2 text-sm font-bold text-[#F97316]">{p.totalUnits} {t.units}</p> : null}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contacts */}
      {(d.phone || d.website || d.legalAddress || d.officeAddress) && (
        <section className="bg-slate-50 py-14">
          <div className="container mx-auto max-w-[1250px] px-5">
            <h2 className="text-xl font-black text-[#1E3A8A]">{t.contacts}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {d.phone && <div className="rounded-2xl border border-slate-100 bg-white p-5"><p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{t.phone}</p><p className="mt-1 font-bold text-slate-900">{d.phone}</p></div>}
              {d.website && <div className="rounded-2xl border border-slate-100 bg-white p-5"><p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{t.website}</p><a href={d.website} target="_blank" rel="noopener noreferrer" className="mt-1 block truncate font-bold text-[#1E3A8A] hover:underline">{d.website}</a></div>}
              {(d.legalAddress || d.officeAddress) && <div className="rounded-2xl border border-slate-100 bg-white p-5"><p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{t.address}</p><p className="mt-1 font-bold text-slate-900">{d.legalAddress || d.officeAddress}</p></div>}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-14">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#1E3A8A]">{t.faqTitle}</h2>
          <div className="mt-6 max-w-3xl space-y-3">
            {faq.map((item, i) => (
              <details key={i} className="group rounded-2xl border border-slate-100 bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-black text-slate-900">{item.q}<span className="text-[#1E3A8A] transition group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other developers */}
      {others.length > 0 && (
        <section className="border-t border-slate-100 py-12">
          <div className="container mx-auto max-w-[1250px] px-5">
            <h2 className="text-lg font-black text-[#1E3A8A]">{t.other}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {others.map((x) => (
                <Link key={x.id} href={devHref(x)} className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]">{x.name}</Link>
              ))}
              <Link href="/catalog" className="rounded-full bg-[#1E3A8A] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-900">{t.cta}</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
