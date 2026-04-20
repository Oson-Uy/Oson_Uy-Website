import { Shield, Users, BarChart3, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
    const stats = [
        { label: "Partner Developers", value: "24+", icon: Users },
        { label: "Active Projects", value: "120+", icon: Globe },
        { label: "Success Transactions", value: "1,500+", icon: BarChart3 },
        { label: "Verified Data", value: "100%", icon: Shield },
    ];

    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50">
            <div className="w-full px-4 md:px-8 max-w-7xl mx-auto space-y-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                        <h1 className="text-7xl font-black text-[#1E3A8A] tracking-tighter leading-none">
                            Modernizing Real Estate in <span className="text-[#F97316]">Uzbekistan</span>
                        </h1>
                        <p className="text-2xl text-slate-500 font-medium leading-relaxed tracking-tight">
                            At UyFind, we believe that buying a home should be as seamless as ordering a taxi.
                            Our mission is to bring transparency, data-driven decisions, and trust to the primary housing market of Uzbekistan.
                        </p>
                        <div className="flex gap-6 items-center">
                            <div className="h-16 w-2 bg-[#F97316] rounded-full shrink-0"></div>
                            <p className="text-[#1E3A8A] font-bold italic text-lg leading-snug">
                                "Founded by a team of real estate veterans and tech entrepreneurs in Tashkent, 2024."
                            </p>
                        </div>
                    </div>
                    <div className="relative aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white">
                        <img
                            src="https://picsum.photos/seed/tashkent-modern/1000/1000"
                            className="w-full h-full object-cover"
                            alt="About UyFind"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-[#1E3A8A]/10"></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-10 rounded-[2.5rem] text-center space-y-6 shadow-sm border border-slate-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group">
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#F97316] group-hover:scale-110 transition-transform shadow-inner">
                                <stat.icon className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-4xl font-black text-[#1E3A8A] tracking-tight">{stat.value}</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2 leading-none">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-[#1E3A8A] p-16 md:p-28 rounded-[4rem] text-center space-y-10 relative overflow-hidden shadow-2xl shadow-blue-900/20">
                    <div className="absolute bottom-0 left-0 p-12 opacity-5 pointer-events-none">
                        <Shield className="h-64 w-64 text-white" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="text-[#F97316] text-xs font-black uppercase tracking-[0.4em] mb-4">Our Commitment</div>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">Secure & Trusted</h2>
                    </div>
                    <p className="text-xl md:text-2xl text-blue-100/70 max-w-4xl mx-auto font-medium relative z-10 leading-relaxed tracking-tight">
                        Every developer on our platform undergoes a rigorous <span className="text-white font-bold underline decoration-[#F97316] underline-offset-8 decoration-4">30-point verification audit</span>,
                        ensuring your investments are safe and delivery dates are realistic.
                    </p>
                    <div className="relative z-10 pt-8">
                        <Button className="bg-[#F97316] hover:bg-orange-600 text-white px-12 h-16 rounded-2xl font-black text-xl shadow-xl shadow-orange-950/20 active:scale-95 transition-all">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}