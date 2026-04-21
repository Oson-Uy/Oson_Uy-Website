"use client";

import React from 'react';
import Image from 'next/image';

import { MapPin, Calendar, Layers, ChevronRight, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';


const projectData = {
    name: "Infinity Residences",
    developer: "Golden House Developers",
    location: "Yunusabad District, Tashkent",
    delivery: "Q4 2025",
    floors: "24 Levels",
    mainImage: "https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?q=80&w=1000", 
    apartments: [
        { id: 1, type: "Studio Alpha", block: "Block A-02", area: "42.5", floor: "12 of 24", price: "$51,000" },
        { id: 2, type: "2-Bedroom Comfort", block: "Block B-12", area: "78.2", floor: "08 of 24", price: "$93,840" },
        { id: 3, type: "Grand Penthouse", block: "Exclusive Top", area: "185.0", floor: "24 of 24", price: "$286,750" },
    ]
};

export default function ProjectDetailsPage() {
    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row mb-16">
                    <div className="md:w-1/2 relative h-[400px] md:h-auto">
                        <Image
                            src={projectData.mainImage}
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
                            <span className="text-xs text-slate-500 font-medium">{projectData.developer}</span>
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
                                    <Calendar className="w-4 h-4 text-slate-400" /> {projectData.delivery}
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl">
                                <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Floors</p>
                                <div className="flex items-center gap-2 text-[#1E3A8A] font-bold">
                                    <Layers className="w-4 h-4 text-slate-400" /> {projectData.floors}
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
                                        <div className="font-bold text-[#1E3A8A]">{apt.type}</div>
                                        <div className="text-[10px] text-slate-400 uppercase">{apt.block}</div>
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
                                    <span className="text-xl font-extrabold text-[#1E3A8A]">{apt.price}</span>
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