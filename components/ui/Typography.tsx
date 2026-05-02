import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Label({
  children,
  className,
  as: Tag = "p",
}: TypographyProps) {
  return React.createElement(
    Tag,
    {
      className: cn(
        "text-[10px] font-bold uppercase tracking-widest text-slate-400",
        className,
      ),
    },
    children,
  );
}

export function Heading({
  children,
  className,
  as: Tag = "h2",
}: TypographyProps) {
  return React.createElement(
    Tag,
    {
      className: cn(
        "text-3xl font-extrabold tracking-tighter text-slate-900 md:text-5xl",
        className,
      ),
    },
    children,
  );
}

export function Display({
  children,
  className,
  as: Tag = "h1",
}: TypographyProps) {
  return React.createElement(
    Tag,
    {
      className: cn(
        "text-4xl font-extrabold leading-[0.95] tracking-tighter text-slate-900 md:text-7xl",
        className,
      ),
    },
    children,
  );
}
