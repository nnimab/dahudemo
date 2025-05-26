"use client"

import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import MarketIndicesHeader from "./market-indices-header"
import { getHotStocks, HotStockInfo, getRealtimeMarketIndices, RealtimeIndexData } from "../lib/apiClient"

export default function StockSelectionPage() {
  const [hotStocks, setHotStocks] = useState<HotStockInfo[]>([])
  const [loadingHotStocks, setLoadingHotStocks] = useState(true)
  const [errorHotStocks, setErrorHotStocks] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('volume')

  const [indicesData, setIndicesData] = useState<Record<string, RealtimeIndexData>>({})
  const [loadingIndices, setLoadingIndices] = useState(true)
  const [errorIndices, setErrorIndices] = useState<string | null>(null)

  useEffect(() => {
    const fetchHotStocks = async () => {
      setLoadingHotStocks(true)
      setErrorHotStocks(null)
      try {
        const data = await getHotStocks(activeTab)
        setHotStocks(data)
      } catch (err) {
        console.error("Error fetching hot stocks:", err)
        setErrorHotStocks(err instanceof Error ? err.message : "載入熱門股票失敗")
      }
      setLoadingHotStocks(false)
    }

    const fetchMarketIndices = async () => {
      setLoadingIndices(true)
      setErrorIndices(null)
      try {
        const dataArray = await getRealtimeMarketIndices()
        
        const dataMap: Record<string, RealtimeIndexData> = {}
        if (Array.isArray(dataArray)) {
          for (const index of dataArray) {
            if (index && typeof index.id === 'string') {
              dataMap[index.id] = index
            }
          }
        }

        setIndicesData(dataMap)
      } catch (err) {
        console.error("Error fetching indices:", err)
        setErrorIndices(err instanceof Error ? err.message : "載入市場指數失敗")
      }
      setLoadingIndices(false)
    }

    fetchHotStocks()
    fetchMarketIndices()
  }, [activeTab])

  const renderIndexCard = (indexId: string, displayName: string) => {
    if (loadingIndices) {
      return (
        <div className="bg-[rgb(17,40,17)] p-3 rounded">
          <div className="text-gray-300 text-md">{displayName}</div>
          <div className="text-gray-400 text-xl font-bold mt-1">載入中...</div>
          <div className="text-gray-400 text-xs">--</div>
        </div>
      )
    }

    if (errorIndices) {
      return (
        <div className="bg-[rgb(17,40,17)] p-3 rounded">
          <div className="text-gray-300 text-md">{displayName}</div>
          <div className="text-orange-500 text-xl font-bold mt-1">錯誤</div>
          <div className="text-orange-500 text-xs">{errorIndices}</div>
        </div>
      )
    }

    const indexInfo = indicesData[indexId]
    if (!indexInfo) {
      return (
        <div className="bg-[rgb(17,40,17)] p-3 rounded">
          <div className="text-gray-300 text-md">{displayName}</div>
          <div className="text-gray-400 text-xl font-bold mt-1">N/A</div>
          <div className="text-gray-400 text-xs">--</div>
        </div>
      )
    }

    const isPositive = indexInfo.change >= 0
    const textColor = isPositive ? "text-red-500" : "text-green-500"
    const changeSign = isPositive ? "▲" : "▼"
    const bgColor = isPositive ? "bg-[rgb(40,17,17)]" : "bg-[rgb(17,40,17)]"
    
    return (
      <div className={`${bgColor} p-3 rounded`}>
        <div className="text-gray-300 text-md">{displayName}</div>
        <div className={`${textColor} text-xl font-bold mt-1`}>
          {indexInfo.latest_price.toFixed(2)}
        </div>
        <div className={`${textColor} text-xs`}>
          {changeSign} {Math.abs(indexInfo.change).toFixed(2)}({indexInfo.change_percent.toFixed(2)}%)
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col text-white">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10">
        <div className="flex items-center pt-4 px-4 pb-0 bg-[rgb(26,29,36)]">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4">
              <span className="text-black font-bold">選</span>
            </div>
          </div>
          <div className="flex space-x-6">
            <div className="flex flex-col items-center">
              <span className="text-[#daa360] font-medium">台股</span>
              <div className="h-1 w-full bg-[#daa360] mt-1 rounded-full"></div>
            </div>
            <span className="text-gray-400">期權</span>
            <span className="text-gray-400">海外</span>
            <span className="text-gray-400">基金</span>
          </div>
          <div className="flex items-center ml-auto">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <MarketIndicesHeader />
      </div>

      {/* Index Cards */}
      <div className="grid grid-cols-3 gap-2 p-2 text-center bg-black">
        {renderIndexCard("t00.tw", "加權指數")}
        {renderIndexCard("o00.tw", "櫃買指數")}
        {/* 電子指數固定顯示（下跌） */}
        <div className="bg-[rgb(17,40,17)] p-3 rounded">
          <div className="text-gray-300 text-md">電子指數</div>
          <div className="text-green-500 text-xl font-bold mt-1">1105.01</div>
          <div className="text-green-500 text-xs">▼ 2.47(-0.22%)</div>
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
          <span className="text-white text-xs text-center">智慧選股</span>
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
          <span className="text-white text-xs text-center">類股報價</span>
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
          <span className="text-white text-xs text-center">財經知識</span>
        </div>
      </div>

      {/* Hot Stocks Section */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium">盤中熱門</span>
          <ChevronRight className="text-gray-400" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mt-4 overflow-x-auto">
          <div 
            className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'volume' 
              ? 'text-[#daa360] border-b-2 border-[#daa360] font-bold' 
              : 'text-white'}`}
            onClick={() => setActiveTab('volume')}
          >
            <span>成交值</span>
          </div>
          <div 
            className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'instant' 
              ? 'text-[#daa360] border-b-2 border-[#daa360] font-bold' 
              : 'text-white'}`}
            onClick={() => setActiveTab('instant')}
          >
            <span>瞬間量</span>
          </div>
          <div 
            className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'upLimit' 
              ? 'text-[#daa360] border-b-2 border-[#daa360] font-bold' 
              : 'text-white'}`}
            onClick={() => setActiveTab('upLimit')}
          >
            <span>即將漲停</span>
          </div>
          <div 
            className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'downLimit' 
              ? 'text-[#daa360] border-b-2 border-[#daa360] font-bold' 
              : 'text-white'}`}
            onClick={() => setActiveTab('downLimit')}
          >
            <span>即將跌停</span>
          </div>
        </div>

        {/* Stock List */}
        <div className="mt-4">
          {loadingHotStocks && (
            <div className="flex justify-center py-8">
              <span className="text-gray-400">載入中...</span>
            </div>
          )}

          {errorHotStocks && (
            <div className="flex justify-center py-8">
              <span className="text-orange-500">{errorHotStocks}</span>
            </div>
          )}

          {!loadingHotStocks && !errorHotStocks && hotStocks.length === 0 && (
            <div className="flex justify-center py-8">
              <span className="text-gray-400">
                {activeTab === 'upLimit' ? '目前沒有即將漲停的股票' : 
                 activeTab === 'downLimit' ? '目前沒有即將跌停的股票' : 
                 '無符合條件的股票'}
              </span>
            </div>
          )}

          {!loadingHotStocks && !errorHotStocks && hotStocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between py-3 border-b border-gray-800">
              <div className="flex items-start w-1/4">
                {stock.symbol === "8222" && (
                  <div className="bg-red-500 text-white text-xs px-1 mr-1">注意</div>
                )}
                <div>
                  <div className="text-white font-medium">{stock.name}</div>
                  <div className="text-gray-400 text-sm">{stock.symbol}</div>
                </div>
              </div>
              <div className="text-right w-1/3">
                <div className={`${stock.isPositiveChange ? 'text-red-500' : 'text-green-500'} font-bold text-xl text-right`}>
                  {stock.price.toFixed(2)}
                </div>
                <div className={`${stock.isPositiveChange ? 'text-red-500' : 'text-green-500'} text-right`}>
                  {stock.isPositiveChange ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}({Math.abs(stock.changePercent).toFixed(2)}%)
                </div>
              </div>
              <div className="text-right w-1/3">
                <div className="text-gray-400 flex justify-end">
                  <span className="w-10 text-right">單量</span>
                  <span className={`${stock.singleVolume > 1000 ? 'text-red-500' : 'text-green-500'} w-16 text-right`}>
                    {stock.singleVolume}
                  </span>
                </div>
                <div className="text-gray-400 flex justify-end">
                  <span className="w-10 text-right">總量</span>
                  <span className="text-white w-16 text-right">{stock.totalVolume}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
