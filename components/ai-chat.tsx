"use client";

import { useState, type FormEvent } from "react";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "إيه اللي بيميّز ADAM؟",
  "فين ألاقي التجارب؟",
  "إزاي أنزّل الألعاب؟",
];

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "أهلاً بك 👋 أنا مساعد ADAM. اسألني عن المشاريع، التجارب، أو تنزيلات الألعاب.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff6a00] opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff6a00]" />
        </span>
        <div>
          <p className="text-sm font-semibold">المساعد الذكي</p>
          <p className="text-xs text-neutral-500">متصل · بيرد بالعربي</p>
        </div>
      </div>

      <div className="flex h-64 flex-col gap-3 overflow-y-auto pl-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              m.role === "user"
                ? "self-end bg-[#ff6a00] text-black"
                : "self-start bg-white/[0.06] text-neutral-200"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="self-start rounded-2xl bg-white/[0.06] px-4 py-2.5 text-sm text-neutral-400">
            بيفكّر...
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => void send(s)}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-400 transition hover:border-[#ff6a00]/50 hover:text-white"
          >
            {s}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب سؤالك..."
          className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-neutral-600 focus:border-[#ff6a00]/60"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#ff6a00] px-5 py-3 text-sm font-bold text-black transition hover:bg-orange-400 disabled:opacity-50"
        >
          إرسال
        </button>
      </form>
    </div>
  );
}
