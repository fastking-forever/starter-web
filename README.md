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

- على Vercel: بيستخدم OIDC تلقائياً عبر Vercel AI Gateway.
- محلياً أو مع مفتاح خاص: اضبط `AI_GATEWAY_API_KEY` أو `OPENAI_API_KEY` في `.env.local` (مش مترفوع على GitHub).
- النموذج الافتراضي: `openai/gpt-4o-mini` ويتغيّر عبر `AI_GATEWAY_MODEL`.

## التنزيلات

الملفات في `public/downloads/` متاحة للجميع بدون تسجيل:
APK لأندرويد، ZIP لألعاب المتصفح، وملف HTML واحد.

## التصميم

أبيض وأسود فقط. الألوان في `app/globals.css` mono: خلفية `#070707` ونص `#fafafa`.
