import { Directory } from "@/components/Directory";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { members, allCategories, allCities } from "@/lib/members";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[var(--color-line)]/60 bg-[var(--color-bg)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-5 md:py-4">
          <Logo />
          <a
            href="#annuaire"
            className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)] transition active:scale-95 md:px-4 md:py-2 md:text-xs"
          >
            Annuaire
          </a>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="mx-auto w-full max-w-6xl px-4 pt-4 md:px-5 md:pt-8">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-gradient-to-br from-[var(--color-brand)] via-[#14243c] to-[#1d2f4b] p-6 text-white shadow-[0_24px_60px_-30px_rgba(11,26,46,0.45)] md:rounded-[2rem] md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(184,138,62,0.42),_transparent_70%)] md:-right-24 md:-top-24 md:h-72 md:w-72"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(217,184,119,0.22),_transparent_70%)] md:-bottom-32 md:-left-20 md:h-80 md:w-80"
            />
            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-soft)] md:px-3 md:text-[10px] md:tracking-[0.24em]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-soft)]" />
                Réseau d'affaires · Dijon
              </span>
              <h1 className="mt-4 font-display text-[2rem] leading-[1.05] md:mt-5 md:text-6xl">
                Le carnet d'adresses du{" "}
                <span className="text-[var(--color-accent-soft)]">réseau Dijon Connect</span>.
              </h1>
              <p className="mt-3 text-sm text-white/75 md:mt-5 md:max-w-xl md:text-lg">
                Un scan, un réseau. Retrouvez nos {members.length} membres et ajoutez-les à vos
                contacts en un clic.
              </p>
              <div className="mt-5 flex items-center gap-2.5 md:mt-8 md:gap-3">
                <a
                  href="#annuaire"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-[var(--color-brand)] transition active:scale-[0.98] md:flex-initial md:px-5 md:hover:bg-[var(--color-accent-soft)]"
                >
                  Voir les membres
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <dl className="mt-6 grid grid-cols-3 gap-2 md:mt-10 md:max-w-lg md:gap-4">
                {[
                  { label: "Membres", value: members.length },
                  { label: "Secteurs", value: allCategories.length },
                  { label: "Communes", value: allCities.length },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur-sm md:rounded-2xl md:p-4"
                  >
                    <dt className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-soft)] md:text-[10px] md:tracking-[0.22em]">
                      {s.label}
                    </dt>
                    <dd className="mt-0.5 font-display text-2xl text-white md:mt-1 md:text-3xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <div id="annuaire" className="scroll-mt-20 md:scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 pb-2 pt-8 md:px-5 md:pt-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)] md:tracking-[0.28em]">
              Annuaire
            </p>
            <h2 className="mt-1.5 font-display text-2xl md:mt-2 md:text-4xl">Nos membres</h2>
          </div>
          <Directory members={members} categories={allCategories} cities={allCities} />
        </div>
      </main>

      <Footer />
    </>
  );
}
