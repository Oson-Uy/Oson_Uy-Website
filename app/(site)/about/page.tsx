import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { BRAND_IMAGE_OG_PATH } from "@/lib/brand";
import { absoluteUrl, getSiteUrl } from "@/lib/site";
import AboutClient from "@/components/custom/AboutClient";


export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("Seo");
    const siteUrl = getSiteUrl();
    const title = t("aboutTitle");
    const description = t("aboutDescription");
    const keywords = t("defaultKeywords")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const ogImage = absoluteUrl(BRAND_IMAGE_OG_PATH);
    const locale = await getLocale();
    const canonical = `${siteUrl}/about`;

    return {
        title,
        description,
        keywords,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
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

export default async function About() {
    const t = await getTranslations("About");

    return (
        <AboutClient
            t={{
                trustScore: t("trustScore"),
                title1: t("title1"),
                titleAccent: t("titleAccent"),
                description: t("description"),
                learnMore: t("learnMore"),
                trustedBy: t("trustedBy"),
                quote: t("quote"),
                founderEyebrow: t("founder.eyebrow"),
                founderTitle: t("founder.title"),
                founder1: {
                    name: t("founder.person1.name"),
                    role: t("founder.person1.role"),
                    location: t("founder.person1.location"),
                    bio1: t("founder.person1.bio1"),
                    bio2: t("founder.person1.bio2"),
                    bio3: t("founder.person1.bio3"),
                },
                founder2: {
                    name: t("founder.person2.name"),
                    role: t("founder.person2.role"),
                    location: t("founder.person2.location"),
                    bio1: t("founder.person2.bio1"),
                    bio2: t("founder.person2.bio2"),
                    bio3: t("founder.person2.bio3"),
                },
                startJourney: t("startJourney"),
            }}
        />
    );
}