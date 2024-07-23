export const metadata = {
  title: 'FABS.fun',
  description: 'Run, fun and FABS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="description"
          content="SonarWatch is a multichain dashboard that supports you in monitoring your DeFi portfolio and staying updated on the web3 ecosystem in real time." />
        <meta name="twitter:description"
          content="SonarWatch is a multichain dashboard that supports you in monitoring your DeFi portfolio and staying updated on the web3 ecosystem in real time." />
        <meta property="og:image" content="https://sonar.watch/banner.jpg" />
        <meta name="twitter:image" content="https://sonar.watch/banner.jpg" />
        <meta name="twitter:site" content="@Sonarwatch" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sonar Watch, the multichain dashboard that empowers your DeFi journey" />
        <meta property="og:site_name" content="Sonar Watch" />
      </head>
      <body>{children}</body>
    </html>
  )
}
