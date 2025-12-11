// app/about/page.tsx

import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "About - YouTube Playlist Length Calculator",
  description: "Discover powerful playlist management features: sort by duration, views, likes, calculate watch times at different speeds, and get detailed playlist statistics - all while keeping your privacy first.",
  keywords: ["YouTube playlist", "playlist length", "video duration", "playlist calculator", "YouTube tools", "playlist analytics"],
  openGraph: {
    title: "About - YouTube Playlist Length Calculator",
    description: "Take control of your YouTube playlists with advanced sorting, speed calculations, and detailed analytics.",
    type: "website",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "YouTube Playlist Length Calculator - About Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About - YouTube Playlist Length Calculator",
    description: "Discover powerful playlist management features and take control of your YouTube experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function AboutPage() {
  return (
    <main className="pt-20 min-h-screen bg-black text-gray-100 px-6 py-12 md:px-20">
      <section className="max-w-3xl mx-auto space-y-10">
        <header>
          <h1 className="text-2xl text-center md:text-5xl font-bold text-white">Take Control of Your Playlists</h1>
          <p className="mt-4 text-lg text-center text-gray-400">
            YouTube doesn’t show you the full picture. This app does.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Sort with Power</h2>
          <p className="text-gray-300">
            Sort any playlist your way, by <span className="font-medium text-white">length, views, likes, or comments</span>.
            No more endless scrolling to find that one perfect video.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Smarter Watch Time</h2>
          <p className="text-gray-300">
            Wondering how long a playlist takes at <span className="font-medium text-white">1.25x, 1.5x, or 2x speed</span>?
            Get real-time calculations instantly.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Browser Extension</h2>
          <p className="text-gray-300">
            The extension is complete and ready to use! Install it on{" "}
            <a
              href="https://addons.mozilla.org/en-US/firefox/addon/ytpla/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              Firefox
            </a>{" "}
            directly from the add-ons store. For Chrome users, you&apos;ll need to install it manually from{" "}
            <a
              href="https://github.com/NamanS4ini/YTPLA-Extention?tab=readme-ov-file#installation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              GitHub
            </a>{" "}
            due to Chrome&apos;s developer fee requirements.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Data-Friendly Mode</h2>
          <p className="text-gray-300">
            On a slow connection or just want focus?
            <span className="font-medium text-white"> Toggle off thumbnails</span> for a lightweight, distraction-free experience.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Playlist Stats</h2>
          <p className="text-gray-300">
            Get insights at a glance, total likes, comments, views, and the
            <span className="font-medium text-white"> average video duration</span>.
            Know the vibe before you dive in.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Privacy First</h2>
          <p className="text-gray-300">
            This site doesn&apos;t track you. <span className="font-medium text-white">Saved playlists and settings stay only on your device</span>,
            no accounts, no nonsense.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Contribute</h2>
          <p className="text-gray-300">
            Found a bug? Got a feature idea? Open an issue on{" "}
            <a
              href="https://github.com/NamanS4ini/YTPlaylistLength"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              GitHub
            </a>{" "}
            and help shape the project.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Roadmap</h2>
          <p className="text-gray-300">
            Coming soon: <span className="text-white font-medium">favoriting playlists, exporting data, custom sort settings</span>,
            and maybe even more surprises 👀.
          </p>
        </section>



        <footer className="pt-10 border-t border-gray-800 text-sm text-gray-500">
          Built with ❤️<span className="text-white">, Next.js,</span> <span className="text-white">Tailwind CSS</span>, and the <span className="text-white">YouTube Data API</span>.
        </footer>
      </section>
    </main>
  );
}
