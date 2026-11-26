"use client";

import { useState } from "react";

const snippets = [
  {
    tab: "Main.java",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from ADAM");
        String[] games = {"Subway by adam", "ADAM Football", "ADAM Strike"};
        for (String game : games) {
            System.out.println("- " + game);
        }
    }
}`,
  },
  {
    tab: "GameLoop.java",
    code: `public class GameLoop {
    private boolean running = true;
    private int score = 0;

    public void run() {
        while (running) {
            update();
            render();
            score += 10;
        }
    }

    private void update() { /* حركة اللاعب */ }
    private void render() { /* رسم المشهد */ }
}`,
  },
  {
    tab: "Adder.java",
    code: `import java.util.Scanner;

public class Adder {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("ادخل رقمين: ");
        int a = input.nextInt();
        int b = input.nextInt();
        System.out.println("الناتج = " + (a + b));
        input.close();
    }
}`,
  },
];

export default function JavaCode() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippets[active].code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="java" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-neutral-500">Java</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">أكواد Java</h2>
            <p className="mt-4 max-w-xl text-sm leading-loose text-neutral-400">
              أمثلة جاهزة تقدر تنسخها وتجربها فوراً. كل الكود بالأبيض والأسود زي باقي الموقع.
            </p>
          </div>
          <button
            onClick={() => void copy()}
            className="rounded-xl border border-white/20 px-4 py-2.5 text-xs font-bold transition hover:border-white hover:bg-white/5"
          >
            {copied ? "تم النسخ ✓" : "نسخ الكود ⧉"}
          </button>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.02]">
          <div className="flex flex-wrap gap-1 border-b border-white/10 p-2">
            {snippets.map((s, i) => (
              <button
                key={s.tab}
                onClick={() => setActive(i)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                  active === i ? "bg-white text-black" : "text-neutral-500 hover:text-white"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>
          <pre dir="ltr" className="overflow-x-auto p-6 text-left text-xs leading-7 text-neutral-200 md:text-sm">
            <code>{snippets[active].code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
