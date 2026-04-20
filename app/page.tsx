"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ProjectCard } from "@/components/custom/ProjectCard";
import { LeadModal } from "@/components/custom/LeadModal";
import { PROJECTS } from "@/lib/data";
import { FilterBar } from "@/components/custom/FilterBar";


export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div className="flex flex-col w-full min-h-screen">
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://picsum.photos/seed/central-asia/1920/1080?blur=1"
              className="w-full h-full object-cover"
              alt="Hero background"
            />
            <div className="absolute inset-0 bg-[#1E3A8A]/70 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/90 via-transparent to-slate-50"></div>
          </div>

          <div className="relative z-10 w-full px-4 text-center max-w-5xl mx-auto space-y-10 group">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] drop-shadow-2xl">
                Uy<span className="text-[#F97316]">Find</span> Your
                <br />
                Future Home
              </h1>
              <p className="text-white/80 text-xl md:text-2xl font-medium max-w-2xl mx-auto tracking-tight leading-relaxed">
                Connecting you with the best developers in Tashkent, Samarkand,
                and beyond. Primary market focus.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <FilterBar />
            </motion.div>
          </div>
        </section>

        <section className="py-32 bg-slate-50">
          <div className="w-full px-4 md:px-8 max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-3">
                <h2 className="text-5xl font-black text-[#1E3A8A] tracking-tight">
                  Featured Projects
                </h2>
                <div className="h-1.5 w-24 bg-[#F97316] rounded-full"></div>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs pt-2">
                  Uzbekistan's top residential complexes
                </p>
              </div>
              <Button
                variant="link"
                className="text-[#F97316] font-bold text-lg gap-2 p-0 hover:no-underline hover:translate-x-2 transition-transform"
              >
                View Catalog →
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PROJECTS.filter((p) => p.isPopular).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center md:text-left space-y-2">
              <div className="text-5xl font-black text-[#1E3A8A] tracking-tight">
                1,250+
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                Available Projects
              </div>
            </div>
            <div className="text-center md:text-left space-y-2">
              <div className="text-5xl font-black text-[#1E3A8A] tracking-tight">
                Uzbekistan
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                Primary Market Focus
              </div>
            </div>
            <div className="text-center md:text-left space-y-2">
              <div className="text-5xl font-black text-[#1E3A8A] tracking-tight">
                15min
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                Expert Response Time
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto bg-white border-2 border-[#1E3A8A]/5 p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-blue-900/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black text-[#1E3A8A] tracking-tight leading-[1.1]">
                Request a <span className="text-[#F97316]">Free</span>{" "}
                Consultation
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                Get a personalized selection of the best properties based on
                your budget and preferences.
              </p>
            </div>
            <div className="w-full md:w-auto shrink-0 bg-[#1E3A8A] p-10 rounded-[3rem] shadow-2xl shadow-blue-900/20 text-white space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest opacity-60">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-blue-800/50 border border-blue-700/50 rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 ring-[#F97316]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest opacity-60">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+998"
                    className="w-full bg-blue-800/50 border border-blue-700/50 rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 ring-[#F97316]"
                  />
                </div>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#F97316] hover:bg-orange-600 text-white h-16 rounded-xl font-black text-xl shadow-xl shadow-orange-900/20 transition-all active:scale-95 border-none"
              >
                Inquiry Now
              </Button>
            </div>
          </div>
        </section>

        <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
}
