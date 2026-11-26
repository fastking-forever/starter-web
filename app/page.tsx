import AiChat from "@/components/ai-chat";
import ContactCards from "@/components/contact-cards";
import DinoGame from "@/components/dino-game";
import Faq from "@/components/faq";
import GameLibrary from "@/components/game-library";
import GameWheel from "@/components/game-wheel";
import ImageStudio from "@/components/image-studio";
import SpaceShooter from "@/components/space-shooter";
import Tools from "@/components/tools";

const navLinks = [
  { href: "#games", label: "الألعاب" },
  { href: "#play", label: "العب دلوقتي" },
  { href: "#dino", label: "الديناصور" },
  { href: "#wheel", label: "العجلة" },
  { href: "#tools", label: "خدمات" },
  { href: "#create", label: "استوديو الصور" },
  { href: "#ai", label: "المساعد" },
  { href: "#faq", label: "الأسئلة" },
];

const stats = [
  { value: "٥", label: "ألعاب للتنزيل", icon: "↓" },
  { value: "٢", label: "لعبة في المتصفح", icon: "✦" },
  { value: "٧", label: "أدوات وتجارب", icon: "◈" },
];

const advantages = [
  { title: "تحميل مباشر", body: "ملفات APK جاهزة للتحميل بضغطة واحدة، من غير تسجيل أو انتظار.", icon: "↓" },
  { title: "العب في المتصفح", body: "ADAM Strike وADAM Dino شغالين جوه الموقع من غير أي تحميل.", icon: "✦" },
  { title: "استوديو ذكي", body: "اكتب فكرتك بالعربي وهتتحول لصورة بالأبيض والأسود.", icon: "✧" },
  { title: "أدوات فورية", body: "حاسبة، كلمة مرور، مؤقت، QR، وتنظيف نصوص عربية.", icon: "◈" },
  { title: "عجلة ADAM", body: "مش عارف تلعب إيه؟ دوّر العجلة وهتختار لك لعبة.", icon: "◎" },
  { title: "مساعد بالعربي", body: "اسأل عن أي لعبة أو تحميل وهيرد عليك فوراً جوه الصفحة.", icon: "◉" },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Fixed navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#06100C]/75 backdrop-blur-xl">
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <a href="#games" className="btn-primary !px-4 !py-2 text-[11px] md:!px-5">
            نزّل دلوقتي ↓
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 backdrop-blur-xl lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-xs font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/25 bg-white/10 font-display text-sm font-black shadow-[0_0_16px_rgba(255,255,255,0.18)]">
              A
            </span>
            <span className="font-display text-lg font-black tracking-wide">ADAM #</span>
          </a>
        </div>
        <div className="accent-line" />
      </header>

      {/* Mobile navigation */}
      <nav className="sticky top-16 z-40 flex gap-1 overflow-x-auto border-b border-white/10 bg-[#06100C]/90 px-4 py-2 backdrop-blur-xl lg:hidden">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-bold text-white/70 transition hover:border-white/40 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Hero */}
      <section id="home" className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-28 text-center md:px-8">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="mono-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_50%_35%,black,transparent_70%)]" />

        <div className="relative z-10 w-full max-w-4xl">
          <span className="section-tag">DEV BY ADAM  ◈</span>
          <h1 className="font-display mt-7 text-5xl font-black leading-[1.1] md:text-7xl">
            أهلًا بك في <span className="gradient-text">ADAM</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-loose text-white/60 md:text-lg">
            خمسة ألعاب باسم ADAM، ولعبتين تقدر تلعبهم فوراً في المتصفح،
            واستوديو صور وأدوات ذكية تجربها من غير تسجيل.
          </p>

          <p className="mx-auto mt-7 max-w-2xl rounded-xl border border-[#7FF2B0]/25 bg-[#7FF2B0]/[0.06] px-5 py-4 font-display text-base font-black leading-loose text-white shadow-[0_0_25px_rgba(127,242,176,0.1)] md:text-lg">
            «من لم يذل  نفسه علي مقاعد العلم , اذلته الحياه علي ابوابها»
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#games" className="btn-primary">
              تصفّح الألعاب <span>↓</span>
            </a>
            <a href="#play" className="btn-ghost">
              العب ADAM Strike <span>↗</span>
            </a>
          </div>

          <div className="mx-auto mt-14 grid max-w-2xl gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl px-4 py-6">
                <div className="diamond mx-auto mb-4 text-xs text-white">{stat.icon}</div>
                <p className="font-display text-3xl font-black">{stat.value}</p>
                <p className="mt-1 font-mono text-[11px] tracking-widest text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a href="#showcase" aria-label="انزل للأسفل" className="animate-bounce-down text-white/50 transition hover:text-white">
              ↓
            </a>
          </div>
        </div>
      </section>

      {/* Intro showcase */}
      <section id="showcase" className="border-t border-white/10 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <span className="section-tag">ADAM Intro</span>
            <h2 className="section-title mt-5">مقدمة ADAM</h2>
            <p className="section-desc mx-auto mt-3 max-w-xl">شوف البداية، وبعدين اختار لعبتك وابدأ.</p>
          </div>
          <div className="glass-card mx-auto max-w-3xl overflow-hidden rounded-2xl p-2">
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              <span className="absolute right-3 top-3 z-10 rounded-md border border-white/15 bg-[#06100C]/75 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-white/70 backdrop-blur">
                ADAM MOTION
              </span>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/adam-motion-poster.webp"
                aria-label="ADAM — لقطة متحركة"
                className="aspect-video w-full object-cover"
              >
                <source src="/adam-motion.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/10" aria-hidden="true" />

      {/* Advantages */}
      <section id="why" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <span className="section-tag">ليه ADAM؟</span>
          <h2 className="section-title mt-5">موقع واحد، كل اللعب</h2>
          <p className="section-desc mx-auto mt-3 max-w-2xl">
            كل حاجة هنا مصممة عشان توصل للعبتك في أسرع وقت، وتجرب حاجات جديدة بعدها.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <article key={item.title} className="glass-card rounded-2xl p-7">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-lg text-white">
                  {item.icon}
                </span>
                <span className="font-mono text-[11px] tracking-widest text-white/35">ADAM</span>
              </div>
              <h3 className="mt-8 text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-loose text-white/55">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <GameLibrary />

      {/* Playable game */}
      <section id="play" className="border-t border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="mb-10 text-center">
            <span className="section-tag">تجربة تفاعلية</span>
            <h2 className="section-title mt-5">العب من غير تحميل</h2>
            <p className="section-desc mx-auto mt-3 max-w-xl">
              نسخة المتصفح من ADAM Strike: حرّك السفينة واضرب النار. من غير تحميل أو تسجيل.
            </p>
          </div>
          <SpaceShooter />
        </div>
      </section>

      {/* Dinosaur game */}
      <section id="dino" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-10 text-center">
            <span className="section-tag">لعبة تانية</span>
            <h2 className="section-title mt-5">ADAM Dino</h2>
            <p className="section-desc mx-auto mt-3 max-w-xl">
              اضغط مسافة أو المس الشاشة وقفّز فوق الصبار. كل ما تعدي أكتر، السرعة بتزيد.
            </p>
          </div>
          <DinoGame />
        </div>
      </section>

      {/* Random wheel */}
      <section id="wheel" className="border-t border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-10 text-center">
            <span className="section-tag">اختر بسرعة</span>
            <h2 className="section-title mt-5">عجلة ADAM</h2>
            <p className="section-desc mx-auto mt-3 max-w-xl">
              مش عارف تلعب إيه؟ دوّر العجلة وهتختار لك من الألعاب الخمسة.
            </p>
          </div>
          <GameWheel />
        </div>
      </section>

      <Tools />

      <ImageStudio />

      {/* AI */}
      <section id="ai" className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <span className="section-tag">المساعد الذكي</span>
            <h2 className="section-title mt-5">اسأل، والباقي علينا</h2>
            <p className="section-desc mt-5">
              اكتب سؤالك عن الألعاب أو التحميل وهيرد عليك فوراً بالعربي. المساعد متصل بنموذج ذكي
              وبيشتغل جوه الصفحة من غير ما تروح لحاجة تانية.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/60">
              <p>✓ يشرح إزاي تثبّت APK</p>
              <p>✓ يساعدك تختار لعبة</p>
              <p>✓ يرد بالعربي في أي وقت</p>
            </div>
          </div>
          <AiChat />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-10 text-center">
            <span className="section-tag">تواصل معانا</span>
            <h2 className="section-title mt-5">مين ورا ADAM؟</h2>
            <p className="section-desc mx-auto mt-3 max-w-xl">
              أي استفسار عن التحميل أو الألعاب، البريد والهاتف قدّامك ونسخهم في ضغطة.
            </p>
          </div>
          <ContactCards />
        </div>
      </section>

      <Faq />

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="accent-line mx-auto mb-7 max-w-3xl" />
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/25 bg-white/10 font-display text-sm font-black">A</span>
              <span className="font-display font-black tracking-wide">ADAM #</span>
            </div>
            <div className="text-sm text-white/55">
              <a href="mailto:adamehab828@gmail.com" className="transition hover:text-white">adamehab828@gmail.com</a>
              <span className="mx-3 text-white/25">—</span>
              <a href="tel:01069607847" dir="ltr" className="transition hover:text-white">01069607847</a>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/40">
            <span>© 2026 ADAM — adamehab828@gmail.com — 01069607847</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
