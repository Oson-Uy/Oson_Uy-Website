import { Building2 } from "lucide-react";
import { formatProjectsCountParts } from "@/lib/counts";

type ProjectsCountBadgeProps = {
    count: number;
    locale: string;
    className?: string;
};

export function ProjectsCountBadge({
    count,
    locale,
    className,
}: ProjectsCountBadgeProps) {
    const { value, label } = formatProjectsCountParts(count, locale);

    return (
        <div
            className={`inline-flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3 ${className ?? ""}`}
        >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
                <Building2 className="h-5 w-5" />
            </span>
            <div className="leading-tight">
                <p className="text-xl font-black text-[#F97316] tracking-tight tabular-nums">
                    {value}
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {label}
                </p>
            </div>
        </div>
    );
}
