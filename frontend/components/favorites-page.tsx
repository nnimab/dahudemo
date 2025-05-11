"use client"

import { Eye, Settings } from "lucide-react"
import MarketIndicesHeader from "./market-indices-header"

export default function FavoritesPage() {
  return (
    <div className="flex flex-col text-white">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10">
        <div className="flex items-center pt-4 px-4 pb-0 bg-[rgb(26,29,36)]">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4">
              <span className="text-black font-bold">自</span>
            </div>
          </div>
          <div className="flex space-x-6">
            <div className="flex flex-col items-center">
              <span className="text-[#daa360] font-medium">台股</span>
              <div className="h-1 w-full bg-[#daa360] mt-1 rounded-full"></div>
            </div>
            <span className="text-gray-400">期權</span>
            <span className="text-gray-400">海外</span>
          </div>
          <div className="flex items-center ml-auto">
            <Settings className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <MarketIndicesHeader />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <div className="py-3 px-6 text-[#daa360] border-b-2 border-[#daa360]">
          <span>庫存</span>
        </div>
        <div className="py-3 px-6 text-gray-400">
          <span>豐存股 Top10</span>
        </div>
        <div className="py-3 px-6 text-gray-400">
          <span>自選</span>
        </div>
      </div>

      {/* Stock Info */}
      <div className="p-4 border-b-8 border-black">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">9A89-23881956 派大興</span>
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-2">僅顯示今可沖</span>
            <div className="w-10 h-5 bg-gray-700 rounded-full relative">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="p-4 border-b-8 border-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-white">總庫存損益試算</span>
            <Eye className="ml-2 text-gray-400" />
          </div>
          <span className="text-white">報酬率</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-white text-xl">-</span>
          <span className="text-white text-xl">-</span>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="bg-gray-800 p-6 rounded-lg opacity-50 mb-4">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2" />
            <path d="M7 7H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M7 17H12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-gray-400 text-lg">暫無庫存資料</span>
      </div>
    </div>
  )
}
