import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getSiteUrl, absoluteUrl } from "@/lib/site";
import { BRAND_IMAGE_OG_PATH } from "@/lib/brand";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  clean,
  ORGANIZATION_ID,
} from "@/lib/seo/schema";
import {
  ARTICLES,
  ARTICLE_SLUGS,
  getArticle,
  articleLocale,
  categoryLabel,
} from "@/content/blog";

export const revalidate = 3600;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

const UI = {
  ru: { home: "Главная", blog: "Блог", read: "мин чтения", faq: "Частые вопросы", more: "Читайте также", cta: "Смотреть новостройки" },
  uz: { home: "Bosh sahifa", blog: "Blog", read: "daqiqa o‘qish", faq: "Savollar", more: "Shuningdek o‘qing", cta: "Yangi uylarni ko‘rish" },
  en: { home: "Home", blog: "Blog", read: "min read", faq: "FAQ", more: "Read also", cta: "Browse new builds" },
} as const;
const ui = (l: string) => UI[(l as keyof typeof UI)] ?? UI.ru;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const locale = await getLocale();
  const al = articleLocale(a, locale);
  const canonical = `${getSiteUrl()}/blog/${a.slug}`;
  const ogImage = absoluteUrl(BRAND_IMAGE_OG_PATH);
  return {
    title: `${al.title} | Oson Uy`,
    description: al.excerpt,
    alternates: { canonical },
    openGraph: {
      title: al.title,
      description: al.excerpt,
      url: canonical,
      type: "article",
      siteName: "Oson Uy",
      locale,
      publishedTime: a.datePublished,
      images: [{ url: ogImage, alt: al.title }],
    },
    twitter: { card: "summary_large_image", title: al.title, description: al.excerpt, images: [ogImage] },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const locale = await getLocale();
  const al = articleLocale(a, locale);
  const t = ui(locale);
  const site = getSiteUrl();
  const url = `${site}/blog/${a.slug}`;

  const jsonLd = graph(
    clean({
      "@type": "Article",
      "@id": `${url}#article`,
      headline: al.title,
      description: al.excerpt,
      inLanguage: locale,
      datePublished: a.datePublished,
      dateModified: a.datePublished,
      author: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      image: absoluteUrl(BRAND_IMAGE_OG_PATH),
      mainEntityOfPage: url,
      articleSection: categoryLabel(a, locale),
    }),
    breadcrumbSchema([
      { name: t.home, url: "/" },
      { name: t.blog, url: "/blog" },
      { name: al.title, url: `/blog/${a.slug}` },
    ]),
    al.faq && al.faq.length ? faqSchema(al.faq) : undefined,
  );

  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <div className="pb-16">
      <JsonLd data={jsonLd} />

      <article className="mx-auto max-w-3xl px-5 pt-28 md:pt-32">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
          <Link href="/" className="hover:text-[#1E3A8A]">{t.home}</Link><span>/</span>
          <Link href="/blog" className="hover:text-[#1E3A8A]">{t.blog}</Link><span>/</span>
          <span className="text-slate-600">{categoryLabel(a, locale)}</span>
        </nav>

        <span className="inline-flex rounded-full bg-[#1E3A8A]/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#1E3A8A]">
          {categoryLabel(a, locale)}
        </span>
        <h1 className="mt-4 text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900">
          {al.title}
        </h1>
        <p className="mt-3 text-[12px] font-bold text-slate-400">
          {new Date(a.datePublished).toLocaleDateString("ru-RU")} · {a.readingMinutes} {t.read}
        </p>
        <p className="mt-5 text-lg font-semibold leading-relaxed text-slate-700">{al.excerpt}</p>

        <div className="mt-8 space-y-8">
          {al.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-[#1E3A8A]">{s.h}</h2>
              <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-slate-700">
                {s.p.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {al.faq && al.faq.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-[#1E3A8A]">{t.faq}</h2>
            <div className="mt-5 space-y-3">
              {al.faq.map((item, i) => (
                <details key={i} className="group rounded-2xl border border-slate-100 bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-black text-slate-900">
                    {item.q}<span className="text-[#1E3A8A] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 rounded-3xl bg-[#1E3A8A] p-8 text-center">
          <p className="text-lg font-black text-white">Oson Uy</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-blue-100/85">
            Проверенные новостройки Узбекистана с открытыми ценами, рассрочкой и шахматкой квартир.
          </p>
          <Link href="/catalog" className="mt-5 inline-flex items-center rounded-2xl bg-[#F97316] px-7 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600">
            {t.cta}
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-3xl px-5 pt-14">
          <h2 className="text-lg font-black text-[#1E3A8A]">{t.more}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((x) => {
              const xl = articleLocale(x, locale);
              return (
                <Link key={x.slug} href={`/blog/${x.slug}`} className="rounded-2xl border border-slate-100 bg-white p-5 transition hover:border-[#1E3A8A] hover:shadow-md">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F97316]">{categoryLabel(x, locale)}</span>
                  <p className="mt-1 font-black leading-snug text-slate-900">{xl.title}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
