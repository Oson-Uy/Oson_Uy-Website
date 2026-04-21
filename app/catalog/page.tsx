"use client";

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MapPin, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const projects = [
    { id: 1, name: "Modern Tashkent City", location: "Tashkent", price: "от 12,000 $", isPopular: true },
    { id: 2, name: "Samarkand Gardens", location: "Samarkand", price: "от 8,500 $", isPopular: false },
    { id: 3, name: "Bukhara Elite", location: "Bukhara", price: "от 9,000 $", isPopular: true },
];

export default function CatalogPage() {
    return (
        <div className="pt-24 pb-16 px-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-[#1E3A8A]">Available Projects</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-[#1E3A8A] text-[#1E3A8A]">Filter</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="h-48 bg-slate-200 relative">
                            {project.isPopular && (
                                <Badge className="absolute top-4 left-4 bg-[#EF4444] text-white">Popular</Badge>
                            )}
                        </div>
                        <CardHeader>
                            <h3 className="text-xl font-bold text-[#1E3A8A]">{project.name}</h3>
                            <div className="flex items-center text-slate-500 text-sm">
                                <MapPin className="w-4 h-4 mr-1" /> {project.location}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-[#F97316]">{project.price}</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/catalog/${project.id}`} className="w-full bg-[#1E3A8A] hover:bg-[#3C55BE] text-white">
                                View Details
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}