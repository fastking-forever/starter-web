"use client";

import { useEffect, useRef, useState } from "react";

const W = 800;
const H = 240;
const GROUND = H - 34;
const DINO_X = 70;
const DINO_W = 26;
const DINO_H = 30;
const BEST_KEY = "adam-dino-best";

type Obstacle = { x: number; w: number; h: number; tall: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jumpRef = useRef<() => void>(() => {});
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [newBest, setNewBest] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let last = performance.now();
    let y = 0;
    let vy = 0;
    let obstacles: Obstacle[] = [];
    let particles: Particle[] = [];
    let distance = 0;
    let nextGap = 320;
    let speed = 5;
    let value = 0;
    let shown = -1;
    let dead = false;
    let running = false;
    let shake = 0;
    let flash = 0;

    let bestLocal = 0;
    try {
      bestLocal = Number(window.localStorage.getItem(BEST_KEY)) || 0;
    } catch {
      // Storage may be disabled.
    }
    setBest(bestLocal);

    const stars = Array.from({ length: 34 }, (_, i) => ({
      x: (i * 137) % W,
      y: 18 + ((i * 53) % 96),
      r: i % 5 === 0 ? 1.6 : 1,
      speed: 0.12 + (i % 4) * 0.07,
    }));

    const burst = (x: number, atY: number, color: string, count: number) => {
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x,
          y: atY,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 3 - 0.5,
          life: 0.6 + Math.random() * 0.4,
          color,
        });
      }
    };

    const reset = () => {
      y = 0;
      vy = 0;
      obstacles = [];
      particles = [];
      distance = 0;
      nextGap = 320;
      speed = 5;
      value = 0;
      shown = -1;
      dead = false;
      shake = 0;
      flash = 0;
      setScore(0);
      setOver(false);
      setNewBest(false);
    };

    const jump = () => {
      if (dead) reset();
      if (!running) {
        running = true;
        setStarted(true);
      }
      // Only jump from the ground, so spamming cannot keep the dino airborne.
      if (y === 0 && vy === 0) {
        vy = 9.4;
        burst(DINO_X + 10, GROUND - 2, "#7FF2B0", 6);
      }
    };
    jumpRef.current = jump;

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 2);
      last = now;

      if (running && !dead) {
        if (y > 0 || vy > 0) {
          vy -= 0.5 * dt;
          y += vy * dt;
          if (y <= 0) {
            y = 0;
            vy = 0;
          }
        }
        distance += speed * dt;
        value += 0.08 * dt;
        speed = 5 + Math.floor(value / 25) * 0.45;

        if (distance > nextGap) {
          const tall = Math.random() < 0.3;
          obstacles.push({
            x: W + 20,
            w: tall ? 12 : 14 + Math.random() * 8,
            h: tall ? 34 + Math.random() * 10 : 22 + Math.random() * 12,
            tall,
          });
          distance = 0;
          nextGap = 250 + Math.random() * 200;
        }

        for (const o of obstacles) o.x -= speed * dt;
        obstacles = obstacles.filter((o) => o.x + o.w > -10);

        for (const o of obstacles) {
          if (o.x < DINO_X + DINO_W && o.x + o.w > DINO_X && y < o.h) {
            dead = true;
            running = false;
            shake = 8;
            flash = 1;
            burst(DINO_X + 16, GROUND - 16, "#F2F7F3", 16);
            setOver(true);
            break;
          }
        }

        const current = Math.floor(value);
        if (current !== shown) {
          shown = current;
          setScore(current);
          if (current > bestLocal) {
            bestLocal = current;
            setBest(current);
            setNewBest(true);
            try {
              window.localStorage.setItem(BEST_KEY, String(current));
            } catch {
              // Storage may be disabled.
            }
          }
        }
      }

      particles = particles.filter((p) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.12 * dt;
        p.life -= 0.02 * dt;
        return p.life > 0;
      });
      if (shake > 0) shake = Math.max(0, shake - 0.5 * dt);
      if (flash > 0) flash = Math.max(0, flash - 0.035 * dt);

      ctx.save();
      if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);

      // Deep pine sky with slow mint stars.
      ctx.fillStyle = "#06100C";
      ctx.fillRect(-12, -12, W + 24, H + 24);
      for (const s of stars) {
        s.x -= s.speed * dt;
        if (s.x < -2) s.x = W + 2;
        ctx.fillStyle = `rgba(127,242,176,${0.12 + s.r * 0.08})`;
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }

      // Parallax hills.
      ctx.fillStyle = "rgba(127,242,176,0.045)";
      const hillOffset = (distance * 0.15) % 160;
      for (let x = -160; x < W + 160; x += 160) {
        ctx.beginPath();
        ctx.moveTo(x + hillOffset, GROUND);
        ctx.lineTo(x + 80 + hillOffset, GROUND - 38);
        ctx.lineTo(x + 160 + hillOffset, GROUND);
        ctx.closePath();
        ctx.fill();
      }

      // Ground.
      ctx.fillStyle = "rgba(127,242,176,0.45)";
      ctx.fillRect(0, GROUND, W, 2);
      ctx.fillStyle = "rgba(242,247,243,0.26)";
      for (let x = 0; x < W; x += 28) {
        ctx.fillRect(x - ((distance * 2) % 28), GROUND + 8, 14, 2);
      }

      // Cacti.
      for (const o of obstacles) {
        ctx.fillStyle = dead ? "rgba(242,247,243,0.55)" : "#F2F7F3";
        ctx.fillRect(o.x, GROUND - o.h, o.w, o.h);
        ctx.fillRect(o.x - 5, GROUND - o.h + 8, 5, 9);
        ctx.fillRect(o.x + o.w, GROUND - o.h + 13, 5, 8);
        ctx.fillStyle = "rgba(127,242,176,0.55)";
        ctx.fillRect(o.x, GROUND - o.h, o.w, 2);
      }

      // Jump and impact particles.
      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      ctx.globalAlpha = 1;

      // Dinosaur.
      const top = GROUND - y - DINO_H;
      const stride = running && y === 0 && Math.floor(value * 6) % 2 === 0;
      ctx.fillStyle = "#F2F7F3";
      ctx.fillRect(DINO_X, top + 8, 22, 22);
      ctx.fillRect(DINO_X + 15, top, 15, 14);
      ctx.fillRect(DINO_X - 8, top + 12, 10, 4);
      if (y === 0) {
        if (stride) {
          ctx.fillRect(DINO_X + 3, GROUND - 7, 6, 7);
          ctx.fillRect(DINO_X + 15, GROUND - 7, 6, 7);
        } else {
          ctx.fillRect(DINO_X + 5, GROUND - 7, 6, 7);
          ctx.fillRect(DINO_X + 14, GROUND - 7, 6, 7);
        }
      } else {
        ctx.fillRect(DINO_X + 3, GROUND - 9, 7, 5);
        ctx.fillRect(DINO_X + 14, GROUND - 9, 7, 5);
      }
      ctx.fillStyle = "#06100C";
      ctx.fillRect(DINO_X + 25, top + 4, 3, 3);
      ctx.fillStyle = "#7FF2B0";
      ctx.fillRect(DINO_X, top + 8, 22, 2);

      // Score.
      ctx.fillStyle = "#7FF2B0";
      ctx.font = "bold 18px monospace";
      ctx.textAlign = "left";
      ctx.fillText(String(Math.max(0, shown)).padStart(4, "0"), 24, 30);
      if (newBest && !dead) {
        ctx.font = "bold 11px Arial";
        ctx.fillText("NEW BEST", 24, 46);
      }

      if (flash > 0) {
        ctx.fillStyle = `rgba(127,242,176,${flash * 0.12})`;
        ctx.fillRect(-12, -12, W + 24, H + 24);
      }

      ctx.restore();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-black p-4">
      <div className="mb-3 flex items-center justify-between text-xs text-neutral-500">
        <span>ADAM DINO — مسافة / ↑ / المس الشاشة</span>
        <span dir="ltr">BEST {String(best).padStart(4, "0")}</span>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-white/10">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={() => jumpRef.current()}
          aria-label="لعبة الديناصور"
          className="block w-full cursor-pointer touch-none"
        />
        {(!started || over) && (
          <div className="absolute inset-0 grid place-items-center bg-black/65 backdrop-blur-sm">
            <button
              onClick={() => jumpRef.current()}
              className="cta-mint rounded-xl px-6 py-3 text-sm font-bold"
            >
              {over ? `انتهت اللعبة — النقاط ${score} — العب تاني ↻` : "ابدأ اللعب ↑"}
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-neutral-500">
        النقاط: {score} · أفضل نتيجة محفوظة: {best} · قفّز فوق الصبار
      </p>
    </div>
  );
}
