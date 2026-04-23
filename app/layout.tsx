import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
    metadataBase: new URL("https://osonuy.uz"),
    title: {
        default: "Oson Uy - New Building Apartments in Uzbekistan",
        template: "%s | Oson Uy",
    },
    description:
        "Oson Uy is a simple and user-friendly platform. Your path to an apartment is now easier. Launching in Samarkand.",
    keywords: [
        "Oson Uy",
        "real estate Uzbekistan",
        "new buildings Tashkent",
        "apartments Uzbekistan",
        "novostroyki",
    ],
    applicationName: "Oson Uy",
    openGraph: {
        title: "Oson Uy - New Building Apartments in Uzbekistan",
        description:
            "Simple apartment search in new buildings. Launching in Samarkand.",
        type: "website",
        siteName: "Oson Uy",
        images: [
            {
                url: "/osonuy-logo-removebg-preview.png",
                width: 800,
                height: 800,
                alt: "Oson Uy logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Oson Uy",
        description:
            "Your path to an apartment is now easier. Launching in Samarkand.",
        images: ["/osonuy-logo-removebg-preview.png"],
    },
    icons: {
        icon: "/icon.png",
        shortcut: "/icon.png",
        apple: "/icon.png",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale} className={cn("font-sans", geist.variable)}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Header />
                    {children}
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}