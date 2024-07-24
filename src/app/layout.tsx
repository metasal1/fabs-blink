import type { Metadata } from 'next'

export const metadata: Metadata = {
  openGraph: {
    title: 'FABS.fun',
    siteName: 'FABS.fun',
    type: 'website',
    description: 'Feel the burn',
    images: [
      {
        url: 'https://run.fabs.fun/fabs-burn.png',
        width: 1000,
        height: 1000,
        alt: 'FABS.fun',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FABS.fun',
    description: 'Feel the burn',
    images: ['https://run.fabs.fun/fabs-burn.png'],
    creator: '@fabsonsol',
    site: 'https://run.fabs.fun',
  },
}
export default function RootLayout({
  children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
