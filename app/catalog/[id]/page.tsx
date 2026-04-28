import Image from 'next/image';
import { MapPin, Calendar, Layers, ChevronRight, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ApartmentList } from '@/components/custom/ApartmentList';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type ProjectDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
    const { id } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";
    const response = await fetch(`${apiUrl}/projects/${id}/full`, { cache: "no-store" });
    const projectData = response.ok
      ? (await response.json()) as {
          id: number;
          name: string;
          location: string;
          district?: string;
          description?: string;
          advantages?: string[];
          mapEmbedUrl?: string;
          qrCodeUrl?: string;
          totalFloors?: number | null;
          totalUnits?: number | null;
          deliveryDate: string;
          imageUrl?: string;
          videoUrl?: string;
          media?: Array<{ id: number; imageUrl: string }>;
          avgRating?: number | null;
          reviewsCount?: number;
          reviews?: Array<{ id: number; rating: number; comment?: string | null }>;
          developer?: { name: string; qrCodeUrl?: string | null };
          apartments: Array<{
            id: number;
            rooms: number;
            area: number;
            floor: number;
            price: number;
          }>;
        }
      : null;

    if (!projectData) {
      return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-3xl border border-red-100 bg-white p-8 text-red-600">
              Project not found
            </div>
          </div>
        </div>
      );
    }

    const gallery = projectData.media?.length
      ? projectData.media.map((item) => item.imageUrl)
      : [projectData.imageUrl || "https://picsum.photos/seed/project-fallback/1200/800"];

    const fallbackQuery = `${projectData.location}${projectData.district ? ` ${projectData.district}` : ""}`;
    const fallbackMapSrc = `https://www.google.com/maps?q=${encodeURIComponent(fallbackQuery)}&output=embed`;
    const rawMap = projectData.mapEmbedUrl?.trim();
    const mapSrc = !rawMap
      ? fallbackMapSrc
      : rawMap.includes("/maps/embed") || rawMap.includes("output=embed")
        ? rawMap
        : rawMap.startsWith("http")
          ? fallbackMapSrc
          : `https://www.google.com/maps?q=${encodeURIComponent(rawMap)}&output=embed`;

    return (
        <div className="pt-16 md:pt-20 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row mb-16">
                    <div className="md:w-1/2 relative h-[360px] md:h-[520px]">
                        <Carousel opts={{ loop: true }} className="h-full w-full">
                          <CarouselContent className="ml-0 h-full">
                            {gallery.map((image, index) => (
                              <CarouselItem key={`${image}-${index}`} className="pl-0 h-full">
                                <div className="relative h-[360px] md:h-[520px] w-full">
                                  <Image
                                    src={image}
                                    alt={`${projectData.name} ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          {gallery.length > 1 && (
                            <>
                              <CarouselPrevious className="left-3 bg-white/85 text-slate-700 hover:bg-white border-none" />
                              <CarouselNext className="right-3 bg-white/85 text-slate-700 hover:bg-white border-none" />
                            </>
                          )}
                        </Carousel>
                        <Badge className="absolute top-6 left-6 bg-[#F97316] text-white hover:bg-[#F97316] border-none px-4 py-1">
                            PREMIUM VENTURE
                        </Badge>
                    </div>

                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                                <div className="w-3 h-3 border border-slate-400 rounded-sm" />
                            </div>
                            <span className="text-xs text-slate-500 font-medium">{projectData.developer?.name ?? "Developer"}</span>
                        </div>
                        {!!projectData.qrCodeUrl && (
                          <div className="mb-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                              QR проекта
                            </p>
                            <img
                              src={projectData.qrCodeUrl}
                              alt="Project QR"
                              className="h-24 w-24 rounded-xl border border-slate-200 object-cover"
                            />
                          </div>
                        )}

                        <h1 className="text-4xl font-bold text-[#1E3A8A] mb-4">{projectData.name}</h1>

                        <div className="flex items-center text-[#F97316] font-medium mb-8">
                            <MapPin className="w-4 h-4 mr-2" />
                            {projectData.location}
                            {projectData.district ? `, ${projectData.district}` : ""}
                        </div>
                        <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
                          <Star className="h-4 w-4 text-[#F97316]" />
                          <span className="font-semibold text-slate-900">
                            {projectData.avgRating ? projectData.avgRating.toFixed(1) : '—'}
                          </span>
                          <span>({projectData.reviewsCount ?? 0} отзывов)</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-50 p-4 rounded-xl">
                                <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Delivery</p>
                                <div className="flex items-center gap-2 text-[#1E3A8A] font-bold">
                                    <Calendar className="w-4 h-4 text-slate-400" /> {projectData.deliveryDate}
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl">
                                <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Floors</p>
                                <div className="flex items-center gap-2 text-[#1E3A8A] font-bold">
                                    <Layers className="w-4 h-4 text-slate-400" /> {projectData.totalFloors ?? (projectData.apartments.length ? Math.max(...projectData.apartments.map((apt) => apt.floor)) : 0)}
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl">
                                <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Units</p>
                                <div className="text-[#1E3A8A] font-bold">
                                  {projectData.totalUnits ?? projectData.apartments.length}
                                </div>
                            </div>
                        </div>

                        {projectData.description && (
                          <p className="mb-6 text-sm leading-relaxed text-slate-600">
                            {projectData.description}
                          </p>
                        )}

                        {!!projectData.advantages?.length && (
                          <div className="mb-6 flex flex-wrap gap-2">
                            {projectData.advantages.map((advantage) => (
                              <Badge key={advantage} className="bg-blue-50 text-[#1E3A8A] border border-blue-100">
                                {advantage}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <Button variant="outline" className="w-full md:w-max border-slate-200 text-[#1E3A8A] rounded-xl px-10 h-12 font-bold group">
                            View all Details <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>

                {!!projectData.media?.length && (
                  <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {projectData.media.map((media) => (
                      <div key={media.id} className="relative h-32 overflow-hidden rounded-xl border border-slate-200">
                        <Image src={media.imageUrl} alt="Project gallery" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {projectData.videoUrl && (
                  <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <video controls className="h-full w-full" src={projectData.videoUrl}>
                      Your browser does not support video.
                    </video>
                  </div>
                )}

                {(projectData.mapEmbedUrl || projectData.location) && (
                  <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <iframe
                      src={mapSrc}
                      title="Project location"
                      className="h-80 w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                )}

                {!!projectData.reviews?.length && (
                  <div className="mb-12 rounded-3xl bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-2xl font-bold text-[#1E3A8A]">Отзывы</h3>
                    <div className="space-y-3">
                      {projectData.reviews.slice(0, 5).map((review) => (
                        <div key={review.id} className="rounded-xl border border-slate-100 p-4">
                          <p className="text-sm font-semibold text-[#F97316]">{'★'.repeat(review.rating)}</p>
                          <p className="text-sm text-slate-600">{review.comment || 'Без комментария'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#1E3A8A]">Available Residences</h2>
                </div>

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden p-4 md:p-8">
                    <div className="hidden md:grid grid-cols-5 px-6 py-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-50">
                        <div>Unit Type</div>
                        <div>Area (sq.m)</div>
                        <div>Floor</div>
                        <div>Price Total</div>
                        <div className="text-right">Action</div>
                    </div>

                    <ApartmentList
                      projectId={projectData.id}
                      projectName={projectData.name}
                      apartments={projectData.apartments}
                    />
                </div>
            </div>
        </div>
    );
}