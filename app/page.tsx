import AiChat from "@/components/ai-chat";

const projects = [
  {
    name: "starter-web",
    desc: "الموقع اللي انت بتشوفه دلوقتي — Next.js + Tailwind + مساعد ذكي.",
    demo: "/demos?tab=starter",
    repo: "https://github.com/fastking-forever/starter-web",
  },
  {
    name: "REA",
    desc: "أداة الهندسة العكسية — جرّب الواجهة التحليلية جوه الموقع.",
    demo: "/demos?tab=rea",
    repo: "https://github.com/fastking-forever/rea",
  },
];

const downloads = [
  { name: "ADAM Football", file: "adam-football.apk", type: "لعبة أندرويد", size: "3 MB" },
  { name: "ADAM Game", file: "adam-game.apk", type: "لعبة أندرويد", size: "4 MB" },
  { name: "Golazo", file: "golazo.zip", type: "لعبة كرة قدم", size: "12.7 MB" },
  { name: "ADAM City", file: "adam-city.zip", type: "لعبة متصفح", size: "0.5 MB" },
  { name: "Light Jockey", file: "light-jockey.zip", type: "لعبة متصفح", size: "0.9 MB" },
  { name: "IsoCity", file: "isocity.zip", type: "لعبة متصفح", size: "0.7 MB" },
  { name: "Challenge Game", file: "challenge-game.zip", type: "لعبة متصفح", size: "0.1 MB" },
  { name: "Sand Tale", file: "sand-tale.zip", type: "لعبة متصفح", size: "0.1 MB" },
  { name: "Football HTML", file: "football-game.html", type: "ملف HTML", size: "0.03 MB" },
];

const features = [
  { title: "هوية واضحة", body: "رسالة واحدة مفهومة من أول نظرة، بدون ضجيج بصري.", mark: "01" },
  { title: "تجارب حية", body: "صفحات تجريبية جوه الموقع تشرح المشاريع بدل ما تكون مجرد روابط.", mark: "02" },
  { title: "ذكاء اصطناعي", body: "مساعد مدعوم بـ Vercel AI Gateway يرد على أسئلة الزوار فوراً.", mark: "03" },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <a href="#" className="flex items-center gap-2 font-black tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#ff6a00] text-black">
            A
          </span>
          <span className="text-lg">ADAM</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-neutral-400 md:flex">
          <a href="#about" className="transition hover:text-white">عن المنصة</a>
          <a href="#projects" className="transition hover:text-white">المشاريع</a>
          <a href="#downloads" className="transition hover:text-white">التنزيلات</a>
          <a href="/demos" className="transition hover:text-white">التجارب</a>
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
              ADAM · منصة تعريفية
            </span>
            <h1 className="mt-7 text-5xl font-black leading-[1.15] tracking-tight md:text-7xl">
              فكرة واضحة.
              <br />
              <span className="text-[#ff6a00]">تصميم يليق بك.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
              منصة ADAM بتجمع سرد بسيط، هوية بصرية قوية، تجارب تفاعلية للمشاريع،
              ومساعد ذكي يشرح لك كل حاجة في أي وقت.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/demos" className="rounded-xl bg-[#ff6a00] px-6 py-3.5 text-sm font-bold text-black transition hover:bg-orange-400">
                جرّب التجارب
              </a>
              <a href="#downloads" className="rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold transition hover:bg-white/5">
                نزّل الألعاب
              </a>
            </div>
            <dl className="mt-12 flex gap-10 border-t border-white/10 pt-7">
              {[
                ["٣", "خطوات للبداية"],
                ["٩", "ألعاب للتنزيل"],
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
                  <div key={t} className="rounded-xl border border-white/10 bg-black/30 p-4 text-center text-xs text-neutral-300">
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
            ADAM صفحة تعريفية مصمّمة عشان تشرح فكرتك في أقل وقت وبأكبر أثر.
            مش بس روابط لمشاريعك — جوه الموقع تجارب حية توضح إزاي كل مشروع بيشتغل،
            وقسم تنزيلات يخلّي ألعابك متاحة لأي حد. والجزء الأهم: مساعد ذكي جوه الصفحة.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-bold tracking-widest text-[#ff6a00]">المزايا</p>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">ثلاث حاجات بتفرق</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <article key={f.mark} className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-[#ff6a00]/40 hover:bg-white/[0.04]">
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
          <h2 className="mt-4 text-3xl font-black md:text-4xl">اتنين شغالين جوه الموقع</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {projects.map((p) => (
              <div key={p.name} className="rounded-2xl border border-white/10 bg-black/30 p-7 transition hover:border-[#ff6a00]/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <span className="text-xs text-neutral-600">تجربة حية</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{p.desc}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={p.demo} className="rounded-lg bg-[#ff6a00] px-4 py-2 text-xs font-bold text-black transition hover:bg-orange-400">
                    جرّبها دلوقتي ←
                  </a>
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold text-neutral-300 transition hover:border-[#ff6a00]/50">
                    الكود على GitHub ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs font-bold tracking-widest text-[#ff6a00]">تنزيلات عامة</p>
          <h2 className="mt-4 text-3xl font-black md:text-4xl">نزّل أي لعبة، بدون تسجيل</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400">
            كل الملفات هنا متاحة للنزيل المباشر. ملفات Android بـ APK، ولعبات المتصفح بـ ZIP
            (افكّها وافتح <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">index.html</code>).
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {downloads.map((d) => (
              <a
                key={d.file}
                href={`/downloads/${d.file}`}
                download
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-[#ff6a00]/50 hover:bg-white/[0.05]"
              >
                <div>
                  <p className="font-bold">{d.name}</p>
                  <p className="mt-1 text-xs text-neutral-500">{d.type} · {d.size}</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-neutral-500 transition group-hover:border-[#ff6a00] group-hover:text-[#ff6a00]">
                  ↓
                </span>
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
              المساعد شغال عبر <span className="text-white">Vercel AI Gateway</span>،
              يعني ردود حقيقية بالعربي بدون ما تضيف مفتاح بنفسك. لو حابب تستخدم مفتاحك،
              حط <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">AI_GATEWAY_API_KEY</code> في إعدادات المشروع.
            </p>
            <a href="/demos" className="mt-6 inline-block text-sm font-bold text-[#ff6a00] hover:underline">
              شوف التجارب التفاعلية ←
            </a>
          </div>
          <AiChat />
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-600">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <span>© 2026 ADAM — صُنع بحب ووضوح.</span>
          <span>عربي · RTL · Next.js</span>
        </div>
      </footer>
    </main>
  );
}
