"use client";
import {Navbar, NavbarCollapse, NavbarToggle } from "flowbite-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Component() {
  const pathname = usePathname();
  return (
    <Navbar fluid rounded className="bg-zinc-900 fixed w-full z-10 text-white dark:bg-zinc-900 dark:text-white">
      <Link href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">YT Playlist Length</span>
      </Link>
      <div className="flex justify-center items-center md:order-2">
        <Link className="mx-6" target="_blank" href="https://github.com/NamanS4ini/YTPlaylistLength">
      <img className="h-8 w-8 invert" src="/github.svg" alt="" />
        </Link>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <Link href="/" className={`${pathname === "/" ? "text-zinc-50 m-2" : "text-zinc-400 m-2"}`}>
          Home
        </Link>
        <Link href="/about" className={`${pathname === "/about" ? "text-zinc-50 m-2" : "text-zinc-400 m-2"}`} >About</Link>
      </NavbarCollapse>
    </Navbar>
  );
}
