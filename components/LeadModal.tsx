'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { Apartment, Project } from '@/types';
import { Label } from './ui/Typography';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
  apartment?: Apartment | null;
}

export default function LeadModal({ isOpen, onClose, project, apartment }: LeadModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-white shadow-3xl overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          {!submitted ? (
            <div className="flex flex-col md:flex-row">
              <div className="md:w-5/12 bg-slate-900 text-white p-8 flex flex-col justify-between min-h-[400px]">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight mb-4 uppercase leading-none">Inquiry</h2>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">
                    Leave your contact details and our manager will contact you within 15 minutes.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {project && (
                    <div className="border-l-2 border-blue-600 pl-4 py-1">
                      <Label className="mb-1">Project</Label>
                      <p className="text-sm font-bold">{project.name}</p>
                    </div>
                  )}
                  {apartment && (
                    <div className="border-l-2 border-blue-600 pl-4 py-1">
                      <Label className="mb-1">Unit</Label>
                      <p className="text-sm font-bold">Suite {apartment.id} • {apartment.price.toLocaleString()}$</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:w-7/12 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormInput
                    label="Full Name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(val) => setFormData({ ...formData, name: val })}
                  />
                  <FormInput
                    label="Current Phone"
                    type="tel"
                    placeholder="+998"
                    value={formData.phone}
                    onChange={(val) => setFormData({ ...formData, phone: val })}
                  />
                  <FormInput
                    label="Email Address"
                    type="email"
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(val) => setFormData({ ...formData, email: val })}
                  />

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 uppercase tracking-widest text-[10px] transition-colors mt-8"
                  >
                    Submit Request
                  </button>
                  <p className="text-[9px] text-slate-400 text-center uppercase tracking-widest font-bold">
                    ESTATEFLOW SECURE SUBMISSION
                  </p>
                </form>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h2 className="text-3xl font-extrabold tracking-tighter mb-4">Request Sent!</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed text-sm font-medium">
                Thank you for your interest. Our representative will contact you shortly to provide more information.
              </p>
              <button
                onClick={onClose}
                className="bg-slate-900 text-white px-12 py-3 font-bold uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function FormInput({ label, value, onChange, placeholder, type = 'text' }: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <Label className="mb-2 text-slate-400 font-black">{label}</Label>
      <input
        required
        type={type}
        className="w-full border-b border-slate-200 py-2 focus:border-blue-600 outline-none transition-colors text-sm font-bold"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
