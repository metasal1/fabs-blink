import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
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
      <Head>
        <meta property="og:image" content="https://run.fabs.fun/fabs-burn.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:image" content="https://run.fabs.fun/fabs-burn.png" />
        <meta name="twitter:image:type" content="image/png" />
        <meta name="twitter:image:width" content="800" />
        <meta name="twitter:image:height" content="800" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
