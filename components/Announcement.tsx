"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Announcement = () => {
    // Edit this array to manage announcements
    const announcements = [
        {
            id: 1,
            message: `Replace youtube.com with ytpla.in in any playlist URL for instant analysis`,
            enabled: true,
        },
        {
            id: 2,
            message: `The website has moved to <a class="text-blue-400 underline hover:text-blue-300" href="https://ytpla.in">ytpla.in</a>. Please transfer your saved playlists by November 20th, 2025.`,
            enabled: false,
        },
        {
            id: 3,
            message: `Help me improve YT Playlist Analyzer by taking a quick <a class="text-blue-400 underline hover:text-blue-300" href="https://forms.gle/vH7u4LEx9ou8Q7GRA" target="_blank" rel="noopener noreferrer">user survey</a>. Your feedback matters!`,
            enabled: true,
        },
    ];

    const [dismissedIds, setDismissedIds] = useState<number[]>([]);

    useEffect(() => {
        const dismissed = localStorage.getItem("dismissedAnnouncements");
        if (dismissed) {
            setDismissedIds(JSON.parse(dismissed));
        }
    }, []);

    const handleClose = (id: number) => {
        const newDismissed = [...dismissedIds, id];
        setDismissedIds(newDismissed);
        localStorage.setItem("dismissedAnnouncements", JSON.stringify(newDismissed));
    };

    // Filter enabled and non-dismissed announcements, sorted by ID (highest first)
    const visibleAnnouncements = announcements
        .filter(a => a.enabled && !dismissedIds.includes(a.id))
        .sort((a, b) => b.id - a.id);

    if (visibleAnnouncements.length === 0) {
        return null;
    }

    return (
        <div className="w-full sticky bottom-0 z-50">
            <div className="relative max-w-7xl mx-auto">
                {visibleAnnouncements.map((announcement, index) => (
                    <div
                        key={announcement.id}
                        className="absolute bottom-0 left-0 right-0 bg-zinc-800 border-b border-zinc-700 text-white px-4 py-4 shadow-lg transition-all duration-300"
                        style={{
                            transform: `translateY(-${index * 8}px) scale(${1 - index * 0.02})`,
                            zIndex: visibleAnnouncements.length - index,
                            opacity: index === 0 ? 1 : 0.7,
                        }}
                    >
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
                                onClick={() => handleClose(announcement.id)}
                                className="flex-shrink-0 p-2 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer duration-200 group"
                                aria-label="Close announcement"
                            >
                                <IoClose className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcement;
