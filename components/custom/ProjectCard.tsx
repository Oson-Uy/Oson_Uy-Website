import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Project } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="group relative overflow-hidden rounded-[2rem] bg-white shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 border border-slate-200 flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.images[0] || ""}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {project.isPopular && (
          <Badge className="absolute top-5 left-5 bg-[#FB7185] text-white text-[10px] font-bold px-4 py-1.5 rounded-full z-10 border-none uppercase tracking-wider shadow-lg shadow-rose-500/20">
            Popular
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-[#1E3A8A] leading-tight group-hover:text-[#F97316] transition-colors">
            {project.name}
          </h3>
          <span className="text-lg font-black text-[#F97316] tracking-tight">
            ${(project.priceFrom / 1000).toFixed(0)}k+
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-6 leading-relaxed flex items-center gap-1.5 font-medium">
          <MapPin className="h-3 w-3 text-[#1E3A8A]" /> {project.district},{" "}
          {project.location}
        </p>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[8px] font-black text-slate-400">
            DEV
          </div>
          <div>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">
              Developer
            </p>
            <p className="text-xs font-bold text-[#1E3A8A]">
              {project.developer.name}
            </p>
          </div>
        </div>

        <div className="mt-auto flex gap-3">
          <Link href={`/catalog/${project.id}`} className="flex-1">
            <Button
              variant="ghost"
              className="w-full bg-slate-50 border border-slate-200 text-[#1E3A8A] text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-100 h-10"
            >
              Details
            </Button>
          </Link>
          <Button className="flex-1 bg-[#F97316] hover:bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/10 h-10">
            Inquiry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
