import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand)] text-[var(--color-accent-soft)] font-display text-lg ring-1 ring-[var(--color-brand)] transition-transform group-hover:scale-105">
        DC
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-lg tracking-tight">Dijon Connect</span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Le réseau bourguignon
        </span>
      </span>
    </Link>
  );
}
