"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const API_URL = rawApiUrl.replace(/\/$/, '');

export default function FeedbackPage() {
  const params = useParams<{ token: string }>();
  const token = params?.token;
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    if (rating === 0) {
      setError("Пожалуйста, выберите оценку (звёзды)");
      return;
    }
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
      setError(err instanceof Error ? err.message : "Ошибка при отправке");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-100">
        <div className="bg-[#1E3A8A] p-8 text-center text-white">
          <h1 className="text-3xl font-black">Оцените звонок</h1>
          <p className="mt-2 text-blue-100">
            Мы заботимся о качестве работы наших менеджеров.
          </p>
        </div>

        <div className="p-8">
          {submitted ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Спасибо за отзыв!</h2>
              <p className="mt-2 text-slate-500">Ваша оценка поможет нам стать лучше.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="flex flex-col items-center">
                <span className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                  Как бы вы оценили общение?
                </span>
                <div className="flex gap-2 sm:gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`h-12 w-12 sm:h-16 sm:w-16 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-[#F97316] text-[#F97316]"
                            : "fill-transparent text-slate-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Что вам понравилось или не понравилось? (необязательно)
                </label>
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:bg-white focus:ring-2 focus:ring-[#1E3A8A]/10"
                  placeholder="Напишите пару слов о менеджере..."
                />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 p-3 text-center text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={rating === 0}
                className="h-14 w-full rounded-2xl bg-[#1E3A8A] text-lg font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Отправить оценку
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
