import { getSiteUrl } from "@/lib/site";
import { minPricePerM2FromApiProject } from "@/lib/project-price";
import {
  abs,
  breadcrumbSchema,
  clean,
  graph,
  reviewSchema,
  ORGANIZATION_ID,
} from "@/lib/seo/schema";

/**
 * Rich JSON-LD @graph for a single residential complex (ЖК) page:
 *   ApartmentComplex + BreadcrumbList (+ offers, amenities, provider,
 *   aggregateRating & reviews when the data exists).
 *
 * Consumed by app/(site)/catalog/[id]/page.tsx and rendered via <JsonLd/>.
 */
export async function fetchProjectJsonLd(id: string): Promise<object | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/catalog/${id}`;

  try {
    const res = await fetch(`${apiUrl}/projects/${id}/full`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const p = await res.json();
    if (!p?.name) return null;

    // ── images ──────────────────────────────────────────────────────────────
    const images = [
      p.imageUrl,
      ...(Array.isArray(p.media)
        ? p.media.map((m: { imageUrl?: string }) => m?.imageUrl)
        : []),
    ]
      .map((x) => abs(x))
      .filter((x, i, a): x is string => Boolean(x) && a.indexOf(x) === i)
      .slice(0, 12);

    // ── price (per m², "from") ───────────────────────────────────────────────
    const minPerM2 = minPricePerM2FromApiProject(p);
    const offers =
      minPerM2 && minPerM2 > 0
        ? {
            "@type": "AggregateOffer",
            priceCurrency: "UZS",
            lowPrice: Math.round(minPerM2),
            offerCount:
              typeof p.totalUnits === "number" ? p.totalUnits : undefined,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: Math.round(minPerM2),
              priceCurrency: "UZS",
              unitCode: "MTK", // square metre
              unitText: "м²",
            },
            availability: "https://schema.org/InStock",
            url,
          }
        : undefined;

    // ── amenities ────────────────────────────────────────────────────────────
    const amenity = (name: string, value = true) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value,
    });
    const amenities = [
      p.hasInstallment && amenity("Рассрочка"),
      (p.hasSurfaceParking || (p.surfaceParkingSpaces ?? 0) > 0) &&
        amenity("Наземная парковка"),
      (p.hasUndergroundParking || (p.undergroundParkingSpaces ?? 0) > 0) &&
        amenity("Подземная парковка"),
      (p.elevatorsCount ?? 0) > 0 && amenity("Лифт"),
      ...(Array.isArray(p.materials)
        ? p.materials.map((m: string) => amenity(String(m)))
        : []),
    ].filter(Boolean);

    // ── developer / provider ─────────────────────────────────────────────────
    const dev = p.developer;
    const provider = dev?.name
      ? clean({
          "@type": "RealEstateAgent",
          name: dev.name,
          telephone: dev.phone,
          email: dev.email,
          url: dev.website,
          logo: abs(dev.logoUrl),
        })
      : { "@id": ORGANIZATION_ID };

    // ── ratings & reviews ────────────────────────────────────────────────────
    const ratingCount = Number(p.reviewsCount ?? 0);
    const ratingValue = Number(p.avgRating ?? 0);
    const aggregateRating =
      ratingCount > 0 && ratingValue > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: Number(ratingValue.toFixed(2)),
            reviewCount: ratingCount,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined;
    const reviews = Array.isArray(p.reviews)
      ? p.reviews.slice(0, 8).map(
          (r: {
            authorName?: string;
            author?: string;
            rating?: number;
            comment?: string;
            text?: string;
            createdAt?: string;
          }) =>
            reviewSchema({
              author: r.authorName || r.author,
              rating: r.rating,
              text: r.comment || r.text,
              date: r.createdAt,
            }),
        )
      : undefined;

    // ── the complex ──────────────────────────────────────────────────────────
    const complex = clean({
      "@type": "ApartmentComplex",
      "@id": `${url}#complex`,
      name: p.name,
      description: p.description || undefined,
      url,
      image: images.length ? images : undefined,
      numberOfAccommodationUnits:
        typeof p.totalUnits === "number" ? p.totalUnits : undefined,
      address: clean({
        "@type": "PostalAddress",
        addressCountry: "UZ",
        addressRegion: p.location || undefined,
        addressLocality: p.district || undefined,
      }),
      amenityFeature: amenities.length ? amenities : undefined,
      makesOffer: offers,
      provider,
      aggregateRating,
      review: reviews,
    });

    const breadcrumb = breadcrumbSchema([
      { name: "Главная", url: "/" },
      { name: "Каталог новостроек", url: "/catalog" },
      { name: p.name, url: `/catalog/${id}` },
    ]);

    return graph(complex, breadcrumb);
  } catch {
    return null;
  }
}
