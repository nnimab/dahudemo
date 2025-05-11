"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import TopNavigation from "./top-navigation"
import MarketIndicesHeader from "./market-indices-header"

interface OverseasPageProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function OverseasPage({ activeTab, setActiveTab }: OverseasPageProps) {
  const [activeContentTab, setActiveContentTab] = useState("fresh")

  return (
    <div className="flex flex-col text-white">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10">
        <TopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <MarketIndicesHeader />
      </div>

      {/* Stock Info */}
      <div className="flex items-center justify-between bg-[rgb(17,20,27)] px-4 py-2  border-b-8 border-black">
        <span className="text-gray-300">午安，9A89-23881956 派大興</span>
        <button className="bg-gray-800 text-white px-3 py-1 rounded text-sm">更新</button>
      </div>

      {/* Overseas Market Value */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <span className="text-white">海外投資總市值(USD)</span>
          <Eye className="ml-2 text-gray-400" />
        </div>
      </div>

      {/* Market Value Display */}
      <div className="px-4 pb-3">
        <div className="flex items-center">
        <span className="text-white text-3xl font-medium">*****<span className="text-xl">(***)</span></span>
        </div>
      </div>

      {/* Global Indices */}
      <div className="p-4 border-b-8 border-black">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-medium">全球指數</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400 rotate-270"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-white font-medium">道瓊工業</div>
            <div className="text-green-500 font-bold">38,239.98</div>
            <div className="text-green-500 text-sm">▼ 137.22 (-0.36%)</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-white font-medium">納斯達克</div>
            <div className="text-green-500 font-bold">15,617.92</div>
            <div className="text-green-500 text-sm">▼ 49.24 (-0.31%)</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-white font-medium">S&P 500</div>
            <div className="text-green-500 font-bold">5,035.43</div>
            <div className="text-green-500 text-sm">▼ 11.05 (-0.22%)</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-white font-medium">恆生指數</div>
            <div className="text-red-500 font-bold">17,687.10</div>
            <div className="text-red-500 text-sm">▲ 103.96 (0.59%)</div>
          </div>
        </div>
      </div>

      {/* Feature Icons */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b-8 border-black">
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 p-3 rounded-full mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" />
              <path
                d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12H12M12 12V4M12 12L18 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-white text-xs text-center">美股市場</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 p-3 rounded-full mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3V21H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M7 14L11 10L15 14L21 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-white text-xs text-center">港股市場</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 p-3 rounded-full mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="7" y="9" width="4" height="6" rx="1" stroke="white" strokeWidth="2" />
              <rect x="13" y="9" width="4" height="6" rx="1" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <span className="text-white text-xs text-center">日股市場</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 p-3 rounded-full mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M7 7H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 17H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-white text-xs text-center">歐股市場</span>
        </div>
      </div>

      {/* Hot US Stocks */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-medium">熱門美股</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400 rotate-270"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <div>
              <div className="text-white font-medium">AAPL</div>
              <div className="text-gray-400 text-sm">Apple Inc.</div>
            </div>
            <div className="text-right">
              <div className="text-red-500 font-bold">182.52</div>
              <div className="text-red-500 text-sm">▲ 1.23 (0.68%)</div>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <div>
              <div className="text-white font-medium">MSFT</div>
              <div className="text-gray-400 text-sm">Microsoft Corp.</div>
            </div>
            <div className="text-right">
              <div className="text-green-500 font-bold">402.65</div>
              <div className="text-green-500 text-sm">▼ 3.21 (-0.79%)</div>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <div>
              <div className="text-white font-medium">NVDA</div>
              <div className="text-gray-400 text-sm">NVIDIA Corp.</div>
            </div>
            <div className="text-right">
              <div className="text-red-500 font-bold">924.79</div>
              <div className="text-red-500 text-sm">▲ 15.63 (1.72%)</div>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <div>
              <div className="text-white font-medium">TSLA</div>
              <div className="text-gray-400 text-sm">Tesla Inc.</div>
            </div>
            <div className="text-right">
              <div className="text-green-500 font-bold">175.21</div>
              <div className="text-green-500 text-sm">▼ 2.34 (-1.32%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
