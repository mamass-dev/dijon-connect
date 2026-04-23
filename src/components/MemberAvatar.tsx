import Image from "next/image";
import type { Member } from "@/lib/members";
import { initials } from "@/lib/members";

const gradients = [
  "from-[#0b1a2e] to-[#324867]",
  "from-[#3b2a1c] to-[#b88a3e]",
  "from-[#1f3a2e] to-[#5c8a6b]",
  "from-[#2a1a3e] to-[#6b5c8a]",
  "from-[#3e1f1a] to-[#8a5c5c]",
];

const hashSlug = (s: string) =>
  [...s].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 7);

export function MemberAvatar({
  member,
  size = 160,
  priority = false,
  className = "",
  rounded = "rounded-full",
}: {
  member: Member;
  size?: number;
  priority?: boolean;
  className?: string;
  rounded?: string;
}) {
  if (member.photo) {
    return (
      <Image
        src={member.photo}
        alt={`${member.firstName} ${member.lastName}`}
        width={size}
        height={size}
        priority={priority}
        className={`${rounded} object-cover ${className}`}
      />
    );
  }
  const g = gradients[hashSlug(member.slug) % gradients.length];
  const fontSize = Math.round(size * 0.36);
  return (
    <div
      className={`${rounded} bg-gradient-to-br ${g} flex items-center justify-center text-white font-display ${className}`}
      style={{ width: size, height: size, fontSize }}
      aria-label={`${member.firstName} ${member.lastName}`}
    >
      {initials(member)}
    </div>
  );
}
