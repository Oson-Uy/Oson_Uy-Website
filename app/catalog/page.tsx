import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { FilterDrawer } from '@/components/custom/FilterDrawer';

type CatalogPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const toNumber = (value?: string | string[]) => {
    if (!value || Array.isArray(value)) return undefined;
    const parsed = Number(value.toString().replace(/\s/g, ''));
    return Number.isNaN(parsed) ? undefined : parsed;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
    const t = await getTranslations("Catalog");
    const params = await searchParams;

    const location = typeof params.location === "string" ? params.location : undefined;
    const district = typeof params.district === "string" ? params.district : undefined;

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

    const projects = projectsData.filter((project: any) => {
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
                const priceInUz = apt.price * 13000;
                const area = apt.area || 0;
                const perM2InUz = area > 0 ? priceInUz / area : 0;

                if (priceMin) {
                    if (perM2InUz < priceMin && priceInUz < priceMin) return false;
                }
                if (priceMax) {
                    if (perM2InUz > priceMax && priceInUz > priceMax) return false;
                }

                if (areaMin && area < areaMin) return false;
                if (areaMax && area > areaMax) return false;

                return true;
            });
        }

        return true;
    }).sort((a: any, b: any) => (b.topInCatalog ? 1 : 0) - (a.topInCatalog ? 1 : 0));

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
        area_to: t("drawer.area_to")
    };

    return (
        <div className="lg:pt-5 md:pt-20 pb-16 px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <h1 className="text-4xl font-black text-primary tracking-tight">{t("title")}</h1>
                <FilterDrawer translations={translations} />
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-3xl text-slate-400">
                    Ничего не найдено с такими фильтрами
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project: any) => {
                        const minPriceUsd = project.apartments?.length
                            ? Math.min(...project.apartments.map((a: any) => a.price))
                            : 0;

                        return (
                            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none shadow-sm bg-white">
                                <div className="h-48 bg-slate-200 relative">
                                    {project.imageUrl ? (
                                        <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                                    )}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {project.isPopular && <Badge className="bg-accent text-white border-none">{t("popular")}</Badge>}
                                        {project.badgeTrusted && <Badge className="bg-emerald-600 text-white border-none">Trusted</Badge>}
                                    </div>
                                </div>
                                <CardHeader className="space-y-1">
                                    <h3 className="text-xl font-bold text-primary leading-tight">{project.name}</h3>
                                    <div className="flex items-center text-slate-500 text-sm italic">
                                        <MapPin className="w-4 h-4 mr-1 text-accent" /> {project.location}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                                        <span className="font-bold text-slate-700">{project.avgRating?.toFixed(1) || "5.0"}</span>
                                        <span className="text-slate-400 text-sm">({project.reviewsCount || 0})</span>
                                    </div>
                                    <p className="text-xs uppercase font-bold text-slate-400 mb-1">{t("from")}</p>
                                    <p className="text-2xl font-black text-primary">
                                        {(minPriceUsd * 13000).toLocaleString()} <span className="text-sm font-medium text-slate-500">UZS</span>
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full h-12 text-base font-bold rounded-xl shadow-md">
                                        <Link href={`/catalog/${project.id}`}>{t("details")}</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}