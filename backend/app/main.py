from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # 引入 CORSMiddleware
from dotenv import load_dotenv # 新增：匯入 load_dotenv
import os # 新增：匯入 os (如果 assistant.py 移除了 os.getenv，這裡確保 main 層級有 os)
# 確保 stock_data 的 import 路徑正確
# 如果您的 routers 目錄與 main.py 在同一層的 app 目錄下，則如下所示
# from .routers import stock_data 
# 如果您的 routers 是一個名為 routers 的 package，且 stock_data.py 在其中
# 並且您的 app 目錄結構是 app -> main.py, app -> routers -> stock_data.py
# 則可能是 from app.routers import stock_data (如果您從 backend 目錄執行 uvicorn)
# 或者，如果 main.py 和 routers 資料夾都在 app 資料夾內
# from .routers import stock_data # 假設 main.py 和 routers 資料夾在同一個 app 資料夾
# 根據您的專案結構調整 import 路徑
# 假設 endpoints 目錄與 main.py 在同一層的 app 目錄下
from .endpoints import market_data # 更改此處以引入 market_data
from .api.endpoints import assistant # 新增：匯入 assistant 路由

# 新增：在應用程式啟動早期載入 .env 檔案
# 這會從 backend/.env 檔案載入變數 (如果 uvicorn 是從 backend 的上一層目錄執行的)
# 或者從 backend/app/.env (如果 uvicorn 的工作目錄是 backend/app)
# 為了確保能找到 backend/.env，我們可以使用基於目前檔案位置的相對路徑

# 假設 .env 檔案位於 backend 資料夾根目錄 (與 app 資料夾同級)
# __file__ 是目前 main.py 的路徑
# os.path.dirname(__file__) 是 app 資料夾的路徑
# os.path.join(os.path.dirname(__file__), '..', '.env') 會指向 backend/.env

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

# 現在可以檢查 GEMINI_API_KEY 是否已載入 (用於調試或早期檢查)
# print(f"GEMINI_API_KEY from main.py: {os.getenv('GEMINI_API_KEY')}") 

app = FastAPI(
    title="大戶投模擬 Demo API",
    description="提供大戶投模擬應用所需的後端 API 服務，包含股市數據等。",
    version="0.1.0",
    # 可以在這裡加入 OpenAPI 的額外資訊
    openapi_tags=[
        {
            "name": "market_data",
            "description": "獲取市場相關數據，例如股票歷史價格。",
        },
        {
            "name": "assistant", # 新增：為 assistant API 加入 tag (可選)
            "description": "與智慧小豐 AI 助手互動。",
        },
        # 如果有其他 tags 也可以定義在這裡
    ]
)

# 設定 CORS
origins = [
    "http://localhost:3000",          # 允許本地開發訪問
    "http://140.118.200.110:3000",  # 允許通過您的網路 IP 訪問 (根據您的情況)
    # 如果您有其他前端來源或部署後的域名，也請加入
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # 允許所有 HTTP 方法
    allow_headers=["*"],  # 允許所有 HTTP 標頭
)

# 包含股市數據路由
# app.include_router(stock_data.router)
# 包含市場數據路由
app.include_router(market_data.router, prefix="/api", tags=["market_data"]) # 為既有路由也加上 /api 前綴並指定 tag

# 新增：包含 assistant 路由，並加上 /api 前綴
app.include_router(assistant.router, prefix="/api", tags=["assistant"])

@app.get("/")
async def read_root():
    return {"message": "歡迎使用大戶投模擬 Demo API v1"}

# 如果您有其他路由或設定，請保留它們 

# 根據您的 00global.md，未來可能會加入 LLM 和新聞 API
# 這裡可以預留 LLM Interface 的引入點 (如果 llm_interface.py 存在於 services)
# from .services import llm_interface # 假設有這個檔案

# 也可以加入設定管理 (如果 config.py 存在於 core)
# from .core import config # 假設有這個檔案 