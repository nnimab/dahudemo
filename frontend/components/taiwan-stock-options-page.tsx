"use client"

import { useState } from "react"
import { Eye, ChevronRight, Info } from "lucide-react"
import TopNavigation from "./top-navigation"
import MarketIndicesHeader from "./market-indices-header"

interface TaiwanStockOptionsPageProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TaiwanStockOptionsPage({ activeTab, setActiveTab }: TaiwanStockOptionsPageProps) {
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
      {/* Options Market Value */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <span className="text-white">期權總市值(NTD)</span>
          <Eye className="ml-2 text-gray-400" />
          <div className="bg-[rgb(14,31,49)] px-1 rounded-sm border border-blue-500 ml-2">
            <span className="text-[#4a8ede] text-xs">ⓘ 含息、含稅</span>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Market Value Display */}
      <div className="px-4 pb-3">
        <div className="flex items-center">
        <span className="text-white text-3xl font-medium">*****<span className="text-xl">(***)</span></span>
        </div>
      </div>

      {/* Trading Info Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 pb-2 border-b-8 border-black">
        {/* 左上 */}
        <div className="bg-[rgb(20,27,35)] p-2 rounded-lg border border-gray-800">
          <div className="flex flex-row justify-between w-full">
            {/* 今日委託 Group */}
            <div className="flex flex-row items-baseline">
              <div className="flex flex-col mr-2 ">
                <span className="text-gray-400 text-xs">今日</span>
                <span className="text-gray-400 text-xs">委託</span>
              </div>
              <span className="text-[#daa360] text-xs font-bold mr-1 ">10</span>
              <span className="text-gray-400 text-xs">筆</span>
            </div>
            {/* 今日成交 Group */}
            <div className="flex flex-row items-baseline">
              <div className="flex flex-col mr-2">
                <span className="text-gray-400 text-xs">今日</span>
                <span className="text-gray-400 text-xs">成交</span>
              </div>
              <span className="text-[#daa360] text-xs font-bold mr-1">9</span>
              <span className="text-gray-400 text-xs">筆</span>
            </div>
          </div>
        </div>
        {/* 右上 */}
        <div className="bg-[rgb(20,27,35)] p-2 rounded-lg border border-gray-800">
          <div className="flex items-baseline justify-between w-full">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">今日</span>
              <span className="text-gray-400 text-xs">已實</span>
            </div>
            <span className="text-white text-xs font-bold">***</span>
          </div>
        </div>
        {/* 左下 */}
        <div className="bg-[rgb(20,27,35)] p-2 rounded-lg border border-gray-800">
          <div className="flex items-baseline justify-between w-full">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">近日</span>
              <span className="text-gray-400 text-xs">交割</span>
            </div>
            <span className="text-white text-xs font-bold">***</span>
          </div>
        </div>
        {/* 右下 */}
        <div className="bg-[rgb(20,27,35)] p-2 rounded-lg border border-gray-800">
          <div className="flex items-baseline justify-between w-full">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">今當沖</span>
              <span className="text-gray-400 text-xs">已實現</span>
            </div>
            <span className="text-white text-xs font-bold">***</span>
          </div>
        </div>
      </div>

      {/* Feature Icons */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b-8 border-black">
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
          <span className="text-white text-xs text-center">期權分析</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 p-3 rounded-full mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z"
                stroke="white"
                strokeWidth="2"
              />
              <path d="M12 3V5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M21 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-white text-xs text-center">盤後分析</span>
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
          <span className="text-white text-xs text-center">期權報價</span>
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
          <span className="text-white text-xs text-center">期權知識</span>
        </div>
      </div>

      {/* Options Strategy */}  
      <div className="p-4 border-b-8 border-black">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-medium">期權策略</span>
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
            <div className="text-white font-medium">多頭策略</div>
            <div className="text-gray-400 text-sm mt-1">看漲期權組合</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-white font-medium">空頭策略</div>
            <div className="text-gray-400 text-sm mt-1">看跌期權組合</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-white font-medium">中性策略</div>
            <div className="text-gray-400 text-sm mt-1">區間震盪策略</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-white font-medium">波動率策略</div>
            <div className="text-gray-400 text-sm mt-1">利用波動率變化</div>
          </div>
        </div>
      </div>

      {/* Options Education */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-medium">期權教學</span>
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
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="relative">
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="text-white font-bold">期權入門：基本概念與操作策略</div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <div className="bg-gray-800 rounded-full p-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 3L19 12L5 21V3Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-white">18:25</span>
              </div>
            </div>
            <img src="/stock-market-chart.png" alt="Options education" className="w-full h-48 object-cover" />
          </div>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="flex border-t border-gray-800 mt-4">
        <div
          className={`flex-1 py-3 text-center ${activeContentTab === "fresh" ? "text-[#daa360] border-b-2 border-[#daa360]" : "text-gray-400"}`}
          onClick={() => setActiveContentTab("fresh")}
        >
          <span>新鮮直送</span>
        </div>
        <div
          className={`flex-1 py-3 text-center ${activeContentTab === "academy" ? "text-[#daa360] border-b-2 border-[#daa360]" : "text-gray-400"}`}
          onClick={() => setActiveContentTab("academy")}
        >
          <span>豐雲學堂</span>
        </div>
        <div
          className={`flex-1 py-3 text-center ${activeContentTab === "news" ? "text-[#daa360] border-b-2 border-[#daa360]" : "text-gray-400"}`}
          onClick={() => setActiveContentTab("news")}
        >
          <span>新聞7×24</span>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeContentTab === "fresh" && (
        <>
          {/* Investment Report */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <div className="text-xl font-medium">投資早報 2025/05/08 刊</div>
            <ChevronRight className="text-gray-400" />
          </div>

          {/* Stock Groups */}
          <div className="grid grid-cols-2 gap-3 p-4 border-b border-gray-800">
            {/* Strong Groups */}
            <div className="bg-[#111419] p-3 rounded-lg">
              <div className="text-red-500 text-lg mb-3">永選強勢族群</div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">成衣概念</span>
                  </div>
                  <span className="text-red-500">+1.0%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">被動元件概念</span>
                  </div>
                  <span className="text-red-500">+3.0%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">軟性銅箔基板</span>
                  </div>
                  <span className="text-red-500">+0.9%</span>
                </div>
              </div>
            </div>

            {/* Weak Groups */}
            <div className="bg-[#111419] p-3 rounded-lg">
              <div className="text-red-500 text-lg mb-3">永選弱勢族群</div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">旅行社概念</span>
                  </div>
                  <span className="text-red-500">+8.4%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">櫃紐概念</span>
                  </div>
                  <span className="text-red-500">+1.4%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">設計服務矽智財</span>
                  </div>
                  <span className="text-red-500">+2.4%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="p-4 border-b border-gray-800">
            <div className="relative rounded-lg overflow-hidden">
              <img src="/stock-lottery-banner.png" alt="股票抽籤秒解任務" className="w-full h-auto" />
            </div>
          </div>

          {/* Watchlist Monitoring */}
          <div className="border-b border-gray-800">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center">
                <span className="text-xl font-medium">自選監控：庫存</span>
                <Info className="ml-2 text-gray-400 w-5 h-5" />
              </div>
              <ChevronRight className="text-gray-400" />
            </div>

            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="bg-gray-800 p-6 rounded-lg opacity-50 mb-4">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-xl text-center text-gray-400 mb-2">尚無特別警示資訊</div>
              <div className="text-sm text-center text-gray-500 max-w-xs">
                您選擇的清單未觀測到特殊警示，建議您可以調整監控雷達！
              </div>
            </div>
          </div>
        </>
      )}

      {activeContentTab === "academy" && (
        <div className="flex flex-col">
          <div className="relative">
            {/* News items */}
            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <span className="text-gray-400">2025-05-08 08:18</span>
              </div>
              <div className="pl-4 pr-4">
                <div className="text-white text-lg">
                  輝達晶片出口放鬆、Fed不降息符合預期；道瓊上揚284點、台積電ADR漲逾1%
                </div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <span className="text-gray-400">2025-05-08 08:06</span>
              </div>
              <div className="pl-4 pr-4 ">
                <div className="text-white text-lg">美股盤後｜川普政府調整晶片禁令，美股由黑翻紅 0508</div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <span className="text-gray-400">2025-05-07 17:33</span>
              </div>
              <div className="pl-4 pr-4">
                <div className="text-white text-lg">
                  台股法說｜台新金(2887)穩健成長，合併新光金控邁向新紀元，核心本業動能持續
                </div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <span className="text-gray-400">2025-05-07 17:31</span>
              </div>
              <div className="pl-4 pr-4 ">
                <div className="text-white text-lg">
                  台股法說｜世界(5347) Q1獲利創高，8吋晶圓需求穩健，審慎樂觀看待Q2展望
                </div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <span className="text-gray-400">2025-05-07 17:29</span>
              </div>
              <div className="pl-4 pr-4 ">
                <div className="text-white text-lg">
                  台股法說｜新唐(4919) 新唐Q1車用MCU強勁帶動營收創高，全球工控布局
                </div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <span className="text-gray-400">2025-05-07 17:27</span>
              </div>
              <div className="pl-4 pr-4">
                <div className="text-white text-lg">
                  台股法說｜義隆(2458) Q1營收獲利雙增，AI PC與車用觸控IC推升成長動能
                </div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <span className="text-gray-400">2025-05-07 16:43</span>
              </div>
              <div className="pl-4 pr-4">
                <div className="text-white text-lg">2025年第一季財報出爐啦！8檔Q1獲利創12季新高股出列！</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeContentTab === "news" && (
        <div className="flex flex-col">
          <div className="relative">
            {/* Timeline dotted line */}
            <div className="absolute left-5 top-0 bottom-0 border-l border-dashed border-gray-700 z-0"></div>

            {/* News items */}
            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <div className="w-2 h-2 bg-[rgb(157,172,195)] rounded-full mr-2 mt-2 z-10"></div>
                <span className="text-gray-400">08:18</span>
              </div>
              <div className="pl-8 pr-4 mb-4">
                <div className="text-[#daa360] text-lg">
                  輝達晶片出口放鬆、Fed不降息符合預期；道瓊上揚284點、台積電ADR漲逾1%
                </div>
                <div className="text-gray-300 mt-2 text-sm">
                  今天Shot這盤，台股開盤日早上8:30準時直播，讓你每日股市資訊不漏接！一、美股收盤表現與總經消息美國股市
                  輝達晶片出口放鬆，美股上漲
                </div>
                <div className="flex mt-3 space-x-4">
                  <div className="bg-gray-900 px-3 py-1 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-white">元大台灣50</span>
                      <span className="text-red-500 ml-2">1.08%</span>
                    </div>
                  </div>
                  <div className="bg-gray-900 px-3 py-1 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-white">台積電</span>
                      <span className="text-red-500 ml-2">0.43%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <div className="w-2 h-2 bg-[rgb(157,172,195)] rounded-full mr-2 mt-2 z-10"></div>
                <span className="text-gray-400">08:06</span>
              </div>
              <div className="pl-8 pr-4 mb-4">
                <div className="text-[#daa360] text-lg">美股盤後｜川普政府調整晶片禁令，美股由黑翻紅 0508</div>
                <div className="text-gray-300 mt-2 text-sm">
                  一、美股盤後終場四大指數收高，盤後ARM發布的指引不如市場預期，股價下跌逾11%。終場道瓊工業指數上漲
                  284.97點 (+0.70%) 至
                </div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <div className="w-2 h-2 bg-[rgb(157,172,195)] rounded-full mr-2 mt-2 z-10"></div>
                <span className="text-gray-400">17:33</span>
              </div>
              <div className="pl-8 pr-4 mb-4">
                <div className="text-[#daa360] text-lg">
                  台股法說｜台新金(2887)穩健成長，合併新光金控邁向新紀元，核心本業動能持續
                </div>
                <div className="text-gray-300 mt-2 text-sm">
                  此資料僅為彙整市場資訊供投資人參考，非特定個股推薦，投資前應審慎考量本身之需求與投資風險，資料來源為公開資訊觀測站及該公司
                </div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <div className="w-2 h-2 bg-[rgb(157,172,195)] rounded-full mr-2 mt-2 z-10"></div>
                <span className="text-gray-400">17:31</span>
              </div>
              <div className="pl-8 pr-4 mb-4">
                <div className="text-[#daa360] text-lg">
                  台股法說｜世界(5347) Q1獲利創高，8吋晶圓需求穩健，審慎樂觀看待Q2展望
                </div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <div className="w-2 h-2 bg-[rgb(157,172,195)] rounded-full mr-2 mt-2 z-10"></div>
                <span className="text-gray-400">17:29</span>
              </div>
              <div className="pl-8 pr-4 mb-4">
                <div className="text-[#daa360] text-lg">
                  台股法說｜新唐(4919) 新唐Q1車用MCU強勁帶動營收創高，全球工控布局
                </div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <div className="w-2 h-2 bg-[rgb(157,172,195)] rounded-full mr-2 mt-2 z-10"></div>
                <span className="text-gray-400">17:27</span>
              </div>
              <div className="pl-8 pr-4 mb-4">
                <div className="text-[#daa360] text-lg">
                  台股法說｜義隆(2458) Q1營收獲利雙增，AI PC與車用觸控IC推升成長動能
                </div>
              </div>
            </div>

            <div className="relative z-10 py-3">
              <div className="flex items-start px-4 mb-1">
                <div className="w-2 h-2 bg-[rgb(157,172,195)] rounded-full mr-2 mt-2 z-10"></div>
                <span className="text-gray-400">16:43</span>
              </div>
              <div className="pl-8 pr-4 mb-4">
                <div className="text-[#daa360] text-lg">2025年第一季財報出爐啦！8檔Q1獲利創12季新高股出列！</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
