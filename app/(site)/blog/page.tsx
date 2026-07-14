import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getSiteUrl, absoluteUrl } from "@/lib/site";
import { BRAND_IMAGE_OG_PATH } from "@/lib/brand";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, clean } from "@/lib/seo/schema";
import { ARTICLES, articleLocale, categoryLabel } from "@/content/blog";

const T = {
  ru: { title: "Блог о недвижимости Узбекистана", subtitle: "Гайды по покупке квартир, рассрочке, ипотеке и инвестициям в новостройки.", read: "мин чтения", home: "Главная", blog: "Блог" },
  uz: { title: "O‘zbekiston ko‘chmas mulki blogi", subtitle: "Kvartira sotib olish, bo‘lib to‘lash, ipoteka va investitsiya bo‘yicha qo‘llanmalar.", read: "daqiqa o‘qish", home: "Bosh sahifa", blog: "Blog" },
  en: { title: "Uzbekistan real-estate blog", subtitle: "Guides on buying apartments, instalments, mortgages and investing in new builds.", read: "min read", home: "Home", blog: "Blog" },
} as const;

function tr(locale: string) {
  return T[(locale as keyof typeof T)] ?? T.ru;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = tr(locale);
  const canonical = `${getSiteUrl()}/blog`;
  const ogImage = absoluteUrl(BRAND_IMAGE_OG_PATH);
  return {
    title: `${t.title} | Oson Uy`,
    description: t.subtitle,
    alternates: { canonical },
    openGraph: { title: t.title, description: t.subtitle, url: canonical, type: "website", siteName: "Oson Uy", locale, images: [{ url: ogImage }] },
    twitter: { card: "summary_large_image", title: t.title, description: t.subtitle, images: [ogImage] },
  };
}

export default async function BlogIndex() {
  const locale = await getLocale();
  const t = tr(locale);
  const site = getSiteUrl();

  const blogJsonLd = graph(
    clean({
      "@type": "Blog",
      "@id": `${site}/blog#blog`,
      url: `${site}/blog`,
      name: t.title,
      description: t.subtitle,
      inLanguage: ["ru", "uz", "en"],
      blogPost: ARTICLES.map((a) => {
        const al = articleLocale(a, locale);
        return { "@type": "BlogPosting", headline: al.title, url: `${site}/blog/${a.slug}`, datePublished: a.datePublished };
      }),
    }),
    breadcrumbSchema([
      { name: t.home, url: "/" },
      { name: t.blog, url: "/blog" },
    ]),
  );

  return (
    <div className="pb-16">
      <JsonLd data={blogJsonLd} />
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#2B4CB8] pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="container mx-auto max-w-[1250px] px-5">
          <nav className="mb-4 flex items-center gap-2 text-xs font-bold text-blue-100/70">
            <Link href="/" className="hover:text-white">{t.home}</Link><span>/</span><span className="text-white">{t.blog}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">{t.title}</h1>
          <p className="mt-3 max-w-2xl text-base font-medium text-blue-100/85">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-[1250px] px-5">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a) => {
              const al = articleLocale(a, locale);
              return (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="inline-flex w-fit rounded-full bg-[#1E3A8A]/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#1E3A8A]">
                    {categoryLabel(a, locale)}
                  </span>
                  <h2 className="mt-4 text-xl font-black leading-snug text-slate-900 group-hover:text-[#1E3A8A]">{al.title}</h2>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate-600">{al.excerpt}</p>
                  <span className="mt-5 text-[12px] font-bold text-slate-400">{a.readingMinutes} {t.read}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
