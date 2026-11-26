import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { message?: unknown };
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ reply: "اكتب سؤال أولاً 🙂" });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // وضع تجريبي لحد ما تضيف مفتاح OpenAI في .env.local
  if (!apiKey) {
    return NextResponse.json({
      reply: `نسخة تجريبية ✅ وصلني سؤالك: «${message}». ضيف OPENAI_API_KEY في .env.local عشان الرد يبقى حقيقي.`,
    });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "أنت مساعد عربي مختصر وودود لموقع تعريفي. رد بالعربية الفصحى البسيطة.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI responded with ${res.status}`);
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content ?? "ما جاليش رد واضح، حاول تاني.",
    });
  } catch {
    return NextResponse.json({
      reply: "تعذر الاتصال بالذكاء الاصطناعي دلوقتي. حاول بعد لحظة.",
    });
  }
}
