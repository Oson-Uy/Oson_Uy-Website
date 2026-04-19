'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MapPin, Building2 } from 'lucide-react';
import { Project } from '@/types';

import { Label } from './ui/Typography';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white border border-slate-200 overflow-hidden hover:border-slate-300 transition-all duration-300 rounded-none shadow-sm hover:shadow-md"
    >
      <Link href={`/projects/${project.id}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={project.mainImage}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-tighter shadow-sm">
            {project.location}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              {project.name}
            </h3>
            <span className="text-blue-600 font-bold text-sm">
              ${(project.priceFrom / 1000).toFixed(0)}k+
            </span>
          </div>
          
          <p className="text-xs text-slate-500 mb-4 font-medium flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            {project.location} • {project.deliveryDate}
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <div className="w-6 h-6 rounded-sm bg-slate-900 flex items-center justify-center">
              <Building2 className="w-3 h-3 text-white" />
            </div>
            <Label className="text-slate-500">{project.developer.name}</Label>
            {project.developer.verified && (
              <div className="ml-auto bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-tighter uppercase border border-green-100">
                Verified
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
