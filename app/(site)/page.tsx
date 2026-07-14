import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import HomeClient from "@/components/home/HomeClient";
import HomeSeoContent from "@/components/home/HomeSeoContent";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  organizationSchema,
  websiteSchema,
  faqSchema,
  graph,
} from "@/lib/seo/schema";
import { BRAND_IMAGE_OG_PATH } from "@/lib/brand";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Seo");
  const siteUrl = getSiteUrl();
  const title = t("homeTitle");
  const description = t("homeDescription");
  const keywords = t("defaultKeywords")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const ogImage = absoluteUrl(BRAND_IMAGE_OG_PATH);
  const locale = await getLocale();

  return {
    title,
    description,
    keywords,
    alternates: { canonical: siteUrl + "/" },
    openGraph: {
      title,
      description,
      url: siteUrl + "/",
      siteName: t("siteName"),
      locale,
      type: "website",
      images: [{ url: ogImage, alt: t("ogImageAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: t("twitterSite") || undefined,
    },
  };
}

export default async function HomePage() {
  // FAQPage schema built from the same content shown in the visible FAQ section.
  const tf = await getTranslations("Faq");
  const faqItems = ["q1", "q2", "q3", "q4", "q5"].map((k) => ({
    q: tf(`items.${k}.question`),
    a: tf(`items.${k}.answer`),
  }));

  const jsonLd = graph(
    organizationSchema(),
    websiteSchema(),
    faqSchema(faqItems),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeClient />
      <HomeSeoContent />
    </>
  );
}
