"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "أنزّل لعبة سبواي",
  "إزاي ألعب كورة؟",
  "فين لعبة ضرب النار؟",
];

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "أهلاً بك 👋 أنا مساعد ADAM. اسألني عن الألعاب أو التحميل وأساعدك فوراً.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, loading]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      const data = (await res.json()) as { reply?: string };
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? "ما قدرتش أجهز رد دلوقتي، حاول تاني.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "حصل خطأ في الاتصال. حاول تاني بعد لحظة." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-white/15 bg-white/[0.03] p-5 shadow-2xl shadow-black/60 backdrop-blur">
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ring rounded-full bg-[#7FF2B0]/60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7FF2B0]" />
        </span>
        <div>
          <p className="text-sm font-semibold">مساعد ADAM</p>
          <p className="text-xs text-neutral-500">متصل · بيرد بالعربي</p>
        </div>
      </div>

      <div ref={logRef} role="log" aria-live="polite" aria-label="محادثة مساعد ADAM" className="flex h-64 flex-col gap-3 overflow-y-auto pl-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              m.role === "user"
                ? "self-end bg-white text-black"
                : "self-start border border-white/10 bg-white/[0.06] text-neutral-200"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="self-start rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-neutral-400">
            بيفكّر...
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => void send(s)}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-neutral-400 transition hover:border-white hover:text-white"
          >
            {s}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="اكتب سؤالك لمساعد ADAM"
          placeholder="اكتب سؤالك..."
          className="flex-1 rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-neutral-600 focus:border-[#7FF2B0]/60"
        />
        <button
          type="submit"
          disabled={loading}
          className="cta-mint rounded-xl px-5 py-3 text-sm font-bold"
        >
          إرسال
        </button>
      </form>
    </div>
  );
}
