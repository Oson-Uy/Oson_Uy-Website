"use client";

import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { CiGlobe } from "react-icons/ci";
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation'; 

export default function Header() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (newLocale: string) => {
        document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
        router.refresh();
    };

    const languages = [
        { code: 'uz', name: "O'zbek" },
        { code: 'ru', name: 'Русский' },
    ];

    const navLinkStyles = (href: string) => cn(
        "relative pb-1 transition-all duration-300",
        "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#F97316] after:transition-all after:duration-300",
        pathname === href
            ? "text-[#1E3A8A] after:w-full" 
            : "opacity-60 hover:opacity-100 after:w-0 hover:after:w-full" 
    );

    return (
        <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200 h-16 flex items-center">
            <div className="container flex justify-between items-center w-full px-4 mx-auto">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-[#1E3A8A]">
                        Oson<span className="text-[#F97316]">Uy</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-[#1E3A8A]">
                    <Link href="/" className={navLinkStyles("/")}>Home</Link>
                    <Link href="/catalog" className={navLinkStyles("/catalog")}>Catalog</Link>
                    <Link href="/about" className={navLinkStyles("/about")}>About Us</Link>
                    <Link href="/contact" className={navLinkStyles("/contact")}>Contact</Link>
                </div>

                <div className="flex items-center gap-4">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center justify-center p-2 text-gray-500 hover:text-[#3C55BE] outline-none cursor-pointer">
                                <CiGlobe className="h-6 w-6" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white z-110 shadow-xl border-gray-100 rounded-xl">
                            {languages.map((lang) => (
                                <DropdownMenuItem
                                    key={lang.code}
                                    onClick={() => handleLocaleChange(lang.code)}
                                    className={cn(
                                        "cursor-pointer",
                                        locale === lang.code && "text-[#3C55BE] font-bold"
                                    )}
                                >
                                    {lang.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className="bg-transparent border border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white rounded-full px-6 font-bold text-sm transition-all h-10">
                        Sign In
                    </Button>
                </div>
            </div>
        </nav>
    );
}