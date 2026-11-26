"use client";

import { useEffect, useRef } from "react";

const HOVER_SELECTOR = "a, button, article, [data-hover], label, summary";

export default function TargetCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const fine =
      window.matchMedia?.("(pointer: fine)").matches &&
      !(navigator.maxTouchPoints > 0 && Math.min(screen.width, screen.height) < 820);
    if (!fine) return;

    const dot = wrapper.querySelector<HTMLElement>(".target-cursor-dot");
    const corners = Array.from(wrapper.querySelectorAll<HTMLElement>(".target-cursor-corner"));
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let cx = mx;
    let cy = my;
    let visible = false;
    let hovering = false;
    let overInput = false;
    let raf = 0;
    let last = 0;

    function applyCursor() {
      document.body.classList.toggle(
        "hide-default-cursor",
        visible && !overInput && !document.hidden,
      );
    }

    function paint() {
      wrapper!.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      if (dot) {
        dot.style.transform = `translate3d(${dx - cx}px, ${dy - cy}px, 0) translate(-50%, -50%) scale(${hovering ? 1.5 : 1})`;
      }
      const scale = hovering ? 1.75 : 1;
      corners.forEach((corner) => {
        corner.style.scale = String(scale);
      });
    }

    function loop(time: number) {
      raf = 0;
      if (document.hidden || !visible) return;
      const dt = Math.min(64, time - (last || time));
      last = time;
      const fast = reduced ? 1 : 1 - Math.pow(0.0001, dt / 1000);
      const slow = reduced ? 1 : 1 - Math.pow(0.000005, dt / 1000);
      dx += (mx - dx) * fast;
      dy += (my - dy) * fast;
      cx += (mx - cx) * slow;
      cy += (my - cy) * slow;
      if (Math.abs(mx - dx) < 0.05) dx = mx;
      if (Math.abs(my - dy) < 0.05) dy = my;
      if (Math.abs(mx - cx) < 0.05) cx = mx;
      if (Math.abs(my - cy) < 0.05) cy = my;
      paint();
      raf = requestAnimationFrame(loop);
    }

    function kick() {
      if (!raf && visible && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    }

    function onMove(event: MouseEvent) {
      const first = !visible;
      visible = true;
      wrapper!.style.opacity = "1";
      mx = event.clientX;
      my = event.clientY;
      if (first) {
        dx = cx = mx;
        dy = cy = my;
        paint();
      }
      applyCursor();
      kick();
    }

    function onOver(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      overInput = !!target?.closest("input, textarea, select, [contenteditable='true']");
      hovering = !!target?.closest(HOVER_SELECTOR) && !overInput;
      applyCursor();
      paint();
    }

    function hide() {
      visible = false;
      wrapper!.style.opacity = "0";
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      applyCursor();
    }

    function onVisibility() {
      if (document.hidden) hide();
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVisibility);
      document.body.classList.remove("hide-default-cursor");
    };
  }, []);

  return (
    <div ref={wrapperRef} className="target-cursor-wrapper" aria-hidden="true">
      <div className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
}
