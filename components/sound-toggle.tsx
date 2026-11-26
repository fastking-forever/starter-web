"use client";

import { useEffect, useState } from "react";
import {
  getSoundEnabled,
  loadSoundPreference,
  setSoundEnabled,
  SOUND_EVENT,
} from "@/lib/game-audio";

export default function SoundToggle() {
  const [on, setOn] = useState(getSoundEnabled);

  useEffect(() => {
    setOn(loadSoundPreference());
    const sync = () => setOn(getSoundEnabled());
    window.addEventListener(SOUND_EVENT, sync);
    return () => window.removeEventListener(SOUND_EVENT, sync);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setSoundEnabled(!on)}
      aria-pressed={on}
      aria-label={on ? "إيقاف صوت اللعبة" : "تشغيل صوت اللعبة"}
      title={on ? "إيقاف صوت اللعبة" : "تشغيل صوت اللعبة"}
      className="rounded-lg border border-white/15 px-2.5 py-1 font-mono text-[10px] tracking-wide text-neutral-400 transition hover:border-[#7FF2B0]/50 hover:text-[#7FF2B0]"
    >
      {on ? "SOUND ON" : "SOUND OFF"}
    </button>
  );
}
