"use client";

import { useState } from "react";

const EMAIL = "adamehab828@gmail.com";
const PHONE = "01069607847";

const cards = [
  {
    name: "ADAM",
    handle: "المالك والمطوّر",
    role: "FOUNDER & DEVELOPER",
    badges: ["تطوير", "تصميم", "تحديثات مستمرة"],
    accent: "border-white/20",
  },
  {
    name: "دعم ADAM",
    handle: "تواصل مباشر",
    role: "FAST SUPPORT",
    badges: ["رد سريع", "مساعدة في التحميل", "استفسارات"],
    accent: "border-white/20",
  },
];

export default function ContactCards() {
  const [copied, setCopied] = useState("");

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setCopied("");
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
      {cards.map((card) => (
        <article key={card.name} className="glass-card overflow-hidden rounded-2xl text-right">
          <div className="border-b border-white/10 bg-white/[0.06] px-6 py-3 text-center font-mono text-[11px] font-bold tracking-[0.2em] text-white/80">
            {card.role}
          </div>
          <div className="space-y-5 p-6 md:p-7">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-white/40 bg-white/5 font-display text-xl font-black shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                A
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-black">{card.name}</h3>
                  <span className="text-white/70">✓</span>
                </div>
                <p className="mt-1 text-sm text-white/50">{card.handle}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {card.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/70"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              {[
                { label: "البريد", value: EMAIL, href: `mailto:${EMAIL}`, dir: "ltr" as const },
                { label: "الهاتف", value: PHONE, href: `tel:${PHONE}`, dir: "ltr" as const },
              ].map((item) => (
                <div
                  key={item.value}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] text-white/45">{item.label}</p>
                    <a
                      href={item.href}
                      dir={item.dir}
                      className="block truncate font-mono text-xs font-bold text-white transition hover:text-white/70"
                    >
                      {item.value}
                    </a>
                  </div>
                  <button
                    onClick={() => void copy(item.value)}
                    className={`shrink-0 rounded-lg border px-3 py-1.5 text-[11px] font-bold transition ${
                      copied === item.value
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-white/70 hover:border-white"
                    }`}
                  >
                    {copied === item.value ? "تم النسخ ✓" : "نسخ ⧉"}
                  </button>
                </div>
              ))}
            </div>

            <a href={`mailto:${EMAIL}`} className="btn-ghost w-full text-xs">
              راسلنا الآن <span className="transition group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
