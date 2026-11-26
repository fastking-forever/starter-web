import AiChat from "@/components/ai-chat";

const projects = [
  {
    name: "starter-web",
    desc: "الموقع اللي انت بتشوفه دلوقتي — Next.js + Tailwind + مساعد ذكي.",
    url: "https://github.com/fastking-forever/starter-web",
  },
  {
    name: "rea",
    desc: "أداة الهندسة العكسية مفتوحة المصدر — Reverse Engineer Anything.",
    url: "https://github.com/fastking-forever/rea",
  },
];

const features = [
  {
    title: "هوية واضحة",
    body: "رسالة واحدة مفهومة من أول نظرة، بدون ضجيج بصري.",
    mark: "01",
  },
  {
    title: "تصميم تحريري",
    body: "خطوط قوية، مساحات محسوبة، ولون واحد بيركّز الانتباه.",
    mark: "02",
  },
  {
    title: "ذكاء اصطناعي",
    body: "مساعد جاهز للرد على أسئلة الزوار، وقابل للربط بـ API حقيقي.",
    mark: "03",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <a href="#" className="flex items-center gap-2 font-black tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#ff6a00] text-black">
            ن
          </span>
          <span className="text-lg">نَبْض</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-neutral-400 md:flex">
          <a href="#about" className="transition hover:text-white">عن المنصة</a>
          <a href="#features" className="transition hover:text-white">المزايا</a>
          <a href="#projects" className="transition hover:text-white">المشاريع</a>
          <a href="#ai" className="transition hover:text-white">المساعد الذكي</a>
        </nav>
        <a
          href="#ai"
          className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-[#ff6a00] hover:text-[#ff6a00]"
        >
          جرّب المساعد
        </a>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-[#ff6a00]/20 blur-[120px]" />
        <div className="relative grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-4 py-1.5 text-xs font-semibold text-orange-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a00]" />
              منصة تعريفية · إصدار أول
            </span>
            <h1 className="mt-7 text-5xl font-black leading-[1.15] tracking-tight md:text-7xl">
              فكرة واضحة.
              <br />
              <span className="text-[#ff6a00]">تصميم يليق بك.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
              مساحة تعريفية اللي بتجمع بين سرد بسيط، هوية بصرية قوية، ومساعد ذكي
              يشرح لك المشروع في أي وقت. جاهزة للتعديل والتطوير.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#about"
                className="rounded-xl bg-[#ff6a00] px-6 py-3.5 text-sm font-bold text-black transition hover:bg-orange-400"
              >
                اكتشف المنصة
              </a>
              <a
                href="#features"
                className="rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold transition hover:bg-white/5"
              >
                شوف المزايا
              </a>
            </div>
            <dl className="mt-12 flex gap-10 border-t border-white/10 pt-7">
              {[
                ["٣", "خطوات للبداية"],
                ["١٠٠٪", "قابل للتخصيص"],
                ["AI", "مساعد مدمج"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-black">{value}</dt>
                  <dd className="mt-1 text-xs text-neutral-500">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-b from-[#ff6a00]/20 to-transparent blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff6a00]" />
              </div>
              <div className="mt-8 h-px w-full bg-white/10" />
              <p className="mt-8 text-xs tracking-widest text-[#ff6a00]">MANIFESTO</p>
              <p className="mt-4 text-2xl font-bold leading-snug">
                «الأفضل مش اللي يزود حاجات،
                <br />
                لكن اللي يشيل اللي مش مهم.»
              </p>
              <div className="mt-10 grid grid-cols-3 gap-3">
                {["وضوح", "بساطة", "ذكاء"].map((t) => (
                  <div
                    key={t}
                    className="rounded-xl border border-white/10 bg-black/30 p-4 text-center text-xs text-neutral-300"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#ff6a00]">عن المنصة</p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">إيه اللي بنعمله؟</h2>
          </div>
          <p className="text-lg leading-loose text-neutral-400">
            نبض صفحة تعريفية مصمّمة عشان تشرح فكرتك في أقل وقت وبأكبر أثر.
            لا قوالب مزدحمة، ولا ألوان عشوائية… كل عنصر له سبب، وكل مساحة
            فاضية بتخدم اللي تحتها. والجزء الأهم: مساعد ذكي جوه الصفحة يقدر
            يجيب على أسئلة الزوار فوراً.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-bold tracking-widest text-[#ff6a00]">المزايا</p>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">ثلاث حاجات بتفرق</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.mark}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-[#ff6a00]/40 hover:bg-white/[0.04]"
            >
              <span className="text-xs font-mono text-neutral-600">/{f.mark}</span>
              <h3 className="mt-8 text-xl font-bold">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs font-bold tracking-widest text-[#ff6a00]">مشاريع على GitHub</p>
          <h2 className="mt-4 text-3xl font-black md:text-4xl">اتنين شغالين</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {projects.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 bg-black/30 p-7 transition hover:border-[#ff6a00]/50"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <span className="text-neutral-600 transition group-hover:translate-x-1 group-hover:text-[#ff6a00]">
                    ↗
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{p.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* AI */}
      <section id="ai" className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#ff6a00]">المساعد الذكي</p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">اسأل، والباقي علينا</h2>
            <p className="mt-5 leading-loose text-neutral-400">
              جرّب الدردشة على اليمين. شغالة دلوقتي في وضع تجريبي، ولو حطيت
              مفتاح OpenAI في الملف <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">.env.local</code>
              هتبدأ ترد بالذكاء الحقيقي مباشرة.
            </p>
          </div>
          <AiChat />
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-600">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <span>© 2026 نَبْض — صُنع بحب ووضوح.</span>
          <span>عربي · RTL · Next.js</span>
        </div>
      </footer>
    </main>
  );
}
