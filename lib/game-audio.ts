"use client";

// Tiny synthesized sound effects. No audio files, no licensing, no downloads.
const STORAGE_KEY = "adam-game-sound";
export const SOUND_EVENT = "adam-game-sound-change";

type SoundName = "start" | "jump" | "shoot" | "score" | "hit" | "over";

type SoundSpec = {
  from: number;
  to: number;
  duration: number;
  gain: number;
  wave: OscillatorType;
};

const sounds: Record<SoundName, SoundSpec> = {
  start: { from: 330, to: 660, duration: 0.16, gain: 0.045, wave: "sine" },
  jump: { from: 420, to: 680, duration: 0.09, gain: 0.04, wave: "square" },
  shoot: { from: 760, to: 260, duration: 0.07, gain: 0.03, wave: "square" },
  score: { from: 620, to: 920, duration: 0.1, gain: 0.035, wave: "sine" },
  hit: { from: 220, to: 80, duration: 0.16, gain: 0.05, wave: "triangle" },
  over: { from: 240, to: 60, duration: 0.34, gain: 0.055, wave: "sawtooth" },
};

let enabled = true;
let context: AudioContext | null = null;

export function getSoundEnabled() {
  return enabled;
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  } catch {
    // Storage can be disabled; the in-memory preference still works.
  }
  window.dispatchEvent(new Event(SOUND_EVENT));
}

export function loadSoundPreference() {
  try {
    enabled = window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    enabled = true;
  }
  return enabled;
}

function getContext() {
  if (typeof window === "undefined") return null;
  if (!context) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    context = new Ctor();
  }
  if (context.state === "suspended") void context.resume();
  return context;
}

export function playSound(name: SoundName) {
  if (!enabled) return;
  const audio = getContext();
  if (!audio) return;

  const spec = sounds[name];
  const now = audio.currentTime;
  const oscillator = audio.createOscillator();
  const volume = audio.createGain();

  oscillator.type = spec.wave;
  oscillator.frequency.setValueAtTime(spec.from, now);
  oscillator.frequency.exponentialRampToValueAtTime(spec.to, now + spec.duration);

  volume.gain.setValueAtTime(0.0001, now);
  volume.gain.exponentialRampToValueAtTime(spec.gain, now + 0.012);
  volume.gain.exponentialRampToValueAtTime(0.0001, now + spec.duration);

  oscillator.connect(volume);
  volume.connect(audio.destination);
  oscillator.start(now);
  oscillator.stop(now + spec.duration + 0.02);
}
