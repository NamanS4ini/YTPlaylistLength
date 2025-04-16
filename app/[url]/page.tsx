"use client"
import { useParams } from 'next/navigation'

export default function Page() {
  const { url:id } = useParams()
  console.log(id)

  return <h1 className='text-white'>{id}</h1>
}
