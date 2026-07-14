/**
 * Centralised JSON-LD (schema.org) builders for Oson Uy.
 *
 * Every builder returns a plain object ready to be embedded in a
 * <script type="application/ld+json"> tag (see components/seo/JsonLd.tsx).
 * Builders drop `undefined` fields via `clean()` so partial data never emits
 * empty properties that would fail Google's Rich Results Test.
 */
import { getSiteUrl } from "@/lib/site";
import { BRAND_IMAGE_OG_PATH } from "@/lib/brand";

const SITE = getSiteUrl();
const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;

/** Recursively strip undefined / null / empty-string / empty-array fields. */
export function clean<T>(value: T): T {
  if (Array.isArray(value)) {
    const arr = value
      .map((v) => clean(v))
      .filter((v) => v !== undefined && v !== null && v !== "");
    return (arr.length ? arr : undefined) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const c = clean(v);
      if (c !== undefined && c !== null && c !== "" && !(Array.isArray(c) && c.length === 0)) {
        out[k] = c;
      }
    }
    return out as unknown as T;
  }
  return value;
}

export function abs(path?: string | null): string | undefined {
  if (!path) return undefined;
  const s = String(path).trim();
  if (!s) return undefined;
  return s.startsWith("http") ? s : new URL(s, SITE).toString();
}

/** Organisation — brand entity, referenced by @id across the graph. */
export function organizationSchema(opts?: {
  sameAs?: string[];
  phone?: string;
  email?: string;
  address?: { region?: string; locality?: string; street?: string };
}) {
  return clean({
    "@type": "RealEstateAgent",
    "@id": ORG_ID,
    name: "Oson Uy",
    alternateName: ["Oson Uy", "Oson-Uy", "ОсонУй"],
    url: `${SITE}/`,
    logo: {
      "@type": "ImageObject",
      url: abs(BRAND_IMAGE_OG_PATH),
    },
    image: abs(BRAND_IMAGE_OG_PATH),
    description:
      "Oson Uy — маркетплейс новостроек Узбекистана: проверенные застройщики, квартиры в рассрочку и ипотеку, шахматка и онлайн-подбор жилья.",
    areaServed: {
      "@type": "Country",
      name: "Uzbekistan",
    },
    address: opts?.address
      ? {
          "@type": "PostalAddress",
          addressCountry: "UZ",
          addressRegion: opts.address.region,
          addressLocality: opts.address.locality,
          streetAddress: opts.address.street,
        }
      : { "@type": "PostalAddress", addressCountry: "UZ" },
    telephone: opts?.phone,
    email: opts?.email,
    sameAs: opts?.sameAs,
  });
}

/** WebSite + sitelinks SearchAction (search box in Google results). */
export function websiteSchema() {
  return clean({
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE}/`,
    name: "Oson Uy",
    inLanguage: ["ru", "uz", "en"],
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE}/catalog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  });
}

/** BreadcrumbList from an ordered [{name, url}] trail. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return clean({
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE}${it.url}`,
    })),
  });
}

/** FAQPage from Q/A pairs — eligible for FAQ rich results. */
export function faqSchema(qa: { q: string; a: string }[]) {
  if (!qa.length) return undefined;
  return clean({
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  });
}

/** Individual review. */
export function reviewSchema(r: {
  author?: string;
  rating?: number;
  text?: string;
  date?: string;
}) {
  return clean({
    "@type": "Review",
    author: { "@type": "Person", name: r.author || "Покупатель" },
    reviewRating: r.rating
      ? { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 }
      : undefined,
    reviewBody: r.text,
    datePublished: r.date,
  });
}

/** CollectionPage for the catalog / listing pages. */
export function collectionPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  numberOfItems?: number;
}) {
  return clean({
    "@type": "CollectionPage",
    "@id": `${opts.url}#collection`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: ["ru", "uz", "en"],
    mainEntity: opts.numberOfItems
      ? { "@type": "ItemList", numberOfItems: opts.numberOfItems }
      : undefined,
  });
}

/** Wrap one or more nodes into a single schema.org @graph document. */
export function graph(...nodes: (object | undefined | null)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}

export const SITE_URL = SITE;
export const ORGANIZATION_ID = ORG_ID;
export const WEBSITE_NODE_ID = WEBSITE_ID;
