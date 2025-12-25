import React from 'react'
import { Metadata } from 'next'
import Homepage from '@/components/Homepage'

export const metadata: Metadata = {
  title: "YouTube Playlist Duration Calculator | YTPLA",
  description:
    "Calculate the total duration of any YouTube playlist instantly. Paste the playlist link and get accurate total time.",
  alternates: {
    canonical: "https://ytpla.in/"
  }
};

const page = () => {
  return (
    <Homepage />
  )
}

export default page