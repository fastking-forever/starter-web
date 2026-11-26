import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const prompt = (url.searchParams.get("prompt") || "").trim().slice(0, 300);
  const seedParam = Number(url.searchParams.get("seed"));
  const seed = Number.isFinite(seedParam) && seedParam > 0 ? Math.min(999999, Math.floor(seedParam)) : 42;

  if (!prompt) {
    return NextResponse.json({ error: "prompt is required" }, { status: 400 });
  }

  const finalPrompt = `${prompt} — monochrome, black and white, high contrast, clean composition, no text`;
  const upstream = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=768&height=768&seed=${seed}`;

  try {
    const res = await fetch(upstream, { cache: "force-cache" });
    if (!res.ok) {
      return NextResponse.json({ error: `image provider returned ${res.status}` }, { status: 503 });
    }
    const bytes = await res.arrayBuffer();
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "image provider unreachable" }, { status: 503 });
  }
}
