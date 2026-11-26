import DemoLab from "@/components/demo-lab";

export const metadata = {
  title: "التجارب | ADAM",
  description: "تجارب تفاعلية لمشروعي starter-web و REA داخل موقع ADAM.",
};

export default async function DemosPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const initialTab = tab === "rea" ? "rea" : "starter";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <a href="/" className="flex items-center gap-2 font-black tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#ff6a00] text-black">A</span>
          <span className="text-lg">ADAM</span>
        </a>
        <a href="/#downloads" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-[#ff6a00] hover:text-[#ff6a00]">
          التنزيلات
        </a>
      </header>
      <DemoLab initialTab={initialTab} />
    </main>
  );
}
