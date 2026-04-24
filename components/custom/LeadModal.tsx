import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectName?: string;
    projectId?: number;
    apartmentId?: number;
}

type ProjectOption = { id: number; name: string };
type ApartmentOption = { id: number; rooms: number; area: number; price: number };
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

export function LeadModal({ isOpen, onClose, projectName, projectId, apartmentId }: LeadModalProps) {
    const t = useTranslations("LeadModal");
    const [formState, setFormState] = useState({ name: "", phone: "+998" });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState<ProjectOption[]>([]);
    const [apartments, setApartments] = useState<ApartmentOption[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
      projectId ?? null,
    );
    const [selectedApartmentId, setSelectedApartmentId] = useState<number | null>(
      apartmentId ?? null,
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    React.useEffect(() => {
      if (!isOpen || projectId) return;
      void (async () => {
        const response = await fetch(`${API_URL}/projects`, { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as ProjectOption[];
        setProjects(data);
        if (!selectedProjectId && data.length) {
          setSelectedProjectId(data[0].id);
        }
      })();
    }, [isOpen, projectId, selectedProjectId]);

    React.useEffect(() => {
      if (!isOpen || !selectedProjectId) return;
      void (async () => {
        const response = await fetch(
          `${API_URL}/apartments?projectId=${selectedProjectId}`,
          { cache: "no-store" },
        );
        if (!response.ok) return;
        const data = (await response.json()) as ApartmentOption[];
        setApartments(data);
        if (apartmentId) {
          setSelectedApartmentId(apartmentId);
          return;
        }
        if (data.length) {
          setSelectedApartmentId(data[0].id);
        }
      })();
    }, [isOpen, selectedProjectId, apartmentId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            if (!selectedProjectId) {
                throw new Error("Please select a project");
            }

            const response = await fetch(`${API_URL}/leads`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formState.name,
                    phone: formState.phone,
                    projectId: selectedProjectId,
                    apartmentId: selectedApartmentId ?? undefined,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to submit lead (${response.status})`);
            }

            setIsSubmitted(true);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Submission failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        if (!val.startsWith("+998")) val = "+998" + val.replace("+998", "");
        setFormState({ ...formState, phone: val });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-0 overflow-hidden rounded-[3rem] border-none shadow-2xl">
                <div className="relative h-40 bg-[#1E3A8A]">
                    <img
                        src="https://picsum.photos/seed/modern-office/600/300?blur=5"
                        alt="header"
                        className="w-full h-full object-cover opacity-30"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-10 pb-8">
                        <DialogTitle className="text-white text-3xl font-black tracking-tight leading-none uppercase italic">{t("title")}</DialogTitle>
                        <p className="text-[#F97316] text-[10px] uppercase font-black tracking-[0.3em] mt-2">{t("tagline")}</p>
                    </div>
                </div>

                <div className="p-10 px-12">
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
                                    {projectName ? (
                                        <>{t("interestPrefix")} <span className="text-[#1E3A8A] font-black">{projectName}</span>? {t("interestSuffix")}</>
                                    ) : (
                                        <>{t("defaultDescription")}</>
                                    )}
                                </p>
                                {errorMessage && (
                                    <p className="mb-4 text-sm text-red-600">{errorMessage}</p>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {!projectId && (
                                        <div className="space-y-2.5">
                                            <Label className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-[0.2em] ml-1 opacity-50">
                                                Project
                                            </Label>
                                            <select
                                                value={selectedProjectId ?? ""}
                                                onChange={(e) =>
                                                    setSelectedProjectId(Number(e.target.value))
                                                }
                                                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#F97316]/10"
                                                required
                                            >
                                                {projects.map((project) => (
                                                    <option key={project.id} value={project.id}>
                                                        {project.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    {apartments.length > 0 && (
                                        <div className="space-y-2.5">
                                            <Label className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-[0.2em] ml-1 opacity-50">
                                                Apartment
                                            </Label>
                                            <select
                                                value={selectedApartmentId ?? ""}
                                                onChange={(e) =>
                                                    setSelectedApartmentId(Number(e.target.value))
                                                }
                                                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#F97316]/10"
                                            >
                                                {apartments.map((apartment) => (
                                                    <option key={apartment.id} value={apartment.id}>
                                                        #{apartment.id} | {apartment.rooms} комн. | {apartment.area} m² | {(apartment.price * 13000).toLocaleString()} UZS
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    <div className="space-y-2.5">
                                        <Label className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-[0.2em] ml-1 opacity-50">{t("fullName")}</Label>
                                        <div className="relative group">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F97316] h-5 w-5 transition-colors" />
                                            <Input
                                                required
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                className="h-14 pl-14 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#F97316]/10 transition-all font-semibold"
                                                placeholder="e.g. John Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2.5">
                                        <Label className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-[0.2em] ml-1 opacity-50">{t("phone")}</Label>
                                        <div className="relative group">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F97316] h-5 w-5 transition-colors" />
                                            <Input
                                                required
                                                type="tel"
                                                value={formState.phone}
                                                onChange={handlePhoneChange}
                                                className="h-14 pl-14 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#F97316]/10 transition-all font-semibold"
                                                placeholder="+998"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-16 bg-[#F97316] hover:bg-orange-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98] mt-4 border-none uppercase tracking-widest"
                                    >
                                        {isLoading ? t("sending") : t("submit")}
                                    </Button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10 space-y-6"
                            >
                                <div className="flex justify-center">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black text-[#1E3A8A]">{t("success")}</h3>
                                    <p className="text-slate-500 font-medium">{t("successDescription")}</p>
                                </div>
                                <Button variant="ghost" onClick={onClose} className="mt-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]">{t("close")}</Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <p className="mt-12 text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest opacity-60">
                        {t("privacy")}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}