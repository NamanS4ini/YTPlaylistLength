const errorMessages: Record<number, string> = {
  400: "Bad Request - Please verify the playlist ID and range parameters.",
  403: "Forbidden - API quota might be exhausted.",
  404: "Not Found - The playlist might be private or deleted.",
  500: "Internal Server Error - Please try again later.",
};

export function validateOrigin(req: Request) {
const origin = req.headers.get("origin");
const referer = req.headers.get("referer");

const allowedOrigins = [
process.env.WEBSITE_LINK,         // your main site
"chrome-extension://",            // chrome extension
"moz-extension://",               // firefox extension
null                              // content scripts
].filter(Boolean);                 // remove undefined

// 1. Allow null origin (extensions often send null)
if (origin === null) {
return true;
}

// 2. Allow chrome/firefox extensions
if (origin.startsWith("chrome-extension://")) {
return true;
}
if (origin.startsWith("moz-extension://")) {
return true;
}

// 3. Allow your website
if (allowedOrigins.includes(origin)) {
return true;
}

// 4. Allow referer check fallback
if (referer && allowedOrigins.some((o) => o && referer.startsWith(o))) {
return true;
}

return false;
}
export async function GET(req: Request) {
  if (!validateOrigin(req)) {
  return Response.json(
    { message: "Forbidden" },
    { status: 403 }
  );
}
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const apiKey = process.env.API_KEY;
  // fetching the playlist data from youtube api
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${apiKey}`
  );
  //   if the playlist data is not found then return the error message
  if (!res.ok) {
    return Response.json(
      {
        status: res.status,
        message: errorMessages[res.status] || "Unexpected error",
      },
      { status: res.status }
    );
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
  
  // Extract video IDs
  const videoIds = playlistData.items
    .map((item: any) => item.snippet.resourceId.videoId)
    .filter(Boolean);

  // Fetch video durations in batches (max 50 per request)
  let totalSeconds = 0;
  const batchSize = 50;
  
  for (let i = 0; i < videoIds.length; i += batchSize) {
    const batch = videoIds.slice(i, i + batchSize);
    const videoRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${batch.join(",")}&key=${apiKey}`
    );
    
    if (videoRes.ok) {
      const videoData = await videoRes.json();
      videoData.items.forEach((video: any) => {
        const duration = video.contentDetails.duration;
        totalSeconds += parseDuration(duration);
      });
    }
  }

  // Format duration
  const totalDuration = formatDuration(totalSeconds);

  // Fetch playlist details for title
  const playlistRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${apiKey}`
  );
  
  let playlistTitle = "Unknown Playlist";
  if (playlistRes.ok) {
    const playlistInfo = await playlistRes.json();
    playlistTitle = playlistInfo.items[0]?.snippet?.title || "Unknown Playlist";
  }

  return Response.json({
    id: id,
    title: playlistTitle,
    totalDuration: totalDuration,
    videoCount: videoIds.length,
    url: `https://ytpla.in/${id}`
  });
}

// Helper function to parse ISO 8601 duration format
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");
  
  return hours * 3600 + minutes * 60 + seconds;
}

// Helper function to format seconds into readable duration
function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const parts = [];
  if (hours > 0) parts.push(`${hours} hr`);
  if (minutes > 0) parts.push(`${minutes} min`);
  if (seconds > 0 && hours === 0) parts.push(`${seconds} sec`);
  
  return parts.join(" ") || "0 sec";
}