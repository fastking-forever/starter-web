"use client";

import { useEffect, useRef, useState } from "react";

const options = [
  { name: "Subway by adam", href: "#games" },
  { name: "ADAM Football", href: "#games" },
  { name: "ADAM Strike", href: "#play" },
  { name: "يومك أهم", href: "#games" },
  { name: "ADAM Game", href: "#games" },
];
const step = 360 / options.length;

export default function GameWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const c = 160;
    const r = 148;

    options.forEach((option, i) => {
      const start = (-90 - step / 2 + i * step) * (Math.PI / 180);
      const end = start + (step * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(c, c);
      ctx.arc(c, c, r, start, end);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? "#F2F7F3" : "#06100C";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.stroke();

      ctx.save();
      ctx.translate(c, c);
      ctx.rotate(start + (step / 2) * (Math.PI / 180));
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = i % 2 === 0 ? "#06100C" : "#F2F7F3";
      ctx.font = "bold 11px Arial";
      ctx.fillText(option.name, r - 12, 0);
      ctx.restore();
    });
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);
    const index = Math.floor(Math.random() * options.length);
    const current = ((rotation % 360) + 360) % 360;
    const desired = (360 - index * step) % 360;
    const delta = 5 * 360 + ((desired - current + 360) % 360);
    setRotation(rotation + delta);
    timerRef.current = window.setTimeout(() => {
      setWinner(index);
      setSpinning(false);
      timerRef.current = null;
    }, 3600);
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 rounded-2xl border border-white/15 bg-white/[0.02] p-8 md:flex-row">
      <div className="relative shrink-0">
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 border-x-8 border-b-[12px] border-x-transparent border-b-white" />
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          aria-label="عجلة اختيار اللعبة"
          className="block rounded-full border border-white/25"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 3.5s cubic-bezier(0.12, 0.72, 0.12, 1)" : "none",
          }}
        />
      </div>
      <div className="text-center md:text-right">
        <p className="text-xs font-bold tracking-[0.2em] text-neutral-500">قرر بدل ما تختار</p>
        <h3 className="mt-3 text-3xl font-black">دوّر واختار</h3>
        <p className="mt-3 max-w-sm text-sm leading-loose text-neutral-400">
          عجلة فيها الألعاب الخمسة. دوّرها وهتقول لك تلعب أنهي واحدة دلوقتي.
        </p>
        <button
          onClick={spin}
          disabled={spinning}
          className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-neutral-300 disabled:opacity-50"
        >
          {spinning ? "الدوّارة لسه بتلف..." : "دوّر العجلة ↻"}
        </button>
        {winner !== null && (
          <div className="mt-5 rounded-xl border border-white/15 px-4 py-3 text-sm">
            <span className="text-neutral-500">طلعت لك: </span>
            <a href={options[winner].href} className="font-bold transition hover:underline">
              {options[winner].name}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
