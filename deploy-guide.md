# 大戶投Demo部署指南

## 🚨 部署前必要步驟

### 1. 更換 Google Gemini API 金鑰
原有的 API 金鑰已暴露，請立即：
1. 前往 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 創建新的 API 金鑰
3. 刪除舊的金鑰

### 2. 設定環境變數
複製 `backend/env.example` 為 `backend/.env`：
```bash
cp backend/env.example backend/.env
```

編輯 `.env` 文件，填入新的 API 金鑰：
```
GEMINI_API_KEY=your_new_api_key_here
```

## 🚀 部署選項

### 選項1：雲端平台部署（推薦）

#### 前端部署到 Vercel
1. 推送代碼到 GitHub
2. 連接 Vercel 到您的 GitHub 倉庫
3. 設定環境變數：
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.com`
4. 部署

#### 後端部署到 Railway
1. 前往 [Railway](https://railway.app)
2. 連接 GitHub 倉庫
3. 選擇 `backend` 目錄
4. 設定環境變數：
   - `GEMINI_API_KEY=your_api_key`
5. 部署

### 選項2：Docker 容器化部署

#### 本地測試
```bash
# 設定環境變數
export GEMINI_API_KEY=your_api_key

# 啟動服務
docker-compose up --build
```

#### VPS 部署
1. 租用 VPS（建議台灣機房）
2. 安裝 Docker 和 Docker Compose
3. 上傳代碼到 VPS
4. 設定環境變數
5. 啟動服務：
```bash
docker-compose up -d
```

### 選項3：傳統 VPS 部署

#### 後端部署
```bash
# 安裝 Python 3.11+
cd backend
pip install -r requirements.txt
export GEMINI_API_KEY=your_api_key
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

#### 前端部署
```bash
cd frontend
npm install
npm run build
npm start
```

## 🔧 生產環境配置

### 1. 更新 CORS 設定
編輯 `backend/app/main.py`，更新 `origins` 列表：
```python
origins = [
    "https://your-frontend-domain.com",  # 您的前端域名
    "http://localhost:3000",  # 開發環境
]
```

### 2. 設定反向代理（Nginx）
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📊 監控和維護

### 健康檢查端點
- 前端：`http://your-domain.com`
- 後端：`http://your-domain.com/api/`

### 日誌監控
- 檢查應用程式日誌
- 監控 API 響應時間
- 追蹤錯誤率

## 🔒 安全建議

1. **API 金鑰管理**：使用環境變數，不要硬編碼
2. **HTTPS**：生產環境必須使用 SSL 證書
3. **防火牆**：只開放必要端口
4. **定期更新**：保持依賴套件最新
5. **備份**：定期備份知識庫和配置

## 💰 成本估算

### 免費方案
- Vercel（前端）：免費
- Railway（後端）：免費額度 500 小時/月
- 總成本：$0/月

### 付費方案
- VPS（2核4GB）：約 $10-20/月
- CDN 加速：約 $5-10/月
- 總成本：約 $15-30/月

## 🆘 故障排除

### 常見問題
1. **API 金鑰錯誤**：檢查環境變數設定
2. **CORS 錯誤**：更新 origins 配置
3. **連接超時**：檢查網路和防火牆設定
4. **記憶體不足**：增加 VPS 規格或優化代碼

### 聯繫支援
如遇到問題，請檢查：
1. 應用程式日誌
2. 網路連接
3. 環境變數配置
4. 依賴套件版本 