"use client"

import { ChevronRight, Eye, Settings, HelpCircle } from "lucide-react"
import MarketIndicesHeader from "./market-indices-header"

export default function AccountPage() {
  return (
    <div className="flex flex-col text-white bg-black">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10">
        <div className="flex items-center pt-4 px-4 pb-0 bg-[rgb(26,29,36)]">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4">
              <span className="text-black font-bold">帳</span>
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <Settings className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <MarketIndicesHeader />
      </div>

      {/* Total Assets */}
      <div className="flex items-center justify-between p-4 bg-[rgb(26,29,36)] border-b-8 border-black">
        <div className="flex items-center">
          <Eye className="mr-2 text-gray-400" />
          <span className="text-white">我的總資產 NTD ******</span>
        </div>
        <div className="flex items-center text-red-500">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
          <span className="mr-1">前往大戶豐</span>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>

      {/* Taiwan Stocks Account Info */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[rgb(41,45,53)]">
        <span className="text-gray-300">9A89-2292265 派大興</span>
        <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm">更新</button>
      </div>

      {/* Taiwan Stocks Details */}
      <div className="p-4 border-b-8 border-black bg-[rgb(26,29,36)]">
        <div className="flex items-center">
          <div className="bg-blue-700 text-white text-xs px-2 py-0.5 rounded mr-2">TW</div>
          <span className="text-white mr-1">台股庫存總市值</span>
          <HelpCircle className="text-sky-500 w-4 h-4 mr-1" /> 
          <span className="text-sky-500 text-xs">含息、含稅</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <div className="text-white text-3xl font-medium">******</div>
            <div className="text-white text-sm">NTD</div>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <div className="text-gray-400 text-sm">損益試算</div>
            <div className="text-white mt-1">NTD ******</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">報酬率</div>
            <div className="text-white mt-1">******</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">總付出成本</div>
            <div className="text-white mt-1">NTD ******</div>
          </div>
        </div>
      </div>

      {/* US Stocks Account Info */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[rgb(41,45,53)]">
        <span className="text-gray-300">9A89-00164787 派大興</span>
        <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm">更新</button>
      </div>
      
      {/* US Stocks Details */}
      <div className="p-4 border-b-8 border-black bg-[rgb(26,29,36)]">
        <div className="flex items-center">
          <div className="bg-red-700 text-white text-xs px-2 py-0.5 rounded mr-2">US</div>
          <span className="text-white">美股庫存總市值</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <div className="text-white text-3xl font-medium">******</div>
            <div className="text-white text-sm">USD</div>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <div className="text-gray-400 text-sm">損益試算</div>
            <div className="text-white mt-1">USD ******</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">報酬率</div>
            <div className="text-white mt-1">******</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">總付出成本</div>
            <div className="text-white mt-1">USD ******</div>
          </div>
        </div>
      </div>

      {/* US Stock Holdings (豐存股) */}
      <div className="p-4 bg-[rgb(41,45,53)]">
        <div className="flex items-center">
          <div className="bg-red-700 text-white text-xs px-2 py-0.5 rounded mr-2">US</div>
          <span className="text-white">豐存股-美股</span>
          <span className="text-gray-400 text-sm ml-2">9A89-00164787 派大興</span>
        </div>
      </div>

      {/* Regular Stock Total (定期定股) */}
      <div className="p-4 bg-[rgb(26,29,36)]">
        <div className="text-white mb-1">定期定股總市值</div>
        <div className="flex items-center justify-between mt-1">
          <div>
            <div className="text-white text-3xl font-medium">******</div>
            <div className="text-white text-sm">USD</div>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
      </div>
    </div>
  )
}
