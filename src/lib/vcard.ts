import type { Member } from "./members";

const escape = (s: string) => s.replace(/([\\,;])/g, "\\$1").replace(/\n/g, "\\n");

export function buildVCard(m: Member): string {
  const lines: string[] = [];
  lines.push("BEGIN:VCARD");
  lines.push("VERSION:3.0");
  lines.push(`N:${escape(m.lastName)};${escape(m.firstName)};;;`);
  lines.push(`FN:${escape(`${m.firstName} ${m.lastName}`)}`);
  if (m.company) lines.push(`ORG:${escape(m.company)}`);
  if (m.activity) lines.push(`TITLE:${escape(m.activity)}`);
  if (m.linkedin) lines.push(`URL;TYPE=linkedin:${m.linkedin}`);

  m.addresses.forEach((a, i) => {
    const label = i === 0 ? "WORK,pref" : "WORK";
    const adr = [
      "", // PO box
      "", // extended
      escape(a.street ?? ""),
      escape(a.city),
      "",
      escape(a.postalCode),
      "France",
    ].join(";");
    lines.push(`ADR;TYPE=${label}:${adr}`);
  });

  lines.push(`CATEGORIES:${escape(m.category)},Dijon Connect`);
  lines.push(`NOTE:${escape(`Membre du réseau Dijon Connect`)}`);
  lines.push(`REV:${new Date().toISOString()}`);
  lines.push("END:VCARD");

  return lines.join("\r\n");
}
