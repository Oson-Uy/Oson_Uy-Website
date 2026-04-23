"use client";

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { CiGlobe } from "react-icons/ci";
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation'; 

export default function Header() {
    const t = useTranslations("Header");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

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
                    <Image src="/osonuy-logo.png" alt="Oson Uy logo" width={40} height={40} className="h-10 w-10 rounded-lg object-cover" />
                    <span className="text-2xl font-bold tracking-tight text-[#1E3A8A]">
                        {t("brand").slice(0, 2)}<span className="text-[#F97316]">{t("brand").slice(2)}</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-[#1E3A8A]">
                    <Link href="/" className={navLinkStyles("/")}>{t("home")}</Link>
                    <Link href="/catalog" className={navLinkStyles("/catalog")}>{t("catalog")}</Link>
                    <Link href="/about" className={navLinkStyles("/about")}>{t("about")}</Link>
                    <Link href="/contact" className={navLinkStyles("/contact")}>{t("contact")}</Link>
                </div>

                <div className="flex items-center gap-2">
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
                </div>
            </div>
        </nav>
    );
}