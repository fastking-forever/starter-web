import AiChat from "@/components/ai-chat";
import Faq from "@/components/faq";
import GameLibrary from "@/components/game-library";
import SpaceShooter from "@/components/space-shooter";

const features = [
  { n: "01", title: "تحميل مباشر", body: "اضغط و	nزّل. مفيش تسجيل، مفيش انتظار، مفيش تعقيد.", icon: "↓" },
  { n: "02", title: "العب من الموقع", body: "لعبة فضاء شغالة جوه الصفحة بضرب نار ونقاط وأرواح.", icon: "✦" },
  { n: "03", title: "مساعد ذكي", body: "اسأل عن أي لعبة أو طريقة تحميل والباقي علينا.", icon: "◈" },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#070707]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070707]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className="flex items-center gap-2.5 font-black tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-sm text-black">A</span>
            <span className="text-lg">ADAM</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-neutral-400 md:flex">
            <a href="#games" className="transition hover:text-white">الألعاب</a>
            <a href="#play" className="transition hover:text-white">العب دلوقتي</a>
            <a href="#music" className="transition hover:text-white">الأغنية</a>
            <a href="#ai" className="transition hover:text-white">المساعد</a>
            <a href="#faq" className="transition hover:text-white">الأسئلة</a>
          </nav>
          <a
            href="#games"
            className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-neutral-300"
          >
            نزّل دلوقتي ↓
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-8 md:pt-16">
        <div className="mono-grid pointer-events-none absolute inset-x-0 top-0 h-[540px] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative flex items-center justify-between border-b border-white/10 pb-4 text-[10px] font-bold tracking-[0.3em] text-neutral-500">
          <span>ADAM // ARCADE</span>
          <span>EST. 2026</span>
        </div>

        <div className="relative mt-8 text-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-2 select-none whitespace-nowrap text-[clamp(4.5rem,23vw,19rem)] font-black leading-[0.82] tracking-[-0.09em] text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}
          >
            ADAM
          </span>
          <h1 className="relative select-none whitespace-nowrap text-[clamp(4.5rem,23vw,19rem)] font-black leading-[0.82] tracking-[-0.09em] text-white">
            ADAM
          </h1>
        </div>

        <div className="relative mx-auto mt-8 max-w-4xl border-t border-white/15 pt-8 text-center">
          <p className="text-xl font-bold md:text-2xl">العب. نزّل. خلّي اليوم ممتع.</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-loose text-neutral-400 md:text-base">
            خمسة ألعاب بس، كلها باسم ADAM: Subway by adam، ADAM Football، ADAM Strike، يومك أهم، وADAM Game.
            وADAM Strike تقدر تلعبه هنا في المتصفح من غير تحميل.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#games" className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:bg-neutral-300">
              تصفّح الألعاب
            </a>
            <a href="#play" className="rounded-xl border border-white/25 px-6 py-3.5 text-sm font-bold transition hover:border-white hover:bg-white/5">
              العب ADAM Strike
            </a>
          </div>
          <dl className="mt-10 flex flex-wrap justify-center gap-10 border-t border-white/10 pt-7">
            {[
              ["٥", "ألعاب للتنزيل"],
              ["١", "لعبة في المتصفح"],
              ["∞", "مرح ومتعة"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-black">{value}</dt>
                <dd className="mt-1 text-xs text-neutral-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Moving strip */}
      <div className="overflow-hidden border-y border-white/10 bg-white py-3">
        <div className="flex w-max gap-10 whitespace-nowrap text-xs font-black tracking-[0.35em] text-black animate-marquee">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i}>ADAM ★ DOWNLOAD ★ PLAY ★ REPEAT ★</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-bold tracking-[0.25em] text-neutral-500">ليه ADAM؟</p>
        <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">ثلاث حاجات بتفرق</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <article key={f.n} className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-600">/{f.n}</span>
                <span className="text-2xl text-neutral-500 transition group-hover:text-white">{f.icon}</span>
              </div>
              <h3 className="mt-10 text-xl font-bold">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <GameLibrary />

      {/* Playable game */}
      <section id="play" className="border-t border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-neutral-500">تجربة تفاعلية</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">العب من غير تحميل</h2>
            </div>
            <p className="max-w-md text-sm leading-loose text-neutral-400">
             نسخة المتصفح من ADAM Strike: حرّك السفينة واضرب النار. بمفيش تحميل وبدون تسجيل.
            </p>
          </div>
          <SpaceShooter />
        </div>
      </section>

      {/* Music */}
      <section id="music" className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-neutral-500">الموسيقى</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Royal Funk</h2>
            <p className="mt-3 text-lg text-neutral-300">Artefxct</p>
            <p className="mt-5 max-w-md leading-loose text-neutral-400">
              الأغنية اللي في الفيديو اللي بعته. اسمعها هنا مباشرة من TikTok بدون ما تخرج من الموقع.
            </p>
            <a
              href="https://www.tiktok.com/music/Royal-Funk-7693178966001633332"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-xl border border-white/20 px-5 py-3 text-sm font-bold transition hover:border-white hover:bg-white/5"
            >
              افتح الأغنية على TikTok ↗
            </a>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-3">
              <iframe
                src="https://www.tiktok.com/embed/v2/7704109863785450759"
                title="Royal Funk — Artefxct"
                className="mx-auto aspect-[9/16] w-full max-w-[320px] rounded-2xl border-0"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI */}
      <section id="ai" className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-neutral-500">المساعد الذكي</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">اسأل، والباقي علينا</h2>
            <p className="mt-5 leading-loose text-neutral-400">
              اكتب سؤالك عن الألعاب أو التحميل وهيرد عليك فوراً بالعربي. المساعد متصل بـ Vercel AI Gateway
              وبيشتغل جوه الصفحة من غير ما تروح لحاجة تانية.
            </p>
            <div className="mt-8 space-y-3 text-sm text-neutral-500">
              <p>✓ يشرح إزاي تثبّت APK</p>
              <p>✓ يساعدك تختار لعبة</p>
              <p>✓ يرد بالعربي في أي وقت</p>
            </div>
          </div>
          <AiChat />
        </div>
      </section>

      <Faq />

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2.5 font-black">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-sm text-black">A</span>
              <span>ADAM</span>
            </div>
            <div className="text-sm text-neutral-400">
              <a href="mailto:adamehab828@gmail.com" className="transition hover:text-white">adamehab828@gmail.com</a>
              <span className="mx-3 text-neutral-700">—</span>
              <a href="tel:01069607847" className="transition hover:text-white" dir="ltr">01069607847</a>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-neutral-600">
            <span>© 2026 ADAM — adamehab828@gmail.com — 01069607847</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
