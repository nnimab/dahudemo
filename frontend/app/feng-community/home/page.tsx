"use client"

import { useState } from "react"
import { MoreVertical, Share2, Menu, Plus, ThumbsUp, MessageSquare, ArrowUp, ArrowDown, Bookmark, Link as LinkIcon, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import CommunityNavigation from "../../../components/community-navigation"
import BackButton from "../../../components/back-button"

export default function CommunityHomePage() {
  const router = useRouter()
  const [postText, setPostText] = useState("")

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#111419] border-b border-gray-800">
        <BackButton />
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-[#daa360]">
            <Menu className="w-6 h-6" />
            <Plus className="w-4 h-4" />
          </div>
          <Share2 className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* 通用導航元件 */}
      <CommunityNavigation activeTab="豐社群" />

      {/* Post Creation Area */}
      <div className="p-4 bg-[#111419] border-b border-gray-800">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden mr-3">
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNlmo5aAbwF5e_Q4R8ONazxFd8fuGCZOzDyg&s" alt="用戶頭像" width={40} height={40} className="object-cover" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="分享您的投資想法..."
              className="w-full bg-[#1c1f26] border border-gray-700 rounded-full px-4 py-2 text-white"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button className="text-gray-400 text-sm flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-1">照片</span>
            </button>
            <button className="text-gray-400 text-sm flex items-center">
              <LinkIcon className="w-5 h-5 mr-1" />
              <span className="ml-1">連結</span>
            </button>
          </div>
          <button
            className={`px-4 py-1 rounded-full ${
              postText.trim() ? "bg-[#daa360] text-white" : "bg-gray-700 text-gray-400"
            }`}
            disabled={!postText.trim()}
          >
            發布
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="flex-1 overflow-y-auto pb-16">
        {/* Post 1 - 移到此位置的派大興的帖子 */}
        <div className="border-b border-gray-800">
          <div className="p-4">
            {/* Post Header */}
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNlmo5aAbwF5e_Q4R8ONazxFd8fuGCZOzDyg&s"
                    alt="派大興"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg">@派大興</h3>
                    <div className="ml-2 px-2 py-0.5 bg-[#daa360] rounded-full text-xs">
                      投資達人
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <span>台中市</span>
                    <span className="mx-2">•</span>
                    <span>2小時前</span>
                  </div>
                </div>
              </div>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </div>

            {/* Post Content */}
            <div className="mt-3">
              <p className="text-white mb-3">
                剛剛參加了線上投資論壇，專家預測下半年科技股可能會有大幅調整。我認為這是個很好的佈局機會，特別是AI和雲端服務相關股票。我已經開始逐步佈局，你們怎麼看？
              </p>
            </div>

            {/* 市場資訊卡片 */}
            <div className="mt-2 bg-[#20272b] p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#daa360] font-medium">市場資訊</div>
                <div className="text-gray-400 text-sm">2025/05/10</div>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1 flex flex-col">
                  <span className="text-gray-400 text-sm">台股指數</span>
                  <span className="text-white text-lg font-bold">20,915.04</span>
                  <div className="flex items-center text-red-500 text-sm">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    <span>371.64 (1.81%)</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-gray-400 text-sm">成交量</span>
                  <span className="text-white text-lg font-bold">2935.10億</span>
                  <div className="flex items-center text-red-500 text-sm">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    <span>+21.4%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Tags */}
            <div className="flex flex-wrap mt-3 space-x-2">
              <div className="bg-[#1c1f26] text-gray-300 px-3 py-1 rounded-full text-sm">#AI股</div>
              <div className="bg-[#1c1f26] text-gray-300 px-3 py-1 rounded-full text-sm">#科技股</div>
              <div className="bg-[#1c1f26] text-gray-300 px-3 py-1 rounded-full text-sm">#投資策略</div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center mt-4">
              <div className="flex items-center mr-4">
                <ThumbsUp className="w-5 h-5 text-gray-400" />
                <span className="ml-2 text-gray-400">89</span>
              </div>
              <div className="flex items-center mr-4">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <span className="ml-2 text-gray-400">24</span>
              </div>
              <div className="flex items-center">
                <Bookmark className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Post Footer */}
          <div className="flex border-t border-gray-800">
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>點讚</span>
            </button>
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>評論</span>
            </button>
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>分享</span>
            </button>
          </div>
        </div>

        {/* Post 2 - 移到此位置的章魚哥的帖子 */}
        <div className="border-b border-gray-800">
          <div className="p-4">
            {/* Post Header */}
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdq2yQvJHKeIU1hzTTKjSUzEjd7MdO_zkyAA&s"
                    alt="章魚哥"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg">@章魚哥</h3>
                    <div className="ml-2 flex items-center">
                      <Award className="w-4 h-4 text-[#daa360]" />
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <span>新北市</span>
                    <span className="mx-2">•</span>
                    <span>3天前</span>
                  </div>
                </div>
              </div>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </div>

            {/* Post Content */}
            <div className="mt-3">
              <p className="text-white mb-3">
                昨天的「矽光子概念股」表現太驚人了！華星光(4979)和光聖(6442)都漲停。黃仁勳來台灣前的效應已經開始發酵，大家看好下週行情嗎？
              </p>
            </div>

            {/* Post Image */}
            <div className="mt-3 rounded-lg overflow-hidden">
              <Image 
                src="https://doqvf81n9htmm.cloudfront.net/data/crop_article/95109/economy-2245121_1920.jpg_1140x855.jpg" 
                alt="股票走勢圖" 
                width={600} 
                height={300}
                className="w-full h-auto" 
              />
            </div>

            {/* Stocks Display */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-red-900/30 p-2 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white">華星光</span>
                  <span className="text-red-400">4979</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-white font-bold">166.0</span>
                  <span className="text-red-400">+10.0%</span>
                </div>
              </div>
              <div className="bg-red-900/30 p-2 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white">光聖</span>
                  <span className="text-red-400">6442</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-white font-bold">426.5</span>
                  <span className="text-red-400">+10.0%</span>
                </div>
              </div>
              <div className="bg-red-900/30 p-2 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white">聯亞</span>
                  <span className="text-red-400">3081</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-white font-bold">282.5</span>
                  <span className="text-red-400">+9.8%</span>
                </div>
              </div>
              <div className="bg-red-900/30 p-2 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white">聯鈞</span>
                  <span className="text-red-400">3450</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-white font-bold">204.5</span>
                  <span className="text-red-400">+9.7%</span>
                </div>
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center mt-4">
              <div className="flex items-center mr-4">
                <ThumbsUp className="w-5 h-5 text-[#daa360]" />
                <span className="ml-2 text-white">156</span>
              </div>
              <div className="flex items-center mr-4">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <span className="ml-2 text-gray-400">42</span>
              </div>
              <div className="flex items-center">
                <Bookmark className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Post Footer */}
          <div className="flex border-t border-gray-800">
            <button className="flex-1 py-3 text-center text-[#daa360]">
              <span>點讚</span>
            </button>
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>評論</span>
            </button>
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>分享</span>
            </button>
          </div>
        </div>

        {/* 新增鋼鐵人的貼文 */}
        <div className="border-b border-gray-800">
          <div className="p-4">
            {/* Post Header */}
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <Image
                    src="https://cdn.cybassets.com/media/W1siZiIsIjExMTE0L3Byb2R1Y3RzLzUwMDYyNzgyLzExMTE0LXByb2R1Y3QtcGhvdG8tMjAyNDEwMDktNzItMXlqaHZ2cF8wNGY1MzE4ZDhiNWE4ODJiYTA0MS5qcGVnIl0sWyJwIiwidGh1bWIiLCI2MDB4NjAwIl1d.jpeg?sha=f10c8a928500242a"
                    alt="鋼鐵人"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg">@鋼鐵人</h3>
                    <div className="ml-2 px-2 py-0.5 bg-blue-600 rounded-full text-xs">
                      科技專家
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <span>台南市</span>
                    <span className="mx-2">•</span>
                    <span>1天前</span>
                  </div>
                </div>
              </div>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </div>

            {/* Post Content */}
            <div className="mt-3">
              <p className="text-white mb-3">
                我認為台積電新製程技術將帶動整個半導體產業鏈的飛漲！晶圓代工、設備商、測試廠和相關材料供應鏈都將受惠。長期投資角度看，現在絕對是佈局好時機。以下是我看好的相關標的：
              </p>
            </div>

            {/* Stocks Display */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-red-900/30 p-2 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white">台積電</span>
                  <span className="text-red-400">2330</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-white font-bold">689.0</span>
                  <span className="text-red-400">+3.2%</span>
                </div>
              </div>
              <div className="bg-red-900/30 p-2 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white">京鼎</span>
                  <span className="text-red-400">3413</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-white font-bold">336.5</span>
                  <span className="text-red-400">+7.0%</span>
                </div>
              </div>
              <div className="bg-red-900/30 p-2 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white">創意</span>
                  <span className="text-red-400">3443</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-white font-bold">1615.0</span>
                  <span className="text-red-400">+5.2%</span>
                </div>
              </div>
              <div className="bg-green-900/30 p-2 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white">穩懋</span>
                  <span className="text-green-400">3105</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-white font-bold">205.5</span>
                  <span className="text-green-400">-1.7%</span>
                </div>
              </div>
            </div>

            {/* Post Tags */}
            <div className="flex flex-wrap mt-3 space-x-2">
              <div className="bg-[#1c1f26] text-gray-300 px-3 py-1 rounded-full text-sm">#半導體</div>
              <div className="bg-[#1c1f26] text-gray-300 px-3 py-1 rounded-full text-sm">#台積電</div>
              <div className="bg-[#1c1f26] text-gray-300 px-3 py-1 rounded-full text-sm">#長期投資</div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center mt-4">
              <div className="flex items-center mr-4">
                <ThumbsUp className="w-5 h-5 text-[#daa360]" />
                <span className="ml-2 text-white">204</span>
              </div>
              <div className="flex items-center mr-4">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <span className="ml-2 text-gray-400">76</span>
              </div>
              <div className="flex items-center">
                <Bookmark className="w-5 h-5 text-[#daa360]" />
              </div>
            </div>
          </div>

          {/* Post Footer */}
          <div className="flex border-t border-gray-800">
            <button className="flex-1 py-3 text-center text-[#daa360]">
              <span>點讚</span>
            </button>
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>評論</span>
            </button>
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>分享</span>
            </button>
          </div>
        </div>

        {/* Post 3 - 張大明的帖子 */}
        <div className="border-b border-gray-800">
          <div className="p-4">
            {/* Post Header */}
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPy7i_OUlMul5QTlf6SnCz3GNz2LhA77XK9g&s"
                    alt="張大明"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg">@張大明</h3>
                    <div className="ml-2 bg-blue-900 rounded-full p-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <span>台北市</span>
                    <span className="mx-2">•</span>
                    <span>15天前</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center justify-center bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm mr-2">
                  已修改
                </div>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Post Content */}
            <div className="mt-3">
              <div className="flex items-center mb-2">
                <div className="bg-red-500 rounded-full p-1 mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M12 16V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-bold">為市場下跌做好準備</span>
              </div>
              <p className="text-white mb-2">
                標普指數今年下跌約8%。而我們仍然維持在-1%。這不是偶然的。
              </p>
              <div className="flex items-center text-gray-400 text-sm">
                <span>這個...</span>
                <button className="ml-2 text-[#daa360]">顯示更多</button>
                <span className="mx-2">•</span>
                <button className="text-gray-400">翻譯</button>
              </div>
            </div>

            {/* Post Image - 股市資訊卡片 */}
            <div className="mt-3 bg-[#111419] rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-white text-xl">你好，小明！</p>
                <p className="text-gray-400">現金和持股</p>
                <p className="text-white text-4xl font-bold mt-2">$132,390.69</p>
                <div className="flex items-center mt-2 text-red-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 19V5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12L12 5L19 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-1">$2,652.38 (2.04%) 今日</span>
                </div>
              </div>
            </div>

            {/* 加入股票資訊 */}
            <div className="mt-3 flex space-x-3">
              <div className="flex-1 bg-[#20272b] p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white font-medium">台積電</span>
                  <span className="text-red-500">2330</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-white text-lg font-bold">689</span>
                  <div className="flex items-center text-red-500">
                    <ArrowUp className="w-4 h-4" />
                    <span className="ml-1">+3.5%</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-[#20272b] p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white font-medium">聯發科</span>
                  <span className="text-red-500">2454</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-white text-lg font-bold">1125</span>
                  <div className="flex items-center text-green-500">
                    <ArrowDown className="w-4 h-4" />
                    <span className="ml-1">-1.2%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center mt-4">
              <div className="flex items-center mr-4">
                <ThumbsUp className="w-5 h-5 text-gray-400" />
                <span className="ml-2 text-gray-400">42</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <span className="ml-2 text-gray-400">12</span>
              </div>
            </div>
          </div>

          {/* Post Footer */}
          <div className="flex border-t border-gray-800">
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>點讚</span>
            </button>
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>評論</span>
            </button>
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>分享</span>
            </button>
          </div>
        </div>

        {/* Post 4 - 海綿寶寶的帖子 */}
        <div className="border-b border-gray-800">
          <div className="p-4">
            {/* Post Header */}
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <Image
                    src="https://images.api.hahow.in/images/634a7cca4013220006e60899"
                    alt="海綿寶寶"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg">@海綿寶寶</h3>
                    <div className="ml-2 bg-blue-900 rounded-full p-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <span>高雄市</span>
                    <span className="mx-2">•</span>
                    <span>22天前</span>
                  </div>
                </div>
              </div>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </div>

            {/* Post Content */}
            <div className="mt-3">
              <div className="flex items-center mb-2">
                <div className="bg-blue-500 rounded-full p-1 mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 10L12 15L17 10"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-bold">我們保持冷靜，聰明部署，現金持有量已降至僅10%。</span>
              </div>
            </div>

            {/* 新增更多投資標籤 */}
            <div className="flex flex-wrap mt-3 space-x-2">
              <div className="bg-[#1c1f26] text-gray-300 px-3 py-1 rounded-full text-sm">#金融股</div>
              <div className="bg-[#1c1f26] text-gray-300 px-3 py-1 rounded-full text-sm">#定期定額</div>
              <div className="bg-[#1c1f26] text-gray-300 px-3 py-1 rounded-full text-sm">#存股</div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center mt-4">
              <div className="flex items-center mr-4">
                <ThumbsUp className="w-5 h-5 text-gray-400" />
                <span className="ml-2 text-gray-400">36</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <span className="ml-2 text-gray-400">8</span>
              </div>
            </div>
          </div>

          {/* Post Footer */}
          <div className="flex border-t border-gray-800">
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>點讚</span>
            </button>
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>評論</span>
            </button>
            <button className="flex-1 py-3 text-center text-gray-400">
              <span>分享</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button className="w-14 h-14 bg-[#daa360] rounded-full flex items-center justify-center shadow-lg">
          <Plus className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  )
}
