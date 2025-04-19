"use client";

import { FloatingLabel } from "flowbite-react";
import { Button } from "flowbite-react";
import { useState } from "react";
import { redirect } from "next/navigation";
import { FaYoutube } from "react-icons/fa"

export default function Component() {
  const validateURL = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/playlist\?list=|youtu\.?be\/).+$/;
    if (regex.test(url)) {
      const videoId = url.split("list=")[1]?.split("&")[0];
      console.log(videoId);
      const updatedStart: string = start === "" ? "0" : start;
      const updatedEnd: string = end === "" ? "500" : end;
      console.log(updatedStart, updatedEnd);
      redirect(`/${videoId}?start=${updatedStart}&end=${updatedEnd}`);
    } else {
      alert("Invalid url");
    }
  };
  const handelStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) {
      setStart("0");
      return;
    }
    if (Number(e.target.value) >= 500 && end == "") {
      setStart("500");
      return;
    }
    if(Number(e.target.value) >= Number(end) && end !== "") {
      setStart(end);
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
    if(Number(e.target.value) <= Number(start)) {
      setEnd(start);
      return;
    }
    if (Number(e.target.value) >= 500) {
      setEnd("500");
      return;
    }
    setEnd(e.target.value)
  }

  const [url, setURL] = useState("")
  const [start, setStart] = useState <string> ("")
  const [end, setEnd] = useState<string>("")
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
          <div className="flex mt-4">
<div className="flex justify-around flex-col gap-4">

          <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Range:</label>
    <input type="number" value={start} onChange={(e)=> handelStart(e)} id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0 (optional)" />
</div>
<div className="flex justify-around flex-col gap-4">

    <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Range:</label>
    <input type="number" value={end} onChange={(e)=> handelEnd(e)} id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="500 (optional)" />
</div>
        </div>
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
