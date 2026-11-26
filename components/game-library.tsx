"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import GameCover, { type CoverKind } from "./game-cover";

type Game = {
  name: string;
  desc: string;
  file: string;
  size: string;
  category: "android" | "football" | "space" | "utility";
  tag: string;
  cover: CoverKind;
  keywords: string;
};

// Titles stay exactly as requested; descriptions reflect what is really inside
// each APK (verified from the packaged app metadata and assets).
const games: Game[] = [
  {
    name: "Subway by adam",
    desc: "جري ومراوغة في زيورخ — نسخة ADAM من Subway Surfers",
    file: "subway-by-adam.apk",
    size: "3.75 MB",
    category: "android",
    tag: "أندرويد · جري",
    cover: "subway",
    keywords: "subway surfers zurich سبواي زيورخ جري مراوغة قطار",
  },
  {
    name: "ADAM Football",
    desc: "ماتش كرة قدم سريع على الجوال — إيطاليا ضد فرنسا",
    file: "adam-football.apk",
    size: "3.18 MB",
    category: "football",
    tag: "أندرويد · كرة",
    cover: "football",
    keywords: "football كورة كرة قدم ماتش ايطاليا فرنسا هدف حارس",
  },
  {
    name: "ADAM Strike",
    desc: "فضاء وضرب نار مع موجات وزعماء — نسخة ADAM",
    file: "adam-strike.apk",
    size: "4.05 MB",
    category: "space",
    tag: "أندرويد · فضاء",
    cover: "strike",
    keywords: "strike استريك فضاء ضرب نار موجات بوس shield dash نت في الفضاء",
  },
  {
    name: "يومك أهم",
    desc: "تو دو ليست بالمنبهات والإشعارات — من تنظيم ADAM",
    file: "waqtak-aham.apk",
    size: "2.75 MB",
    category: "utility",
    tag: "أندرويد · تنظيم",
    cover: "waqtak",
    keywords: "وقتك اهم تودو ليست منبه تنبيهات إشعارات وقت يوممهام",
  },
  {
    name: "ADAM Game",
    desc: "Neon Breaker — اكسر الطوب واصطد القوى الخارقة",
    file: "adam-game.apk",
    size: "4.24 MB",
    category: "android",
    tag: "أندرويد · كلاسيك",
    cover: "bricks",
    keywords: "adam game نيون بريكر برك اكسر الطوب كرة مضرب powers",
  },
];

const filters = [
  { id: "all", label: "الكل" },
  { id: "android", label: "أندرويد" },
  { id: "football", label: "كرة القدم" },
  { id: "space", label: "فضاء وأكشن" },
  { id: "utility", label: "تنظيم" },
] as const;

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[\u064B-\u065F]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");

export default function GameLibrary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [copied, setCopied] = useState<string | null>(null);
  const [copyMessage, setCopyMessage] = useState("");
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    };
  }, []);

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return games.filter(
      (g) =>
        (filter === "all" || g.category === filter) &&
        (!q || normalize(`${g.name} ${g.desc} ${g.tag} ${g.keywords}`).includes(q)),
    );
  }, [query, filter]);

  const resetSearch = () => {
    setQuery("");
    setFilter("all");
  };

  async function copyLink(game: Game) {
    const link = `${window.location.origin}/downloads/${game.file}`;
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const active = document.activeElement as HTMLElement | null;
      const selection = window.getSelection();
      const range = selection?.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
      const field = document.createElement("textarea");
      field.value = link;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
      active?.focus();
      if (range && selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    setCopied(game.file);
    setCopyMessage(`تم نسخ رابط ${game.name}`);
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => {
      setCopied(null);
      setCopyMessage("");
    }, 1800);
  }

  return (
    <section id="games" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div className="text-center">
          <span className="section-tag">مكتبة الألعاب</span>
          <h2 className="section-title mt-5">كل ألعاب ADAM</h2>
          <p className="section-desc mx-auto mt-3 max-w-xl">
            ابحث، صفّي، ونزّل مباشرة. بدون تسجيل وبدون انتظار.
          </p>
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="mt-5 inline-flex rounded-full border border-white/15 px-5 py-2 text-sm text-white/60"
          >
            <span className="font-bold text-white">{visible.length}</span>&nbsp; لعبة متاحة
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
              enterKeyHint="search"
              aria-label="ابحث عن لعبة"
              aria-describedby="games-search-hint"
              placeholder="ابحث عن لعبة..."
              className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 pr-11 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#7FF2B0]/60"
            />
            <span id="games-search-hint" className="sr-only">
              يمكنك البحث باسم اللعبة أو بنوعها أو بكلمات مثل سبواي ونيون بريكر.
            </span>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="مسح البحث"
                className="absolute left-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
          <div role="group" aria-label="تصفية الألعاب" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full border px-4 py-2.5 text-xs font-bold transition ${
                  filter === f.id
                    ? "border-[#7FF2B0] bg-[#7FF2B0] text-[#06100C]"
                    : "border-white/15 text-neutral-300 hover:border-[#7FF2B0]/50 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {visible.length ? (
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((g) => (
              <article
                key={g.file}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:-translate-y-1 hover:border-[#7FF2B0]/50 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-2">
                  <GameCover kind={g.cover} />
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-neutral-400">{g.tag}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{g.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-300">{g.desc}</p>
                <div className="mt-6 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                  <span dir="ltr" lang="en" className="text-xs text-neutral-400">{g.size}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void copyLink(g)}
                      title={copied === g.file ? `تم نسخ رابط ${g.name}` : `نسخ رابط تحميل ${g.name}`}
                      aria-label={copied === g.file ? `تم نسخ رابط ${g.name}` : `نسخ رابط تحميل ${g.name}`}
                      className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-xs text-neutral-300 transition hover:border-[#7FF2B0]/50 hover:text-[#7FF2B0]"
                    >
                      <span aria-hidden="true">{copied === g.file ? "✓" : "⧉"}</span>
                    </button>
                    <a
                      href={`/downloads/${g.file}`}
                      download={g.file}
                      aria-label={`تحميل ${g.name} — ملف APK بحجم ${g.size}`}
                      className="cta-mint inline-flex min-h-11 items-center rounded-lg px-5 py-2.5 text-xs font-bold"
                    >
                      تحميل ↓
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div role="status" className="mt-9 rounded-2xl border border-dashed border-white/15 p-14 text-center text-neutral-300">
            <p>مفيش لعبة مطابقة للبحث أو التصفية الحالية.</p>
            <button type="button" onClick={resetSearch} className="cta-mint mt-5 rounded-lg px-5 py-2.5 text-xs font-bold">
              عرض كل الألعاب ↺
            </button>
          </div>
        )}
      </div>
      {copyMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#7FF2B0]/40 bg-[#06100C]/95 px-5 py-2.5 text-xs font-bold text-[#7FF2B0] shadow-lg shadow-black/40 backdrop-blur"
        >
          {copyMessage}
        </div>
      )}
    </section>
  );
}
