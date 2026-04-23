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

  const hasFilters = query || category || city;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <div className="sticky top-0 z-10 -mx-5 bg-[var(--color-bg)]/85 px-5 pb-6 pt-4 backdrop-blur-md">
        <div className="flex flex-col gap-3 rounded-3xl border border-[var(--color-line)] bg-white/80 p-3 shadow-[0_1px_0_rgba(11,26,46,0.04)] md:flex-row md:items-center md:gap-2 md:p-2">
          <div className="relative flex-1">
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
              placeholder="Rechercher un membre, une entreprise, un métier…"
              className="input-base w-full border-0 bg-transparent pl-10 shadow-none focus:shadow-none"
              style={{ boxShadow: "none" }}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-base w-full md:w-auto"
              aria-label="Filtrer par secteur"
            >
              <option value="">Tous secteurs</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-base w-full md:w-auto"
              aria-label="Filtrer par ville"
            >
              <option value="">Toutes villes</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between px-1">
          <p className="text-sm text-[var(--color-muted)]">
            <span className="font-medium text-[var(--color-ink)]">{filtered.length}</span>{" "}
            membre{filtered.length > 1 ? "s" : ""}
            {hasFilters ? " correspondent à votre recherche" : " dans l'annuaire"}
          </p>
          {hasFilters && (
            <button
              onClick={clear}
              className="text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 rounded-3xl border border-dashed border-[var(--color-line)] p-12 text-center">
          <p className="font-display text-xl">Aucun membre ne correspond</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Essayez d'élargir vos critères ou de réinitialiser les filtres.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      )}
    </section>
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
