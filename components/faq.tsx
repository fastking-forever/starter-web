"use client";

import { useState } from "react";

const items = [
  {
    q: "هل التحميل مجاني؟",
    a: "أيوه، كل الألعاب متاحة للتحميل المباشر بدون تسجيل أو اشتراك.",
  },
  {
    q: "هل الألعاب شغالة بدون إنترنت؟",
    a: "أيوه، ملفات APK شغالة على الجوال بعد التحميل، وADAM Strike ولعبة الديناصور شغالتين في المتصفح مباشرة.",
  },
  {
    q: "أقدر أتواصل معاك؟",
    a: "أيوه: adamehab828@gmail.com أو 01069607847.",
  },
  {
    q: "أقدر أولّد صورة بالذكاء الاصطناعي؟",
    a: "أيوه، من قسم «استوديو الصور» اكتب وصف الصورة واضغط «ولّد الصورة». النتيجة بالأبيض والأسود وتقدر تحمّلها.",
  },
  {
    q: "مفيش حاجة تختار لك لعبة؟",
    a: "أيوه، قسم «عجلة ADAM» دوّر العجلة وهتقول لك تلعب أنهي واحدة من الألعاب الخمسة.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-white/10 bg-white/[0.015]">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <div className="text-center">
          <span className="section-tag">الأسئلة الشائعة</span>
          <h2 className="section-title mt-5">إجابات سريعة</h2>
        </div>
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {items.map((item, i) => (
            <div key={item.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-5 py-6 text-right transition hover:text-white"
                aria-expanded={open === i}
              >
                <span className="text-lg font-bold">{item.q}</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-lg transition ${open === i ? "rotate-45 border-white" : "text-neutral-500"}`}>
                  +
                </span>
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="max-w-2xl leading-loose text-neutral-400">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
