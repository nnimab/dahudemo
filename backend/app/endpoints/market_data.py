from fastapi import APIRouter, HTTPException, Query, Depends
from datetime import date
from typing import Optional, List
import re # 引入 re 模組

# 根據您的專案結構調整 import 路徑
# 假設 services 和 models 與 endpoints 在 app 下的同層目錄
from ..services.stock_service import StockService, stock_service, RealtimeIndexInfo # 引入 StockService 類別和實例，以及 RealtimeIndexInfo
from ..models.stock import StockHistoryResponse, StockDataPoint # StockDataPoint 可以只在 service 層使用，除非端點也直接返回它

router = APIRouter(
    prefix="/v1/market", # 修改前綴，刪除重複的/api
    tags=["market_data"],    # 在 OpenAPI/Swagger UI 中分組
)

# 使用 FastAPI 的 Depends 來注入 service 實例
async def get_stock_service() -> StockService:
    return stock_service

# 更新股票代號的驗證正規表達式，允許 ^ 開頭的指數代號
# 或者只包含英數字的股票代號
VALID_SYMBOL_PATTERN = re.compile(r"^[A-Za-z0-9^][A-Za-z0-9]*$")

@router.get("/indices/realtime", response_model=List[RealtimeIndexInfo]) # 新的端點
async def get_realtime_indices(
    service: StockService = Depends(get_stock_service)
):
    """
    獲取主要市場指數 (例如加權指數、櫃買指數) 的即時數據。
    """
    try:
        indices_data = await service.get_realtime_market_indices()
        if not indices_data:
            # 即使列表為空也算成功，但可能表示後端無法從 TWSE 獲取任何數據
            # 或者可以在 service 層針對性拋出異常，如果完全無法連接 TWSE
            # return [] # 直接返回空列表
            raise HTTPException(status_code=404, detail="無法獲取即時指數數據。")
        return indices_data
    except Exception as e:
        print(f"Error fetching realtime indices data: {e}")
        raise HTTPException(status_code=500, detail=f"獲取即時指數數據時發生內部錯誤: {str(e)}")

@router.get("/{stock_id}/historical", response_model=StockHistoryResponse)
async def get_stock_historical(
    stock_id: str,
    period: Optional[str] = Query("1y", description="例如: 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, ytd, max"),
    start_date: Optional[date] = Query(None, description="YYYY-MM-DD 格式的起始日期"),
    end_date: Optional[date] = Query(None, description="YYYY-MM-DD 格式的結束日期"),
    service: StockService = Depends(get_stock_service) # 注入 service
):
    """
    獲取指定股票或指數的歷史價格數據。
    可以透過 `period` 參數指定期間，或透過 `start_date` 和 `end_date` 指定日期範圍。
    如果同時提供了 `period` 和日期範圍，則優先使用日期範圍。
    股票代號範例: "2330" (台積電)
    指數代號範例: "^TWII" (台灣加權指數)
    """
    # 更新驗證邏輯
    if not VALID_SYMBOL_PATTERN.match(stock_id) or (stock_id.startswith('^') and not stock_id[1:].isalnum()) :
        # 如果以 ^ 開頭，則 ^ 後面的部分必須是字母或數字
        # 如果不以 ^ 開頭，則整個字串必須是字母或數字 (舊的 isalnum() 行為)
        # 更新：更簡單的檢查，如果以^開頭，確保後面還有內容且內容是isalnum。
        # 如果不以^開頭，則整個stock_id必須是isalnum。
        is_valid_format = False
        if stock_id.startswith('^'):
            if len(stock_id) > 1 and stock_id[1:].isalnum():
                is_valid_format = True
        elif stock_id.isalnum():
            is_valid_format = True
        
        if not is_valid_format:
             raise HTTPException(status_code=400, detail="股票/指數代號格式不正確。")

    try:
        if start_date and end_date and start_date > end_date:
            raise HTTPException(status_code=400, detail="起始日期不能晚於結束日期。")
        
        # 呼叫 service 層的 async 方法
        historical_data = await service.get_stock_historical_data(
            symbol=stock_id,
            period=period,
            start_date=start_date,
            end_date=end_date
        )
        
        if not historical_data:
            return StockHistoryResponse(symbol=stock_id, data=[], message="查無此股票/指數代號的歷史數據，或指定期間內無數據。")
            
        return StockHistoryResponse(symbol=stock_id, data=historical_data)
        
    except Exception as e:
        # 這裡可以記錄更詳細的錯誤日誌
        # import logging
        # logging.exception(f"Error fetching stock data for {stock_id}")
        print(f"Error fetching stock data for {stock_id}: {e}") # 簡單打印錯誤到控制台
        raise HTTPException(status_code=500, detail=f"獲取股票/指數數據時發生內部錯誤: {str(e)}") 