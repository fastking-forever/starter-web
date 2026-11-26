"use client";

import { useEffect, useRef, useState } from "react";

const W = 800;
const H = 400;

type Bullet = { x: number; y: number };
type Enemy = { x: number; y: number; r: number; speed: number; hp: number; kind: number };
type Star = { x: number; y: number; s: number };

export default function SpaceShooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef(new Set<string>());
  const firing = useRef(false);
  const resetRef = useRef<() => void>(() => {});
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [over, setOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let playerX = W / 2;
    let playerY = H - 42;
    let bullets: Bullet[] = [];
    let enemies: Enemy[] = [];
    let sc = 0;
    let lv = 3;
    let dead = false;
    let spawn = 0.5;
    let cool = 0;
    const stars: Star[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      s: Math.random() * 1.5 + 0.3,
    }));

    const reset = () => {
      playerX = W / 2;
      playerY = H - 42;
      bullets = [];
      enemies = [];
      sc = 0;
      lv = 3;
      dead = false;
      spawn = 0.5;
      cool = 0;
      setScore(0);
      setLives(3);
      setOver(false);
    };
    resetRef.current = reset;

    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)) e.preventDefault();
      keys.current.add(e.key.toLowerCase());
      if (e.key === " ") firing.current = true;
      if (dead && (e.key === "Enter" || e.key === " ")) reset();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keys.current.delete(e.key.toLowerCase());
      if (e.key === " ") firing.current = false;
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      playerX = Math.max(24, Math.min(W - 24, ((e.clientX - rect.left) / rect.width) * W));
    };
    const onPointerDown = () => { firing.current = true; };
    const onPointerUp = () => { firing.current = false; };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx.fillStyle = "#070A08";
      ctx.fillRect(0, 0, W, H);

      for (const s of stars) {
        s.y += (14 + s.s * 12) * dt;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        ctx.fillStyle = `rgba(255,255,255,${0.18 + s.s * 0.22})`;
        ctx.fillRect(s.x, s.y, s.s, s.s);
      }

      if (!dead) {
        if (keys.current.has("arrowleft") || keys.current.has("a")) playerX -= 340 * dt;
        if (keys.current.has("arrowright") || keys.current.has("d")) playerX += 340 * dt;
        if (keys.current.has("arrowup") || keys.current.has("w")) playerY -= 250 * dt;
        if (keys.current.has("arrowdown") || keys.current.has("s")) playerY += 250 * dt;
        playerX = Math.max(22, Math.min(W - 22, playerX));
        playerY = Math.max(40, Math.min(H - 22, playerY));

        cool -= dt;
        if (firing.current && cool <= 0) {
          bullets.push({ x: playerX, y: playerY - 14 });
          cool = 0.15;
        }

        spawn -= dt;
        if (spawn <= 0) {
          enemies.push({
            x: 32 + Math.random() * (W - 64),
            y: -24,
            r: 12 + Math.random() * 8,
            speed: 70 + Math.random() * 55 + sc * 0.6,
            hp: 1,
            kind: Math.floor(Math.random() * 3),
          });
          spawn = Math.max(0.26, 0.82 - sc * 0.004);
        }
      }

      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= 440 * dt;
        if (bullets[i].y < -12) bullets.splice(i, 1);
      }

      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.y += e.speed * dt;
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (Math.abs(b.x - e.x) < e.r && Math.abs(b.y - e.y) < e.r + 8) {
            bullets.splice(j, 1);
            e.hp -= 1;
            if (e.hp <= 0) {
              sc += 10;
              setScore(sc);
              enemies.splice(i, 1);
              break;
              continue;
            }
          }
        }
        if (dead) continue;
        if (Math.abs(playerX - e.x) < e.r + 10 && Math.abs(playerY - e.y) < e.r + 12) {
          enemies.splice(i, 1);
          lv -= 1;
          setLives(Math.max(0, lv));
          if (lv <= 0) {
            dead = true;
            setOver(true);
          }
        } else if (e.y > H + 30) {
          enemies.splice(i, 1);
        }
      }

      // player ship
      ctx.fillStyle = "#fafafa";
      ctx.beginPath();
      ctx.moveTo(playerX, playerY - 15);
      ctx.lineTo(playerX - 13, playerY + 12);
      ctx.lineTo(playerX + 13, playerY + 12);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#777";
      ctx.fillRect(playerX - 4, playerY + 10, 8, 5);

      // bullets
      ctx.fillStyle = "#fafafa";
      for (const b of bullets) ctx.fillRect(b.x - 1.5, b.y - 6, 3, 12);

      // enemies
      for (const e of enemies) {
        ctx.strokeStyle = "#fafafa";
        ctx.lineWidth = 2;
        if (e.kind === 0) {
          ctx.strokeRect(e.x - e.r, e.y - e.r, e.r * 2, e.r * 2);
          ctx.beginPath();
          ctx.moveTo(e.x - e.r, e.y);
          ctx.lineTo(e.x + e.r, e.y);
          ctx.stroke();
        } else if (e.kind === 1) {
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(e.x - e.r, e.y - e.r);
          ctx.lineTo(e.x + e.r, e.y + e.r);
          ctx.moveTo(e.x + e.r, e.y - e.r);
          ctx.lineTo(e.x - e.r, e.y + e.r);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(e.x, e.y - e.r);
          ctx.lineTo(e.x + e.r, e.y + e.r);
          ctx.lineTo(e.x - e.r, e.y + e.r);
          ctx.closePath();
          ctx.stroke();
        }
      }

      if (dead) {
        ctx.fillStyle = "rgba(7,7,7,0.72)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#fafafa";
        ctx.textAlign = "center";
        ctx.font = "bold 38px Arial";
        ctx.fillText("انتهت اللعبة", W / 2, H / 2 - 8);
        ctx.font = "16px Arial";
        ctx.fillText(`النقاط: ${sc} — اضغط Enter أو «إعادة»`, W / 2, H / 2 + 26);
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const press = (key: string) => {
    keys.current.add(key);
    if (key === " ") firing.current = true;
  };
  const release = (key: string) => {
    keys.current.delete(key);
    if (key === " ") firing.current = false;
  };

  return (
    <div className="rounded-3xl border border-white/15 bg-white/[0.02] p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-neutral-500">جوه الموقع</p>
          <h3 className="mt-2 text-2xl font-black">ADAM STRIKE</h3>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-lg border border-white/15 px-3 py-1.5">النقاط: <b>{score}</b></span>
          <span className="rounded-lg border border-white/15 px-3 py-1.5">الأرواح: <b>{"♥".repeat(lives)}</b></span>
          <button
            onClick={() => resetRef.current()}
            className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-black transition hover:bg-neutral-300"
          >
            إعادة ⟳
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full rounded-xl border border-white/10 bg-black touch-none"
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-neutral-500">
          الأسهم أو WASD للحركة · مسافة أو اضغط على اللوحة لضرب النار · اضغط Enter بعد الخسارة
        </p>
        <div className="flex gap-2 md:hidden">
          {(["arrowleft", "arrowright", " "] as const).map((k) => (
            <button
              key={k}
              onPointerDown={() => press(k)}
              onPointerUp={() => release(k)}
              onPointerLeave={() => release(k)}
              className="h-11 w-14 rounded-lg border border-white/20 text-sm font-bold active:bg-white active:text-black"
            >
              {k === "arrowleft" ? "←" : k === "arrowright" ? "→" : "نار"}
            </button>
          ))}
        </div>
      </div>
      {over && <p className="sr-only" role="status">انتهت اللعبة</p>}
    </div>
  );
}
