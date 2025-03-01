import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from "@next/third-parties/google";

import "./globals.css";

const america = localFont({
  src: "./fonts/GT-America-Regular.woff2",
  variable: "--font-america",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Tim Brown",
  description:
    "Tim Brown is an experienced software engineer in New York City who builds for the web.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${america.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleTagManager gtmId="G-358CGZ72M9" />
      </body>
    </html>
  );
}
