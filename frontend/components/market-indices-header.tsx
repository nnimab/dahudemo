"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from "lucide-react";
// 引入新的 apiClient 函式和類型
import { getRealtimeMarketIndices, type RealtimeIndexData } from '../lib/apiClient'; 

interface MarketIndicesHeaderProps {
  className?: string;
}

// 修改輔助函式，格式化漲跌點數並添加箭頭
const formatIndexChangePoints = (changePoints: number | null ): string => {
  if (changePoints === null) return "N/A";
  const sign = changePoints >= 0 ? "▲" : "▼"; 
  return `${sign} ${Math.abs(changePoints).toFixed(2)}`; // 顯示點數，保留兩位小數
};

// 創建一個防抖函數
const debounce = (fn: Function, delay: number) => {
  let timer: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

function MarketIndicesHeaderComponent({ className = "" }: MarketIndicesHeaderProps) {
  // 使用一個狀態來儲存所有指數數據的字典，以指數 id (如 "tse_t00.tw") 為鍵
  const [indicesData, setIndicesData] = useState<Record<string, RealtimeIndexData>>({});
  const [loadingIndices, setLoadingIndices] = useState(true);
  const [errorIndices, setErrorIndices] = useState<string | null>(null);
  
  // 添加 useRef 來跟踪請求狀態，避免重複請求
  const requestInProgressRef = useRef(false);
  const firstRenderRef = useRef(true);

  // 使用 useCallback 包裝 fetchMarketIndices 以避免重複創建
  const fetchMarketIndices = useCallback(async () => {
    // 避免重複請求
    if (requestInProgressRef.current) return;
    
    requestInProgressRef.current = true;
    setLoadingIndices(true);
    setErrorIndices(null);
    
    try {
      const dataArray = await getRealtimeMarketIndices();
      
      // 僅在開發環境中保留日誌
      if (process.env.NODE_ENV === 'development') {
        console.log("API Response (dataArray) from apiClient:", dataArray);
      }

      const dataMap: Record<string, RealtimeIndexData> = {};
      if (Array.isArray(dataArray)) {
        for (const index of dataArray) {
          if (index && typeof index.id === 'string') {
            dataMap[index.id] = index; 
          } else {
            console.warn("Received invalid index object in dataArray:", index);
          }
        }
      } else {
        console.error("API did not return an array:", dataArray);
      }
      
      // 僅在開發環境中保留日誌
      if (process.env.NODE_ENV === 'development') {
        console.log("Processed dataMap for state:", dataMap);
      }

      setIndicesData(dataMap);
    } catch (err) {
      console.error("Error in fetchMarketIndices (market-indices-header.tsx):", err);
      setErrorIndices(err instanceof Error ? err.message : "載入市場指數失敗");
    } finally {
      setLoadingIndices(false);
      requestInProgressRef.current = false;
    }
  }, []);

  // 防抖處理的 fetchMarketIndices
  const debouncedFetchMarketIndices = useCallback(
    debounce(() => fetchMarketIndices(), 500),
    [fetchMarketIndices]
  );

  useEffect(() => {
    // 只在首次渲染時執行一次，避免不必要的請求
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      fetchMarketIndices();
    }
    
    // 設定定時器來定期刷新數據，時間間隔較長以減少請求
    const intervalId = setInterval(fetchMarketIndices, 60000); // 每 60 秒刷新一次
    
    return () => clearInterval(intervalId);
  }, [fetchMarketIndices]);

  const renderIndex = (indexId: string, displayName: string) => {
    if (loadingIndices) return <span className="text-gray-400 text-sm ml-1">載入中...</span>;
    // Display error message directly if there's a general fetch error
    if (errorIndices && Object.keys(indicesData).length === 0) return <span className="text-orange-500 text-sm ml-1" title={errorIndices}>錯誤</span>;
    
    const indexInfo = indicesData[indexId];

    // More specific N/A if individual index data is missing after a successful fetch (empty array or bad data for specific index)
    if (!indexInfo || indexInfo.latest_price === null) {
        return <span className="text-gray-400 text-sm ml-1">N/A</span>;
    }

    const priceColor = indexInfo.change >= 0 ? "text-red-500" : "text-green-500";
    const changeColor = indexInfo.change >= 0 ? "text-red-500" : "text-green-500";

    return (
      <>
        <span className={`${priceColor} text-sm ml-1`}>{indexInfo.latest_price.toFixed(2)}</span>
        <span className={`${changeColor} text-sm ml-1`}>
          {formatIndexChangePoints(indexInfo.change)}
        </span>
      </>
    );
  };

  return (
    <div suppressHydrationWarning className={`flex items-center justify-between px-2 py-2 border-b border-gray-800 bg-[rgb(26,29,36)] ${className}`}>
      <div suppressHydrationWarning className="flex flex-wrap items-center w-full pr-2">
        {/* 加權指 */}
        <div suppressHydrationWarning className="flex items-center mr-2 whitespace-nowrap">
          <span className="text-gray-300 text-sm ml-1">加權指</span>
          {renderIndex("t00.tw", "加權指")}
        </div>
        
        {/* 櫃買指 */}
        <div suppressHydrationWarning className="flex items-center whitespace-nowrap">
          <span className="text-gray-300 text-sm ml-1">櫃買指</span>
          {renderIndex("o00.tw", "櫃買指")}
        </div>
        <ChevronDown className="text-gray-400 ml-auto" />
      </div>
    </div>
  );
}

// 使用 React.memo 包裝組件以減少不必要的重新渲染
export default MarketIndicesHeaderComponent;
