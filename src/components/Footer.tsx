export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-line)] bg-[var(--color-bg-soft)]/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 text-sm text-[var(--color-muted)] md:flex-row">
        <p>© {new Date().getFullYear()} Dijon Connect — Le réseau des entrepreneurs bourguignons.</p>
        <p className="text-xs uppercase tracking-[0.2em]">Made in Bourgogne</p>
      </div>
    </footer>
  );
}
