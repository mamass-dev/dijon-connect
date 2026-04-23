"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Member } from "@/lib/members";
import { MemberAvatar } from "./MemberAvatar";

type Props = {
  members: Member[];
  categories: string[];
  cities: string[];
};

const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function Directory({ members, categories, cities }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    return members.filter((m) => {
      if (category && m.category !== category) return false;
      if (city && !m.addresses.some((a) => a.city === city)) return false;
      if (!q) return true;
      const hay = norm(
        `${m.firstName} ${m.lastName} ${m.company} ${m.activity} ${m.addresses.map((a) => a.city).join(" ")}`,
      );
      return hay.includes(q);
    });
  }, [members, query, category, city]);

  const clear = () => {
    setQuery("");
    setCategory("");
    setCity("");
  };

  const hasFilters = Boolean(query || category || city);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 md:px-5">
      <div className="sticky top-[57px] z-20 -mx-4 bg-[var(--color-bg)]/90 px-4 py-3 backdrop-blur-md md:top-[68px] md:-mx-5 md:px-5 md:py-4">
        {/* Recherche */}
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un membre, un métier…"
            className="h-12 w-full rounded-full border border-[var(--color-line)] bg-white pl-11 pr-11 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-muted)] transition active:scale-90"
              aria-label="Effacer"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Pills secteurs — scroll horizontal */}
        <div className="mt-3 -mx-4 overflow-x-auto px-4 no-scrollbar md:-mx-5 md:px-5">
          <div className="flex min-w-max gap-2">
            <Pill active={!category} onClick={() => setCategory("")} label="Tous" />
            {categories.map((c) => (
              <Pill
                key={c}
                active={category === c}
                onClick={() => setCategory(category === c ? "" : c)}
                label={c}
              />
            ))}
          </div>
        </div>

        {/* Filtre ville + compteur */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="relative flex-1 md:max-w-xs">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-muted)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-9 w-full appearance-none rounded-full border border-[var(--color-line)] bg-white pl-8 pr-8 text-xs font-medium text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
              aria-label="Filtrer par ville"
            >
              <option value="">Toutes les villes</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--color-muted)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
            <span>
              <span className="font-semibold text-[var(--color-ink)]">{filtered.length}</span>{" "}
              résultat{filtered.length > 1 ? "s" : ""}
            </span>
            {hasFilters && (
              <button
                onClick={clear}
                className="rounded-full px-2 py-1 font-medium text-[var(--color-accent)] active:scale-95"
              >
                Effacer
              </button>
            )}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-[var(--color-line)] p-10 text-center md:mt-16 md:p-12">
          <p className="font-display text-lg md:text-xl">Aucun résultat</p>
          <p className="mt-1.5 text-sm text-[var(--color-muted)]">
            Essayez un autre mot-clé ou réinitialisez les filtres.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile : liste compacte */}
          <ul className="mt-4 flex flex-col gap-2.5 md:hidden">
            {filtered.map((m) => (
              <li key={m.slug}>
                <MemberRow member={m} />
              </li>
            ))}
          </ul>

          {/* Desktop : grille */}
          <ul className="mt-6 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m, i) => (
              <li
                key={m.slug}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(i, 8) * 30}ms` }}
              >
                <MemberCard member={m} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

function Pill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition active:scale-95 md:text-sm ${
        active
          ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
          : "border-[var(--color-line)] bg-white text-[var(--color-ink-soft)]"
      }`}
    >
      {label}
    </button>
  );
}

function MemberRow({ member }: { member: Member }) {
  const primary = member.addresses[0];
  return (
    <Link
      href={`/m/${member.slug}`}
      className="group flex items-center gap-3.5 rounded-2xl border border-[var(--color-line)] bg-white p-3 transition active:scale-[0.99]"
    >
      <div className="relative h-[72px] w-[72px] flex-none overflow-hidden rounded-xl bg-[var(--color-bg-soft)]">
        <MemberAvatar member={member} size={160} rounded="" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-[17px] leading-tight">
          {member.firstName} {member.lastName}
        </p>
        <p className="truncate text-[13px] font-medium text-[var(--color-accent)]">{member.company}</p>
        <p className="mt-0.5 line-clamp-1 text-[12px] text-[var(--color-ink-soft)]">{member.activity}</p>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-[var(--color-muted)]">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {primary.city}
        </p>
      </div>
      <svg
        className="h-4 w-4 flex-none text-[var(--color-muted)] transition group-active:translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

function MemberCard({ member }: { member: Member }) {
  const primary = member.addresses[0];
  return (
    <Link
      href={`/m/${member.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-soft)] hover:shadow-[0_22px_60px_-30px_rgba(11,26,46,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-soft)]">
        <MemberAvatar
          member={member}
          size={520}
          rounded=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)] backdrop-blur">
          {member.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <p className="font-display text-xl leading-tight">
          {member.firstName} {member.lastName}
        </p>
        <p className="text-sm font-medium text-[var(--color-accent)]">{member.company}</p>
        <p className="mt-2 line-clamp-2 text-sm text-[var(--color-ink-soft)]">{member.activity}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-[var(--color-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {primary.city}
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-[var(--color-ink)] transition group-hover:text-[var(--color-accent)]">
            Voir le profil
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
