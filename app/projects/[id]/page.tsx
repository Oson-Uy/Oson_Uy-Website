'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronLeft } from 'lucide-react';
import { projects } from '@/lib/data';
import ApartmentCard from '@/components/ApartmentCard';
import LeadModal from '@/components/LeadModal';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import { Apartment } from '@/types';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  const project = useMemo(() => {
    return projects.find((p) => p.id === params.id);
  }, [params.id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <button 
            onClick={() => router.push('/')} 
            className="text-blue-600 font-bold uppercase tracking-widest text-[10px] hover:underline"
          >
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  const handleApartmentSelect = (apt: Apartment) => {
    setSelectedApartment(apt);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Navbar 
        variant="project" 
        actionLabel="Enquire" 
        onAction={() => setIsModalOpen(true)} 
      />

      {/* Hero Header */}
      <Section background="white" className="pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="text-blue-600 font-extrabold uppercase tracking-[0.2em] text-[10px] mb-6">
              {project.location} • Uzbekistan
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-8 leading-[0.95]">
              {project.name}
            </h1>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-10 font-medium max-w-lg">
              {project.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-slate-100">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Timeline</p>
                <p className="font-bold text-lg md:text-xl">{project.deliveryDate}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Developer</p>
                <div className="flex items-center gap-2 font-bold text-lg md:text-xl uppercase tracking-tighter">
                  {project.developer.name}
                  {project.developer.verified && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="order-1 lg:order-2 relative aspect-[4/3] lg:aspect-square bg-slate-100 border border-slate-200 shadow-2xl shadow-slate-200"
          >
            <Image
              src={project.mainImage}
              alt={project.name}
              fill
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section padding="lg" background="none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-slate-200 border border-slate-200 shadow-sm">
          {project.images.map((img, idx) => (
            <div 
              key={idx}
              className="relative aspect-video bg-white overflow-hidden group"
            >
              <Image
                src={img}
                alt={`${project.name} Gallery ${idx}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Apartments List */}
      <Section background="white" padding="lg" className="border-y border-slate-200">
        <div className="mb-12 md:mb-20">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-600 mb-4">Floor Plans</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter">Geometric Precision</h3>
        </div>

        <div className="space-y-6 max-w-5xl">
          {project.apartments.map((apt) => (
            <ApartmentCard 
              key={apt.id} 
              apartment={apt} 
              onSelect={handleApartmentSelect} 
            />
          ))}
        </div>
      </Section>

      {/* Consultation CTA */}
      <Section padding="xl" className="bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 translate-x-1/3"></div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.85]">
            Secure the <br /> <span className="text-blue-500">future today.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-xl">
            Architectural excellence meets unprecedented value. Contact us for private walkthroughs and exclusive investor documents.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 font-bold uppercase tracking-widest text-[10px] transition-colors"
            >
              Inquire Now
            </button>
            <button className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 text-white px-12 py-5 font-bold uppercase tracking-widest text-[10px] transition-colors">
              Archived Specs
            </button>
          </div>
        </div>
      </Section>

      <Footer />

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedApartment(null);
        }} 
        project={project}
        apartment={selectedApartment}
      />
    </main>
  );
}
