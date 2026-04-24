"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, CheckCircle2, Building2, Home, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "../ui/badge";

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
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(projectId ?? null);
    const [selectedApartmentId, setSelectedApartmentId] = useState<number | null>(apartmentId ?? null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen || projectId) return;
        (async () => {
            try {
                const response = await fetch(`${API_URL}/projects`);
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                    if (!selectedProjectId && data.length) setSelectedProjectId(data[0].id);
                }
            } catch (e) { console.error(e); }
        })();
    }, [isOpen, projectId]);

    useEffect(() => {
        if (!isOpen || !selectedProjectId) return;
        (async () => {
            try {
                const response = await fetch(`${API_URL}/apartments?projectId=${selectedProjectId}`);
                if (response.ok) {
                    const data = await response.json();
                    setApartments(data);
                    if (!apartmentId && data.length) setSelectedApartmentId(data[0].id);
                }
            } catch (e) { console.error(e); }
        })();
    }, [isOpen, selectedProjectId, apartmentId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);
        try {
            const response = await fetch(`${API_URL}/leads`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formState.name,
                    phone: formState.phone,
                    projectId: selectedProjectId,
                    apartmentId: selectedApartmentId,
                }),
            });
            if (!response.ok) throw new Error("Error");
            setIsSubmitted(true);
        } catch (error) {
            setErrorMessage("Произошла ошибка при отправке");
        } finally {
            setIsLoading(false);
        }
    };

    const inputWrapper = "relative group flex flex-col space-y-2";
    const inputIcon = "absolute left-6 top-[52px] -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors w-6 h-6 z-10";
    const sharedInputClass = "h-20 pl-16 bg-slate-50 border-slate-200 rounded-[1.5rem] focus:ring-8 focus:ring-accent/5 focus:border-accent transition-all font-bold text-xl text-primary placeholder:text-slate-300";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="!max-w-[95vw] md:!max-w-6xl p-0 overflow-hidden rounded-[3rem] border-none shadow-2xl bg-white outline-none">
                <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[750px]">

                    <div className="relative w-full md:w-[42%] bg-primary overflow-hidden flex flex-col justify-end p-10 md:p-16">
                        <img
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
                            alt="bg"
                            className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />

                        <div className="relative z-10">
                            <Badge className="mb-6 bg-accent text-white border-none uppercase text-xs tracking-[0.3em] font-black px-6 py-2 rounded-full">
                                {t("tagline") || "Exclusive Offer"}
                            </Badge>
                            <DialogTitle className="text-white text-4xl md:text-6xl font-black leading-[1.05] uppercase italic">
                                {t("title")}
                            </DialogTitle>
                            <p className="text-white/50 mt-8 text-lg hidden md:block leading-relaxed max-w-sm">
                                {projectName ? `${t("interestPrefix")} ${projectName}` : "Оставьте заявку для получения персонального предложения и планировок."}
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-[58%] p-10 md:p-20 flex flex-col justify-center bg-white">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-10"
                                >
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 gap-6">
                                            {!projectId && projects.length > 0 && (
                                                <div className={inputWrapper}>
                                                    <Label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] ml-2">{t("projectLabel") || "Project"}</Label>
                                                    <Building2 className={inputIcon} />
                                                    <select
                                                        value={selectedProjectId ?? ""}
                                                        onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                                                        className={sharedInputClass + " appearance-none cursor-pointer"}
                                                    >
                                                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                                    </select>
                                                </div>
                                            )}

                                            {!apartmentId && apartments.length > 0 && (
                                                <div className={inputWrapper}>
                                                    <Label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] ml-2">{t("apartmentLabel") || "Apartment"}</Label>
                                                    <Home className={inputIcon} />
                                                    <select
                                                        value={selectedApartmentId ?? ""}
                                                        onChange={(e) => setSelectedApartmentId(Number(e.target.value))}
                                                        className={sharedInputClass + " appearance-none cursor-pointer"}
                                                    >
                                                        {apartments.map(a => (
                                                            <option key={a.id} value={a.id}>
                                                                {a.rooms} комн. • {a.area}м² • {(a.price * 13000).toLocaleString()} UZS
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}

                                            <div className={inputWrapper}>
                                                <Label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] ml-2">{t("fullName")}</Label>
                                                <User className={inputIcon} />
                                                <Input
                                                    required
                                                    value={formState.name}
                                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                    className={sharedInputClass}
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div className={inputWrapper}>
                                                <Label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] ml-2">{t("phone")}</Label>
                                                <Phone className={inputIcon} />
                                                <Input
                                                    required
                                                    type="tel"
                                                    value={formState.phone}
                                                    onChange={(e) => {
                                                        let val = e.target.value;
                                                        if (!val.startsWith("+998")) val = "+998" + val.replace("+998", "");
                                                        setFormState({ ...formState, phone: val });
                                                    }}
                                                    className={sharedInputClass}
                                                />
                                            </div>
                                        </div>

                                        {errorMessage && (
                                            <p className="text-sm font-bold text-red-500 bg-red-50 p-4 rounded-2xl border border-red-100 italic text-center">
                                                {errorMessage}
                                            </p>
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full h-24 bg-accent hover:bg-accent/90 text-white font-black text-2xl rounded-[2rem] shadow-2xl shadow-accent/40 transition-all active:scale-[0.98] flex items-center justify-center gap-4 uppercase tracking-tighter"
                                        >
                                            {isLoading ? <Loader2 className="animate-spin w-8 h-8" /> : (
                                                <>{t("submit")} <ChevronRight className="w-7 h-7" /></>
                                            )}
                                        </Button>
                                    </form>

                                    <p className="text-[11px] text-center text-slate-400 font-bold uppercase tracking-[0.25em] leading-relaxed max-w-md mx-auto">
                                        {t("privacy") || "We value your privacy. By clicking submit, you agree to our terms."}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-10"
                                >
                                    <div className="relative mx-auto w-32 h-32">
                                        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
                                        <div className="relative bg-green-50 rounded-full w-full h-full flex items-center justify-center">
                                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-5xl font-black text-primary uppercase italic leading-none">{t("success")}</h3>
                                        <p className="text-slate-500 text-xl font-medium">{t("successDescription")}</p>
                                    </div>
                                    <Button
                                        onClick={onClose}
                                        className="rounded-3xl px-16 h-16 font-black text-xl bg-primary text-white hover:bg-primary/90 transition-all"
                                    >
                                        {t("close")}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}