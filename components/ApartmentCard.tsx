'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Apartment } from '@/types';
import { Label } from './ui/Typography';

interface ApartmentCardProps {
  apartment: Apartment;
  onSelect: (apartment: Apartment) => void;
}

export default function ApartmentCard({ apartment, onSelect }: ApartmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-slate-200 p-6 flex flex-col md:flex-row gap-8 hover:border-blue-200 transition-colors group shadow-sm"
    >
      <div className="relative w-full md:w-48 aspect-square shrink-0 bg-slate-50 flex items-center justify-center p-4">
        <Image
          src={apartment.layoutImage}
          alt={`Apartment ${apartment.id} Layout`}
          width={200}
          height={200}
          className="object-contain mix-blend-multiply opacity-60 group-hover:opacity-100 transition-opacity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-tighter">
          Unit {apartment.id}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between py-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="flex flex-col">
            <Label className="mb-1">Rooms</Label>
            <p className="text-sm font-bold text-slate-900">{apartment.rooms}</p>
          </div>
          
          <div className="flex flex-col">
            <Label className="mb-1">Area</Label>
            <p className="text-sm font-bold text-slate-900">{apartment.area} m²</p>
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Floor</Label>
            <p className="text-sm font-bold text-slate-900">{apartment.floor}</p>
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Status</Label>
            <p className={`text-sm font-bold capitalize ${
              apartment.status === 'available' ? 'text-blue-600' : 'text-slate-400'
            }`}>
              {apartment.status}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-6">
          <div>
            <Label className="mb-1">Price</Label>
            <p className="text-2xl font-extrabold tracking-tight text-slate-900">${apartment.price.toLocaleString()}</p>
          </div>
          <button
            onClick={() => onSelect(apartment)}
            className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
            disabled={apartment.status !== 'available'}
          >
            {apartment.status === 'available' ? 'Find Apartment' : 'Sold Out'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
