import yfinance as yf
import pandas as pd
import httpx # 使用 httpx 進行非同步 HTTP 請求
from datetime import date, timedelta, datetime
from fastapi.concurrency import run_in_threadpool
from typing import List, Dict, Any, Optional
from pydantic import BaseModel # 引入 BaseModel
from ..models.stock import StockDataPoint # 假設您的 models 在上一層

# 將 RealtimeIndexInfo 定義為 Pydantic 模型
class RealtimeIndexInfo(BaseModel):
    id: str               # 例如 "tse_t00.tw" 或 "otc_o00.tw"
    name: str             # 指數中文名
    latest_price: float
    change: float
    change_percent: float
    open_price: float
    high_price: float
    low_price: float
    yesterday_price: float
    last_update_time: str # 例如 "13:30:00"
    raw_z: str # 保留原始 z 值，方便調試

class StockService:
    async def get_stock_historical_data(
        self,
        symbol: str,
        period: str | None = "1y",
        start_date: date | None = None,
        end_date: date | None = None
    ) -> list[StockDataPoint]:
        
        ticker_symbol_to_use: str
        period_to_use: str | None = period

        if symbol == "^TWII": # 台灣加權指數特殊處理
            ticker_symbol_to_use = symbol
            if not start_date and not end_date: # 僅當沒有指定日期範圍時，才強制使用較長期間
                period_to_use = "5d" # 獲取最近5天數據以確保能計算漲跌
        else: # 個股處理
            ticker_symbol_to_use = f"{symbol}.TW"
            if not start_date and not end_date and not period_to_use: # 如果都沒有，預設個股一年
                 period_to_use = "1y"

        ticker = yf.Ticker(ticker_symbol_to_use)

        history_df: pd.DataFrame

        def _fetch_history():
            if start_date and end_date:
                return ticker.history(start=start_date.strftime('%Y-%m-%d'), end=(end_date + timedelta(days=1)).strftime('%Y-%m-%d'))
            elif period_to_use:
                return ticker.history(period=period_to_use)
            else: # Fallback, 雖然前面邏輯應該會覆蓋所有情況
                return ticker.history(period="1y")

        history_df = await run_in_threadpool(_fetch_history)

        if history_df.empty:
            return []

        history_df.reset_index(inplace=True)

        if not history_df.empty:
            if not isinstance(history_df['Date'].iloc[0], date):
                # 轉換為 datetime.date 物件，並移除時區信息（如果存在）
                history_df['Date'] = pd.to_datetime(history_df['Date']).dt.tz_localize(None).dt.date
        else:
            return []

        data_points = [
            StockDataPoint(
                date=row['Date'],
                open=row['Open'],
                high=row['High'],
                low=row['Low'],
                close=row['Close'],
                volume=int(row['Volume'])
            )
            for index, row in history_df.iterrows()
            if pd.notna(row['Open']) and pd.notna(row['High']) and pd.notna(row['Low']) and pd.notna(row['Close']) and pd.notna(row['Volume'])
        ]
        return data_points

    async def _fetch_twse_index_data(self, index_channel: str) -> Optional[RealtimeIndexInfo]:
        """輔助方法：從 TWSE MIS API 獲取單一指數的即時數據"""
        url = f"https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch={index_channel}&json=1&delay=0"
        try:
            async with httpx.AsyncClient() as client:
                # MIS API 可能需要特定的 User-Agent 或 Referer，但我們先嘗試直接請求
                # headers = {"User-Agent": "Mozilla/5.0", "Referer": "https://mis.twse.com.tw/"} 
                # response = await client.get(url, headers=headers, timeout=10.0)
                response = await client.get(url, timeout=10.0)
                response.raise_for_status() # 如果 HTTP 狀態碼是 4xx 或 5xx，則拋出異常
                data = response.json()

            if data.get("rtcode") != "0000" or not data.get("msgArray"):
                print(f"Error fetching TWSE index {index_channel}: API rtcode {data.get('rtcode')} or no msgArray")
                return None

            index_data = data["msgArray"][0]
            
            current_price_str = index_data.get("z", "0")
            yesterday_price_str = index_data.get("y", "0")
            open_price_str = index_data.get("o", "0")
            high_price_str = index_data.get("h", "0")
            low_price_str = index_data.get("l", "0")

            # 處理可能的 "-" 或空字串，轉換為 0.0
            current_price = float(current_price_str) if current_price_str and current_price_str != "-" else 0.0
            yesterday_price = float(yesterday_price_str) if yesterday_price_str and yesterday_price_str != "-" else 0.0
            open_price = float(open_price_str) if open_price_str and open_price_str != "-" else 0.0
            high_price = float(high_price_str) if high_price_str and high_price_str != "-" else 0.0
            low_price = float(low_price_str) if low_price_str and low_price_str != "-" else 0.0
            
            change = current_price - yesterday_price
            change_percent = (change / yesterday_price * 100) if yesterday_price != 0 else 0.0

            return RealtimeIndexInfo(
                id=index_data.get("ch", index_channel),
                name=index_data.get("n", "未知指數"),
                latest_price=current_price,
                change=round(change, 2),
                change_percent=round(change_percent, 2),
                open_price=open_price,
                high_price=high_price,
                low_price=low_price,
                yesterday_price=yesterday_price,
                last_update_time=index_data.get("t", "--:--:--"),
                raw_z=current_price_str # 保留原始z值
            )
        except httpx.HTTPStatusError as e:
            print(f"HTTP error fetching {index_channel}: {e.response.status_code} - {e.response.text}")
            return None
        except Exception as e:
            print(f"Error processing TWSE index {index_channel}: {e}")
            return None

    async def get_realtime_market_indices(self) -> List[RealtimeIndexInfo]:
        """獲取加權指數和櫃買指數的即時數據"""
        indices_to_fetch = [
            "tse_t00.tw", # 加權指數
            "otc_o00.tw"  # 櫃買指數
        ]
        
        results: List[RealtimeIndexInfo] = []
        for index_channel in indices_to_fetch:
            index_info = await self._fetch_twse_index_data(index_channel)
            if index_info:
                results.append(index_info)
        
        return results

stock_service = StockService() 