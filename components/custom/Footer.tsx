"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { BRAND_LOGO_WEB_REMOVEDBG } from "@/lib/brand";

const FOOTER_LABELS = {
  ru: { catalog: "Каталог новостроек", blog: "Блог", developers: "Застройщики", cities: "Новостройки по городам", samarkand: "Самарканд", tashkent: "Ташкент", bukhara: "Бухара" },
  uz: { catalog: "Yangi uylar katalogi", blog: "Blog", developers: "Quruvchilar", cities: "Shaharlar bo‘yicha", samarkand: "Samarqand", tashkent: "Toshkent", bukhara: "Buxoro" },
  en: { catalog: "New-builds catalogue", blog: "Blog", developers: "Developers", cities: "New builds by city", samarkand: "Samarkand", tashkent: "Tashkent", bukhara: "Bukhara" },
} as const;

const INSTAGRAM_URL = "https://www.instagram.com/oson_uy.uz/";
const APPSTORE_URL = "https://apps.apple.com/us/app/oson-uy/id6773353692";
const GOOGLEPLAY_URL = "https://play.google.com/store/apps/";

export default function Footer() {
  const t = useTranslations("Footer");
  const tSeo = useTranslations("Seo");
  const locale = useLocale();
  const L = FOOTER_LABELS[(locale as keyof typeof FOOTER_LABELS)] ?? FOOTER_LABELS.ru;
  const phone =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_CONTACT_PHONE
      ? process.env.NEXT_PUBLIC_CONTACT_PHONE.trim()
      : "";
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "";

  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-slate-50 pt-14 md:pt-16">
      <div className="container mx-auto max-w-[1250px] px-5 mb-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
          <div className="max-w-md space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A]">
              {t("appDownloadTitle")}
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                href={APPSTORE_URL}
                className="block h-[50px] w-[170px] cursor-pointer transition-transform hover:scale-105"
              >
                <Image
                  src="/appstoreDownloadBadge.svg"
                  alt="App Store"
                  width={170}
                  height={50}
                  className="h-full w-full object-contain"
                />
              </Link>

              <Link
                href={GOOGLEPLAY_URL}
                className="block h-[50px] w-[170px] cursor-pointer transition-transform hover:scale-105"
              >
                <Image
                  src="/googleplayDownloadBadge.svg"
                  alt="Google Play"
                  width={170}
                  height={50}
                  className="h-full w-full object-contain"
                />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center p-2">
                <Image src="/appstore_qr.png" alt="QR Code" width={128} height={128} />
              </div>
            </div>

            <p className="text-sm text-slate-500 max-w-[120px]">
              {t("qrLabel")}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid max-w-[1250px] grid-cols-1 gap-12 px-5 pb-14 md:grid-cols-12 md:gap-10">
        <div className="space-y-4 md:col-span-5">
          <Link
            href="/"
            aria-label={tSeo("siteName")}
            className="inline-flex max-w-full cursor-pointer transition-opacity hover:opacity-90"
          >
            <Image
              src={BRAND_LOGO_WEB_REMOVEDBG}
              alt=""
              width={232}
              height={56}
              className="h-10 w-auto max-w-[min(86%,268px)] object-contain object-left md:h-[2.625rem] md:max-w-[296px]"
            />
          </Link>
          <p className="max-w-md text-sm font-medium leading-relaxed text-slate-600">
            {t("description")}
          </p>
        </div>

        <div className="space-y-4 md:col-span-3">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3A8A]/50">
            {t("navTitle")}
          </h4>
          <ul className="space-y-2.5 text-sm font-semibold text-[#1E3A8A]/90">
            <li>
              <Link href="/catalog" className="cursor-pointer hover:text-[#F97316]">
                {L.catalog}
              </Link>
            </li>
            <li>
              <Link href="/developers" className="cursor-pointer hover:text-[#F97316]">
                {L.developers}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="cursor-pointer hover:text-[#F97316]">
                {L.blog}
              </Link>
            </li>
            <li>
              <Link href="/about" className="cursor-pointer hover:text-[#F97316]">
                {t("about")}
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="cursor-pointer hover:text-[#F97316]">
                {t("faq")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4 md:col-span-3">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3A8A]/50">
            {L.cities}
          </h4>
          <ul className="space-y-2.5 text-sm font-semibold text-[#1E3A8A]/90">
            <li><Link href="/novostroyki/samarkand" className="hover:text-[#F97316]">{L.samarkand}</Link></li>
            <li><Link href="/novostroyki/tashkent" className="hover:text-[#F97316]">{L.tashkent}</Link></li>
            <li><Link href="/novostroyki/bukhara" className="hover:text-[#F97316]">{L.bukhara}</Link></li>
          </ul>
        </div>

        <div className="space-y-4 md:col-span-2">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3A8A]/50">
            {t("legalTitle")}
          </h4>
          <ul className="space-y-2.5 text-sm font-semibold text-[#1E3A8A]/90">
            <li>
              <Link href="/privacy" className="cursor-pointer hover:text-[#F97316]">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="cursor-pointer hover:text-[#F97316]">
                {t("terms")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4 md:col-span-2">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3A8A]/50">
            {t("contactsTitle")}
          </h4>
          <ul className="space-y-3 text-sm font-semibold text-[#1E3A8A]/90">
            <li>
              {phone && telHref ? (
                <a href={telHref} className="cursor-pointer hover:text-[#F97316]">
                  {t("phoneLabel")}: {phone}
                </a>
              ) : (
                <span className="text-slate-500">{t("phonePlaceholder")}</span>
              )}
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-[#F97316]"
              >
                {t("instagramLabel")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1250px] border-t border-slate-200 px-5 py-8">
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
