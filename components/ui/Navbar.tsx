'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Container from './Container';
import { cn } from '@/lib/utils';

interface NavbarProps {
  variant?: 'home' | 'project';
  onAction?: () => void;
  actionLabel?: string;
}

export default function Navbar({ variant = 'home', onAction, actionLabel }: NavbarProps) {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200 h-20">
      <Container className="h-full flex items-center justify-between gap-4">
        {variant === 'home' ? (
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Logo />
            <span className="text-xl font-bold tracking-tight uppercase">Arkit</span>
          </Link>
        ) : (
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            Collection
          </button>
        )}
        
        {variant === 'home' && (
          <div className="hidden md:flex items-center gap-10">
            {['Projects', 'Rent', 'Developers', 'About'].map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                {item}
              </a>
            ))}
          </div>
        )}

        {variant === 'project' && (
          <div className="hidden sm:flex items-center gap-2 mx-auto">
            <Logo />
            <span className="text-xl font-bold tracking-tight uppercase">Arkit</span>
          </div>
        )}

        <div className="flex items-center gap-4 shrink-0">
          {onAction && actionLabel && (
            <button 
              onClick={onAction}
              className={cn(
                "px-5 py-2 text-sm font-bold transition-colors",
                variant === 'home' 
                  ? "border border-slate-900 hover:bg-slate-900 hover:text-white"
                  : "bg-slate-900 text-white hover:bg-blue-600 "
              )}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </Container>
    </nav>
  );
}

function Logo() {
  return (
    <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
      <div className="w-4 h-4 border-2 border-white rotate-45"></div>
    </div>
  );
}
