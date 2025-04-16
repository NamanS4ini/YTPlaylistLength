"use client";

import { FloatingLabel } from "flowbite-react";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useState } from "react";
import { redirect } from "next/navigation";

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
    <main className="flex p-10">
    <div className="grid grid-flow-col justify-stretch relative space-x-4">
      <FloatingLabel onChange={(e)=>setURL(e.target.value)}  variant="standard" label="Enter  Youtube " />
    </div>
    <Button className="" onClick={() => validateURL(url)}>
        <HiOutlineArrowRight className="h-6 w-6" />
      </Button>
    </main>
  );
}
