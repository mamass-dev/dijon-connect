import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { MemberAvatar } from "@/components/MemberAvatar";
import { getMember, members } from "@/lib/members";

export async function generateStaticParams() {
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) return { title: "Membre introuvable — Dijon Connect" };
  return {
    title: `${m.firstName} ${m.lastName} · ${m.company} — Dijon Connect`,
    description: `${m.activity}. Membre du réseau Dijon Connect.`,
  };
}

export default async function MemberPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) notFound();

  const idx = members.findIndex((m) => m.slug === member.slug);
  const prev = members[(idx - 1 + members.length) % members.length];
  const next = members[(idx + 1) % members.length];

  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <Logo />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)] transition hover:border-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Annuaire
        </Link>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="mx-auto w-full max-w-6xl px-5 pb-16">
          <div className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white shadow-[0_40px_80px_-50px_rgba(11,26,46,0.35)]">
            <div className="grid md:grid-cols-[minmax(0,380px)_1fr]">
              <div className="relative aspect-square md:aspect-auto md:h-full">
                <MemberAvatar
                  member={member}
                  size={760}
                  priority
                  rounded=""
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink)] backdrop-blur">
                  {member.category}
                </span>
              </div>

              <div className="flex flex-col gap-6 p-7 md:p-10">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    {member.company}
                  </p>
                  <h1 className="mt-1 font-display text-4xl leading-tight md:text-5xl">
                    {member.firstName} {member.lastName}
                  </h1>
                  <p className="mt-4 text-lg text-[var(--color-ink-soft)]">{member.activity}</p>
                </div>

                <dl className="grid gap-5 rounded-2xl bg-[var(--color-bg-soft)]/60 p-5">
                  {member.addresses.map((a, i) => (
                    <div key={i} className="flex gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-none text-[var(--color-accent)]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 22s-8-8.5-8-13a8 8 0 1 1 16 0c0 4.5-8 13-8 13z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="9" r="3" />
                      </svg>
                      <div className="text-sm text-[var(--color-ink)]">
                        {a.street && <p className="font-medium">{a.street}</p>}
                        <p className="text-[var(--color-ink-soft)]">
                          {a.postalCode} · {a.city}
                        </p>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={`/api/vcard/${member.slug}`}
                    download={`${member.slug}.vcf`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1a2f4d] md:flex-initial"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 11c0-2.8-1.8-5-4-5s-4 2.2-4 5M4 19a8 8 0 0 1 16 0" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17 14l2 2 3-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Ajouter à mes contacts
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-5 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-ink)] md:flex-initial"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5C0 2.12 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zM8 8h4.37v1.92h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.23c0-1.49-.03-3.4-2.07-3.4-2.07 0-2.39 1.62-2.39 3.3V22H8V8z" />
                    </svg>
                    Profil LinkedIn
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${member.company} ${member.addresses[0].street ?? ""} ${member.addresses[0].postalCode} ${member.addresses[0].city}`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-5 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-ink)]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 20l-5-2V5l5 2 6-2 5 2v13l-5-2-6 2z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 7v13M15 5v13" strokeLinecap="round" />
                    </svg>
                    Itinéraire
                  </a>
                </div>

                <p className="text-xs text-[var(--color-muted)]">
                  Le bouton « Ajouter à mes contacts » télécharge une fiche vCard (.vcf) compatible
                  iOS et Android.
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-8 flex items-center justify-between gap-3">
            <Link
              href={`/m/${prev.slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm text-[var(--color-ink-soft)] shadow-sm transition hover:text-[var(--color-ink)]"
            >
              <svg className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Précédent · </span>
              <span className="font-medium">{prev.firstName} {prev.lastName}</span>
            </Link>
            <Link
              href={`/m/${next.slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm text-[var(--color-ink-soft)] shadow-sm transition hover:text-[var(--color-ink)]"
            >
              <span className="font-medium">{next.firstName} {next.lastName}</span>
              <span className="hidden sm:inline"> · Suivant</span>
              <svg className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </nav>
        </section>
      </main>

      <Footer />
    </>
  );
}
