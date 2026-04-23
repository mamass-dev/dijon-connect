import { getMember, members } from "@/lib/members";
import { buildVCard } from "@/lib/vcard";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return members.map((m) => ({ slug: m.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const member = getMember(slug);
  if (!member) return new Response("Not found", { status: 404 });

  const vcard = buildVCard(member);
  return new Response(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.vcf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
