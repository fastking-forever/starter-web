"use client";

import { useMemo, useState } from "react";

type Game = {
  name: string;
  desc: string;
  file: string;
  size: string;
  category: "android" | "browser" | "football" | "space";
  tag: string;
  glyph: string;
};

const games: Game[] = [
  { name: "Subway by adam", desc: "جري ومراوغة في الشارع — نسخة ADAM (سبواي)", file: "subway-by-adam.apk", size: "3.6 MB", category: "android", tag: "أندرويد", glyph: "⤴" },
  { name: "ADAM Football", desc: "كرة قدم على الجوال (كوره)", file: "adam-football.apk", size: "3 MB", category: "football", tag: "أندرويد · كرة", glyph: "◉" },
  { name: "ADAM Strike", desc: "لعبة فضائية بضرب النار (استريك · نت في الفضاء)", file: "adam-strike.apk", size: "3.9 MB", category: "space", tag: "أندرويد · فضاء", glyph: "✦" },
  { name: "يومك أهم", desc: "لعبة اليوم والوقت", file: "waqtak-aham.apk", size: "2.6 MB", category: "android", tag: "أندرويد", glyph: "◷" },
  { name: "ADAM Game", desc: "أول لعبة في السلسلة (اول واحده)", file: "adam-game.apk", size: "4 MB", category: "android", tag: "أندرويد", glyph: "◆" },
];

const filters = [
  { id: "all", label: "الكل" },
  { id: "android", label: "أندرويد" },
  { id: "football", label: "كرة القدم" },
  { id: "space", label: "فضاء وأكشن" },
] as const;

export default function GameLibrary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [copied, setCopied] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return games.filter(
      (g) =>
        (filter === "all" || g.category === filter) &&
        (!q || `${g.name} ${g.desc} ${g.tag}`.toLowerCase().includes(q)),
    );
  }, [query, filter]);

  async function copyLink(file: string) {
    const link = `${window.location.origin}/downloads/${file}`;
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const field = document.createElement("textarea");
      field.value = link;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(file);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <section id="games" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <span className="section-tag">مكتبة الألعاب</span>
          <h2 className="section-title mt-5">كل ألعاب ADAM</h2>
          <p className="section-desc mx-auto mt-3 max-w-xl">
            ابحث، صفّي، ونزّل مباشرة. بدون تسجيل وبدون انتظار.
          </p>
          <div className="mt-5 inline-flex rounded-full border border-white/15 px-5 py-2 text-sm text-white/60">
            <span className="font-bold text-white">{visible.length}</span>&nbsp; لعبة متاحة
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن لعبة..."
              className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 pr-10 text-sm outline-none transition placeholder:text-neutral-600 focus:border-white/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                  filter === f.id
                    ? "border-white bg-white text-black"
                    : "border-white/15 text-neutral-400 hover:border-white/50 hover:text-white"
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
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-xl text-neutral-300 transition group-hover:border-white/50 group-hover:text-white">
                    {g.glyph}
                  </span>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-neutral-500">{g.tag}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{g.name}</h3>
                <p className="mt-1.5 text-xs text-neutral-500">{g.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs text-neutral-600">{g.size}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => void copyLink(g.file)}
                      title="نسخ رابط التحميل"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-xs text-neutral-500 transition hover:border-white/40 hover:text-white"
                    >
                      {copied === g.file ? "✓" : "⧉"}
                    </button>
                    <a
                      href={`/downloads/${g.file}`}
                      download
                      className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-neutral-300"
                    >
                      تحميل ↓
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-9 rounded-2xl border border-dashed border-white/15 p-14 text-center text-neutral-500">
            مفيش لعبة بالاسم ده. جرّب كلمة تانية.
          </div>
        )}
      </div>
    </section>
  );
}
