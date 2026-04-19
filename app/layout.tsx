import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'ARKIT - Premium Real Estate',
  description: 'ARKIT - Premium real estate platform for high-end apartments and architectural projects in Uzbekistan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased text-gray-900 bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
