# 🎵 YouTube Playlist Analyzer

Analyze any public YouTube playlist and view advanced statistics like total duration, likes, comments, views, and average video length. You can even sort videos by any of these metrics, set a range, and calculate the total duration based on different playback speeds.

## 🚀 Features

- 🔎 **Total Playlist Stats**  
  See total likes, views, comments, and total length of the entire playlist.

- ⏱ **Accurate Duration Calculation**  
  Choose your preferred playback speed and get the updated watch time accordingly.

- 🧮 **Average Metrics**  
  Get the average duration, likes, views, and comments per video.

- 📊 **Sort Playlist**  
  Sort videos by:
  - Duration
  - Likes
  - Comments
  - Views
  - Newest
  - Oldest

- 🧠 **Smart Range Selector**  
  Analyze only a specific range of videos in a playlist using start and end indices.

- 🖼️ **Optional Thumbnails**  
  Turn thumbnails on or off to reduce data usage and load times.

- 💡 **Responsive UI with Dark Mode**  
  Fully mobile-friendly and dark-mode ready.

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [YouTube Data API v3](https://developers.google.com/youtube/v3)
- Hosted on [Vercel](https://vercel.com)

## 📦 Installation (For Local Dev)

```bash
git clone https://github.com/NamanS4ini/YTPlaylistLength
cd YTPlaylistLength
npm install
```

Create a `.env.local` file and add:

```
YOUTUBE_API_KEY=your_youtube_api_key
WEBSITE_LINK=localhost:3000
```

Then run:

```bash
npm run dev
```

## 🌐 Live Demo

🔗 [youtube-playlist-duration.vercel.app](https://youtube-playlist-duration.vercel.app)

## 🧩 Contribute

Found a bug or want to add a feature?

1. [Open an issue](https://github.com/NamanS4ini/YTPlaylistLength/issues)
2. Fork the repo
3. Submit a PR

I may or may not respond depending on my availability, but feel free to contribute!