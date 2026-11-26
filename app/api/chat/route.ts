import { generateText } from "ai";
import { NextResponse } from "next/server";

const GATEWAY_MODEL = process.env.AI_GATEWAY_MODEL || "openai/gpt-4o-mini";

const SYSTEM_PROMPT = `أنت مساعد عربي مختصر وودود لموقع ADAM.
الموقع يعرّف بمنصة ADAM ويحتوي على: مساعد ذكي، تجارب تفاعلية (starter-web و REA)، وقسم تنزيلات للألعاب.
رد بالعربية الفصحى البسيطة، في فقرات قصيرة، وبدون اختراع معلومات غير موجودة.`;

async function gatewayReply(message: string) {
  const { text } = await generateText({
    model: GATEWAY_MODEL,
    system: SYSTEM_PROMPT,
    prompt: message,
    maxOutputTokens: 350,
  });
  return text?.trim() || "ما جاليش رد واضح، حاول تاني.";
}

async function openaiReply(message: string, apiKey: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 350,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI responded with ${res.status}`);
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content?.trim() || "ما جاليش رد واضح، حاول تاني.";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { message?: unknown };
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ reply: "اكتب سؤال أولاً 🙂" });
  }

  const openaiKey = process.env.OPENAI_API_KEY;

  try {
    const reply = openaiKey
      ? await openaiReply(message, openaiKey)
      : await gatewayReply(message);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({
      reply: `وصلني سؤالك: «${message}». المساعد هيبقى حقيقي بعد إضافة وسيلة دفع على حساب Vercel لتفعيل AI Gateway، أو بإضافة OPENAI_API_KEY / AI_GATEWAY_API_KEY في Environment Variables.`,
      demo: true,
    });
  }
}
