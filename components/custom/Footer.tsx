"use client"
import Link from "next/link";


export default function Footer() {
    return (
        <footer className="bg-slate-50 w-full py-16 border-t border-slate-200 mt-auto">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 px-4 lg:px-0 mx-auto">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#1E3A8A] rounded-md flex items-center justify-center">
                            <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[#1E3A8A]">
                            Uy<span className="text-[#F97316]">Find</span>
                        </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        The most trusted primary real estate platform in Uzbekistan. Connecting you with premium living spaces.
                    </p>
                </div>
                <div className="space-y-6">
                    <h4 className="font-bold text-[#1E3A8A] text-xs uppercase tracking-[0.2em] opacity-50">Company</h4>
                    <ul className="space-y-3 text-sm font-semibold text-[#1E3A8A]/80">
                        <li><Link href="/about" className="hover:text-[#F97316]">About Us</Link></li>
                        <li><Link href="/" className="hover:text-[#F97316]">Contact</Link></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-bold text-[#1E3A8A] text-xs uppercase tracking-[0.2em] opacity-50">Legal</h4>
                    <ul className="space-y-3 text-sm font-semibold text-[#1E3A8A]/80">
                        <li><Link href="/" className="hover:text-[#F97316]">Privacy Policy</Link></li>
                        <li><Link href="/" className="hover:text-[#F97316]">Terms of Service</Link></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-bold text-[#1E3A8A] text-xs uppercase tracking-[0.2em] opacity-50">Support</h4>
                    <ul className="space-y-3 text-sm font-semibold text-[#1E3A8A]/80">
                        <li><Link href="/" className="hover:text-[#F97316]">FAQ</Link></li>
                        <li><Link href="/" className="hover:text-[#F97316]">Help Desk</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-8 pt-12 mt-12 border-t border-slate-200">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 text-center">
                    © 2024 UyFind Real Estate. Primary Market Specialist.
                </p>
            </div>
        </footer>
    );
}