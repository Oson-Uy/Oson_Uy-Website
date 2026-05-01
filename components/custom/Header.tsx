"use client";

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { CiGlobe } from "react-icons/ci";
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation'; 
import { Menu, X } from 'lucide-react';

export default function Header() {
    const t = useTranslations("Header");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLocaleChange = (newLocale: string) => {
        fetch("/api/locale", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ locale: newLocale }),
        }).finally(() => router.refresh());
    };

    const languages = [
        { code: 'uz', name: "O'zbek" },
        { code: 'ru', name: 'Русский' },
        { code: 'en', name: 'English' },
    ];

    const navLinkStyles = (href: string) => cn(
        "relative inline-flex h-10 items-center pb-0.5 transition-all duration-300",
        "after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-[#F97316] after:transition-all after:duration-300",
        pathname === href
            ? "text-[#1E3A8A] after:w-full" 
            : "opacity-60 hover:opacity-100 after:w-0 hover:after:w-full" 
    );

    return (
        <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur border-b border-slate-200 h-16 flex items-center">
            <div className="container grid grid-cols-[1fr_auto_1fr] items-center w-full px-4 mx-auto">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/osonuy-logo-removebg-preview.png" alt="Oson Uy logo" width={40} height={40} className="h-10 w-10 object-contain" />
                    <span className="text-2xl font-bold tracking-tight text-[#1E3A8A]">
                        {t("brand").slice(0, 2)}<span className="text-[#F97316]">{t("brand").slice(2)}</span>
                    </span>
                </Link>

                <div className="hidden md:flex h-10 items-center justify-center gap-7 font-semibold text-sm text-[#1E3A8A]">
                    <Link href="/" className={navLinkStyles("/")}>{t("home")}</Link>
                    <Link href="/catalog" className={navLinkStyles("/catalog")}>{t("catalog")}</Link>
                    <Link href="/about" className={navLinkStyles("/about")}>{t("about")}</Link>
                </div>

                <div className="flex items-center justify-end gap-2">
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

                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-[#1E3A8A] hover:bg-slate-50 rounded-xl transition-colors"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-16 z-40 bg-white md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col p-6 gap-6">
                        <Link 
                            href="/" 
                            onClick={() => setIsMenuOpen(false)}
                            className={cn("text-lg font-bold transition-colors", pathname === "/" ? "text-[#F97316]" : "text-[#1E3A8A]")}
                        >
                            {t("home")}
                        </Link>
                        <Link 
                            href="/catalog" 
                            onClick={() => setIsMenuOpen(false)}
                            className={cn("text-lg font-bold transition-colors", pathname === "/catalog" ? "text-[#F97316]" : "text-[#1E3A8A]")}
                        >
                            {t("catalog")}
                        </Link>
                        <Link 
                            href="/about" 
                            onClick={() => setIsMenuOpen(false)}
                            className={cn("text-lg font-bold transition-colors", pathname === "/about" ? "text-[#F97316]" : "text-[#1E3A8A]")}
                        >
                            {t("about")}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}