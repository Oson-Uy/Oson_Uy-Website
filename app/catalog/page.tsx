import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data';

type CatalogPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const toNumber = (value?: string | string[]) => {
    if (!value || Array.isArray(value)) return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
    const params = await searchParams;
    const location = typeof params.location === "string" ? params.location : undefined;
    const monthlyPayment = toNumber(params.monthlyPayment);
    const budget = toNumber(params.budget);
    const area = toNumber(params.area);
    const affordabilityMaxPrice =
        typeof monthlyPayment === "number" ? monthlyPayment * 240 : undefined;
    const effectiveMaxPrice =
        typeof budget === "number" && typeof affordabilityMaxPrice === "number"
            ? Math.min(budget, affordabilityMaxPrice)
            : budget ?? affordabilityMaxPrice;

    const projects = PROJECTS.filter((project) => {
        if (location && project.location !== location) {
            return false;
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
                <h1 className="text-3xl font-bold text-primary">Available Projects</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-primary text-primary">Filter</Button>
                </div>
            </div>
            {typeof monthlyPayment === "number" && (
                <p className="mb-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                    Подбор по бюджету: до{" "}
                    <span className="font-semibold">
                        ${affordabilityMaxPrice?.toLocaleString()}
                    </span>{" "}
                    (расчет из ежемесячного платежа на 20 лет).
                </p>
            )}
            {typeof budget === "number" && (
                <p className="mb-6 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-900">
                    Выбран общий бюджет: <span className="font-semibold">${budget.toLocaleString()}</span>
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="h-48 bg-slate-200 relative">
                            {project.isPopular && (
                                <Badge className="absolute top-4 left-4 bg-accent text-white">Popular</Badge>
                            )}
                        </div>
                        <CardHeader>
                            <h3 className="text-xl font-bold text-primary">{project.name}</h3>
                            <div className="flex items-center text-slate-500 text-sm">
                                <MapPin className="w-4 h-4 mr-1" /> {project.location}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-accent">от ${project.priceFrom.toLocaleString()}</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full h-11 text-base">
                                <Link href={`/catalog/${project.id}`}>View Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}