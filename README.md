# نَبْض — Starter تعريفي

صفحة تعريفية (About / Landing) بالعربية و RTL، ديزاين داكن بـ Tailwind v4،
وفيها مساعد ذكي جاهز.

## التشغيل

```bash
cd starter-web
npm install
npm run dev
```

افتح http://localhost:3000

## تفعيل الذكاء الاصطناعي الحقيقي

الافتراضي أن الدردشة في **وضع تجريبي** (بتردد سؤالك). عشان تربط OpenAI:

```bash
copy .env.example .env.local
```

ثم افتح `.env.local` وحط المفتاح:

```env
OPENAI_API_KEY=sk-....
```

السيرفر هيستخدم `gpt-4o-mini` تلقائياً. لو المفتاح مش موجود، هيشتغل الوضع التجريبي من غير أخطاء.

## الملفات المهمة

| الملف | الوظيفة |
|---|---|
| `app/page.tsx` | كل أقسام الصفحة |
| `app/globals.css` | الألوان الأساسية + Tailwind |
| `components/ai-chat.tsx` | واجهة الدردشة |
| `app/api/chat/route.ts` | نقطة الـ API (تجريبي / OpenAI) |

## تخصيص سريع

- الاسم والهوية: `app/layout.tsx` و `app/page.tsx`
- اللون الأساسي: غيّر `--accent` في `app/globals.css` (دلوقتي برتقالي `#ff6a00`)
- النصوص: عدّل مصفوفة `features` في `app/page.tsx`
