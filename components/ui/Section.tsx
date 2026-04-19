import React from 'react';
import { cn } from '@/lib/utils';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: React.ElementType;
  id?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'slate' | 'none';
}

export default function Section({
  children,
  className,
  containerClassName,
  as: Component = 'section',
  id,
  padding = 'md',
  background = 'none',
}: SectionProps) {
  const paddings = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32',
    xl: 'py-32 md:py-48',
  };

  const backgrounds = {
    white: 'bg-white',
    slate: 'bg-slate-50',
    none: '',
  };

  return (
    <Component 
      id={id} 
      className={cn(paddings[padding], backgrounds[background], className)}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </Component>
  );
}
