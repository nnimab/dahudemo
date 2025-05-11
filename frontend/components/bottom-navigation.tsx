"use client"

import { useState } from "react"
import { BarChart2, FileText, LayoutGrid, User } from "lucide-react"

interface BottomNavigationProps {
  activePage: string
  setActivePage: (page: string) => void
}

export default function BottomNavigation({ activePage, setActivePage }: BottomNavigationProps) {
  // Track which icon was recently clicked for animation
  const [animatedIcon, setAnimatedIcon] = useState<string | null>(null)

  // Handle icon click with animation
  const handleIconClick = (page: string) => {
    setAnimatedIcon(page)
    setActivePage(page)

    // Reset animation after it completes
    setTimeout(() => {
      setAnimatedIcon(null)
    }, 500)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-[rgb(17,20,27)] border-t border-gray-800 z-40">
      <button
        onClick={() => handleIconClick("overview")}
        className={`flex flex-col items-center justify-center w-1/5 h-full ${
          activePage === "overview" ? "text-[rgb(174,48,46)]" : "text-gray-400"
        }`}
      >
        <div className={`transition-transform duration-300 ${animatedIcon === "overview" ? "animate-jelly" : ""}`}>
          <FileText size={20} />
        </div>
        <span className="text-xs mt-1">總覽</span>
      </button>

      <button
        onClick={() => handleIconClick("stocks")}
        className={`flex flex-col items-center justify-center w-1/5 h-full ${
          activePage === "stocks" ? "text-[rgb(174,48,46)]" : "text-gray-400"
        }`}
      >
        <div className={`transition-transform duration-300 ${animatedIcon === "stocks" ? "animate-jelly" : ""}`}>
          <BarChart2 size={20} />
        </div>
        <span className="text-xs mt-1">選股</span>
      </button>

      <button
        onClick={() => handleIconClick("order")}
        className="flex flex-col items-center justify-center w-1/5 h-full"
      >
        <div
          className={`bg-[rgb(192,44,34)] rounded-full w-14 h-14 flex items-center justify-center -mt-5 ${animatedIcon === "order" ? "animate-jelly" : ""}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M10 17L15 12L10 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-xs mt-1 text-white">下單匣</span>
      </button>

      <button
        onClick={() => handleIconClick("favorites")}
        className={`flex flex-col items-center justify-center w-1/5 h-full ${
          activePage === "favorites" ? "text-[rgb(174,48,46)]" : "text-gray-400"
        }`}
      >
        <div className={`transition-transform duration-300 ${animatedIcon === "favorites" ? "animate-jelly" : ""}`}>
          <LayoutGrid size={20} />
        </div>
        <span className="text-xs mt-1">自選</span>
      </button>

      <button
        onClick={() => handleIconClick("account")}
        className={`flex flex-col items-center justify-center w-1/5 h-full ${
          activePage === "account" ? "text-[rgb(174,48,46)]" : "text-gray-400"
        }`}
      >
        <div className={`transition-transform duration-300 ${animatedIcon === "account" ? "animate-jelly" : ""}`}>
          <User size={20} />
        </div>
        <span className="text-xs mt-1">帳務</span>
      </button>
    </div>
  )
}
