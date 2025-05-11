from fastapi import APIRouter, HTTPException, Query
from datetime import date
from typing import List, Optional

# 根據您的專案結構調整 import 路徑
from ..services.stock_service import stock_service 
from ..models.stock import StockHistoryResponse, StockDataPoint

router = APIRouter(
    prefix="/api/v1/stock",
    tags=["stock_data"], # 在 OpenAPI/Swagger UI 中分組
)

@router.get("/{stock_id}/historical", response_model=StockHistoryResponse)
async def get_stock_historical(
    stock_id: str,
    period: Optional[str] = Query("1y", description="例如: 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, ytd, max"),
    start_date: Optional[date] = Query(None, description="YYYY-MM-DD 格式的起始日期"),
    end_date: Optional[date] = Query(None, description="YYYY-MM-DD 格式的結束日期")
):
    """
    獲取指定股票的歷史價格數據。
    可以透過 `period` 參數指定期間，或透過 `start_date` 和 `end_date` 指定日期範圍。
    如果同時提供了 `period` 和日期範圍，則優先使用日期範圍。
    """
    if not stock_id.isalnum(): # 基本的輸入驗證
        raise HTTPException(status_code=400, detail="股票代號格式不正確。")

    try:
        # 根據是否有日期範圍來決定傳遞給 service 的參數
        if start_date and end_date:
            if start_date > end_date:
                raise HTTPException(status_code=400, detail="起始日期不能晚於結束日期。")
            historical_data = stock_service.get_stock_historical_data(symbol=stock_id, start_date=start_date, end_date=end_date)
        else:
            historical_data = stock_service.get_stock_historical_data(symbol=stock_id, period=period)
        
        if not historical_data:
            return StockHistoryResponse(symbol=stock_id, data=[], message="查無此股票代號的歷史數據，或指定期間內無數據。")
            
        return StockHistoryResponse(symbol=stock_id, data=historical_data)
        
    except Exception as e:
        # 更細緻的錯誤處理可以在 service 層進行，然後 re-raise 特定 HTTP exceptions
        # 例如 yfinance 下載失敗等
        print(f"Error fetching stock data for {stock_id}: {e}") # 在伺服器日誌中記錄錯誤
        raise HTTPException(status_code=500, detail=f"獲取股票數據時發生錯誤: {str(e)}") 