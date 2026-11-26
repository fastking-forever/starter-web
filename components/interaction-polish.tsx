"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = [
  "main section > div > div.text-center",
  "main section article",
  "#home .glass-card",
  "#showcase .glass-card",
  "footer > div",
].join(", ");

export default function InteractionPolish() {
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Keep the nav in sync with the section currently in view.
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]'));
    const sections = links
      .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
      .filter((section): section is HTMLElement => Boolean(section));

    let ticking = false;
    const updateActive = () => {
      ticking = false;
      const marker = window.scrollY + Math.min(180, window.innerHeight * 0.3);
      let activeId = "";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top + window.scrollY <= marker) activeId = section.id;
      });
      links.forEach((link) => {
        const active = link.hash === `#${activeId}`;
        link.classList.toggle("nav-active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Reveal cards gently as they come into view.
    let observer: IntersectionObserver | null = null;
    let nodes: HTMLElement[] = [];
    if (!reduced && "IntersectionObserver" in window) {
      nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
      nodes.forEach((node) => node.classList.add("reveal"));
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("reveal-in");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      nodes.forEach((node) => observer?.observe(node));
    }

    return () => {
      observer?.disconnect();
      nodes.forEach((node) => node.classList.remove("reveal", "reveal-in"));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      links.forEach((link) => {
        link.classList.remove("nav-active");
        link.removeAttribute("aria-current");
      });
    };
  }, []);

  return null;
}
