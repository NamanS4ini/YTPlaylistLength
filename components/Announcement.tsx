"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Announcement = () => {
    // Edit this object to change the announcement
    const announcement = {
        id: "announcement-5", // Change this ID when you want to show the announcement again
        message: `Replace youtube.com with youtube-playlist-duration.vercel.app in any playlist URL for instant analysis`, // Your announcement message
        enabled: true, // Set to true to show the announcement
    };


    //   message: `Starting December 1st, 2025, this website will move to <a class="text-blue-400 underline hover:text-blue-300" href="https://ytpla.com">ytpla.com</a>. Please transfer your saved playlists. This domain will remain active until further notice.`,

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!announcement.enabled) {
            setIsVisible(false);
            return;
        }

        const dismissedId = localStorage.getItem("dismissedAnnouncement");
        if (dismissedId !== announcement.id) {
            setIsVisible(true);
        }
    }, [announcement.id, announcement.enabled]);

    const handleClose = () => {
        localStorage.setItem("dismissedAnnouncement", announcement.id);
        setIsVisible(false);
    };

    if (!isVisible || !announcement.enabled) {
        return null;
    }

    return (
        <div className="w-full bg-black sticky bottom-0">

        <div className="bg-zinc-800 max-w-7xl mx-auto border-b w-full border-zinc-700 z-50 text-white px-4 py-4 shadow-lg">
            <div className="mx-auto flex items-center justify-between gap-4">
                <div className="flex max-w-7xl items-center gap-3">
                    <div className="hidden md:block flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p
                            className="text-sm md:text-base text-gray-200 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: announcement.message }}
                        />
                    </div>
                </div>
                <button
                    onClick={handleClose}
                    className="flex-shrink-0 p-2 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer duration-200 group"
                    aria-label="Close announcement"
                >
                    <IoClose className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </button>
            </div>
        </div>
                    </div>
    );
};

export default Announcement;
