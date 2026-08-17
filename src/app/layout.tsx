import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://3-dpoint.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "3Dpoint / 3Дточка — изготовление и восстановление пластиковых деталей",
    template: "%s — 3Dpoint / 3Дточка",
  },
  description:
    "Изготовление и восстановление пластиковых деталей под ключ. Покажите проблему — мы возьмём решение на себя и доведём до результата.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "3Dpoint / 3Дточка",
    title: "3Dpoint / 3Дточка — изготовление и восстановление пластиковых деталей",
    description:
      "Изготовление и восстановление пластиковых деталей под ключ. Покажите проблему — мы возьмём решение на себя и доведём до результата.",
    url: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E85D26" },
    { media: "(prefers-color-scheme: dark)", color: "#16160F" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
