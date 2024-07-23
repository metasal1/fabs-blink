import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FABS.fun",
  description: "Are you ready to have fun with FABS?"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description" content="" />
        <meta name="twitter:description" content=""
        />
        <meta property="og:image" content="https://run.fabs.fun/fabs-blink.png" />
        <meta property="twitter:image" content="https://run.fabs.fun/fabs-blink.png" />
        <meta name="twitter:site" content="@fabsonsol" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title" content="FABS.fun" />
        <meta property="og:site_name" content="FABS.fun" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
