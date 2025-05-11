from pydantic import BaseModel
from datetime import date

class StockDataPoint(BaseModel):
    date: date
    open: float
    high: float
    low: float
    close: float
    volume: int

class StockHistoryResponse(BaseModel):
    symbol: str
    data: list[StockDataPoint]
    message: str | None = None 