"use client";

import { useEffect, useState } from "react";

type Item = { url: string; prompt: string; seed: number };

const STORAGE_KEY = "adam-image-history";
const ideas = [
  "شعار ADAM لعبة فضاء بكسل",
  "ملعب كرة ليلاً تحت الأضواء",
  "ديناصور بكسل في مدينة مهجورة",
  "سفينة فضاء فوق كوكب أبيض",
];

export default function ImageStudio() {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState(42);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<Item[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw).slice(0, 6) as Item[]);
    } catch {
      // Ignore unreadable local storage.
    }
  }, []);

  function remember(item: Item) {
    setHistory((prev) => {
      const next = [item, ...prev.filter((p) => p.url !== item.url)].slice(0, 6);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage may be disabled.
      }
      return next;
    });
  }

  function generate() {
    const text = prompt.trim();
    if (!text || loading) return;

    setLoading(true);
    setError("");
    const nextSeed = Math.floor(Math.random() * 999999);
    setSeed(nextSeed);
    const localUrl = `/api/image?prompt=${encodeURIComponent(text)}&seed=${nextSeed}`;
    const finalPrompt = `${text} — monochrome, black and white, high contrast, clean composition, no text`;
    const directUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=768&height=768&seed=${nextSeed}`;

    const load = (url: string, fallback?: string) => {
      const img = new window.Image();
      img.onload = () => {
        setImage(url);
        remember({ url, prompt: text, seed: nextSeed });
        setLoading(false);
      };
      img.onerror = () => {
        if (fallback) {
          load(fallback);
        } else {
          setError("الصورة لسه مش جاهزة — الخدمة المجانية بتسمح بصورة كل 45 ثانية. جرّب تاني بعد شوية.");
          setLoading(false);
        }
      };
      img.src = url;
    };

    load(localUrl, directUrl);
  }

  async function download() {
    if (!image) return;
    try {
      const res = await fetch(image);
      const blob = await res.blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = `adam-${seed}.jpg`;
      a.click();
      URL.revokeObjectURL(href);
    } catch {
      window.open(image, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <section id="create" className="border-t border-white/10 bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-neutral-500">استوديو ADAM</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">اكتب فكرة، وشوفها صورة</h2>
            <p className="mt-4 max-w-xl text-sm leading-loose text-neutral-400">
              ولّد صورة بالذكاء الاصطناعي من وصف بالعربي. النتيجة بالأبيض والأسود عشان تفضل روح الموقع.
            </p>
          </div>
          <span className="rounded-full border border-white/20 px-4 py-2 text-xs text-neutral-400">
            ✦ AI IMAGE STUDIO
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-white/15 bg-white/[0.02] p-6">
            <label className="text-xs font-bold text-neutral-400" htmlFor="image-prompt">وصف الصورة</label>
            <textarea
              id="image-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              placeholder="مثال: ديناصور بكسل بيقفز فوق صبار في الفضاء..."
              className="mt-3 w-full resize-none rounded-xl border border-white/15 bg-black/40 p-4 text-sm leading-relaxed outline-none placeholder:text-neutral-600 focus:border-white/60"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {ideas.map((idea) => (
                <button
                  key={idea}
                  onClick={() => setPrompt(idea)}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-neutral-400 transition hover:border-white hover:text-white"
                >
                  {idea}
                </button>
              ))}
            </div>
            <button
              onClick={generate}
              disabled={loading || !prompt.trim()}
              className="mt-6 w-full rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-black transition hover:bg-neutral-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "جارٍ التوليد..." : "ولّد الصورة ✦"}
            </button>
            <p className="mt-3 text-center text-[11px] text-neutral-600">
              مجاني بدون تسجيل · صورة واحدة كل 45 ثانية تقريباً · البذرة {seed}
            </p>
            {error && <p className="mt-3 text-xs leading-relaxed text-neutral-300">{error}</p>}
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/[0.02] p-4">
            <div className="grid aspect-square place-items-center overflow-hidden rounded-xl border border-white/10 bg-black">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt={prompt} className="h-full w-full object-cover grayscale contrast-125" />
              ) : (
                <div className="px-6 text-center">
                  <span className="text-5xl text-neutral-700">✦</span>
                  <p className="mt-4 text-sm text-neutral-500">
                    {loading ? "ADAM بيرسم فكرتك..." : "الصورة هتظهر هنا"}
                  </p>
                </div>
              )}
            </div>
            {image && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => void download()}
                  className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-neutral-300"
                >
                  حمّل الصورة ↓
                </button>
                <a
                  href={image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/20 px-4 py-2 text-xs font-bold transition hover:border-white"
                >
                  افتح الصورة ↗
                </a>
              </div>
            )}
          </div>
        </div>

        {history.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-bold tracking-[0.2em] text-neutral-500">آخر الصور</p>
            <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
              {history.map((item) => (
                <button
                  key={item.url}
                  onClick={() => {
                    setImage(item.url);
                    setPrompt(item.prompt);
                    setSeed(item.seed);
                  }}
                  className="aspect-square overflow-hidden rounded-lg border border-white/15 transition hover:border-white"
                  title={item.prompt}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.prompt} className="h-full w-full object-cover grayscale" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
