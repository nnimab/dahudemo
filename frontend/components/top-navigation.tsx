// 1. "use client"
"use client"

// 2. 匯入依賴
import { Bell, Search, User } from "lucide-react"

// 3. 定義組件的 props (屬性) 介面
interface TopNavigationProps {
  activeTab: string // 目前活動的標籤頁名稱
  setActiveTab: (tab: string) => void // 一個函數，用於設定活動的標籤頁
}

// 4. 導出預設的 TopNavigation 組件函數
export default function TopNavigation({ activeTab, setActiveTab }: TopNavigationProps) {
  // 5. 返回 JSX 結構
  return (
    // 6. 最外層的容器 div
    <div suppressHydrationWarning className="flex items-center pt-4 px-4 pb-0 bg-[rgb(26,29,36)] z-10">
      {/* 
        flex: 使用 Flexbox 佈局
        items-center: Flexbox 子項目垂直居中
        pt-4 px-4 pb-0: 
          pt-4: padding-top: 1rem (16px)
          px-4: padding-left: 1rem; padding-right: 1rem;
          pb-0: padding-bottom: 0px;
        bg-[rgb(17,20,27)]: 背景顏色設定為 rgb(17,20,27) (一種深色)
        z-10: 設定 CSS z-index 為 10，用於堆疊順序
      */}

      {/* 7. 左側用戶圖標區域 */}
      <div suppressHydrationWarning className="flex items-center">
        <div suppressHydrationWarning className="w-10 h-10 bg-[rgb(26,29,36)] rounded-full flex items-center justify-center mr-4">
          {/*
            w-10 h-10: 寬度和高度皆為 2.5rem (40px)
            bg-[rgb(17,20,27)]: 背景顏色 (與父元素相同，可能為了"裁切"或視覺效果)
            rounded-full: 設定圓角為最大，使其成為圓形
            flex items-center justify-center: 內部圖標水平垂直居中
            mr-4: margin-right: 1rem (16px)
          */}
          <User className="w-6 h-6 text-gray-400" /> {/* 用戶圖標，寬高 1.5rem (24px)，顏色為 gray-400 */}
        </div>
      </div>

      {/* 8. 中間的標籤頁導航區域 */}
      <div suppressHydrationWarning className="flex space-x-6">
        {/* 
          flex: 使用 Flexbox 佈局
          space-x-6: 設定 Flexbox 子項目之間的水平間距為 1.5rem (24px) (除了第一個子項目)
        */}

        {/* 8a. 台股標籤 */}
        <div suppressHydrationWarning className="flex flex-col items-center cursor-pointer" onClick={() => setActiveTab("taiwan")}>
          {/*
            flex flex-col items-center: 垂直排列子項目並水平居中
            cursor-pointer: 滑鼠懸停時顯示為指標樣式
            onClick: 點擊時調用 setActiveTab 函數，並傳入 "taiwan"
          */}
          <span className={activeTab === "taiwan" ? "text-[#daa360] font-medium" : "text-gray-400"}>
            {/* 
              根據 activeTab 是否為 "taiwan" 來決定文字顏色和字體粗細
              如果 activeTab 是 "taiwan": text-[#daa360] (一種金色), font-medium (中等粗細)
              否則: text-gray-400 (灰色)
            */}
            台股
          </span>
          {/* 條件渲染：只有當 activeTab 是 "taiwan" 時，才顯示下方的底線 div */}
          {activeTab === "taiwan" && <div suppressHydrationWarning className="h-1 w-full bg-[#daa360] mt-1 rounded-full"></div>}
          {/* 
            h-1: 高度 0.25rem (4px)
            w-full: 寬度 100%
            bg-[#daa360]: 背景顏色 (與活動文字顏色相同)
            mt-1: margin-top: 0.25rem (4px)
            rounded-full: 圓角
          */}
        </div>

        {/* 8b. 期權標籤 (結構與台股標籤類似) */}
        <div suppressHydrationWarning className="flex flex-col items-center cursor-pointer" onClick={() => setActiveTab("options")}>
          <span className={activeTab === "options" ? "text-[#daa360] font-medium" : "text-gray-400"}>期權</span>
          {activeTab === "options" && <div suppressHydrationWarning className="h-1 w-full bg-[#daa360] mt-1 rounded-full"></div>}
        </div>

        {/* 8c. 海外標籤 (結構與台股標籤類似) */}
        <div suppressHydrationWarning className="flex flex-col items-center cursor-pointer" onClick={() => setActiveTab("overseas")}>
          <span className={activeTab === "overseas" ? "text-[#daa360] font-medium" : "text-gray-400"}>海外</span>
          {activeTab === "overseas" && <div suppressHydrationWarning className="h-1 w-full bg-[#daa360] mt-1 rounded-full"></div>}
        </div>

        {/* 8d. 基金標籤 (結構與台股標籤類似) */}
        <div suppressHydrationWarning className="flex flex-col items-center cursor-pointer" onClick={() => setActiveTab("funds")}>
          <span className={activeTab === "funds" ? "text-[#daa360] font-medium" : "text-gray-400"}>基金</span>
          {activeTab === "funds" && <div suppressHydrationWarning className="h-1 w-full bg-[#daa360] mt-1 rounded-full"></div>}
        </div>
      </div>

      {/* 9. 右側圖標區域 (搜尋和通知) */}
      <div suppressHydrationWarning className="flex items-center space-x-4 ml-auto">
        {/*
          flex items-center: Flexbox 佈局，子項目垂直居中
          space-x-4: 子項目之間的水平間距為 1rem (16px)
          ml-auto: margin-left: auto; 將此區域推到最右邊
        */}
        <Search className="w-6 h-6 text-gray-400" /> {/* 搜尋圖標 */}
        <div suppressHydrationWarning className="relative"> {/* 通知圖標的容器，設定為 relative 以便絕對定位徽章 */}
          <Bell className="w-6 h-6 text-gray-400" /> {/* 通知鈴鐺圖標 */}
          {/* 通知徽章 (小紅點) */}
          <span suppressHydrationWarning className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {/*
              absolute -top-2 -right-2: 相對於父元素 (relative 的 div) 進行絕對定位，並向上、向右偏移
                -top-2: top: -0.5rem;
                -right-2: right: -0.5rem;
              bg-red-500: 背景紅色
              text-white: 文字白色
              text-xs: 文字大小 extra small
              rounded-full: 圓形
              w-5 h-5: 寬高 1.25rem (20px)
              flex items-center justify-center: 內部數字水平垂直居中
            */}
            32 {/* 通知數量 */}
          </span>
        </div>
      </div>
    </div>
  )
}
