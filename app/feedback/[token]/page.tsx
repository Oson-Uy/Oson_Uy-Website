"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

export default function FeedbackPage() {
  const params = useParams<{ token: string }>();
  const token = params?.token;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    try {
      setError(null);
      const response = await fetch(`${API_URL}/leads/feedback/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      if (!response.ok) {
        throw new Error("Не удалось отправить отзыв");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16 md:py-20">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1E3A8A]">Оценка звонка менеджера</h1>
        <p className="mt-2 text-sm text-slate-600">
          Поделитесь, как прошел разговор после заявки.
        </p>

        {submitted ? (
          <p className="mt-6 rounded-xl bg-green-50 p-4 text-green-700">
            Спасибо! Ваш отзыв сохранен.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block space-y-1">
              <span className="text-sm font-semibold text-slate-700">Оценка (1-5)</span>
              <input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none ring-[#1E3A8A]/30 focus:ring"
                required
              />
            </label>
            <label className="block space-y-1">
              <span className="text-sm font-semibold text-slate-700">Комментарий (опционально)</span>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="min-h-24 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-[#1E3A8A]/30 focus:ring"
                placeholder="Что понравилось или что улучшить?"
              />
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="h-11 rounded-xl bg-[#F97316] px-5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Отправить отзыв
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
