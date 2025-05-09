"use client"
import Link from 'next/link'
import { Button } from 'flowbite-react';
import { useParams } from 'next/navigation'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';



//Type for data received from backend
type Data = {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  channelId: string;
  duration: string | null;
  publishedAt: string;
  position: number;
  views: number;
  likes: number | null;
  comments: number | null;
}

export default function Page() {
  function convertToHrs(seconds: number) {

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60) || 0;
    const secs = seconds % 60 || 0;
    const time = hours > 0 ? `${hours}h ${minutes}m ${secs}s` : `${minutes}m ${secs}s`;
    return time;
  }

  function handelThumb() {
    setThumbnail(!thumbnail)
    localStorage.setItem("thumbnail", JSON.stringify(!thumbnail))
  }

  function handelSort(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "position") {
      setData(data?[...data].sort((a, b) => a.position - b.position) : null)
    } else if (e.target.value === "title") {
      setData(data?[...data].sort((a, b) => a.title.localeCompare(b.title)) : null)
    } else if (e.target.value === "newest") {
      setData(data?[...data].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()) : null)
    } else if (e.target.value === "oldest") {
      setData(data?[...data].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()) : null)
    } else if (e.target.value === "views") {
      setData(data?[...data].sort((a, b) => b.views - a.views) : null)
    } else if (e.target.value === "likes") {
      setData(data?[...data].sort((a, b) => (b.likes || 0) - (a.likes || 0)) : null)
    } else if (e.target.value === "comments") {
      setData(data?[...data].sort((a, b) => (b.comments || 0) - (a.comments || 0)) : null)
    } else if (e.target.value === "duration") {
      setData((data?[...data].sort((a, b) => Number(b.duration || 0) - Number(a.duration || 0)) : null))
    }
  }
  function convertDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', options);
  }

  const params = useParams()
  const id = params.url as string
  const searchParams = useSearchParams();

  const start = searchParams.get('start') || "0";
  const end = searchParams.get('end') || "500";

  const [data, setData] = useState<Data[] | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [thumbnail, setThumbnail] = useState<boolean>(false)
  const [speed, setSpeed] = useState<string>("1")
  //Fetch data from backend
  useEffect(() => {

    if (parseInt(start) > parseInt(end)) {
      setError("Start Can not be greater than End")
      return
    }

    fetch(`/api/details?id=${id}&start=${start}&end=${end}`)
      .then((res) => {
        setThumbnail(JSON.parse(localStorage.getItem("thumbnail") || "false"))
        if (!res.ok) {
          setError(res.statusText)
          if (res.status === 404) {
            setError("Playlist not found")
            return null;
          }
          setError("Invalid Playlist ID")
          return null;
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error.message));
  }, [])
  if (data === null && error === null) {
    return (
      <div className='flex flex-col items-center justify-center pt-16 min-h-screen bg-zinc-950 text-white px-4'>
        <PropagateLoader color="#00abff" />
      </div>
    )

  }
  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 text-center">
      <FaExclamationTriangle className="text-yellow-500 text-5xl mb-6" />

      <h1 className="text-3xl font-bold mb-2">Invalid Playlist ID or Range</h1>

      <p className="text-zinc-400 mb-4 max-w-md">
        The playlist you&apos;re trying to access is either <span className="text-white font-medium">private</span>, <span className="text-white font-medium">unavailable</span>, or <span className="text-white font-medium">doesn&apos;t exist</span>.
      </p>

      <p className="text-sm text-zinc-400 mb-6 max-w-md">
        Double-check the link and make sure it&apos;s a valid public playlist. If the problem persists, try another one or <Link className='text-blue-400 hover:underline' href="https://github.com/NamanS4ini/YTPlaylistLength/issues">Contact Me</Link>.
      </p>

      <Link href="/">
        <Button className='cursor-pointer'>Back to Home</Button>
      </Link>
    </main>
    )
  }

  if (data) {
    return (
      <div className='flex flex-col pt-16 items-center bg-zinc-950 text-white px-4'>
        <div className='w-full max-w-6xl mx-auto'>
          <h1 className='text-4xl font-bold py-5'>
            Playlist Details
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 p-5 max-w-6xl w-full mx-auto'>
            <div className='bg-zinc-900 hover:bg-zinc-800 items-center justify-center border h-fit  border-zinc-800 rounded-2xl p-8 shadow-xl w-full max-w-md space-y-6'>
              <p className='mt-1 text-xl flex flex-col'>
                Total Videos:
                <span className='font-bold '>
                  {data.length.toLocaleString("en-GB")}
                </span>
              </p>
              <p className='mt-1 text-xl flex flex-col'>
                Total Duration:
                <span className='font-bold '>
                  {convertToHrs(data.reduce((acc, item) => acc + (item.duration ? Number(item.duration) : 0), 0))}
                </span>
              </p>
              <p className='mt-1 text-xl flex flex-col'>
                Average Duration:
                <span className='font-bold '>
                  {convertToHrs(Math.round(data.reduce((acc, item) => acc + (item.duration ? Number(item.duration) : 0), 0) / data.length))}
                </span>
              </p>
            </div>
            <div className='bg-zinc-900 hover:bg-zinc-800 items-center h-fit justify-center border border-zinc-800 rounded-2xl p-8 shadow-xl w-full max-w-md space-y-6'>
              <p className='mt-1 text-xl flex flex-col'>
                total likes:
                <span className='font-bold '>
                  {data.reduce((acc, item) => acc + (item.likes || 0), 0).toLocaleString("en-GB")}
                </span>
              </p>
              <p className='mt-1 text-xl flex flex-col'>
                total views:
                <span className='font-bold '>
                  {(data.reduce((acc, item) => acc + item.views, 0)).toLocaleString("en-GB")}
                </span>
              </p>
            </div>
            <div className='bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl p-8 shadow-xl w-full max-w-md space-y-6'>
              <p className='text-xl'>
                Playback Speed -&gt;
              </p>
              <p>1.25x:
                <span className='font-bold '>
                  {convertToHrs(Math.round(data.reduce((acc, item) => acc + (item.duration ? Number(item.duration) : 0), 0) / 1.25))}
                </span>
              </p>
              <p>1.50x:

                <span className='font-bold '> {convertToHrs(Math.round(data.reduce((acc, item) => acc + (item.duration ? Number(item.duration) : 0), 0) / 1.50))}
                </span> </p>
              <p>1.75x:
                <span className='font-bold '> {convertToHrs(Math.round(data.reduce((acc, item) => acc + (item.duration ? Number(item.duration) : 0), 0) / 1.75))}
                </span> </p>
              <p>2.00x:
                <span className='font-bold '> {convertToHrs(Math.round(data.reduce((acc, item) => acc + (item.duration ? Number(item.duration) : 0), 0) / 2.00))}
                </span> </p>
              <p>
                <input className='w-36 p-2 border border-zinc-500' type="number" placeholder='custom speed' onChange={(e) => setSpeed(e.target.value)} value={speed} />
                &nbsp;:&nbsp;
                <span className='font-bold '>
                  {convertToHrs(Math.round(data.reduce((acc, item) => acc + (item.duration ? Number(item.duration) : 0), 0) / (parseFloat(speed) || 1)))}
                </span>
              </p>

            </div>
          </div>
        </div>
        <div>

          <h2 className='text-4xl flex md:flex-row items-center gap-5 flex-col justify-between font-bold'>
            Videos in Playlist
            <span>
              <label className="inline-flex items-center cursor-pointer">
                <input onChange={() => { handelThumb() }} type="checkbox" defaultChecked={thumbnail} className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-2xl font-medium text-gray-900 dark:text-gray-300">Thumbnails</span>
              </label>

            </span>
          </h2>
          <div className='flex gap-10 justify-center md:justify-start items-center p-5'>
            <h2 className='text-2xl flex justify-between font-bold'>Sort By: </h2>
            <select defaultValue="position" onChange={(e) => handelSort(e)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="position">Playlist Order</option>
              <option value="views">Views</option>
              <option value="likes">Likes</option>
              <option value="duration">Video Length</option>
              <option value="comments">Comments</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 max-w-6xl w-full mx-auto'>
            {data.map((item, index) => (
              <div key={item.id} className='bg-zinc-900 border flex flex-col justify-between border-zinc-800 hover:bg-zinc-800 ease-in-out duration-200 transition rounded-lg p-4 shadow-lg'>
                <a href={`https://www.youtube.com/watch?v=${item.id}`} target='_blank' rel="noopener noreferrer">
                <div className='text-zinc-400 flex justify-between mb-2'>
                  <span>
                    #{item.position + 1} ({index + 1})
                  </span>
                  <span>
                    {!thumbnail && <span className='text-zinc-400'>{item.duration ? convertToHrs(Number(item.duration)) : "0"} </span>}
                    
                  </span>
                </div>
                <div className='relative'>

                  {thumbnail && <img src={item.thumbnail} alt={item.title} className='rounded-lg mb-2' />}

                  {thumbnail && <p className='absolute bottom-10 bg-black p-1 rounded-md text-sm right-1'>
                    {item.duration ? convertToHrs(Number(item.duration)) : "0"}
                  </p>}
                
                </div>
                  <h3 className='text-xl hover:underline font-semibold'>
                    {item.title}
                  </h3>
                  </a>
                <div>

                
                <p className=' text-zinc-400 flex justify-between'>
                    <a className='w-full hover:underline' href={`https://www.youtube.com/channel/${item.channelId}`} target='_blank' rel="noopener noreferrer">
                      <span className=' text-zinc-300 hover:text-zinc-200'>
                        {item.channelTitle}
                      </span>
                    </a>
                  </p>
                  <a href={`https://www.youtube.com/watch?v=${item.id}`} target='_blank' rel="noopener noreferrer">
                
                  <p className='text-zinc-400'>
                    
                  <span>
                      {item.views.toLocaleString("en-GB")}&nbsp;
                      views
                    </span>
                    <span>
                      &nbsp;&bull;&nbsp;
                    </span>
                    <span >
                      {convertDate(item.publishedAt)}
                    </span>
                  </p>
                  <p className=' text-zinc-400'>
                    <span>
                      {item.likes ? item.likes.toLocaleString("en-GB") : "Disabled"} Likes
                    </span>
                    <span>
                      &nbsp;&bull;&nbsp;
                    </span>
                    <span>
                      {item.comments != null ? item.comments.toLocaleString("en-GB") : "Disabled"} Comments
                    </span>
                  </p>
                  </a>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
