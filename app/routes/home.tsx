import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gara Radar — Le gare pubbliche che fanno per te" },
    {
      name: "description",
      content:
        "Gara Radar trova le gare pubbliche rilevanti per il tuo mestiere e la tua zona.",
    },
  ];
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-20">
      <section className="max-w-3xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em]">
          Gara Radar
        </p>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
          Le gare pubbliche che fanno per te.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-neutral-600">
          Dimmi che lavoro fai e dove lavori. Gara Radar trova le opportunità
          rilevanti e te le spiega senza linguaggio da ufficio gare.
        </p>
        <div className="mt-10 inline-flex rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold shadow-sm">
          MVP: impiantisti ed elettricisti · Lazio
        </div>
      </section>
    </main>
  );
}
