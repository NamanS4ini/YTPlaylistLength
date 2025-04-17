"use client";

import { FloatingLabel } from "flowbite-react";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useState } from "react";
import { redirect } from "next/navigation";
import { FaYoutube } from "react-icons/fa"

export default function Component() {
  const validateURL = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/playlist\?list=|youtu\.?be\/).+$/;
    if (regex.test(url)) {
      const videoId = url.split("list=")[1]?.split("&")[0];
      console.log(videoId);
      redirect(`/${videoId}`);
    } else {
      alert("Invalid url");
    }
  };
  const [url, setURL] = useState("")
  console.log(url);
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl w-full max-w-md space-y-6">
        {/* YouTube Icon */}
        <div className="flex justify-center">
          <FaYoutube className="text-red-600 w-12 h-12" />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">YouTube Playlist Analyzer</h1>
          <p className="text-zinc-400 text-sm mt-1">Check total length, video count, and more.</p>
        </div>

        {/* Input Field */}
        <div>
          <FloatingLabel
            variant="standard"
            label="Paste playlist URL"
            onChange={(e) => setURL(e.target.value)}
            className="w-full text-black"
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button className="w-full" onClick={() => validateURL(url)}>
            Analyze Playlist
          </Button>
        </div>
      </div>
    </main>
  );
}
