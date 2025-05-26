// frontend/lib/apiClient.ts

// Interface for stock data points from the API
// Exporting StockDataPoint in case other components need it directly
export interface StockDataPoint {
  date: string; // Date string from backend, may need conversion frontend
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Interface for processed stock information to be used in components
// Exporting StockInfo as it's used by components like MarketIndicesHeader
export interface StockInfo {
  symbol: string;
  changePercent: number | null; // Percentage change
  latestPrice: number | null;
  isPositiveChange: boolean; // True if price went up or stayed the same
  message?: string;
}

// Interface for hot stock information
export interface HotStockInfo {
  symbol: string;         // 股票代號
  name: string;           // 股票名稱
  price: number;          // 當前價格
  change: number;         // 漲跌點數
  changePercent: number;  // 漲跌百分比
  singleVolume: number;   // 單量
  totalVolume: number;    // 總量
  isPositiveChange: boolean; // 是否為正向變化
}

// New interface for the realtime index data from /indices/realtime endpoint
export interface RealtimeIndexData {
  id: string;               
  name: string;             
  latest_price: number;
  change: number;
  change_percent: number;
  open_price: number;
  high_price: number;
  low_price: number;
  yesterday_price: number;
  last_update_time: string; 
  raw_z: string; 
}

// Read API base URL from environment variable, default to relative path for production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/**
 * Fetches historical stock data from the API and calculates the latest price and percentage change.
 * @param symbol - The stock symbol (e.g., "2330")
 * @param period - The period to query, e.g., "2d" (to get the last two days for change calculation)
 * @returns A StockInfo object, or an object with an error message if an error occurs
 */
export async function getStockLatestInfo(symbol: string, period: string = "2d"): Promise<StockInfo> {
  const stockInfoDefault: StockInfo = {
    symbol,
    changePercent: null,
    latestPrice: null,
    isPositiveChange: false,
  };

  try {
    // Ensure NEXT_PUBLIC_API_BASE_URL is set in .env.local or environment variables
    // e.g., NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
    const response = await fetch(`${API_BASE_URL}/api/v1/market/${symbol}/historical?period=${period}`);

    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch (e) {
        // Ignore JSON parsing error
      }
      console.error(`Error fetching stock data for ${symbol}: ${errorMessage}`);
      return { ...stockInfoDefault, message: errorMessage };
    }

    const data: { symbol: string; data: StockDataPoint[]; message?: string } = await response.json();

    if (data.message || !data.data || data.data.length < 2) {
      // Need at least two data points to calculate change
      const message = data.message || "Insufficient data to calculate change.";
      console.warn(`Warning for ${symbol}: ${message}`);
      if (data.data && data.data.length === 1) {
        return {
          ...stockInfoDefault,
          latestPrice: data.data[0].close,
          message
        };
      }
      return { ...stockInfoDefault, message };
    }

    // Assuming data.data is sorted in ascending order by date
    const latestData = data.data[data.data.length - 1];
    const previousData = data.data[data.data.length - 2];

    if (!latestData || !previousData) {
        return { ...stockInfoDefault, message: "Missing data points for calculation." };
    }

    const latestPrice = latestData.close;
    const previousPrice = previousData.close;
    
    const change = latestPrice - previousPrice;
    const changePercent = previousPrice !== 0 ? (change / previousPrice) * 100 : 0;

    return {
      symbol,
      changePercent: parseFloat(changePercent.toFixed(2)), // Keep two decimal places
      latestPrice: parseFloat(latestPrice.toFixed(2)),
      isPositiveChange: change >= 0, // Zero change is considered non-negative
    };

  } catch (error) {
    console.error(`Failed to fetch or process stock info for ${symbol}:`, error);
    return { 
        ...stockInfoDefault, 
        message: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}

// New function to fetch realtime market indices
export async function getRealtimeMarketIndices(): Promise<RealtimeIndexData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/market/indices/realtime`);
    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch (e) { /* Ignore */ }
      console.error(`Error fetching realtime indices: ${errorMessage}`);
      throw new Error(errorMessage); // Or return an empty array or a specific error structure
    }
    const data: RealtimeIndexData[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch or process realtime indices:`, error);
    // Depending on how you want to handle errors in components, you might re-throw or return a specific error shape.
    // For now, re-throwing to let the component catch it.
    if (error instanceof Error) throw error;
    throw new Error("An unknown error occurred while fetching realtime indices.");
  }
}

// 獲取熱門股票數據
export async function getHotStocks(type: string = "volume"): Promise<HotStockInfo[]> {
  // 由於我們可能尚未實現後端API，先使用模擬數據
  // 實際情況應該是從API獲取數據
  // const response = await fetch(`${API_BASE_URL}/api/v1/market/hot-stocks?type=${type}`);
  
  // 根據類型返回不同的模擬數據
  if (type === 'volume') {
    // 成交值 - 使用真實股票，但數據為模擬
    try {
      // 嘗試獲取真實股票數據
      const tsmc = await getStockLatestInfo("2330");
      const mediatek = await getStockLatestInfo("2454");
      const hon_hai = await getStockLatestInfo("2317");
      const umc = await getStockLatestInfo("2303");
      const asus = await getStockLatestInfo("2357");
  
      // 準備熱門股票列表
      const hotStocks: HotStockInfo[] = [];
  
      // 如果成功獲取了台積電數據
      if (tsmc.latestPrice) {
        hotStocks.push({
          symbol: "2330",
          name: "台積電",
          price: tsmc.latestPrice,
          change: tsmc.latestPrice * (tsmc.changePercent || 0) / 100,
          changePercent: tsmc.changePercent || 0,
          singleVolume: 6831,
          totalVolume: 36809,
          isPositiveChange: tsmc.isPositiveChange
        });
      }
  
      // 如果成功獲取了聯發科數據
      if (mediatek.latestPrice) {
        hotStocks.push({
          symbol: "2454",
          name: "聯發科",
          price: mediatek.latestPrice,
          change: mediatek.latestPrice * (mediatek.changePercent || 0) / 100,
          changePercent: mediatek.changePercent || 0,
          singleVolume: 982,
          totalVolume: 5866,
          isPositiveChange: mediatek.isPositiveChange
        });
      }
  
      // 如果成功獲取了鴻海數據
      if (hon_hai.latestPrice) {
        hotStocks.push({
          symbol: "2317",
          name: "鴻海",
          price: hon_hai.latestPrice,
          change: hon_hai.latestPrice * (hon_hai.changePercent || 0) / 100,
          changePercent: hon_hai.changePercent || 0,
          singleVolume: 3256,
          totalVolume: 42315,
          isPositiveChange: hon_hai.isPositiveChange
        });
      }
  
      // 如果成功獲取了聯電數據
      if (umc.latestPrice) {
        hotStocks.push({
          symbol: "2303",
          name: "聯電",
          price: umc.latestPrice,
          change: umc.latestPrice * (umc.changePercent || 0) / 100,
          changePercent: umc.changePercent || 0,
          singleVolume: 2507,
          totalVolume: 38621,
          isPositiveChange: umc.isPositiveChange
        });
      }
  
      // 如果成功獲取了華碩數據
      if (asus.latestPrice) {
        hotStocks.push({
          symbol: "2357",
          name: "華碩",
          price: asus.latestPrice,
          change: asus.latestPrice * (asus.changePercent || 0) / 100,
          changePercent: asus.changePercent || 0,
          singleVolume: 1682,
          totalVolume: 12543,
          isPositiveChange: asus.isPositiveChange
        });
      }
  
      // 如果至少獲取了一支股票的數據
      if (hotStocks.length > 0) {
        return hotStocks;
      }
    } catch (error) {
      console.error("獲取真實股票數據失敗，使用模擬數據", error);
    }
  } else if (type === 'instant') {
    // 瞬間量 - 使用部分真實股票，部分模擬數據
    return [
      {
        symbol: "2317",
        name: "鴻海",
        price: 149.00,
        change: 1.50,
        changePercent: 1.02,
        singleVolume: 5842, // 較高的單量
        totalVolume: 42315,
        isPositiveChange: true
      },
      {
        symbol: "2308",
        name: "台達電",
        price: 318.50,
        change: -1.50,
        changePercent: -0.47,
        singleVolume: 4982, // 較高的單量
        totalVolume: 15782,
        isPositiveChange: false
      },
      {
        symbol: "2327",
        name: "國巨",
        price: 515.00,
        change: 6.00,
        changePercent: 1.18,
        singleVolume: 4760, // 較高的單量
        totalVolume: 8934,
        isPositiveChange: true
      },
      {
        symbol: "8222",
        name: "賣一",
        price: 65.00,
        change: -1.80,
        changePercent: -2.69,
        singleVolume: 4509,
        totalVolume: 108690,
        isPositiveChange: false
      },
      {
        symbol: "1216",
        name: "統一",
        price: 65.30,
        change: 0.30,
        changePercent: 0.46,
        singleVolume: 3856,
        totalVolume: 25784,
        isPositiveChange: true
      }
    ];
  } else if (type === 'upLimit') {
    // 即將漲停 - 空列表，表示當前無接近漲停股票
    return [];
  } else if (type === 'downLimit') {
    // 即將跌停 - 空列表，表示當前無接近跌停股票
    return [];
  }

  // 默認情況使用原始模擬數據
  const mockHotStocks: HotStockInfo[] = [
    {
      symbol: "2330",
      name: "台積電",
      price: 928.00,
      change: 8.00,
      changePercent: 0.86,
      singleVolume: 6831,
      totalVolume: 36809,
      isPositiveChange: true
    },
    {
      symbol: "3661",
      name: "世芯-KY",
      price: 2230.00,
      change: -45.00,
      changePercent: -1.97,
      singleVolume: 316,
      totalVolume: 3549,
      isPositiveChange: false
    },
    {
      symbol: "2454",
      name: "聯發科",
      price: 1275.00,
      change: -5.00,
      changePercent: -0.39,
      singleVolume: 982,
      totalVolume: 5866,
      isPositiveChange: false
    },
    {
      symbol: "8222",
      name: "賣一",
      price: 65.00,
      change: -1.80,
      changePercent: -2.69,
      singleVolume: 4509,
      totalVolume: 108690,
      isPositiveChange: false
    },
    {
      symbol: "2317",
      name: "鴻海",
      price: 149.00,
      change: 1.50,
      changePercent: 1.02,
      singleVolume: 3256,
      totalVolume: 42315,
      isPositiveChange: true
    }
  ];

  return mockHotStocks;
}

// Example: Function to get information for multiple stocks
export async function getMultipleStocksLatestInfo(symbols: string[]): Promise<Record<string, StockInfo>> {
  const results: Record<string, StockInfo> = {};
  for (const symbol of symbols) {
    results[symbol] = await getStockLatestInfo(symbol);
  }
  return results;
} 