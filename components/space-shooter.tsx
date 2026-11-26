"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import SoundToggle from "@/components/sound-toggle";
import { playSound } from "@/lib/game-audio";

const W = 800;
const H = 400;
const BEST_KEY = "adam-strike-best";

type Bullet = { x: number; y: number };
type Enemy = { x: number; y: number; r: number; speed: number; hp: number; kind: number };
type Star = { x: number; y: number; s: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };
type AimEvent = { clientX: number; clientY: number; pointerType: string };

export default function SpaceShooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef(new Set<string>());
  const firing = useRef(false);
  const pointers = useRef(new Map<number, string>());
  const activeRef = useRef(false);
  const aimRef = useRef<(e: AimEvent) => void>(() => {});
  const resetRef = useRef<() => void>(() => {});
  const startRef = useRef<() => void>(() => {});
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [newBest, setNewBest] = useState(false);

  const releaseControl = (pointerId: number) => {
    const key = pointers.current.get(pointerId);
    if (!key) return;
    pointers.current.delete(pointerId);
    if (![...pointers.current.values()].includes(key)) {
      keys.current.delete(key);
      if (key === " ") firing.current = false;
    }
  };

  const pressControl = (pointerId: number, key: string) => {
    pointers.current.set(pointerId, key);
    keys.current.add(key);
    if (key === " ") firing.current = true;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let playerX = W / 2;
    let playerY = H - 42;
    let bullets: Bullet[] = [];
    let enemies: Enemy[] = [];
    let particles: Particle[] = [];
    let sc = 0;
    let lv = 3;
    let dead = false;
    let spawn = 0.5;
    let cool = 0;
    let invuln = 0;
    let shake = 0;

    let bestLocal = 0;
    try {
      bestLocal = Number(window.localStorage.getItem(BEST_KEY)) || 0;
    } catch {
      // Storage may be disabled.
    }
    setBest(bestLocal);

    const stars: Star[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      s: Math.random() * 1.5 + 0.3,
    }));

    const burst = (x: number, y: number, color: string, count: number) => {
      if (reduced) return;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 0.5 + Math.random() * 0.5,
          color,
        });
      }
    };

    const start = () => {
      if (!activeRef.current) {
        activeRef.current = true;
        setStarted(true);
        playSound("start");
      }
      canvas.focus();
    };
    startRef.current = start;

    const reset = () => {
      playerX = W / 2;
      playerY = H - 42;
      bullets = [];
      enemies = [];
      particles = [];
      sc = 0;
      lv = 3;
      dead = false;
      spawn = 0.5;
      cool = 0;
      invuln = 0;
      shake = 0;
      keys.current.clear();
      pointers.current.clear();
      firing.current = false;
      activeRef.current = true;
      setScore(0);
      setLives(3);
      setOver(false);
      setNewBest(false);
      canvas.focus();
    };
    resetRef.current = reset;

    const isTyping = (e: KeyboardEvent) =>
      Boolean((e.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable='true']"));

    // Keyboard control is scoped to the focused canvas. Elsewhere on the page,
    // Space and arrows keep their normal scrolling and button-activation behavior.
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTyping(e) || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const gameKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "];
      if (!activeRef.current) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          start();
          if (e.key === " ") firing.current = true;
        }
        return;
      }
      if (dead && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        firing.current = false;
        reset();
        playSound("start");
        return;
      }
      if (gameKeys.includes(e.key)) {
        e.preventDefault();
        keys.current.add(e.key.toLowerCase());
        if (e.key === " ") firing.current = true;
      }
    };
    canvas.addEventListener("keydown", onKeyDown);

    const onKeyUp = (e: KeyboardEvent) => {
      keys.current.delete(e.key.toLowerCase());
      if (e.key === " " && ![...pointers.current.values()].includes(" ")) firing.current = false;
    };
    const onBlur = () => {
      keys.current.clear();
      pointers.current.clear();
      firing.current = false;
    };
    const onVisibility = () => {
      last = performance.now();
      if (document.hidden) onBlur();
    };
    const onPointerUp = (e: PointerEvent) => releaseControl(e.pointerId);

    const aim = (e: AimEvent) => {
      const rect = canvas.getBoundingClientRect();
      playerX = Math.max(22, Math.min(W - 22, ((e.clientX - rect.left) / rect.width) * W));
      if (e.pointerType !== "mouse") {
        playerY = Math.max(40, Math.min(H - 22, ((e.clientY - rect.top) / rect.height) * H));
      }
    };
    aimRef.current = aim;

    const onPointerMove = (e: PointerEvent) => {
      // Hovering with a mouse must not teleport the ship while using the keyboard.
      if (e.pointerType === "mouse" && e.buttons === 0) return;
      aim(e);
    };
    const onPointerDown = (e: PointerEvent) => {
      canvas.focus();
      aim(e);
      if (dead) {
        firing.current = false;
        reset();
        playSound("start");
      } else if (!activeRef.current) {
        start();
      }
      pointers.current.set(e.pointerId, " ");
      firing.current = true;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        last = performance.now();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) {
        raf = requestAnimationFrame(frame);
        return;
      }

      ctx.save();
      if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);

      ctx.fillStyle = "#06100C";
      ctx.fillRect(-8, -8, W + 16, H + 16);

      for (const s of stars) {
        if (!reduced) {
          s.y += (14 + s.s * 12) * dt;
          if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        }
        ctx.fillStyle = `rgba(127,242,176,${0.2 + s.s * 0.2})`;
        ctx.fillRect(s.x, s.y, s.s, s.s);
      }

      if (activeRef.current && !dead) {
        if (keys.current.has("arrowleft") || keys.current.has("a")) playerX -= 340 * dt;
        if (keys.current.has("arrowright") || keys.current.has("d")) playerX += 340 * dt;
        if (keys.current.has("arrowup") || keys.current.has("w")) playerY -= 250 * dt;
        if (keys.current.has("arrowdown") || keys.current.has("s")) playerY += 250 * dt;
        playerX = Math.max(22, Math.min(W - 22, playerX));
        playerY = Math.max(40, Math.min(H - 22, playerY));

        cool -= dt;
        invuln = Math.max(0, invuln - dt);
        if (firing.current && cool <= 0) {
          bullets.push({ x: playerX, y: playerY - 14 });
          cool = 0.15;
          playSound("shoot");
        }

        spawn -= dt;
        if (spawn <= 0) {
          const kind = Math.floor(Math.random() * 3);
          enemies.push({
            x: 32 + Math.random() * (W - 64),
            y: -24,
            r: kind === 2 ? 10 : 12 + Math.random() * 8,
            speed: (kind === 2 ? 105 : 70) + Math.random() * 55 + sc * 0.6,
            hp: kind === 1 ? 2 : 1,
            kind,
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
        if (activeRef.current && !dead) e.y += e.speed * dt;
        let removed = false;

        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          const dx = b.x - e.x;
          const dy = b.y - e.y;
          if (dx * dx + dy * dy < (e.r + 6) * (e.r + 6)) {
            bullets.splice(j, 1);
            e.hp -= 1;
            if (e.hp <= 0) {
              sc += 10;
              setScore(sc);
              burst(e.x, e.y, "#7FF2B0", 10);
              playSound("score");
              if (sc > bestLocal) {
                bestLocal = sc;
                setBest(sc);
                setNewBest(true);
                if (sc % 10 === 0) {
                  try {
                    window.localStorage.setItem(BEST_KEY, String(sc));
                  } catch {
                    // Storage may be disabled.
                  }
                }
              }
              enemies.splice(i, 1);
              removed = true;
              break;
            }
            burst(e.x, e.y, "#F2F7F3", 3);
            playSound("hit");
          }
        }
        if (removed || dead || !activeRef.current) continue;

        if (invuln <= 0 && Math.abs(playerX - e.x) < e.r + 10 && Math.abs(playerY - e.y) < e.r + 12) {
          enemies.splice(i, 1);
          lv -= 1;
          invuln = 0.9;
          if (!reduced) shake = 7;
          burst(playerX, playerY, "#F2F7F3", 14);
          playSound(lv <= 0 ? "over" : "hit");
          setLives(Math.max(0, lv));
          if (lv <= 0) {
            dead = true;
            keys.current.clear();
            pointers.current.clear();
            firing.current = false;
            try {
              window.localStorage.setItem(BEST_KEY, String(bestLocal));
            } catch {
              // Storage may be disabled.
            }
            setOver(true);
          }
        } else if (e.y > H + 30) {
          enemies.splice(i, 1);
        }
      }

      particles = particles.filter((p) => {
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        p.life -= dt * 1.6;
        return p.life > 0;
      });
      if (shake > 0) shake = Math.max(0, shake - dt * 18);

      const blink = invuln > 0 && Math.floor(invuln * 14) % 2 === 0;
      if (!blink) {
        ctx.fillStyle = "#F2F7F3";
        ctx.beginPath();
        ctx.moveTo(playerX, playerY - 15);
        ctx.lineTo(playerX - 13, playerY + 12);
        ctx.lineTo(playerX + 13, playerY + 12);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#7FF2B0";
        ctx.fillRect(playerX - 4, playerY + 9, 8, 4);
        ctx.fillStyle = "#888";
        ctx.fillRect(playerX - 4, playerY + 10, 8, 5);
      }

      ctx.fillStyle = "#7FF2B0";
      for (const b of bullets) ctx.fillRect(b.x - 1.5, b.y - 6, 3, 12);

      ctx.strokeStyle = "#F2F7F3";
      ctx.lineWidth = 2;
      for (const e of enemies) {
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
          if (e.hp > 1) {
            ctx.fillStyle = "#7FF2B0";
            ctx.fillRect(e.x - 2, e.y - e.r - 6, 4, 4);
          }
        } else {
          ctx.beginPath();
          ctx.moveTo(e.x, e.y - e.r);
          ctx.lineTo(e.x + e.r, e.y + e.r);
          ctx.lineTo(e.x - e.r, e.y + e.r);
          ctx.closePath();
          ctx.stroke();
        }
      }

      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2.5, 2.5);
      }
      ctx.globalAlpha = 1;

      if (newBest && !dead) {
        ctx.fillStyle = "#7FF2B0";
        ctx.font = "bold 12px monospace";
        ctx.textAlign = "left";
        ctx.fillText("NEW BEST", 20, 24);
      }

      if (dead) {
        ctx.fillStyle = "rgba(6,16,12,0.72)";
        ctx.fillRect(-8, -8, W + 16, H + 16);
      }

      ctx.restore();
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  const beginGame = () => {
    if (over) {
      resetRef.current();
      playSound("start");
    } else {
      startRef.current();
    }
  };

  const onCanvasPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    aimRef.current(e);
    beginGame();
    pressControl(e.pointerId, " ");
  };

  return (
    <div className="rounded-3xl border border-white/15 bg-white/[0.02] p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-neutral-500">جوه الموقع</p>
          <h3 className="mt-2 text-2xl font-black">ADAM STRIKE</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span aria-live="polite" className="rounded-lg border border-white/15 px-3 py-1.5">النقاط: <b>{score}</b></span>
          <span dir="ltr" lang="en" className="rounded-lg border border-[#7FF2B0]/30 px-3 py-1.5 font-mono text-[#7FF2B0]">BEST {String(best).padStart(4, "0")}</span>
          <span aria-live="polite" className="rounded-lg border border-white/15 px-3 py-1.5">الأرواح: <b>{"♥".repeat(lives)}</b></span>
          <SoundToggle />
          <button
            onClick={() => resetRef.current()}
            className="cta-mint rounded-lg px-3 py-1.5 text-xs font-bold"
          >
            إعادة ⟳
          </button>
        </div>
      </div>

      <div className={`relative overflow-hidden rounded-xl border border-white/10 ${started && !over ? "" : "touch-pan-y"}`}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          tabIndex={0}
          role="application"
          aria-label="لعبة ADAM Strike. الأسهم أو WASD للحركة، مسافة أو المس الشاشة لضرب النار. اضغط Enter بعد الخسارة."
          onPointerDown={onCanvasPointerDown}
          className={`block w-full cursor-crosshair bg-black ${started && !over ? "touch-none" : ""}`}
        >
          لعبة ADAM Strike — اضرب الأعداء واتجنب الاصطدام.
        </canvas>
        {(!started || over) && (
          <div className="absolute inset-0 grid place-items-center bg-[#06100C]/70 backdrop-blur-sm">
            <button
              onClick={beginGame}
              className="cta-mint rounded-xl px-6 py-3 text-sm font-bold"
            >
              {over ? `انتهت اللعبة — النقاط ${score} — العب تاني ↻` : "ابدأ اللعب ↑"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-neutral-500">
          الأسهم أو WASD للحركة · مسافة أو اضغط على اللوحة لضرب النار · اضغط Enter بعد الخسارة
        </p>
        <div className="flex gap-2">
          {(["arrowleft", "arrowup", "arrowdown", "arrowright", " "] as const).map((k) => (
            <button
              key={k}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                canvasRef.current?.focus();
                beginGame();
                pressControl(e.pointerId, k);
              }}
              onPointerUp={(e) => releaseControl(e.pointerId)}
              onPointerCancel={(e) => releaseControl(e.pointerId)}
              onLostPointerCapture={(e) => releaseControl(e.pointerId)}
              className="h-11 w-12 rounded-lg border border-white/20 text-sm font-bold active:bg-[#7FF2B0] active:text-black"
              aria-label={k === "arrowleft" ? "تحرك يسار" : k === "arrowright" ? "تحرك يمين" : k === "arrowup" ? "تحرك لأعلى" : k === "arrowdown" ? "تحرك لأسفل" : "أطلق النار"}
            >
              {k === "arrowleft" ? "←" : k === "arrowright" ? "→" : k === "arrowup" ? "↑" : k === "arrowdown" ? "↓" : "نار"}
            </button>
          ))}
        </div>
      </div>
      {over && <p role="status" aria-live="polite" className="sr-only">انتهت اللعبة. النقاط {score}. أفضل نتيجة {best}.</p>}
    </div>
  );
}
