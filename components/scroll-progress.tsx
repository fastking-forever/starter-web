"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setVisible(h.scrollTop > 500);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <div
        className="fixed right-0 top-0 z-50 h-0.5 bg-white transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="الرجوع للأعلى"
        className={`fixed bottom-6 left-6 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/80 text-lg backdrop-blur transition ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        ↑
      </button>
    </>
  );
}
