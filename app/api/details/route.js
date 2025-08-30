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
  const referer = request.headers.get("referer");
  
  const allowedOrigins = [
    process.env.WEBSITE_LINK,
  ];
  
  // allow null origin *only if* the referer is my website
  if (origin === null && referer?.startsWith(process.env.WEBSITE_LINK)) {
  } else if (!allowedOrigins.includes(origin)) {
    console.log("Blocked origin:", origin);
    console.log("Blocked referer:", referer);
    return Response.json("Origin not allowed", { status: 403 });
  }

    // API LOGIC 
  

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const start = searchParams.get("start");
  const end = searchParams.get("end");
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
      channelTitle: item.snippet?.videoOwnerChannelTitle || "Unknown Channel",
      channelId: item.snippet?.videoOwnerChannelId || null,
      publishedAt: item.snippet?.publishedAt || null,
    //   ?? instead of || to avoid getting null for the position if it is 0
      position: item.snippet?.position ?? null,
      duration: null,
      likes: null,
      views: null,
      comments: null,
    };
  });


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
const details = await Promise.all(
videoIds.map(async (ids) => {
  const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${apiKey}`
  )
  const data = await res.json();
  const stats = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${apiKey}`
  )
  const statsData = await stats.json();
  
  return data.items.map((item) => {
    //   get the likes, views and comments from the stats data
    const statsItem = statsData.items.find((statsItem) => statsItem.id === item.id);
    const likes = statsItem?.statistics?.likeCount || null;
    const views = statsItem?.statistics?.viewCount || null;
    const comments = statsItem?.statistics?.commentCount || null;
    //   get the duration from the contentDetails data
    const duration = item.contentDetails?.duration || null;
    const seconds = convertToSeconds(duration);
    return {
      id: item.id,
      duration: seconds,
      likes: likes,
      views: views,
      comments: comments,
    };
  })


}))

//   flatten the array of arrays into a single array
const flattenedItems = details.flat();

//   loop through the items and add the duration to the items array using the id as the key

let updatedItems = items.map((item) => {
  const detailItem = flattenedItems.find((detailItem) => detailItem.id === item.id);
  if (detailItem) {
    return {
      ...item,
      duration: detailItem.duration,
      likes: parseInt(detailItem.likes),
      views: parseInt(detailItem.views),
      comments: parseInt(detailItem.comments),
    };
  } else {
    return {
      ...item,
      duration: null,
      likes: null,
      views: null,
      comments: null,
    };
  }
});

// filter out the items that are null
updatedItems = updatedItems.filter((item) => item.duration !== null);

updatedItems = updatedItems.filter((item,index) => index >= start-1 && index <= end-1);

let playlistDetails = await fetch(`https://www.googleapis.com/youtube/v3/playlists?key=${apiKey}&id=${id}&part=id,snippet&fields=items(id,snippet(title,channelId,channelTitle,thumbnails(maxres)))`);
playlistDetails = await playlistDetails.json();
playlistDetails = playlistDetails.items?.[0] ? {
  id: playlistDetails.items[0].id,
  title: playlistDetails.items[0].snippet?.title,
  channelId: playlistDetails.items[0].snippet?.channelId,
  channelTitle: playlistDetails.items[0].snippet?.channelTitle,
  thumbnail: playlistDetails.items[0].snippet?.thumbnails?.maxres?.url || playlistDetails.items[0].snippet?.thumbnails?.high?.url || playlistDetails.items[0].snippet?.thumbnails?.medium?.url || playlistDetails.items[0].snippet?.thumbnails?.default?.url || null,
} : null;

updatedItems = {
  playlistData: playlistDetails || null,
  videoData: updatedItems
};

  return Response.json(updatedItems,{
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin, // Set the CORS headers again here
    },
  });
}




// FOR FUTURE ME OR WHOEVER IS READING THIS:

// Wanna Add who's playlist it is?

// https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${API_KEY}

// This returns the playlist owner'S data feel free to incorporate that into the response if you want to.