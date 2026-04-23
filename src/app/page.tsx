import { Directory } from "@/components/Directory";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { members, allCategories, allCities } from "@/lib/members";

export default function Home() {
  const stats = [
    { label: "Membres", value: members.length },
    { label: "Secteurs", value: allCategories.length },
    { label: "Communes", value: allCities.length },
  ];

  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <Logo />
        <a
          href="#annuaire"
          className="hidden rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)] transition hover:border-[var(--color-accent-soft)] hover:text-[var(--color-accent)] sm:inline-block"
        >
          Voir l'annuaire
        </a>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative mx-auto w-full max-w-6xl px-5 pb-10 pt-6 md:pb-16 md:pt-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-gradient-to-br from-[var(--color-brand)] via-[#14243c] to-[#1d2f4b] p-8 text-white shadow-[0_40px_80px_-40px_rgba(11,26,46,0.5)] md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(184,138,62,0.4),_transparent_70%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(217,184,119,0.25),_transparent_70%)]"
            />
            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-soft)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-soft)]" />
                Réseau d'affaires · Dijon
              </span>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl">
                Le carnet d'adresses vivant du{" "}
                <span className="text-[var(--color-accent-soft)]">réseau Dijon Connect</span>.
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/75 md:text-lg">
                Une carte NFC, un scan, un réseau. Retrouvez l'ensemble des entrepreneurs qui
                font vivre notre club — et ajoutez-les en un clic à vos contacts.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#annuaire"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-brand)] transition hover:bg-[var(--color-accent-soft)]"
                >
                  Parcourir l'annuaire
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="https://www.dijon-connect.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white/90 transition hover:border-white/60 hover:text-white"
                >
                  Découvrir le club
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
                      {s.label}
                    </dt>
                    <dd className="mt-1 font-display text-3xl text-white">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <div id="annuaire" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
              Annuaire
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Nos membres</h2>
            <p className="mt-2 max-w-2xl text-[var(--color-ink-soft)]">
              Des experts, partenaires et chefs d'entreprise engagés pour faire rayonner
              l'économie locale. Cliquez sur une fiche pour en savoir plus.
            </p>
          </div>
          <Directory members={members} categories={allCategories} cities={allCities} />
        </div>
      </main>

      <Footer />
    </>
  );
}
