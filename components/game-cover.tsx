import Image from "next/image";

export type CoverKind = "subway" | "football" | "strike" | "waqtak" | "bricks";

const realIcons: Partial<Record<CoverKind, string>> = {
  strike: "/game-icons/adam-strike.png",
  waqtak: "/game-icons/waqtak-aham.png",
};

export default function GameCover({ kind }: { kind: CoverKind }) {
  const real = realIcons[kind];

  return (
    <span
      aria-hidden="true"
      className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(127,242,176,0.16),transparent_72%)] transition-colors group-hover:border-[#7FF2B0]/50"
    >
      {real ? (
        <Image src={real} alt="" width={64} height={64} className="h-16 w-16 object-cover" />
      ) : (
        <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="#7FF2B0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {kind === "subway" && (
            <>
              <rect x="13" y="10" width="38" height="31" rx="8" />
              <rect x="18" y="15" width="11" height="9" rx="2" />
              <rect x="35" y="15" width="11" height="9" rx="2" />
              <circle cx="24" cy="34" r="2" fill="#7FF2B0" stroke="none" />
              <circle cx="40" cy="34" r="2" fill="#7FF2B0" stroke="none" />
              <path d="M12 50 L21 41 M52 50 L43 41 M15 47 H49 M9 53 H55" />
            </>
          )}
          {kind === "football" && (
            <>
              <circle cx="32" cy="32" r="17" />
              <path d="M32 23 L40.5 29 L37.3 39 L26.7 39 L23.5 29 Z" />
              <path d="M32 23 V15 M40.5 29 L47 24 M37.3 39 L43 45 M26.7 39 L21 45 M23.5 29 L17 24" />
            </>
          )}
          {kind === "bricks" && (
            <>
              <rect x="11" y="13" width="18" height="7" rx="1.5" />
              <rect x="35" y="13" width="18" height="7" rx="1.5" />
              <rect x="11" y="24" width="18" height="7" rx="1.5" />
              <rect x="35" y="24" width="18" height="7" rx="1.5" />
              <circle cx="32" cy="40" r="3.5" fill="#7FF2B0" stroke="none" />
              <rect x="20" y="50" width="24" height="4" rx="2" fill="#7FF2B0" stroke="none" />
            </>
          )}
        </svg>
      )}
    </span>
  );
}
