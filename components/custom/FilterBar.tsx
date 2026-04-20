import { Search, MapPin, DollarSign, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FilterBar() {
    return (
        <div className="bg-[#1E3A8A] p-6 rounded-[2rem] shadow-2xl shadow-blue-900/20 flex flex-col md:flex-row items-end gap-4 max-w-5xl mx-auto w-full border border-white/10 text-white">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70 ml-1">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-[#F97316] h-4 w-4 transition-colors" />
                        <select className="w-full bg-blue-800/50 border border-blue-700/50 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 ring-[#F97316]/50 appearance-none cursor-pointer">
                            <option className="bg-[#1E3A8A]">Tashkent City</option>
                            <option className="bg-[#1E3A8A]">Samarkand</option>
                            <option className="bg-[#1E3A8A]">Bukhara</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70 ml-1">Price Range</label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-[#F97316] h-4 w-4 transition-colors" />
                        <select className="w-full bg-blue-800/50 border border-blue-700/50 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 ring-[#F97316]/50 appearance-none cursor-pointer">
                            <option className="bg-[#1E3A8A]">$100k - $200k</option>
                            <option className="bg-[#1E3A8A]">$200k - $500k</option>
                            <option className="bg-[#1E3A8A]">$500k+</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70 ml-1">Rooms</label>
                    <div className="relative">
                        <Bed className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-[#F97316] h-4 w-4 transition-colors" />
                        <select className="w-full bg-blue-800/50 border border-blue-700/50 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 ring-[#F97316]/50 appearance-none cursor-pointer">
                            <option className="bg-[#1E3A8A]">1+ Bedroom</option>
                            <option className="bg-[#1E3A8A]">2+ Bedrooms</option>
                            <option className="bg-[#1E3A8A]">3+ Bedrooms</option>
                        </select>
                    </div>
                </div>
            </div>
            <Button className="w-full md:w-auto bg-[#F97316] hover:bg-orange-600 text-white px-10 h-13 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20 active:scale-95 shrink-0 border-none">
                <Search className="h-5 w-5" />
                Search
            </Button>
        </div>
    );
}
