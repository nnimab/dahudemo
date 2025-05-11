import { ChevronLeft, Share2, Search, MessageCircle, BookmarkIcon } from "lucide-react";
import MarketIndicesHeaderComponent from "./market-indices-header";
import BottomNavigation from "./bottom-navigation";
import { useRouter } from "next/navigation";

export interface NewsItem {
  id: string; // 新增ID以便區分
  newsCategory: string;
  newsDate: string;
  title: string;
  content: string;
  imageUrl?: string;
  sections?: Array<{ title: string; text: string }>;
}

interface NewsDetailPageProps {
  onBack: () => void;
  newsItem: NewsItem; // 修改 props，接收單一新聞項目
}

export default function NewsDetailPage({ onBack, newsItem }: NewsDetailPageProps) {
  const router = useRouter();

  // 處理「問小豐」按鈕點擊
  const handleAskSmartFeng = () => {
    // 只需傳遞新聞ID，不需要傳遞整個新聞內容
    router.push(`/smart-feng?newsId=${newsItem.id}`);
  };

  // 處理「存筆記」按鈕點擊
  const handleSaveNote = () => {
    // 導航到筆記頁面，帶上新聞ID和添加模式參數
    router.push(`/notes?newsId=${newsItem.id}&mode=add`);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white fixed inset-0 z-50">
      {/* New Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[rgb(26,29,36)] flex-shrink-0">
        <button onClick={onBack} className="text-white p-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold">豐雲學堂</h1>
        <button className="text-white p-2">
          <Search size={20} />
        </button>
      </div>

      {/* Market Indices Header */}
      <MarketIndicesHeaderComponent />

      {/* Content Area - Main content now on bg-black */}
      <div className="flex-grow overflow-y-auto pb-16">
        {/* News Meta and Main Title Section */}
        <div className="bg-[rgb(17,20,27)] p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">{newsItem.newsCategory}｜{newsItem.newsDate}</span>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleAskSmartFeng}
                className="bg-[#daa160] text-white rounded px-3 py-1.5 text-sm font-medium hover:bg-[#c4912e] flex items-center"
              >
                <MessageCircle size={16} className="mr-1.5" />
                問小豐
              </button>
              <button 
                onClick={handleSaveNote}
                className="bg-[#c4382c] text-white rounded px-3 py-1.5 text-sm font-medium hover:bg-[#a5291e] flex items-center"
              >
                <BookmarkIcon size={16} className="mr-1.5" />
                存筆記
              </button>
              <Share2 size={20} className="text-white cursor-pointer" />
              <button className="text-white border border-white rounded px-2 py-0.5 text-sm">
                A<span style={{fontSize: '0.7em', verticalAlign: 'middle'}}>A</span>
              </button>
            </div>
          </div>
          <h2 className="text-xl font-bold text-white">{newsItem.title}</h2>
        </div>

        {/* Body Content on bg-black */}
        <div className="bg-[rgb(17,20,27)] p-4">
          {/* First Paragraph Block */}
          <div className="bg-[rgb(24,36,58)] p-4 rounded-lg mb-6">
            <p className="leading-relaxed text-sm">
              {newsItem.content}
            </p>
          </div>

          {/* Image Block */}
          {newsItem.imageUrl && (
            <div className="mb-6">
              {newsItem.imageUrl === "/placeholder-stock-chart.png" ? (
                <div className="w-full h-48 bg-[rgb(20,27,35)] rounded-lg flex items-center justify-center text-gray-500">
                  請替換為實際圖片 (建議尺寸 寬度100%)
                </div>
              ) : (
                <img src={newsItem.imageUrl} alt="股市走勢圖" className="w-full rounded-lg" />
              )}
            </div>
          )}
          
          {/* Sections Area */}
          {newsItem.sections && newsItem.sections.map((section, index) => (
            <div key={index} className="mb-6 bg-[rgb(17,20,27)] p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#daa360] mb-3 pt-2">{section.title}</h3>
              {section.text && <p className="text-gray-300 leading-relaxed text-sm">{section.text}</p>}
              {!section.text && (
                <div className="text-gray-500 text-sm">
                  此區塊暫無詳細內容。
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* 顯示 BottomNavigation */}
      <BottomNavigation activePage="" setActivePage={() => {}} />
    </div>
  );
} 