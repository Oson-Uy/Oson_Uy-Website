import { getLocale } from "next-intl/server";
import { getAboutContent } from "@/content/about";

/** Server-rendered long-form About content: story, mission/vision, how-we-work,
 *  verification process, advantages and FAQ. */
export default async function AboutSeoContent() {
  const locale = await getLocale();
  const c = getAboutContent(locale);

  return (
    <div className="bg-white">
      {/* Story */}
      <section className="border-t border-slate-100 py-16 md:py-24">
        <div className="container mx-auto max-w-[1250px] px-5">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1E3A8A]">
              {c.story.title}
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-600">
              {c.story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto grid max-w-[1250px] gap-5 px-5 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-8">
            <h2 className="text-xl font-black text-[#1E3A8A]">{c.missionVision.missionTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{c.missionVision.mission}</p>
          </div>
          <div className="rounded-[2rem] border border-slate-100 bg-white p-8">
            <h2 className="text-xl font-black text-[#1E3A8A]">{c.missionVision.visionTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{c.missionVision.vision}</p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1E3A8A]">
            {c.howWeWork.title}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.howWeWork.steps.map((s, i) => (
              <div key={i} className="rounded-[2rem] border border-slate-100 bg-white p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F97316]/10 text-base font-black text-[#F97316]">
                  {i + 1}
                </div>
                <h3 className="text-base font-black text-slate-900">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="bg-[#1E3A8A] py-16 md:py-24">
        <div className="container mx-auto max-w-[1250px] px-5">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              {c.verification.title}
            </h2>
            <p className="mt-4 text-base font-medium text-blue-100/85">{c.verification.intro}</p>
            <ul className="mt-6 space-y-3">
              {c.verification.steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-blue-50">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-white">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1E3A8A]">
            {c.advantages.title}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.advantages.items.map((it, i) => (
              <div key={i} className="rounded-[2rem] border border-slate-100 bg-white p-6">
                <h3 className="text-base font-black text-slate-900">{it.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto max-w-[1250px] px-5">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1E3A8A]">
            {c.faqTitle}
          </h2>
          <div className="mt-8 max-w-3xl space-y-3">
            {c.faq.map((item, i) => (
              <details key={i} className="group rounded-2xl border border-slate-100 bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-black text-slate-900">
                  {item.q}
                  <span className="text-[#1E3A8A] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
