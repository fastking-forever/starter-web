"use client";

import { useEffect, useState } from "react";

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

  return (
    <article className="rounded-2xl border border-white/15 bg-white/[0.02] p-6">
      <h3 className="text-xl font-bold">حاسبة سريعة</h3>
      <p className="mt-2 text-xs text-neutral-500">جمع وطرح وضرب وقسمة بدون إعلانات.</p>
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
  }, [length, symbols]);

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
        <button onClick={() => void copy()} className="shrink-0 text-xs font-bold text-neutral-400 transition hover:text-white">
          {copied ? "تم ✓" : "نسخ ⧉"}
        </button>
      </div>
      <label className="mt-5 block text-xs text-neutral-400">
        الطول: {length}
        <input
          type="range"
          min={8}
          max={32}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="mt-2 w-full accent-white"
        />
      </label>
      <label className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
        <input
          type="checkbox"
          checked={symbols}
          onChange={(e) => setSymbols(e.target.checked)}
          className="h-4 w-4 accent-white"
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

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (remaining === 0) setRunning(false);
  }, [remaining]);

  function changeMinutes(n: number) {
    const next = Math.min(60, Math.max(1, n));
    setMinutes(next);
    if (!running) setRemaining(next * 60);
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <article className="rounded-2xl border border-white/15 bg-white/[0.02] p-6">
      <h3 className="text-xl font-bold">مؤقت العد التنازلي</h3>
      <p className="mt-2 text-xs text-neutral-500">استراحة قصيرة بين الجولات.</p>
      <div dir="ltr" className="mt-5 rounded-xl border border-white/15 bg-black px-4 py-5 text-center font-mono text-5xl font-bold">
        {mm}:{ss}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {[1, 5, 10].map((n) => (
          <button
            key={n}
            onClick={() => changeMinutes(n)}
            className={`rounded-lg border px-3 py-2 text-xs font-bold transition ${
              minutes === n ? "border-white bg-white text-black" : "border-white/15 hover:border-white"
            }`}
          >
            {n} دقائق
          </button>
        ))}
        <button
          onClick={() => {
            if (remaining === 0) setRemaining(minutes * 60);
            setRunning((r) => !r);
          }}
          className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold transition hover:border-white"
        >
          {running ? "إيقاف مؤقت" : "ابدأ"}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setRemaining(minutes * 60);
          }}
          className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold transition hover:border-white"
        >
          إعادة
        </button>
      </div>
    </article>
  );
}

export default function Tools() {
  return (
    <section id="tools" className="border-t border-white/10 bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-bold tracking-[0.25em] text-neutral-500">خدمات ADAM</p>
        <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">أدوات جوه الموقع</h2>
        <p className="mt-4 max-w-xl text-sm leading-loose text-neutral-400">
          حاسبة، كلمة مرور قوية، ومؤقت — كلها شغالة فوراً من غير تسجيل أو تحميل.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Calculator />
          <PasswordMaker />
          <Countdown />
        </div>
      </div>
    </section>
  );
}
