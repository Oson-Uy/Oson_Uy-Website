'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import FilterBar from '@/components/FilterBar';
import ProjectCard from '@/components/ProjectCard';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { projects } from '@/lib/mock-data';
import { FilterState } from '@/types';

import { Display } from '@/components/ui/Typography';

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    location: 'All',
    rooms: 'All',
    priceRange: [0, 500000],
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const locationMatch = filters.location === 'All' || project.location === filters.location;
      
      const roomsMatch = filters.rooms === 'All' || 
        project.apartments.some(apt => apt.rooms === filters.rooms);

      const priceMatch = project.priceFrom <= filters.priceRange[1];

      return locationMatch && roomsMatch && priceMatch;
    });
  }, [filters]);

  const handleSearch = () => {
    // Already filtered via useMemo
  };

  return (
    <main className="min-h-screen">
      <Navbar variant="home" actionLabel="List Property" onAction={() => {}} />

      {/* Hero Section */}
      <Section background="white" padding="none" className="pt-40 pb-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Display className="mb-6">
              Modern living for the <span className="text-blue-600">next generation.</span>
            </Display>
            <p className="text-base md:text-lg text-slate-500 max-w-md font-medium">
              Curated architectural projects in prime urban locations. Simple, verified, and ready for you.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Filter Section */}
      <Section padding="lg" background="none">
        <FilterBar 
          filters={filters} 
          onFilterChange={setFilters} 
          onSearch={handleSearch} 
        />

        <div className="mt-20 md:mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-slate-400">
              Latest Development Projects
            </h3>
            <div className="h-px flex-1 bg-slate-100 mx-8 hidden lg:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-slate-200 bg-white">
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">No matching results found</p>
                <button 
                  onClick={() => setFilters({ location: 'All', rooms: 'All', priceRange: [0, 500000] })}
                  className="mt-4 text-blue-600 font-bold uppercase tracking-widest text-[10px] hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-white border-t border-slate-200 flex items-center px-6 md:px-12 justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest z-50">
        <div className="flex gap-4 overflow-hidden">
          <span className="whitespace-nowrap">Found {filteredProjects.length} matches</span>
          <div className="w-px h-3 bg-slate-200 self-center hidden sm:block"></div>
          <span className="text-blue-600 hidden sm:block">Live Market Feed</span>
        </div>
        <div className="flex gap-6">
          <span>Updated 2m ago</span>
        </div>
      </div>

      <Footer />
    </main>
  );
}
