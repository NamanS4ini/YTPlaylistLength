"use client"
import { FaRegFolderOpen } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from 'flowbite-react';

interface Playlist {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  channelId: string;
}

export default function NoSavedPlaylist() {
  const [thumbnail, setThumbnail] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Playlist[]>([]);
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setThumbnail(JSON.parse(localStorage.getItem("thumbnail") || "false"));
    setBookmarks(savedBookmarks);
  }, [])

  function handleThumbnail() {
    setThumbnail(!thumbnail);
    localStorage.setItem("thumbnail", JSON.stringify(!thumbnail));
  }

  if (bookmarks?.length === 0) {
    return (
      <main className="min-h-dvh md:min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 text-center">
        <FaRegFolderOpen className="text-zinc-500 text-5xl mb-6" />

        <h1 className="text-3xl font-bold mb-2">No Saved Playlists</h1>

        <p className="text-zinc-400 mb-4 max-w-md">
          You haven&apos;t <span className="text-white font-medium">saved</span> any playlists yet.
        </p>

        <p className="text-sm text-zinc-400 mb-6 max-w-md">
          Start by exploring and saving a playlist to keep it here for quick access.
        </p>

        <Link href="/">
          <Button className="cursor-pointer">Analyse Playlists</Button>
        </Link>
      </main>
    );
  }
  return (
    <div className="bg-zinc-950">

      <div className="min-h-dvh pt-20 mx-auto md:min-h-screen w-fit bg-zinc-950 text-white flex flex-col ">
        <div className="flex items-center w-full justify-between px-6 pt-6">
          <h1 className="text-2xl md:text-3xl font-bold">Your Saved Playlists
          </h1>
            <span>
              <label className="inline-flex items-center cursor-pointer">
                <input onChange={() => { handleThumbnail() }} type="checkbox" checked={thumbnail} className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-2xl font-medium text-gray-900 dark:text-gray-300">Thumbnails</span>
              </label>
            </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 max-w-6xl w-full mx-auto'>
          {bookmarks?.map((playlist) => (
            <div key={playlist.id} className='bg-zinc-900 border flex flex-col justify-between border-zinc-800 hover:bg-zinc-800 ease-in-out duration-200 transition rounded-lg p-4 shadow-lg'>
              <Link href={`/${playlist.id}`} rel="noopener noreferrer">
                <div className='relative mb-2'>
                  {thumbnail && <Image
                    src={playlist.thumbnail}
                    width={400}
                    height={200}
                    alt={playlist.title}
                    className='w-full rounded-lg mb-2'
                  />}
                </div>
                <h3 className='text-xl hover:underline font-semibold mb-2'>
                  {playlist.title}
                </h3>
              </Link>
              <div>
                <p className='text-zinc-400'>
                  <Link
                    className='hover:underline text-zinc-300 hover:text-zinc-200'
                    href={`https://www.youtube.com/channel/${playlist.channelId}`}
                    target='_blank'
                    rel="noopener noreferrer"
                  >
                    {playlist.channelTitle}
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
