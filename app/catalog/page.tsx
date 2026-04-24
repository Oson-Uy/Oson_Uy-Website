import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

type CatalogPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const REGION_CITY_MAP: Record<string, string[]> = {
    "Tashkent Region": ["Tashkent", "Chirchiq", "Angren", "Yangiyul"],
    "Samarkand Region": ["Samarkand", "Urgut", "Kattakurgan"],
    "Bukhara Region": ["Bukhara", "Gijduvan", "Kagan"],
    "Andijan Region": ["Andijan", "Asaka", "Khanabad"],
    "Fergana Region": ["Fergana", "Kokand", "Margilan"],
    "Namangan Region": ["Namangan", "Chust", "Chartak"],
    "Jizzakh Region": ["Jizzakh", "Gallaorol", "Zomin"],
    "Sirdarya Region": ["Gulistan", "Yangiyer", "Shirin"],
    "Kashkadarya Region": ["Karshi", "Shakhrisabz", "Kitab"],
    "Surkhandarya Region": ["Termez", "Denau", "Sherabad"],
    "Navoi Region": ["Navoi", "Zarafshan", "Karmana"],
    "Khorezm Region": ["Urgench", "Khiva", "Pitnak"],
    "Republic of Karakalpakstan": ["Nukus", "Khodjeyli", "Turtkul"],
};

const toNumber = (value?: string | string[]) => {
    if (!value || Array.isArray(value)) return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
    const t = await getTranslations("Catalog");
    const params = await searchParams;
    const location = typeof params.location === "string" ? params.location : undefined;
    const district = typeof params.district === "string" ? params.district : undefined;
    const monthlyPayment = toNumber(params.monthlyPayment);
    const budget = toNumber(params.budget);
    const area = toNumber(params.area);
    const monthlyPaymentUsd = typeof monthlyPayment === "number" ? monthlyPayment / 13000 : undefined;
    const budgetUsd = typeof budget === "number" ? budget / 13000 : undefined;
    const affordabilityMaxPrice =
        typeof monthlyPaymentUsd === "number" ? monthlyPaymentUsd * 240 : undefined;
    const effectiveMaxPrice =
        typeof budgetUsd === "number" && typeof affordabilityMaxPrice === "number"
            ? Math.min(budgetUsd, affordabilityMaxPrice)
            : budgetUsd ?? affordabilityMaxPrice;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";
    const projectsResponse = await fetch(`${apiUrl}/projects`, { cache: "no-store" });
    const projectsData = projectsResponse.ok
        ? (await projectsResponse.json()) as Array<{
            id: number;
            name: string;
            location: string;
            imageUrl?: string;
            apartments: Array<{ id: number; price: number; area: number; rooms: number }>;
            isPopular?: boolean;
            district?: string;
        }>
        : [];

    const projects = projectsData.filter((project) => {
        if (location) {
            const allowedCities = REGION_CITY_MAP[location] ?? [];
            if (!allowedCities.includes(project.location)) {
                return false;
            }
        }

        if (district) {
            const districtMatches =
                project.location === district ||
                (project.district ?? "").toLowerCase().includes(district.toLowerCase());
            if (!districtMatches) {
                return false;
            }
        }

        const matchesApartment = project.apartments.some((apartment) => {
            if (typeof effectiveMaxPrice === "number" && apartment.price > effectiveMaxPrice) return false;
            if (typeof area === "number" && apartment.area < area) return false;
            return true;
        });

        const hasApartmentFilters =
            typeof effectiveMaxPrice === "number" ||
            typeof area === "number";

        if (!project.apartments.length) {
            return !hasApartmentFilters;
        }

        return matchesApartment;
    });

    return (
        <div className="pt-24 pb-16 px-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-primary">{t("title")}</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-primary text-primary">{t("filters")}</Button>
                </div>
            </div>
            {typeof monthlyPayment === "number" && (
                <p className="mb-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                    {t("monthlyHint", {
                        value: `${Math.round((affordabilityMaxPrice ?? 0) * 13000).toLocaleString()} UZS`
                    })}
                </p>
            )}
            {typeof budget === "number" && (
                <p className="mb-6 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-900">
                    {t("budgetHint", {
                        value: `${budget.toLocaleString()} UZS`
                    })}
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="h-48 bg-slate-200 relative">
                            {project.imageUrl ? (
                                <img
                                    src={project.imageUrl}
                                    alt={project.name}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    No Image
                                </div>
                            )}

                            {project.isPopular && (
                                <Badge className="absolute top-4 left-4 bg-accent text-white">{t("popular")}</Badge>
                            )}
                        </div>
                        <CardHeader>
                            <h3 className="text-xl font-bold text-primary">{project.name}</h3>
                            <div className="flex items-center text-slate-500 text-sm">
                                <MapPin className="w-4 h-4 mr-1" /> {project.location}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-accent">
                                {t("from")}{" "}
                                {(
                                    (project.apartments.length
                                        ? Math.min(...project.apartments.map((apartment) => apartment.price))
                                        : 0) * 13000
                                ).toLocaleString()}{" "}
                                UZS
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full h-11 text-base">
                                <Link href={`/catalog/${project.id}`}>{t("details")}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}