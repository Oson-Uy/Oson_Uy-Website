"use client";

import { useEffect, useState } from "react";
import { formatUzs } from "@/lib/currency";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

// Assumes the backend runs on port 4000 locally
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const API_URL = rawApiUrl.replace(/\/$/, '');

type Invoice = {
  id: number;
  projectId: number;
  plan: string;
  amountUzs: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  project: {
    name: string;
    developer: {
      name: string;
      email: string;
    };
  };
};

type Subscription = {
  id: number;
  projectId: number;
  plan: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  project: {
    name: string;
    developer: {
      name: string;
    };
  };
};

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
}

export default function AdminBillingPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminKey, setAdminKey] = useState<string | null>(null);

  useEffect(() => {
    const key = getCookie("osonuy_admin_key");
    if (!key) {
      router.push("/admin/login");
      return;
    }
    setAdminKey(key);
    fetchData(key);
  }, [router]);

  const fetchData = async (key: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const [invRes, subRes] = await Promise.all([
        fetch(`${API_URL}/billing/admin/invoices`, { headers: { "x-admin-key": key } }),
        fetch(`${API_URL}/billing/admin/subscriptions`, { headers: { "x-admin-key": key } })
      ]);

      if (!invRes.ok || !subRes.ok) {
        throw new Error("Неверный Admin Key или ошибка сервера");
      }

      const invData = await invRes.json();
      const subData = await subRes.json();

      setInvoices(invData);
      setSubscriptions(subData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
      if (err instanceof Error && err.message.includes("Неверный Admin Key")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "osonuy_admin_key=; path=/; max-age=0";
    router.push("/admin/login");
  };

  const handleConfirmPayment = async (invoiceId: number) => {
    if (!confirm(`Подтвердить оплату по инвойсу #${invoiceId}?`)) return;
    if (!adminKey) return;

    try {
      const res = await fetch(`${API_URL}/billing/admin/confirm-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ invoiceId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Ошибка подтверждения");
      }

      alert("Оплата успешно подтверждена!");
      fetchData(adminKey); // Refresh data
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ошибка");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-500 font-medium">Загрузка данных...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Управление Биллингом</h1>
            <p className="text-sm text-slate-500">Панель администратора OsonUy</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
          >
            <LogOut className="h-4 w-4" />
            Выйти
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10 space-y-12">
        {error && (
          <div className="rounded-2xl bg-red-50 p-4 border border-red-200 text-red-700 font-medium">
            {error}
          </div>
        )}

        <section>
          <h2 className="mb-6 text-xl font-bold text-slate-800 flex items-center gap-3">
            Счета на оплату
            <span className="bg-orange-100 text-orange-700 text-xs py-1 px-2.5 rounded-full font-black">
              {invoices.length}
            </span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-bold">ID</th>
                  <th className="px-6 py-4 font-bold">Застройщик / Проект</th>
                  <th className="px-6 py-4 font-bold">Тариф</th>
                  <th className="px-6 py-4 font-bold">Сумма (UZS)</th>
                  <th className="px-6 py-4 font-bold">Статус</th>
                  <th className="px-6 py-4 font-bold">Дата</th>
                  <th className="px-6 py-4 font-bold text-right">Действие</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-slate-500">Нет счетов</td></tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 font-black text-slate-400">#{inv.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{inv.project?.developer?.name || "Неизвестно"}</div>
                        <div className="text-xs font-medium text-slate-500 mt-0.5">{inv.project?.name || "Без названия"}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-[#F97316]">{inv.plan || "-"}</td>
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {inv.amountUzs ? formatUzs(inv.amountUzs) : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-wider ${
                          inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 
                          inv.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">
                        {new Date(inv.createdAt).toLocaleString('ru-RU')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {inv.status === 'PENDING' && (
                          <button
                            onClick={() => handleConfirmPayment(inv.id)}
                            className="rounded-lg bg-[#00C48C] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#00a877] active:scale-95"
                          >
                            Подтвердить
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-xl font-bold text-slate-800 flex items-center gap-3">
            Активные подписки
            <span className="bg-blue-100 text-blue-700 text-xs py-1 px-2.5 rounded-full font-black">
              {subscriptions.length}
            </span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-bold">Проект / Застройщик</th>
                  <th className="px-6 py-4 font-bold">Тариф</th>
                  <th className="px-6 py-4 font-bold">Статус</th>
                  <th className="px-6 py-4 font-bold">Начало</th>
                  <th className="px-6 py-4 font-bold">Конец</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscriptions.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Нет подписок</td></tr>
                ) : (
                  subscriptions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{sub.project?.name || "Без названия"}</div>
                        <div className="text-xs font-medium text-slate-500 mt-0.5">{sub.project?.developer?.name || "Неизвестно"}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-[#1E3A8A]">{sub.plan}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-wider ${
                          sub.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 
                          sub.status === 'TRIAL' ? 'bg-blue-100 text-blue-700' : 
                          sub.status === 'PAST_DUE' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">
                        {sub.currentPeriodStart ? new Date(sub.currentPeriodStart).toLocaleDateString('ru-RU') : '-'}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">
                        {sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString('ru-RU') : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
