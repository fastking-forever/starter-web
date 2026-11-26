"use client";

import { useEffect } from "react";

export default function InteractionPolish() {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        [
          "main section > div > div.text-center",
          "main section article",
          "#home .glass-card",
          "#showcase .glass-card",
          "footer > div",
        ].join(", "),
      ),
    );
    if (!nodes.length) return;

    nodes.forEach((node) => node.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      nodes.forEach((node) => node.classList.remove("reveal", "reveal-in"));
    };
  }, []);

  return null;
}
