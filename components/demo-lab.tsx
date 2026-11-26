"use client";

import { useState } from "react";

type Tab = "starter" | "rea";

type Analysis = {
  lines: number;
  imports: string[];
  functions: string[];
  classes: string[];
  strings: string[];
  comments: string[];
};

const SAMPLE_CODE = `import fs from "node:fs";
const { join } = require("node:path");

class GameEngine {
  constructor(level) {
    this.level = level;
  }
}

function loadLevel(name) {
  const file = join("levels", name + ".json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// أبدأ اللعبة من هنا
export async function start() {
  const engine = new GameEngine(1);
  return engine;
}`;

function analyze(code: string): Analysis {
  const imports = [...code.matchAll(/^\s*(?:import\s+.*|const\s+.*=\s*require\(.*\)\s*;?)\s*$/gm)].map((m) => m[0].trim());
  const functions = [...code.matchAll(/(?:function\s+(\w+)|(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\()/g)]
    .map((m) => m[1] || m[2])
    .filter(Boolean);
  const classes = [...code.matchAll(/\bclass\s+(\w+)/g)].map((m) => m[1]);
  const strings = [...code.matchAll(/["'`]([^"'`\n]{3,60})["'`]/g)].map((m) => m[1]).filter((s) => !s.includes("node:"));
  const comments = [...code.matchAll(/\/\/\s*(.+)/g)].map((m) => m[1].trim());

  return {
    lines: code.split(/\r?\n/).filter((l) => l.trim()).length,
    imports: [...new Set(imports)],
    functions: [...new Set(functions)],
    classes: [...new Set(classes)],
    strings: [...new Set(strings)].slice(0, 8),
    comments: [...new Set(comments)].slice(0, 8),
  };
}

function ResultGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <p className="text-xs font-bold text-[#ff6a00]">{title} ({items.length})</p>
      <div className="mt-3 space-y-1.5">
        {items.length ? (
          items.map((item) => (
            <p key={item} className="font-mono text-xs leading-relaxed text-neutral-300 break-words">
              {item}
            </p>
          ))
        ) : (
          <p className="text-xs text-neutral-600">—</p>
        )}
      </div>
    </div>
  );
}

export default function DemoLab({ initialTab }: { initialTab: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);

  // starter-web playground
  const [title, setTitle] = useState("ADAM");
  const [tagline, setTagline] = useState("فكرة واضحة. تصميم يليق بك.");
  const [accent, setAccent] = useState("#ff6a00");

  // rea mini analyzer
  const [code, setCode] = useState(SAMPLE_CODE);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-14">
      <a href="/" className="text-sm text-neutral-500 transition hover:text-[#ff6a00]">← رجوع للرئيسية</a>
      <p className="mt-10 text-xs font-bold tracking-widest text-[#ff6a00]">معمل التجارب</p>
      <h1 className="mt-4 text-4xl font-black md:text-5xl">جرّب المشاريع جوه الموقع</h1>
      <p className="mt-4 max-w-2xl leading-loose text-neutral-400">
        نسخة تفاعلية مبسّطة توضّح فكرة كل مشروع. التجارب تعمل في المتصفح مباشرة بدون تسجيل.
      </p>

      <div className="mt-10 flex gap-3 border-b border-white/10">
        <button
          onClick={() => setTab("starter")}
          className={`border-b-2 px-4 py-3 text-sm font-bold transition ${tab === "starter" ? "border-[#ff6a00] text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
        >
          starter-web
        </button>
        <button
          onClick={() => setTab("rea")}
          className={`border-b-2 px-4 py-3 text-sm font-bold transition ${tab === "rea" ? "border-[#ff6a00] text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
        >
          REA
        </button>
      </div>

      {tab === "starter" ? (
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-lg font-bold">خصّص الصفحة</h2>
            <label className="mt-6 block text-xs text-neutral-500">عنوان الموقع</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#ff6a00]/60" />
            <label className="mt-5 block text-xs text-neutral-500">الشعار</label>
            <input value={tagline} onChange={(e) => setTagline(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#ff6a00]/60" />
            <label className="mt-5 block text-xs text-neutral-500">اللون الأساسي</label>
            <div className="mt-2 flex items-center gap-3">
              <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="h-11 w-14 cursor-pointer rounded-lg border border-white/10 bg-black/40 p-1" />
              <code className="text-sm text-neutral-400">{accent}</code>
            </div>
            <a href="https://github.com/fastking-forever/starter-web" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block text-sm font-bold text-[#ff6a00] hover:underline">
              الكود الكامل على GitHub ↗
            </a>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black p-7" dir="rtl">
            <div className="pointer-events-none absolute -top-20 left-1/3 h-56 w-56 rounded-full blur-[90px]" style={{ backgroundColor: `${accent}44` }} />
            <div className="relative flex items-center gap-2 font-black">
              <span className="grid h-8 w-8 place-items-center rounded-lg text-black" style={{ backgroundColor: accent }}>A</span>
              <span>{title || "ADAM"}</span>
            </div>
            <h3 className="relative mt-14 text-4xl font-black leading-snug">
              {tagline || "فكرة واضحة."}
            </h3>
            <p className="relative mt-5 max-w-md text-sm leading-relaxed text-neutral-400">
              دي معاينة سريعة لنظام التصميم المستخدم في starter-web: خطوط قوية،
              مساحات محسوبة، ولون واحد بيركّز الانتباه.
            </p>
            <span className="relative mt-9 inline-block rounded-xl px-5 py-3 text-sm font-bold text-black" style={{ backgroundColor: accent }}>
              اكتشف المنصة
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-lg font-bold">الصق كود JS / TS لتحليله</h2>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              محاكاة خفيفة لفكرة REA: بتفحص الكود في المتصفح وتطلع الاستيرادات والدوال والكلاسات كأدلة سريعة.
              محرك REA الحقيقي بيشتغل محلياً عبر MCP.
            </p>
            <textarea
              dir="ltr"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={16}
              className="mt-4 w-full rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-xs leading-relaxed text-neutral-200 outline-none focus:border-[#ff6a00]/60"
            />
            <button onClick={() => setAnalysis(analyze(code))} className="mt-4 rounded-xl bg-[#ff6a00] px-5 py-3 text-sm font-bold text-black transition hover:bg-orange-400">
              حلّل الكود
            </button>
            <a href="https://github.com/fastking-forever/rea" target="_blank" rel="noopener noreferrer" className="mr-4 text-sm font-bold text-[#ff6a00] hover:underline">
              REA الكامل ↗
            </a>
          </div>

          <div>
            {analysis ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultGroup title="استيرادات" items={analysis.imports} />
                <ResultGroup title="دوال" items={analysis.functions} />
                <ResultGroup title="كلاسات" items={analysis.classes} />
                <ResultGroup title="نصوص" items={analysis.strings} />
                <ResultGroup title="تعليقات" items={analysis.comments} />
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs font-bold text-[#ff6a00]">إحصائيات</p>
                  <p className="mt-3 text-3xl font-black">{analysis.lines}</p>
                  <p className="mt-1 text-xs text-neutral-500">سطر Code فعّال</p>
                </div>
              </div>
            ) : (
              <div className="grid h-full min-h-72 place-items-center rounded-2xl border border-dashed border-white/10 p-8 text-center">
                <div>
                  <p className="text-4xl">{`{ }`}</p>
                  <p className="mt-4 text-sm text-neutral-500">اضغط «حلّل الكود» عشان تشوف النتائج هنا.</p>
                </div>
              </div>
            )}
            <p className="mt-4 text-xs leading-relaxed text-neutral-600">
              ملاحظة: دي تجربة تعليمية داخل الموقع، مش بديل عن REA الأصلي للهندسة العكسية للملفات والأنظمة.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
