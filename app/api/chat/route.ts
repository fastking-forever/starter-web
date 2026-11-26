import { generateText } from "ai";
import { NextResponse } from "next/server";

// أي نموذج متاح في Vercel AI Gateway. الافتراضي اقتصادي وسريع.
const MODEL = process.env.AI_GATEWAY_MODEL || "openai/gpt-4o-mini";

const SYSTEM_PROMPT = `أنت مساعد عربي مختصر وودود لموقع ADAM.
الموقع يعرّف بمنصة ADAM ويحتوي على: مساعد ذكي، تجارب تفاعلية (starter-web و REA)، وقسم تنزيلات للألعاب.
رد بالعربية الفصحى البسيطة، في فقرات قصيرة، وبدون اختراع معلومات غير موجودة.`;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { message?: unknown };
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ reply: "اكتب سؤال أولاً 🙂" });
  }

  try {
    // على Vercel، AI SDK يستخدم OIDC تلقائياً بدون أي مفتاح.
    const { text } = await generateText({
      model: MODEL,
      system: SYSTEM_PROMPT,
      prompt: message,
      maxOutputTokens: 350,
    });

    return NextResponse.json({
      reply: text?.trim() || "ما جاليش رد واضح، حاول تاني.",
    });
  } catch {
    return NextResponse.json({
      reply: `وصلني سؤالك: «${message}». المساعد الذكي هيشتغل بعد ربط المشروع بـ Vercel AI Gateway (أو إضافة AI_GATEWAY_API_KEY).`,
      demo: true,
    });
  }
}
