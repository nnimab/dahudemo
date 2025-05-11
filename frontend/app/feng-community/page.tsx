"use client"

import { useState } from "react"
import { Search, Info, ChevronRight, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import CommunityNavigation from "../../components/community-navigation"
import BackButton from "../../components/back-button"

export default function FengCommunityPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("全部")

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
                placeholder="搜索"
                className="bg-transparent border-none outline-none w-full text-gray-300"
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="relative">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
              1
            </div>
          </div>
        </div>
      </div>

      {/* 通用導航元件 */}
      <CommunityNavigation activeTab="豐社群" />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-16">
        {/* Trending Investors Section */}
        <div className="p-4 border-b-8 border-black">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">風向標投資者</h2>
              <Info className="ml-2 w-5 h-5 text-gray-400" />
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-400 mb-4">在我們的投資者當中現在人氣飆升的投資者。</p>

          {/* Investor Card */}
          <div className="bg-[#111419] rounded-lg p-4 text-white border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <img src="https://cdn.cybassets.com/media/W1siZiIsIjExMTE0L3Byb2R1Y3RzLzUwMDYyNzgyLzExMTE0LXByb2R1Y3QtcGhvdG8tMjAyNDEwMDktNzItMXlqaHZ2cF8wNGY1MzE4ZDhiNWE4ODJiYTA0MS5qcGVnIl0sWyJwIiwidGh1bWIiLCI2MDB4NjAwIl1d.jpeg?sha=f10c8a928500242a" alt="鄭彬" className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <h3 className="font-bold text-lg">鄭彬</h3>
                  <p className="text-gray-400">多重策略</p>
                </div>
              </div>
              <div className="flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12H20" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 6H20" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 18H20" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2 text-2xl">+</span>
              </div>
            </div>

            <p className="mb-4 text-gray-300">多元資產投資。致力於讓您的投資生活更輕鬆</p>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-red-500 text-3xl font-bold">53.80%</div>
                <div className="text-gray-400">回報 (24M)</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">8.19K</div>
                <div className="text-gray-400">跟單者</div>
              </div>
            </div>
          </div>
        </div>

        {/* Investors by Industry Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">按行業分類的投資者</h2>
              <Info className="ml-2 w-5 h-5 text-gray-400" />
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar mb-4">
            {["全部", "科技", "製造", "醫療技術", "零售"].map((category) => (
              <div
                key={category}
                className={`px-6 py-2 rounded-full mr-2 whitespace-nowrap ${
                  activeCategory === category ? "bg-[#daa360] text-white" : "bg-[#1c1f26] text-white border border-gray-700"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>

          {/* Investor List */}
          <div className="space-y-4">
            {/* Investor 1 */}
            <div className="bg-[#111419] rounded-lg p-4 text-white border border-gray-800">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPy7i_OUlMul5QTlf6SnCz3GNz2LhA77XK9g&s"
                    alt="林建國"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold text-lg">林建國</h3>
                      <Star className="w-4 h-4 fill-[#daa360] text-[#daa360] ml-1" />
                    </div>
                    <p className="text-gray-400">
                      回報：<span className="text-red-500">↑ 53.82%</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-red-500">30.8K</div>
                  <div className="text-gray-400">跟單者</div>
                </div>
              </div>
            </div>

            {/* Investor 2 */}
            <div className="bg-[#111419] rounded-lg p-4 text-white border border-gray-800">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src="https://cdn.cybassets.com/media/W1siZiIsIjExMTE0L3Byb2R1Y3RzLzUwMDYyNzgyLzExMTE0LXByb2R1Y3QtcGhvdG8tMjAyNDEwMDktNzItMXlqaHZ2cF8wNGY1MzE4ZDhiNWE4ODJiYTA0MS5qcGVnIl0sWyJwIiwidGh1bWIiLCI2MDB4NjAwIl1d.jpeg?sha=f10c8a928500242a"
                    alt="陳志明"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold text-lg">陳志明</h3>
                      <Star className="w-4 h-4 fill-[#daa360] text-[#daa360] ml-1" />
                    </div>
                    <p className="text-gray-400">
                      回報：<span className="text-red-500">↑ 87.68%</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-red-500">26.7K</div>
                  <div className="text-gray-400">跟單者</div>
                </div>
              </div>
            </div>

            {/* Investor 3 */}
            <div className="bg-[#111419] rounded-lg p-4 text-white border border-gray-800">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNlmo5aAbwF5e_Q4R8ONazxFd8fuGCZOzDyg&s"
                    alt="藍創科技"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold text-lg">藍創科技</h3>
                      <Star className="w-4 h-4 fill-[#daa360] text-[#daa360] ml-1" />
                    </div>
                    <p className="text-gray-400">
                      回報：<span className="text-red-500">↑ 51.31%</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-red-500">13.7K</div>
                  <div className="text-gray-400">跟單者</div>
                </div>
              </div>
            </div>

            {/* Investor 4 */}
            <div className="bg-[#111419] rounded-lg p-4 text-white border border-gray-800">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src="https://images.api.hahow.in/images/634a7cca4013220006e60899" alt="黃雨生" className="w-12 h-12 rounded-full mr-3" />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold text-lg">黃雨生</h3>
                      <Star className="w-4 h-4 fill-[#daa360] text-[#daa360] ml-1" />
                    </div>
                    <p className="text-gray-400">
                      回報：<span className="text-red-500">↑ 86.70%</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-red-500">11.9K</div>
                  <div className="text-gray-400">跟單者</div>
                </div>
              </div>
            </div>

            {/* Investor 5 */}
            <div className="bg-[#111419] rounded-lg p-4 text-white border border-gray-800">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdq2yQvJHKeIU1hzTTKjSUzEjd7MdO_zkyAA&s" alt="張正義" className="w-12 h-12 rounded-full mr-3" />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold text-lg">張正義</h3>
                      <Star className="w-4 h-4 fill-[#daa360] text-[#daa360] ml-1" />
                    </div>
                    <p className="text-gray-400">
                      回報：<span className="text-red-500">↑ 28.74%</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-red-500">10.4K</div>
                  <div className="text-gray-400">跟單者</div>
                </div>
              </div>
            </div>

            {/* View More Button */}
            <button className="w-full py-3 bg-[#1c1f26] border border-gray-700 rounded-full text-center text-white">
              查看更多
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
