import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from "@next/third-parties/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const siteTitle = "Tim Brown";
const siteDescription =
  "Tim is an experienced software engineer in New York who builds for the web.";
const siteUrl = "https://brimtown.com";

function buildOgImageUrl(params: {
  title: string;
  subtitle?: string;
  leftColumn?: string;
  rightColumn?: string;
  date?: string;
}): string {
  const queryParams = new URLSearchParams();
  queryParams.set("title", params.title);
  if (params.subtitle) queryParams.set("subtitle", params.subtitle);
  if (params.leftColumn) queryParams.set("leftColumn", params.leftColumn);
  if (params.rightColumn) queryParams.set("rightColumn", params.rightColumn);
  if (params.date) queryParams.set("date", params.date);

  return `/api/og?${queryParams.toString()}`;
}

const ogImageUrl = buildOgImageUrl({
  title: siteTitle,
  subtitle: siteDescription,
  leftColumn: "@_brimtown",
  rightColumn: "https://brimtown.com",
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@_brimtown",
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tim Brown",
    alternateName: "brimtown",
    url: siteUrl,
    sameAs: [
      "https://twitter.com/_brimtown",
      "https://github.com/brimtown",
      "https://www.linkedin.com/in/brimtown/",
    ],
    jobTitle: "Staff Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Datadog",
      url: "https://www.datadoghq.com/",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    url: siteUrl,
    author: {
      "@type": "Person",
      name: "Tim Brown",
      alternateName: "brimtown",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={`${inter.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleTagManager gtmId="G-358CGZ72M9" />
      </body>
    </html>
  );
}
