"use client";

import { FloatingLabel } from "flowbite-react";
import { Button } from "flowbite-react";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { CiBookmark } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { FaYoutube } from "react-icons/fa"

export default function Component() {
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const validateURL = (url: string) => {

    if (start > end && end != "") {
      toast.warn('Start Can not be greater than end', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/playlist\?list=|youtu\.?be\/).+$/;
    if (regex.test(url)) {
      setValidated(true);
      const videoId = url.split("list=")[1]?.split("&")[0];
      const updatedStart: string = start === "" ? "0" : start;
      const updatedEnd: string = end === "" ? "500" : end;
      router.push(`/details/${videoId}?start=${updatedStart}&end=${updatedEnd}`);
    } else {
      toast.warn('Invalid URL. Please recheck your URL', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  const handelStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) {
      setStart("0");
      return;
    }
    if (Number(e.target.value) >= 500) {
      setStart("500");
      return;
    }
    setStart(e.target.value)
  }

  const handelEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setEnd("");
      return;
    }
    if (Number(e.target.value) < 0) {
      setEnd("0");
      return;
    }
    if (Number(e.target.value) >= 500) {
      setEnd("500");
      return;
    }
    setEnd(e.target.value)
  }

  const [url, setURL] = useState("")
  const [start, setStart] = useState<string>("")
  const [end, setEnd] = useState<string>("")
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-24 flex flex-col items-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {/* YouTube Logo */}
      <FaYoutube className="text-red-600 w-16 h-16 mb-4" />

      {/* Heading and Subtext */}
      <h1 className="text-4xl font-bold text-center mb-2">
        YouTube Playlist Analyzer
      </h1>
      <h2 className="text-zinc-400 text-center max-w-xl mb-10">
        Instantly calculate total duration, likes, views, and more. Get insights before you even press play.
      </h2>

      {/* URL Input */}
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <FloatingLabel
          variant="filled"
          label="Paste YouTube Playlist URL"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          className="w-full !bg-transparent cursor-text"
        />

        {/* Range Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="start" className="text-sm font-medium text-white block mb-1">
              Start Range (optional)
            </label>
            <input
              id="start"
              type="number"
              value={start}
              onChange={handelStart}
              placeholder="0"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="end" className="text-sm font-medium text-white block mb-1">
              End Range (optional)
            </label>
            <input
              id="end"
              type="number"
              value={end}
              onChange={handelEnd}
              placeholder="500"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Button */}
        {validated ? (
          <Button className="w-full py-3 text-lg mt-2 flex items-center justify-center" disabled>
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Analyzing...
          </Button>
        ) : (
          <Button
            className="w-full py-3 cursor-pointer text-lg mt-2"
            onClick={() => validateURL(url)}
          >
            Analyze Playlist
          </Button>
        )}
      </div>
      <section className="mt-16 max-w-3xl w-full text-zinc-300 space-y-8">
        <h2 className="text-2xl font-semibold text-white">❓ Frequently Asked Questions</h2>

        <div>
          <h3 className="font-medium text-white mb-1">🔗 What kind of playlist URLs are supported?</h3>
          <p>Any public YouTube playlist link works - just paste the full URL and hit Analyze.</p>
        </div>

        <div>
          <h3 className="font-medium text-white mb-1">🎯 What does Start/End Range mean?</h3>
          <p>
            If you only want to analyze a portion of the playlist, set a custom range.
            For example, from video 5 to 20 - great for huge playlists.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-white mb-1">🚀 Can I sort videos or filter them?</h3>
          <p>
            Yes! Once analyzed, you can sort videos by <span className="text-white font-semibold">length, likes, comments, views, and more</span>.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-white mb-1">📦 Is it mobile-friendly?</h3>
          <p>Absolutely, everything’s responsive and optimized for both desktops and phones.</p>
        </div>

        <div>
          <h3 className="font-medium text-white mb-1">📑 Can I save playlists for later?</h3>
          <p>
            Yep! While viewing a playlist, just press{" "}
            <CiBookmark size={20} className="inline text-current" />
            and it’ll be saved for quick access later.
            <span className="block mt-1 text-zinc-400 text-sm">
              🔒 All saved playlists stay only on <span className="text-white font-semibold">your device</span>,
              nothing is uploaded or stored on our servers.
            </span>
          </p>
        </div>

        <div>
          <h3 className="font-medium text-white mb-1">💡 Found a bug or have a suggestion?</h3>
          <p>
            Feel free to open an issue on{" "}
            <a
              href="https://github.com/NamanS4ini/YTPlaylistLength"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white"
            >
              GitHub
            </a>
            . I might look at it... eventually 😄.
          </p>
        </div>
      </section>

    </main>


  );
}
