"use client"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

//Type for data received from backend
type Data = {
      id: string;
      title: string;
      thumbnail: string;
      channelTitle:  string;
      channelId: string;
      duration: string;
      publishedAt: string;
      position: number;
}

export default  function Page() {
  const { url:id } = useParams()
  const [data, setData] = useState <Data[] | null> (null);
  const [error, setError] = useState<string| null>(null)
  //Fetch data from backend
  useEffect(() => {
    fetch(`/api/details?id=${id}`)
      .then((res) => {
      if (!res.ok) {
        setError(res.statusText)
        if (res.status === 404) {
        throw new Error('Data not found (404)');
        }
        throw new Error('An error occurred while fetching the data');
      }
      return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error.message));
    
  
  }, [])
  console.log(data);

  if (error) {
    return (
      <div className='flex flex-col items-center min-h-screen bg-zinc-950 text-white px-4'>
        <h1 className='text-4xl font-bold py-5'>Error</h1>
        <p className='text-lg'>{error}</p>
      </div>
    )
    
  }

if (data) {
  return (
    <div className='flex flex-col items-center min-h-screen bg-zinc-950 text-white px-4'>

      <h1 className='text-4xl font-bold py-5'>Playlist Details</h1>
      <h2>Videos in Playlist</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 max-w-6xl w-full mx-auto'>
      {data.map((item) => (
        <div key={item.id} className='bg-zinc-900 border border-zinc-800 rounded-lg p-4 shadow-lg'>
        <div className='text-zinc-400 mb-2'>#{item.position + 1}</div>
        <a href={`https://www.youtube.com/watch?v=${item.id}`} target='_blank' rel="noopener noreferrer">
        <img src={item.thumbnail} alt={item.title} className='w-full h-auto rounded-lg mb-2' />
        <h3 className='text-xl hover:underline font-semibold'>{item.title}</h3>
        </a>
        <p className=' text-zinc-400'>Channel: <a href={`https://www.youtube.com/channel/${item.channelId}`} target='_blank' rel="noopener noreferrer"> <span className='hover:underline'>{item.channelTitle}</span></a></p>
        </div>
      ))}
      </div>
    </div>
  );
}
}
