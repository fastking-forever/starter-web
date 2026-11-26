import { generateText } from "ai";
import { NextResponse } from "next/server";

const GATEWAY_MODEL = process.env.AI_GATEWAY_MODEL || "openai/gpt-4o-mini";

const SYSTEM_PROMPT = `أنت مساعد عربي مختصر وودود لموقع ADAM، موقع ألعاب بالأبيض والأسود.
الحقائق الوحيدة المتاحة لك:
- الألعاب المتاحة للتحميل فقط: Subway by adam، ADAM Football، ADAM Strike (لعبة فضاء بضرب النار)، يومك أهم، ADAM Game.
- كل التحميلات مجانية وبدون تسجيل من قسم «الألعاب».
- ADAM Strike متاحة كمان في المتصفح من قسم «العب من غير تحميل».
- التواصل: adamehab828@gmail.com أو 01069607847.
رد بالعربية الفصحى البسيطة في جمل قصيرة. لا تذكر أي لعبة أو تفصيل أو اسم غير مذكور هنا. لو ما عندكش إجابة، قل: «اسألني عن الألعاب أو التحميل».`;

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

// Real model, free and keyless. Limited to one reply every 45s per IP,
// so it is used as a fallback when no private API key is configured.
async function pollinationsReply(message: string) {
  const res = await fetch("https://text.pollinations.ai/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 300,
    }),
  });
  if (!res.ok) throw new Error(`Pollinations responded with ${res.status}`);
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content?.trim() || "ما جاليش رد واضح، حاول تاني.";
}

function localReply(message: string) {
  const q = message.toLowerCase();
  if (q.includes("سبواي") || q.includes("subway")) {
    return "Subway by adam متاحة للتحميل من قسم الألعاب. اضغط «حمّل» وثبّت الملف على جوالك.";
  }
  if (q.includes("كور") || q.includes("football")) {
    return "ADAM Football متاحة للتحميل من قسم الألعاب، ومعها ADAM Strike في المتصفح.";
  }
  if (q.includes("نار") || q.includes("فضاء") || q.includes("استر")) {
    return "ADAM Strike هي لعبة الفضاء اللي بتضرب نار. تقدر تلعبها جوه الموقع من غير تحميل.";
  }
  if (q.includes("ايميل") || q.includes("رقم") || q.includes("تواصل")) {
    return "تواصل مع ADAM على adamehab828@gmail.com أو 01069607847.";
  }
  return `وصلني سؤالك: «${message}». المساعد مشغول دلوقتي بسبب حد الخدمة المجانية، حاول تاني بعد دقيقة.`;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { message?: unknown };
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ reply: "اكتب سؤال أولاً 🙂" });
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  const gatewayKey = process.env.AI_GATEWAY_API_KEY;

  const providers: Array<() => Promise<string>> = [];
  if (openaiKey) providers.push(() => openaiReply(message, openaiKey));
  if (gatewayKey) providers.push(() => gatewayReply(message));
  providers.push(() => pollinationsReply(message));
  if (!gatewayKey) providers.push(() => gatewayReply(message));

  for (const respond of providers) {
    try {
      return NextResponse.json({ reply: await respond() });
    } catch {
      // Try the next provider.
    }
  }

  return NextResponse.json({ reply: localReply(message), demo: true });
}
