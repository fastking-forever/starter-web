"use client";

import { useEffect, useRef, useState } from "react";

const W = 800;
const H = 240;
const GROUND = H - 34;
const DINO_X = 70;
const DINO_W = 26;
const DINO_H = 30;

type Obstacle = { x: number; w: number; h: number };

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jumpRef = useRef<() => void>(() => {});
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let last = performance.now();
    let y = 0;
    let vy = 0;
    let obstacles: Obstacle[] = [];
    let distance = 0;
    let nextGap = 320;
    let speed = 5;
    let value = 0;
    let shown = -1;
    let dead = false;
    let running = false;

    const start = () => {
      y = 0;
      vy = 9.4;
      if (!running) {
        running = true;
        setStarted(true);
      }
    };

    const jump = () => {
      if (dead) {
        y = 0;
        vy = 0;
        obstacles = [];
        distance = 0;
        nextGap = 320;
        speed = 5;
        value = 0;
        shown = -1;
        dead = false;
        setScore(0);
        setOver(false);
      }
      start();
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

      ctx.fillStyle = "#06100C";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fafafa";

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
          obstacles.push({
            x: W + 20,
            w: 14 + Math.random() * 10,
            h: 22 + Math.random() * 13,
          });
          distance = 0;
          nextGap = 260 + Math.random() * 220;
        }

        for (const o of obstacles) o.x -= speed * dt;
        obstacles = obstacles.filter((o) => o.x + o.w > -10);

        for (const o of obstacles) {
          if (o.x < DINO_X + DINO_W && o.x + o.w > DINO_X && y < o.h) {
            dead = true;
            running = false;
            setOver(true);
            setBest((b) => Math.max(b, Math.floor(value)));
            break;
          }
        }

        const current = Math.floor(value);
        if (current !== shown) {
          shown = current;
          setScore(current);
        }
      }

      // Ground
      ctx.fillStyle = "rgba(250,250,250,0.55)";
      for (let x = 0; x < W; x += 28) {
        ctx.fillRect(x - ((distance * 2) % 28), GROUND + 8, 14, 2);
      }
      ctx.fillStyle = "#fafafa";

      // Cacti
      for (const o of obstacles) {
        ctx.fillRect(o.x, GROUND - o.h, o.w, o.h);
        ctx.fillRect(o.x - 5, GROUND - o.h + 7, 5, 10);
        ctx.fillRect(o.x + o.w, GROUND - o.h + 12, 5, 9);
      }

      // Dinosaur
      const top = GROUND - y - DINO_H;
      ctx.fillRect(DINO_X, top + 8, 22, 22);
      ctx.fillRect(DINO_X + 15, top, 15, 14);
      ctx.fillRect(DINO_X - 8, top + 12, 10, 4);
      if (y === 0) {
        ctx.fillRect(DINO_X + 3, GROUND - 6, 6, 6);
        ctx.fillRect(DINO_X + 14, GROUND - 6, 6, 6);
      } else {
        ctx.fillRect(DINO_X + 3, GROUND - 8, 7, 4);
        ctx.fillRect(DINO_X + 14, GROUND - 8, 7, 4);
      }
      ctx.fillStyle = "#06100C";
      ctx.fillRect(DINO_X + 25, top + 4, 3, 3);

      // Score
      ctx.fillStyle = "#fafafa";
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`${String(Math.max(0, shown)).padStart(4, "0")}`, 24, 30);

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
        <span>ADAM DINO — اضغط مسافة أو المس الشاشة</span>
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
          <div className="absolute inset-0 grid place-items-center bg-black/65">
            <button
              onClick={() => jumpRef.current()}
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-neutral-300"
            >
              {over ? `انتهت اللعبة — النقاط ${score} — العب تاني ↻` : "ابدأ اللعب ↑"}
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-neutral-500">
        النقاط: {score} · المسافة بتزيد بسرعة — قفّز فوق الصبار
      </p>
    </div>
  );
}
