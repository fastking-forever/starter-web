"use client";

import QRCode from "qrcode";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const keys = [
  ["C", "C"], ["(", "("], [")", ")"], ["÷", "/"],
  ["7", "7"], ["8", "8"], ["9", "9"], ["×", "*"],
  ["4", "4"], ["5", "5"], ["6", "6"], ["−", "-"],
  ["1", "1"], ["2", "2"], ["3", "3"], ["+", "+"],
  ["0", "0"], [".", "."], ["=", "="], ["⌫", "back"],
];

function Calculator() {
  const [expr, setExpr] = useState("0");

  function press(value: string) {
    setExpr((prev) => {
      if (value === "C") return "0";
      if (value === "back") return prev.length <= 1 ? "0" : prev.slice(0, -1);
      if (value === "=") {
        if (!/^[0-9+\-*/().% ]+$/.test(prev)) return "خطأ";
        try {
          const result = Function(`"use strict"; return (${prev})`)() as number;
          return Number.isFinite(result) ? String(Math.round(result * 1e6) / 1e6) : "خطأ";
        } catch {
          return "خطأ";
        }
      }
      if (prev === "0" || prev === "خطأ") return value === "." ? "0." : value;
      return prev + value;
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    const key = e.key;
    // Let a focused button handle its own Enter/Space activation.
    if ((key === "Enter" || key === " ") && e.target instanceof HTMLButtonElement) return;
    let value: string | null = null;
    if (key === "Enter" || key === "=") value = "=";
    else if (key === "Backspace") value = "back";
    else if (key === "Escape" || key === "c" || key === "C") value = "C";
    else if (/^[0-9+\-*/().]$/.test(key)) value = key;
    else if (key === ",") value = ".";
    if (!value) return;
    e.preventDefault();
    press(value);
  }

  return (
    <article
      tabIndex={0}
      role="group"
      aria-label="حاسبة سريعة — يمكنك الكتابة من لوحة المفاتيح"
      onKeyDown={onKeyDown}
      className="rounded-2xl border border-white/15 bg-white/[0.02] p-6 outline-none focus-visible:border-[#7FF2B0]/60"
    >
      <h3 className="text-xl font-bold">حاسبة سريعة</h3>
      <p className="mt-2 text-xs text-neutral-500">جمع وطرح وضرب وقسمة — واكتب من الكيبورد كمان.</p>
      <div dir="ltr" className="mt-5 rounded-xl border border-white/15 bg-black px-4 py-3 text-left font-mono text-2xl">
        {expr}
      </div>
      <div dir="ltr" className="mt-3 grid grid-cols-4 gap-2">
        {keys.map(([label, value]) => (
          <button
            key={label}
            onClick={() => press(value)}
            className={`rounded-lg border py-2.5 font-bold transition ${
              value === "="
                ? "border-white bg-white text-black"
                : "border-white/15 text-neutral-300 hover:border-white hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </article>
  );
}

function PasswordMaker() {
  const [length, setLength] = useState(16);
  const [symbols, setSymbols] = useState(true);
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" +
      (symbols ? "!@#$%^&*()-_=+" : "");
    const random = new Uint32Array(length);
    if (globalThis.crypto?.getRandomValues) {
      globalThis.crypto.getRandomValues(random);
    } else {
      for (let i = 0; i < length; i += 1) random[i] = Math.floor(Math.random() * 2 ** 32);
    }
    setValue(Array.from(random, (n) => chars[n % chars.length]).join(""));
  }, [length, symbols, nonce]);

  const strength = Math.min(100, Math.round(((length - 8) / 24) * 70 + (symbols ? 30 : 0)));
  const strengthLabel = strength >= 80 ? "قوية جداً" : strength >= 55 ? "قوية" : strength >= 30 ? "متوسطة" : "ضعيفة";

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="rounded-2xl border border-white/15 bg-white/[0.02] p-6">
      <h3 className="text-xl font-bold">مولّد كلمة مرور</h3>
      <p className="mt-2 text-xs text-neutral-500">كلمة عشوائية قوية، اتنسخها في ضغطة.</p>
      <div dir="ltr" className="mt-5 flex items-center gap-2 rounded-xl border border-white/15 bg-black px-4 py-3">
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm">{value}</code>
        <button
          onClick={() => setNonce((n) => n + 1)}
          aria-label="توليد كلمة مرور جديدة"
          className="shrink-0 text-sm text-neutral-400 transition hover:text-[#7FF2B0]"
        >
          ↻
        </button>
        <button onClick={() => void copy()} className="shrink-0 text-xs font-bold text-neutral-400 transition hover:text-[#7FF2B0]">
          {copied ? "تم ✓" : "نسخ ⧉"}
        </button>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-neutral-500">
          <span>قوة كلمة المرور</span>
          <span className="font-bold text-[#7FF2B0]">{strengthLabel}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#7FF2B0] transition-[width] duration-300"
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>
      <label className="mt-5 block text-xs text-neutral-400">
        الطول: {length}
        <input
          type="range"
          min={8}
          max={32}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="mt-2 w-full accent-[#7FF2B0]"
        />
      </label>
      <label className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
        <input
          type="checkbox"
          checked={symbols}
          onChange={(e) => setSymbols(e.target.checked)}
          className="h-4 w-4 accent-[#7FF2B0]"
        />
        استخدم رموز خاصة
      </label>
    </article>
  );
}

function Countdown() {
  const [minutes, setMinutes] = useState(5);
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning] = useState(false);
  const deadlineRef = useRef<number | null>(null);
  const secondsRef = useRef(300);
  const remainingRef = useRef(300);

  // Count against a real deadline instead of interval ticks, so the timer
  // stays accurate even when the browser throttles a background tab.
  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const deadline = deadlineRef.current;
      if (deadline === null) return;
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      remainingRef.current = left;
      setRemaining(left);
      if (left === 0) {
        setRunning(false);
        deadlineRef.current = null;
      }
    };
    const id = window.setInterval(tick, 200);
    return () => window.clearInterval(id);
  }, [running]);

  function changeMinutes(n: number) {
    const next = Math.min(60, Math.max(1, n));
    const seconds = next * 60;
    deadlineRef.current = null;
    secondsRef.current = seconds;
    remainingRef.current = seconds;
    setRunning(false);
    setMinutes(next);
    setRemaining(seconds);
  }

  function toggle() {
    if (running) {
      setRunning(false);
      return;
    }
    const seconds = remainingRef.current === 0 ? secondsRef.current : remainingRef.current;
    remainingRef.current = seconds;
    deadlineRef.current = Date.now() + seconds * 1000;
    setRemaining(seconds);
    setRunning(true);
  }

  function resetTimer() {
    deadlineRef.current = null;
    setRunning(false);
    remainingRef.current = secondsRef.current;
    setRemaining(secondsRef.current);
  }

  const finished = remaining === 0;
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <article className="rounded-2xl border border-white/15 bg-white/[0.02] p-6">
      <h3 className="text-xl font-bold">مؤقت العد التنازلي</h3>
      <p className="mt-2 text-xs text-neutral-500">استراحة قصيرة بين الجولات.</p>
      <div dir="ltr" className="mt-5 rounded-xl border border-white/15 bg-black px-4 py-5 text-center font-mono text-5xl font-bold">
        {mm}:{ss}
      </div>
      {finished && (
        <p role="status" className="mt-3 text-center text-xs font-bold text-[#7FF2B0]">⏰ انتهى الوقت</p>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div role="group" aria-label="مدة المؤقت" className="flex flex-wrap gap-2">
          {[1, 5, 10, 15, 25].map((n) => (
            <button
              key={n}
              type="button"
              disabled={running}
              aria-pressed={minutes === n}
              onClick={() => changeMinutes(n)}
              className={`rounded-lg border px-3 py-2 text-xs font-bold transition disabled:opacity-40 ${
                minutes === n ? "border-white bg-white text-black" : "border-white/15 hover:border-white"
              }`}
            >
              {n} د
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={toggle}
          className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold transition hover:border-white"
        >
          {running ? "إيقاف مؤقت" : finished ? "ابدأ من جديد" : "ابدأ"}
        </button>
        <button
          type="button"
          onClick={resetTimer}
          className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold transition hover:border-white"
        >
          إعادة
        </button>
      </div>
    </article>
  );
}

function QrMaker() {
  const [text, setText] = useState("https://adam-web-site.vercel.app");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !text.trim()) return;
    let active = true;
    QRCode.toCanvas(canvas, text, {
      width: 232,
      margin: 1,
      color: { dark: "#06100C", light: "#F2F7F3" },
    })
      .then(() => {
        if (active) setError("");
      })
      .catch(() => {
        if (active) setError("النص طويل جداً، قصّره شوية.");
      });
    return () => {
      active = false;
    };
  }, [text]);

  function download() {
    const href = canvasRef.current?.toDataURL("image/png");
    if (!href) return;
    const a = document.createElement("a");
    a.href = href;
    a.download = "adam-qr.png";
    a.click();
  }

  return (
    <article className="rounded-2xl border border-white/15 bg-white/[0.02] p-6">
      <h3 className="text-xl font-bold">مولّد QR</h3>
      <p className="mt-2 text-xs text-neutral-500">حول أي رابط أو نص لرمز QR جوه المتصفح.</p>
      <input
        dir="ltr"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="اكتب رابط أو نص..."
        className="mt-5 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-left font-mono text-xs outline-none placeholder:text-neutral-600 focus:border-white/60"
      />
      <div className="mt-4 grid place-items-center rounded-xl bg-white p-3">
        <canvas ref={canvasRef} className="block" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={download}
          className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold transition hover:border-white"
        >
          حمّل PNG ↓
        </button>
        {error && <span className="text-xs text-neutral-400">{error}</span>}
      </div>
    </article>
  );
}

function ArabicText() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const clean = (fn: (s: string) => string) => setText((prev) => fn(prev));

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="rounded-2xl border border-white/15 bg-white/[0.02] p-6">
      <h3 className="text-xl font-bold">أدوات النص العربي</h3>
      <p className="mt-2 text-xs text-neutral-500">نظّف النص العربي في ضغطة واحدة.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="الصق النص هنا..."
        className="mt-5 w-full resize-none rounded-xl border border-white/15 bg-black/40 p-4 text-sm leading-relaxed outline-none placeholder:text-neutral-600 focus:border-white/60"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => clean((s) => s.replace(/[\u064B-\u065F\u0670\u0640]/g, ""))} className="rounded-lg border border-white/15 px-3 py-2 text-[11px] transition hover:border-white">إزالة التشكيل</button>
        <button onClick={() => clean((s) => s.replace(/[أإآ]/g, "ا"))} className="rounded-lg border border-white/15 px-3 py-2 text-[11px] transition hover:border-white">توحيد الألف</button>
        <button onClick={() => clean((s) => s.replace(/ى/g, "ي").replace(/ئ/g, "ي"))} className="rounded-lg border border-white/15 px-3 py-2 text-[11px] transition hover:border-white">توحيد الياء</button>
        <button onClick={() => clean((s) => s.replace(/ة/g, "ه"))} className="rounded-lg border border-white/15 px-3 py-2 text-[11px] transition hover:border-white">توحيد التاء</button>
        <button onClick={() => clean((s) => s.replace(/\s+/g, " ").trim())} className="rounded-lg border border-white/15 px-3 py-2 text-[11px] transition hover:border-white">ضغط المسافات</button>
      </div>
      <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-500">
        <span>{text.trim() ? text.trim().split(/\s+/).length : 0} كلمة · {text.length} حرف</span>
        <button onClick={() => void copy()} className="font-bold transition hover:text-white">{copied ? "تم النسخ ✓" : "نسخ ⧉"}</button>
      </div>
    </article>
  );
}

export default function Tools() {
  return (
    <section id="tools" className="border-t border-white/10 bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <span className="section-tag">خدمات ADAM</span>
          <h2 className="section-title mt-5">أدوات جوه الموقع</h2>
          <p className="section-desc mx-auto mt-3 max-w-xl">
            حاسبة، كلمة مرور، مؤقت، QR، وتنظيف نصوص عربية — كلها شغالة من غير تسجيل أو تحميل.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Calculator />
          <PasswordMaker />
          <Countdown />
          <QrMaker />
          <ArabicText />
        </div>
      </div>
    </section>
  );
}
