"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Announcement = () => {
  // Edit this object to change the announcement
  const announcement = {
    id: "announcement-1", // Change this ID when you want to show the announcement again
    message: `Starting December 1st, 2025, this website will move to <a class="text-blue-400 underline hover:text-blue-300" href="https://ytpla.com">ytpla.com</a>. Please transfer your saved playlists. This domain will remain active until further notice.`, // Your announcement message
    enabled: false, // Set to true to show the announcement
  };

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
    <div className="bg-gray-800 sticky top-0 z-50 text-white px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 text-center md:text-left">
          <p 
            className="text-sm md:text-base font-medium"
            dangerouslySetInnerHTML={{ __html: announcement.message }}
          />
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
          aria-label="Close announcement"
        >
          <IoClose className="w-5 h-5 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Announcement;
