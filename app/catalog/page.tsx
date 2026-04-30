import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { formatUzs, formatUzsPerM2 } from "@/lib/currency";
import { FilterDrawer } from "@/components/custom/FilterDrawer";
import { ProjectCard } from "@/components/custom/ProjectCard";
import { Project } from "@/types";

type CatalogPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const toNumber = (value?: string | string[]) => {
  if (!value || Array.isArray(value)) return undefined;
  const parsed = Number(value.toString().replace(/\s/g, ""));
  return Number.isNaN(parsed) ? undefined : parsed;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const t = await getTranslations("Catalog");
  const params = await searchParams;

  const location =
    typeof params.location === "string" ? params.location : undefined;
  const district =
    typeof params.district === "string" ? params.district : undefined;

  const priceMin = toNumber(params.priceMin) || toNumber(params.pricePerM2Min);
  const priceMax = toNumber(params.priceMax) || toNumber(params.pricePerM2Max);
  const areaMin = toNumber(params.areaMin);
  const areaMax = toNumber(params.areaMax);

  const isVerifiedFilter = params.verified === "true";
  const isPopularFilter = params.popular === "true";

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

  let projectsData = [];
  try {
    const res = await fetch(`${apiUrl}/projects`, { cache: "no-store" });
    if (res.ok) {
      projectsData = await res.json();
    }
  } catch (e) {
    console.error("Fetch error:", e);
  }

  const projects = projectsData
    .filter((project: any) => {
      if (isVerifiedFilter && !project.badgeVerified) return false;
      if (isPopularFilter && !project.isPopular) return false;

      if (location) {
        const pLoc = project.location?.toLowerCase() || "";
        const sLoc = location.toLowerCase().replace(" region", "").trim();
        if (!pLoc.includes(sLoc)) return false;
      }

      if (district) {
        const pDist = project.district?.toLowerCase() || "";
        const sDist = district.toLowerCase().trim();
        if (!pDist.includes(sDist)) return false;
      }

      if (priceMin || priceMax || areaMin || areaMax) {
        if (!project.apartments?.length) return false;

        return project.apartments.some((apt: any) => {
          const area = apt.area || 0;
          const perM2InUz = area > 0 ? apt.price / area : 0;

          if (priceMin) {
            if (perM2InUz < priceMin) return false;
          }
          if (priceMax) {
            if (perM2InUz > priceMax) return false;
          }

          if (areaMin && area < areaMin) return false;
          if (areaMax && area > areaMax) return false;

          return true;
        });
      }

      return true;
    })
    .sort(
      (a: any, b: any) => (b.topInCatalog ? 1 : 0) - (a.topInCatalog ? 1 : 0),
    );

  const translations = {
    filters: t("filters"),
    title: t("drawer.title"),
    description: t("drawer.description"),
    apply: t("drawer.apply"),
    reset: t("drawer.reset"),
    from: t("drawer.from"),
    to: t("drawer.to"),
    verified: t("drawer.verified"),
    popular: t("popular"),
    area_from: t("drawer.area_from"),
    area_to: t("drawer.area_to"),
  };

  return (
    <div className="lg:pt-5 md:pt-20 pb-16 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <h1 className="text-4xl font-black text-primary tracking-tight">
          {t("title")}
        </h1>
        <FilterDrawer translations={translations} />
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl text-slate-400">
          Ничего не найдено с такими фильтрами
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any) => {
            const minPrice = project.apartments?.length
              ? Math.min(...project.apartments.map((a: any) => a.price))
              : 0;

            const mappedProject: Project = {
              id: String(project.id),
              name: project.name,
              description: project.description || "",
              image: project.imageUrl || "https://picsum.photos/seed/project/1200/800",
              mainImage: project.imageUrl || "https://picsum.photos/seed/project/1200/800",
              location: project.location,
              district: project.district || "",
              developer: {
                name: project.developer?.name ?? "Developer",
                verified: project.badgeVerified ?? false,
                logo: "https://picsum.photos/seed/dev/100/100",
              },
              deliveryDate: project.deliveryDate,
              tags: [],
              images: project.media?.length
                  ? project.media.map((item: any) => item.imageUrl)
                  : [project.imageUrl || "https://picsum.photos/seed/project/1200/800"],
              priceFrom: minPrice,
              apartments: project.apartments.map((apt: any) => ({
                  id: String(apt.id),
                  projectId: String(project.id),
                  rooms: apt.rooms,
                  area: apt.area,
                  floor: apt.floor,
                  price: apt.price,
                  status: "available" as const,
                  layoutImage: apt.imageUrl || "https://picsum.photos/seed/layout/600/400",
              })),
              isPopular: Boolean(project.topInCatalog || project.topInHome || project.isPopular),
              badgeVerified: project.badgeVerified ?? false,
              badgeTrusted: project.badgeTrusted ?? false,
              avgRating: project.avgRating ?? null,
              reviewsCount: project.reviewsCount ?? 0,
              plan: project.plan,
              floors: project.totalFloors || 0,
            };

            return <ProjectCard key={project.id} project={mappedProject} />;
          })}
        </div>
      )}
    </div>
  );
}
