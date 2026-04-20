import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Label({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component className={cn('text-[10px] uppercase font-bold tracking-widest text-slate-400', className)}>
      {children}
    </Component>
  );
}

export function Heading({ children, className, as: Component = 'h2' }: TypographyProps) {
  return (
    <Component className={cn('text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900', className)}>
      {children}
    </Component>
  );
}

export function Display({ children, className, as: Component = 'h1' }: TypographyProps) {
  return (
    <Component className={cn('text-4xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[0.95]', className)}>
      {children}
    </Component>
  );
}
