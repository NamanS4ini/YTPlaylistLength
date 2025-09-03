import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTube Playlist Length Calculator - Calculate Total Duration & Stats",
  description: "Free YouTube playlist length calculator tool. Instantly calculate total duration, average video length, and playlist statistics. Get accurate time estimates for YouTube playlists.",
  keywords: "YouTube playlist calculator, playlist duration, YouTube playlist length, video duration calculator, playlist statistics, YouTube tools",
  authors: [{ name: "Naman Saini" }],
  creator: "Naman Saini",
  publisher: "YouTube Playlist Calculator",
  metadataBase: new URL(process.env.WEBSITE_LINK || 'https://youtube-playlist-duration.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "YouTube Playlist Length Calculator - Calculate Total Duration & Stats",
    description: "Free YouTube playlist length calculator tool. Instantly calculate total duration, average video length, and playlist statistics.",
    url: '/',
    siteName: 'YouTube Playlist Calculator',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'YouTube Playlist Length Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "YouTube Playlist Length Calculator - Calculate Total Duration & Stats",
    description: "Free YouTube playlist length calculator tool. Instantly calculate total duration, average video length, and playlist statistics.",
    images: ['/og-image.jpg'],
    creator: '@NamanS4ini',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  category: 'technology',
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4CKFLK4PCF');`}
        </Script>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white bg-zinc-900`}
      >
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
