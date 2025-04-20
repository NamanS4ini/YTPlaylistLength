// app/about/page.tsx

import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "About - Youtube Playlist Length Calculator",
  description: "Learn about the features and privacy of the Youtube Playlist Length Calculator",
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
          <h2 className="text-2xl font-semibold text-white">⚡ Sort with Power</h2>
          <p className="text-gray-300">
            Sort any playlist your way - by video length, views, likes, or even comment count. No more scrolling endlessly to find that one perfect video.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">⏱ Speed Watch Time</h2>
          <p className="text-gray-300">
            Curious how long it would take to watch the playlist at 1.5x or 2x speed? We calculate real-time durations based on your preferred playback speed.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">📉 Data-Friendly Mode</h2>
          <p className="text-gray-300">
            Want a faster experience or trying to save data? You can <span className="font-medium text-white">toggle off thumbnails</span> to load just the essentials. Great for slower connections or distraction-free browsing.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">📊 Playlist Stats</h2>
          <p className="text-gray-300">
            Instantly see the total number of likes, comments, views, and even the <span className="font-medium text-white">average video duration</span>. Know the vibe of a playlist before diving in.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">🤝 Contribute</h2>
          <p className="text-gray-300">
            Found a bug? Got a feature idea? Head over to{" "}
            <a
              href="https://github.com/NamanS4ini/YTPlaylistLength"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              GitHub Issues
            </a>{" "}
            and open a ticket. I might look at it… eventually 😄.
          </p>
        </section>

        <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">🔐 Privacy First</h2>
        <p className="text-gray-300">
          This site doesn&apos;t track you. Your data stays on your device - no accounts, no analytics, no nonsense.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">🚀 Roadmap</h2>
        <p className="text-gray-300">
          Features like <span className="text-white font-medium">favoriting playlists, exporting data, and saving sort settings</span> might land in the future.
        </p>
      </section>


        <footer className="pt-10 border-t border-gray-800 text-sm text-gray-500">
          Built with ❤️<span className="text-white">, Next.js,</span> <span className="text-white">Tailwind CSS</span>, and the <span className="text-white">YouTube Data API</span>.
        </footer>
      </section>
    </main>
  );
}
