# النشر 24/7 عبر GitHub + Vercel

## 1) بعد تثبيت Git و GitHub CLI

سجّل الدخول (هيفتح متصفح أو يطلب توكن):

```powershell
gh auth login
```

اختار:
- GitHub.com
- HTTPS
- Login with a web browser (الأسهل)

## 2) إنشاء المستودع ورفع الكود

من داخل مجلد `starter-web`:

```powershell
git init
git add .
git commit -m "Initial starter-web"
gh repo create starter-web --public --source=. --remote=origin --push
```

> لو عندك بالفعل repo، استخدم:
> `git remote add origin https://github.com/<USERNAME>/<REPO>.git`
> ثم `git push -u origin main`

## 3) النشر على Vercel

الطريقة الأسهل (من الموقع):
1. افتح https://vercel.com/new
2. Import من GitHub واختار `starter-web`
3. اضغط Deploy (الإعدادات الافتراضية مناسبة لـ Next.js)
4. من Settings → Environment Variables أضف:
   - `OPENAI_API_KEY` = مفتاحك (اختياري، للرد الحقيقي)
5. عمل Redeploy مرة واحدة بعد إضافة المتغير.

النتيجة: رابط زي `https://starter-web-xxx.vercel.app` شغال 24/7،
ومع كل `git push` بيعمل Deploy تلقائياً.

## 4) تخصيص الدومين (اختياري)

Settings → Domains → أضف دومينك، أو استخدم المجاني `*.vercel.app`.

## ملاحظة عن المفتاح

لا تكتب `OPENAI_API_KEY` في الكود أو `.env.local` وتدفعه لـ GitHub.
`.env.local` موجود في `.gitignore`، والطريقة الصحيحة هي Environment Variables في Vercel.
