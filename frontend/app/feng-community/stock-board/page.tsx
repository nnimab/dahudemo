"use client"

import { useState } from "react"
import { Search, Info, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import CommunityNavigation from "../../../components/community-navigation"
import BackButton from "../../../components/back-button"

// 類股分類數據
const STOCK_CATEGORIES = [
  {
    id: "tech",
    name: "科技類",
    subcategories: [
      { id: "semiconductor", name: "半導體", postCount: 458 },
      { id: "ai", name: "人工智能", postCount: 324 },
      { id: "software", name: "軟體服務", postCount: 156 },
      { id: "hardware", name: "硬體設備", postCount: 102 },
      { id: "internet", name: "網際網路", postCount: 89 },
    ],
  },
  {
    id: "finance",
    name: "金融類",
    subcategories: [
      { id: "bank", name: "銀行", postCount: 245 },
      { id: "insurance", name: "保險", postCount: 123 },
      { id: "securities", name: "證券", postCount: 97 },
      { id: "fintech", name: "金融科技", postCount: 189 },
    ],
  },
  {
    id: "consumer",
    name: "消費類",
    subcategories: [
      { id: "retail", name: "零售", postCount: 110 },
      { id: "food", name: "食品飲料", postCount: 87 },
      { id: "textile", name: "紡織服裝", postCount: 53 },
      { id: "home", name: "家居用品", postCount: 42 },
    ],
  },
  {
    id: "healthcare",
    name: "醫療生技",
    subcategories: [
      { id: "biotech", name: "生物科技", postCount: 203 },
      { id: "pharma", name: "製藥", postCount: 145 },
      { id: "medical", name: "醫療設備", postCount: 67 },
      { id: "healthcare", name: "醫療服務", postCount: 58 },
    ],
  },
  {
    id: "manufacturing",
    name: "製造業",
    subcategories: [
      { id: "steel", name: "鋼鐵", postCount: 76 },
      { id: "chemical", name: "化工", postCount: 98 },
      { id: "automobile", name: "汽車零組件", postCount: 65 },
      { id: "electronics", name: "電子零組件", postCount: 234 },
    ],
  },
];

export default function StockBoardPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(STOCK_CATEGORIES[0]);

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
                placeholder="搜索討論版"
                className="bg-transparent border-none outline-none w-full text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 導航組件 */}
      <CommunityNavigation activeTab="類股看板" />

      {/* 主要內容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左側類別列表 */}
        <div className="w-1/3 border-r border-gray-800 overflow-y-auto">
          {STOCK_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className={`p-4 ${
                activeCategory.id === category.id
                  ? "bg-[#111419] border-l-4 border-[#daa360]"
                  : "border-l-4 border-transparent"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              <div className="font-medium">{category.name}</div>
              <div className="text-xs text-gray-400 mt-1">
                {category.subcategories.length} 個子版
              </div>
            </div>
          ))}
        </div>

        {/* 右側子類別列表 */}
        <div className="w-2/3 overflow-y-auto p-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-1">{activeCategory.name}</h2>
            <p className="text-gray-400 text-sm">
              選擇下方子版，瀏覽相關討論
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeCategory.subcategories.map((subcategory) => (
              <div
                key={subcategory.id}
                className="bg-[#111419] border border-gray-800 rounded-lg p-4 hover:border-[#daa360] transition-colors cursor-pointer"
                onClick={() => router.push(`/feng-community/home`)} // 暫時導向社群首頁，後續可以改為相應的子版頁面
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">{subcategory.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {subcategory.postCount} 篇討論
                    </p>
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 