"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    User,
    Phone,
    CheckCircle2,
    Building2,
    ChevronRight,
    Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "../ui/badge";
import { formatUzPhoneInput, normalizeUzPhoneDigits } from "@/lib/phone";

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectName?: string;
    projectId?: number;
    apartmentId?: number;
    initialName?: string;
    initialPhone?: string;
}

type ProjectOption = { id: number; name: string };
type ApartmentOption = { id: number; rooms: number; area: number; price: number };
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

export function LeadModal({ 
    isOpen, 
    onClose, 
    projectName, 
    projectId, 
    apartmentId,
    initialName = "",
    initialPhone = "+998"
}: LeadModalProps) {
    const t = useTranslations("LeadModal");
    const [formState, setFormState] = useState({ name: initialName, phone: initialPhone });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState<ProjectOption[]>([]);
    const [apartments, setApartments] = useState<ApartmentOption[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(projectId ?? null);
    const [selectedApartmentId, setSelectedApartmentId] = useState<number | null>(apartmentId ?? null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Update formState when initial props change or when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormState({ name: initialName, phone: initialPhone });
            setSelectedProjectId(projectId ?? null);
            setSelectedApartmentId(apartmentId ?? null);
            setIsSubmitted(false);
        }
    }, [isOpen, initialName, initialPhone, projectId, apartmentId]);
    
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
    }, [isOpen, projectId, selectedProjectId]);

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

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({
            ...prev,
            phone: formatUzPhoneInput(e.target.value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);
        try {
            const cleanPhone = normalizeUzPhoneDigits(formState.phone);
            if (cleanPhone.length !== 12) {
                throw new Error("Неверный формат номера");
            }

            const response = await fetch(`${API_URL}/leads`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formState.name,
                    phone: cleanPhone,
                    projectId: selectedProjectId,
                    apartmentId: selectedApartmentId,
                }),
            });
            if (!response.ok) throw new Error("Error");
            setIsSubmitted(true);
        } catch (error: any) {
            setErrorMessage(error.message === "Неверный формат номера"
                ? "Введите полный номер телефона"
                : "Произошла ошибка при отправке");
        } finally {
            setIsLoading(false);
        }
    };

    const inputWrapper = "relative group flex flex-col space-y-1.5";
    const inputIcon = "absolute left-4 top-[42px] -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors w-5 h-5 z-10";
    const sharedInputClass = "h-14 pl-12 bg-slate-50 border-slate-200 rounded-2xl focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all font-bold text-base text-primary placeholder:text-slate-300 w-full";

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="!max-w-[95vw] md:!max-w-5xl p-0 overflow-hidden rounded-[2rem] md:rounded-[3rem] border-none shadow-2xl bg-white outline-none max-h-[90vh] overflow-y-auto [&>button]:right-4 [&>button]:top-4 md:[&>button]:right-5 md:[&>button]:top-5">
                <div className="flex flex-col md:flex-row min-h-0">

                    <div className="relative w-full md:w-[40%] bg-primary overflow-hidden flex flex-col justify-end p-6 md:p-12 min-h-[180px] md:min-h-full">
                        <img
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
                            alt="bg"
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />

                        <div className="relative z-10">
                            <Badge className="mb-3 bg-accent text-white border-none uppercase text-[10px] tracking-widest font-black px-4 py-1 rounded-full">
                                {t("tagline") || "Exclusive"}
                            </Badge>
                            <DialogTitle className="text-white text-2xl md:text-5xl font-black leading-tight uppercase italic">
                                {t("title")}
                            </DialogTitle>
                        </div>
                    </div>

                    <div className="w-full md:w-[60%] p-6 md:p-12 flex flex-col justify-center bg-white">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-6"
                                >
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            {!projectId && projects.length > 0 && (
                                                <div className={inputWrapper}>
                                                    <Label className="text-[10px] font-black text-primary/40 uppercase tracking-wider ml-2">{t("projectLabel") || "Проект"}</Label>
                                                    <Building2 className={inputIcon} />
                                                    <select
                                                        value={selectedProjectId ?? ""}
                                                        onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                                                        className={sharedInputClass + " appearance-none cursor-pointer bg-no-repeat"}
                                                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23cbd5e1\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
                                                    >
                                                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                                    </select>
                                                </div>
                                            )}

                                            <div className={inputWrapper}>
                                                <Label className="text-[10px] font-black text-primary/40 uppercase tracking-wider ml-2">{t("fullName")}</Label>
                                                <User className={inputIcon} />
                                                <Input
                                                    required
                                                    value={formState.name}
                                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                    className={sharedInputClass}
                                                    placeholder="Ваше имя"
                                                />
                                            </div>

                                            <div className={inputWrapper}>
                                                <Label className="text-[10px] font-black text-primary/40 uppercase tracking-wider ml-2">{t("phone")}</Label>
                                                <Phone className={inputIcon} />
                                                <Input
                                                    type="tel"
                                                    required
                                                    value={formState.phone}
                                                    onChange={handlePhoneChange}
                                                    className={sharedInputClass}
                                                    placeholder="+998 90 123 45 67"
                                                />
                                            </div>
                                        </div>

                                        {errorMessage && (
                                            <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 text-center italic">
                                                {errorMessage}
                                            </p>
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full h-16 bg-accent hover:bg-accent/90 text-white font-black text-xl rounded-2xl shadow-xl shadow-accent/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase"
                                        >
                                            {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                                                <>{t("submit")} <ChevronRight className="w-5 h-5" /></>
                                            )}
                                        </Button>
                                    </form>

                                    <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest leading-relaxed px-4">
                                        {t("privacy") || "Отправляя форму, вы соглашаетесь на обработку персональных данных"}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-6 py-8"
                                >
                                    <div className="relative mx-auto w-20 h-20">
                                        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
                                        <div className="relative bg-green-50 rounded-full w-full h-full flex items-center justify-center">
                                            <CheckCircle2 className="h-10 w-10 text-green-500" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black text-primary uppercase italic leading-none">{t("success")}</h3>
                                        <p className="text-slate-500 text-base">{t("successDescription")}</p>
                                    </div>
                                    <Button
                                        onClick={onClose}
                                        className="rounded-2xl px-10 h-14 font-black text-lg bg-primary text-white hover:bg-primary/90"
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
