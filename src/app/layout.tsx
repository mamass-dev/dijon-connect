import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Dijon Connect — L'annuaire des membres",
  description:
    "Découvrez les entrepreneurs et professionnels qui font vivre le réseau Dijon Connect : expertise, savoir-faire et opportunités en Bourgogne.",
  openGraph: {
    title: "Dijon Connect — L'annuaire des membres",
    description:
      "Le réseau d'affaires qui connecte les entrepreneurs bourguignons. Scannez, découvrez, ajoutez à vos contacts.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
