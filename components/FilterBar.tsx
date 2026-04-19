'use client';

import React from 'react';
import { Location, FilterState } from '@/types';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onSearch: () => void;
}

export default function FilterBar({ filters, onFilterChange, onSearch }: FilterBarProps) {
  const locations: (Location | 'All')[] = ['All', 'Tashkent', 'Samarkand', 'Bukhara'];
  const rooms: (number | 'All')[] = ['All', 1, 2, 3, 4];

  return (
    <div className="w-full max-w-5xl mx-auto -mt-10 relative z-20 px-4 md:px-0">
      <div className="bg-white p-2 shadow-2xl shadow-slate-200/50 border border-slate-200 flex flex-col md:flex-row items-stretch lg:items-center">
        
        {/* Location Filter */}
        <FilterSelect
          label="Location"
          value={filters.location}
          onChange={(val) => onFilterChange({ ...filters, location: val as any })}
          options={locations.map(loc => ({ label: loc, value: loc }))}
          className="md:border-r"
        />

        {/* Rooms Filter */}
        <FilterSelect
          label="Rooms"
          value={filters.rooms}
          onChange={(val) => onFilterChange({ ...filters, rooms: val === 'All' ? 'All' : parseInt(val) })}
          options={rooms.map(r => ({ label: r === 'All' ? 'Any Rooms' : `${r} Rooms`, value: r.toString() }))}
          className="md:border-r"
        />

        {/* Price Range */}
        <FilterSelect
          label="Max Price"
          value={filters.priceRange[1].toString()}
          onChange={(val) => onFilterChange({ ...filters, priceRange: [0, parseInt(val)] })}
          options={[
            { label: 'Up to $500k', value: '500000' },
            { label: 'Up to $300k', value: '300000' },
            { label: 'Up to $200k', value: '200000' },
            { label: 'Up to $100k', value: '100000' },
          ]}
        />

        {/* Search Button */}
        <button 
          onClick={onSearch}
          className="w-full md:w-auto bg-slate-900 hover:bg-blue-600 text-white px-10 py-5 font-bold text-xs tracking-widest transition-colors uppercase shrink-0"
        >
          Find apartments
        </button>
      </div>
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}

function FilterSelect({ label, value, onChange, options, className }: FilterSelectProps) {
  return (
    <div className={cn("flex-1 w-full px-6 py-4 border-b md:border-b-0 border-slate-100 transition-colors hover:bg-slate-50", className)}>
      <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">{label}</label>
      <select 
        title={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent p-0 text-sm font-bold text-slate-900 outline-none cursor-pointer appearance-none"
      >
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
}
