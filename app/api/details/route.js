"use server"
function convertToSeconds(duration) {
    if (!duration) return null;

    const match = duration.match(/P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/);

    const days = parseInt(match[1] || 0);
    const hours = parseInt(match[2] || 0);
    const minutes = parseInt(match[3] || 0);
    const seconds = parseInt(match[4] || 0);

    return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}


export async function GET(request) {

  // SECURITY CHECKS

  const origin = request.headers.get("origin");
  console.log(origin);
  const allowedOrigins = [
    null, // for localhost
    process.env.WEBSITE_LINK,
  ];

  if (!allowedOrigins.includes(origin)) {
    return Response.json("Origin not allowed", { status: 403 });
  }


    // API LOGIC 
  

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const apiKey = process.env.API_KEY;
// fetching the playlist data from youtube api
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${apiKey}`
  );
//   if the playlist data is not found then return the error message
    if (!res.ok) {
        return Response.json(res.statusText, { status: res.status });
    }
//   if the playlist data is found then see if there is a next page token and fetch the next page data (yt by default returns 50 items)
//   if there is a next page token then fetch the next page data and push it to the playlist data
  const playlistData = await res.json();
  let nextPageToken = playlistData.nextPageToken;
  while (nextPageToken) {
    const res2 = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&pageToken=${nextPageToken}&key=${apiKey}`
    );
    const playlistData2 = await res2.json();
    playlistData.items.push(...playlistData2.items);
    nextPageToken = playlistData2.nextPageToken || null;
  }
//   remove the unnecessary data from the playlist data and get the data in the required format
  const items = playlistData.items.map((item) => {
    return {
      id: item.snippet?.resourceId?.videoId || null,
      title: item.snippet?.title || "No Title",
      thumbnail: item.snippet?.thumbnails?.standard?.url || item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || null,
      channelTitle: item.snippet?.channelTitle || "Unknown Channel",
      channelId: item.snippet?.channelId || null,
      publishedAt: item.snippet?.publishedAt || null,
    //   ?? instead of || to avoid getting null for the position if it is 0
      position: item.snippet?.position ?? null,
      duration: null,
    };
  });

// TODO: make a way to get the duration of 50 videos at once instead of fetching each video one by one idea 1: make an array of arrays in which each array contains 50 video ids and then use the join method to join the array of arrays into a single array and then use the join method to join the array into a string and then use the string in the api call
let count = 0;
let videoIds = new Array(Math.ceil(items.length/50));
for (let i = 0; i < videoIds.length; i++) {
    videoIds[i] = new Array(50);
}
 
while (count < Math.ceil(items.length/50)) {
    for (let i = 0; i < 50; i++) {
        if (items[count*50+i]) {
            videoIds[count][i] = items[count*50+i].id;
        } else {
            videoIds[count][i] = null;
        }
    }
    count++;
}
// remove the null values from the array of arrays
videoIds = videoIds.map((arr) => arr.filter((item) => item !== null));

videoIds = videoIds.map((arr) => arr.join(","));

// fetch the duration of each video using the youtube api and the video ids
//   the api call will return an array of objects with the id and duration of each video
const durations = await Promise.all(
videoIds.map(async (ids) => {
  const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${apiKey}`
  )
  const data = await res.json();
  return data.items.map((item) => {
    const duration = item.contentDetails?.duration || null;
    const seconds = convertToSeconds(duration);
    return {
      id: item.id,
      duration: seconds,
    };
  })
}))

//   flatten the array of arrays into a single array
const flattenedItems = durations.flat();

//   loop through the items and add the duration to the items array using the id as the key

let updatedItems = items.map((item) => {
    const duration = flattenedItems.find((duration) => duration.id === item.id)?.duration ?? null;
    return {
        ...item,
        duration: duration,
    };
});

// filter out the items that are null
updatedItems = updatedItems.filter((item) => item.duration !== null);
  
//   console.log(updatedItems);
  return Response.json(updatedItems,{
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin, // Set the CORS headers again here
    },
  });
}
