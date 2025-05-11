"use client"

import { useState } from "react"
import { Search, Medal, TrendingUp, Filter, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import CommunityNavigation from "../../../components/community-navigation"
import BackButton from "../../../components/back-button"

// 排行榜數據
const LEADERBOARD_DATA = [
  {
    id: 1,
    name: "鋼鐵人",
    avatar: "https://cdn.cybassets.com/media/W1siZiIsIjExMTE0L3Byb2R1Y3RzLzUwMDYyNzgyLzExMTE0LXByb2R1Y3QtcGhvdG8tMjAyNDEwMDktNzItMXlqaHZ2cF8wNGY1MzE4ZDhiNWE4ODJiYTA0MS5qcGVnIl0sWyJwIiwidGh1bWIiLCI2MDB4NjAwIl1d.jpeg?sha=f10c8a928500242a",
    roi: 87.32,
    followers: 38762,
    verified: true,
    badges: ["科技專家", "大賽冠軍"],
  },
  {
    id: 2,
    name: "章魚哥",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdq2yQvJHKeIU1hzTTKjSUzEjd7MdO_zkyAA&s",
    roi: 76.51,
    followers: 28453,
    verified: true,
    badges: ["投資達人"],
  },
  {
    id: 3,
    name: "派大興",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNlmo5aAbwF5e_Q4R8ONazxFd8fuGCZOzDyg&s",
    roi: 65.89,
    followers: 23951,
    verified: true,
    badges: ["投資達人"],
  },
  {
    id: 4,
    name: "藍創科技",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNlmo5aAbwF5e_Q4R8ONazxFd8fuGCZOzDyg&s",
    roi: 62.45,
    followers: 19872,
    verified: true,
    badges: ["金融專家"],
  },
  {
    id: 5,
    name: "海綿寶寶",
    avatar: "https://images.api.hahow.in/images/634a7cca4013220006e60899",
    roi: 58.77,
    followers: 17562,
    verified: true,
    badges: ["投資高手"],
  },
  {
    id: 6,
    name: "黃雨生",
    avatar: "https://images.api.hahow.in/images/634a7cca4013220006e60899",
    roi: 55.32,
    followers: 15789,
    verified: true,
    badges: ["投資達人"],
  },
  {
    id: 7,
    name: "鄭彬",
    avatar: "https://cdn.cybassets.com/media/W1siZiIsIjExMTE0L3Byb2R1Y3RzLzUwMDYyNzgyLzExMTE0LXByb2R1Y3QtcGhvdG8tMjAyNDEwMDktNzItMXlqaHZ2cF8wNGY1MzE4ZDhiNWE4ODJiYTA0MS5qcGVnIl0sWyJwIiwidGh1bWIiLCI2MDB4NjAwIl1d.jpeg?sha=f10c8a928500242a",
    roi: 53.80,
    followers: 14532,
    verified: true,
    badges: ["多重策略專家"],
  },
  {
    id: 8,
    name: "林建國",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPy7i_OUlMul5QTlf6SnCz3GNz2LhA77XK9g&s",
    roi: 51.69,
    followers: 12845,
    verified: true,
    badges: ["價值投資者"],
  },
  {
    id: 9,
    name: "陳志明",
    avatar: "https://cdn.cybassets.com/media/W1siZiIsIjExMTE0L3Byb2R1Y3RzLzUwMDYyNzgyLzExMTE0LXByb2R1Y3QtcGhvdG8tMjAyNDEwMDktNzItMXlqaHZ2cF8wNGY1MzE4ZDhiNWE4ODJiYTA0MS5qcGVnIl0sWyJwIiwidGh1bWIiLCI2MDB4NjAwIl1d.jpeg?sha=f10c8a928500242a",
    roi: 48.92,
    followers: 11456,
    verified: true,
    badges: ["技術分析師"],
  },
  {
    id: 10,
    name: "張正義",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdq2yQvJHKeIU1hzTTKjSUzEjd7MdO_zkyAA&s",
    roi: 45.87,
    followers: 10329,
    verified: true,
    badges: ["基本面分析"],
  },
];

// 篩選選項
const FILTER_OPTIONS = ["全部類型", "投資達人", "科技專家", "金融專家", "價值投資者", "技術分析師"];
const TIME_OPTIONS = ["全部時間", "本週", "本月", "3個月", "6個月", "1年"];

export default function LeaderboardPage() {
  const router = useRouter();
  const [filterType, setFilterType] = useState("全部類型");
  const [timeRange, setTimeRange] = useState("全部時間");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#111419]">
        <BackButton />
        <div className="flex-1 mx-4">
          <div className="relative">
            <div className="flex items-center bg-[#1c1f26] rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="搜索投資者"
                className="bg-transparent border-none outline-none w-full text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 導航組件 */}
      <CommunityNavigation activeTab="豐神榜" />

      {/* 頁面標題 */}
      <div className="p-4 bg-[#111419] border-b border-gray-800">
        <h1 className="text-2xl font-bold flex items-center">
          <Medal className="w-6 h-6 text-[#daa360] mr-2" />
          豐神榜 - 頂尖投資者
        </h1>
        <p className="text-gray-400 mt-1">
          跟隨表現最佳的投資者，學習他們的投資策略
        </p>
      </div>

      {/* 篩選區域 */}
      <div className="p-4 bg-[#111419] border-b border-gray-800 flex items-center justify-between">
        <div className="relative">
          <div 
            className="flex items-center bg-[#1c1f26] rounded-lg px-3 py-2 cursor-pointer"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <Filter className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm">{filterType}</span>
            <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
          </div>
          
          {showFilterDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-[#1c1f26] border border-gray-700 rounded-lg shadow-lg w-48 z-50">
              {FILTER_OPTIONS.map((option) => (
                <div 
                  key={option} 
                  className="px-4 py-2 hover:bg-[#111419] cursor-pointer text-sm"
                  onClick={() => {
                    setFilterType(option);
                    setShowFilterDropdown(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="relative">
          <div 
            className="flex items-center bg-[#1c1f26] rounded-lg px-3 py-2 cursor-pointer"
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
          >
            <TrendingUp className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm">{timeRange}</span>
            <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
          </div>
          
          {showTimeDropdown && (
            <div className="absolute top-full right-0 mt-1 bg-[#1c1f26] border border-gray-700 rounded-lg shadow-lg w-36 z-50">
              {TIME_OPTIONS.map((option) => (
                <div 
                  key={option} 
                  className="px-4 py-2 hover:bg-[#111419] cursor-pointer text-sm"
                  onClick={() => {
                    setTimeRange(option);
                    setShowTimeDropdown(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 排行榜列表 */}
      <div className="flex-1 overflow-y-auto">
        {LEADERBOARD_DATA.map((user, index) => (
          <div 
            key={user.id} 
            className="border-b border-gray-800 p-4 hover:bg-[#111419] cursor-pointer"
            onClick={() => router.push('/feng-community/home')} // 暫時導向社群首頁
          >
            <div className="flex items-center">
              {/* 排名 */}
              <div className="flex items-center justify-center w-10 mr-3">
                {index < 3 ? (
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    index === 0 ? "bg-yellow-500" : 
                    index === 1 ? "bg-gray-300" : 
                    "bg-amber-700"
                  }`}>
                    <span className="text-black font-bold">{index + 1}</span>
                  </div>
                ) : (
                  <span className="text-gray-400 font-medium">{index + 1}</span>
                )}
              </div>
              
              {/* 頭像和名稱 */}
              <div className="flex items-center flex-1">
                <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold">{user.name}</h3>
                    {user.verified && (
                      <div className="ml-2 bg-blue-900 rounded-full p-0.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap mt-1">
                    {user.badges.map((badge, badgeIndex) => (
                      <div 
                        key={badgeIndex}
                        className="bg-[#1c1f26] text-xs text-gray-300 px-2 py-0.5 rounded-full mr-1 mb-1"
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 績效和粉絲數 */}
              <div className="text-right">
                <div className="text-red-500 font-bold text-lg">+{user.roi.toFixed(2)}%</div>
                <div className="text-gray-400 text-sm">{(user.followers / 1000).toFixed(1)}K 跟單者</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 