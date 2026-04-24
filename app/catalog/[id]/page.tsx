import Image from 'next/image';
import { MapPin, Calendar, Layers, ChevronRight, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
          deliveryDate: string;
          imageUrl?: string;
          developer?: { name: string };
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

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row mb-16">
                    <div className="md:w-1/2 relative h-[400px] md:h-auto">
                        <Image
                            src={projectData.imageUrl || "https://picsum.photos/seed/project-fallback/1200/800"}
                            alt={projectData.name}
                            fill
                            className="object-cover"
                        />
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

                        <h1 className="text-4xl font-bold text-[#1E3A8A] mb-4">{projectData.name}</h1>

                        <div className="flex items-center text-[#F97316] font-medium mb-8">
                            <MapPin className="w-4 h-4 mr-2" />
                            {projectData.location}
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
                                    <Layers className="w-4 h-4 text-slate-400" /> {projectData.apartments.length ? Math.max(...projectData.apartments.map((apt) => apt.floor)) : 0}
                                </div>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full md:w-max border-slate-200 text-[#1E3A8A] rounded-xl px-10 h-12 font-bold group">
                            View all Details <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>

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

                    <div className="space-y-4 mt-4">
                        {projectData.apartments.map((apt) => (
                            <div key={apt.id} className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 p-6 bg-white border border-slate-100 rounded-2xl hover:border-[#F97316]/30 transition-colors">

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                                        <Home className="w-5 h-5 text-[#F97316]" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#1E3A8A]">{apt.rooms}-room apartment</div>
                                        <div className="text-[10px] text-slate-400 uppercase">Apartment #{apt.id}</div>
                                    </div>
                                </div>

                                <div className="flex md:block justify-between items-center">
                                    <span className="md:hidden text-slate-400 text-xs">Area:</span>
                                    <span className="font-bold text-[#1E3A8A]">{apt.area} m²</span>
                                </div>

                                <div className="flex md:block justify-between items-center">
                                    <span className="md:hidden text-slate-400 text-xs">Floor:</span>
                                    <span className="text-slate-600 font-medium">{apt.floor}</span>
                                </div>

                                <div className="flex md:block justify-between items-center">
                                    <span className="md:hidden text-slate-400 text-xs">Price:</span>
                                    <span className="text-xl font-extrabold text-[#1E3A8A]">{(apt.price * 13000).toLocaleString()} UZS</span>
                                </div>

                                <div className="text-right">
                                    <Button className="bg-[#1E3A8A] hover:bg-[#3C55BE] text-white rounded-xl px-8 w-full md:w-auto">
                                        Select
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}