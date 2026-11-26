# ADAM — موقع ألعاب بالأبيض والأسود

موقع تعريفي لمكتبة ألعاب ADAM: تحميل مباشر، لعبة فضاء تفاعلية جوه المتصفح، ومساعد ذكي بالعربي.

## التشغيل محلياً

```bash
npm install
npm run dev
```

افتح http://localhost:3000

## الرفع على Vercel

```bash
npm run build
vercel --prod --yes
```

الموقع الحي: https://adam-wab.vercel.app

## المساعد الذكي

- لو في `OPENAI_API_KEY`: بيستخدم OpenAI مباشرة (أفضل option).
- لو في `AI_GATEWAY_API_KEY`: بيستخدم Vercel AI Gateway.
- بدون مفاتيح: بيستخدم نموذج حقيقي مجاني على `text.pollinations.ai` (حد مجاني: رد كل 45 ثانية لكل IP و100 رد يومياً). لو اتجاوز الحد بيرد المساعد برد محلي مختصر.
- النموذج الافتراضي على Gateway: `openai/gpt-4o-mini` ويتغيّر عبر `AI_GATEWAY_MODEL`.

## التنزيلات

الملفات في `public/downloads/` متاحة للجميع بدون تسجيل:
APK لأندرويد، ZIP لألعاب المتصفح، وملف HTML واحد.

## التصميم

أبيض وأسود فقط. الألوان في `app/globals.css` mono: خلفية `#070707` ونص `#fafafa`.
