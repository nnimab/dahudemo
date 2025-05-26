# 🚀 大戶投Demo - 超簡單部署指南

## 前置準備
1. 一個新的 Google Gemini API 金鑰 ([點此申請](https://makersuite.google.com/app/apikey))
2. DigitalOcean 帳號 (您已有免費額度)

## 5分鐘部署步驟

### 1. 創建 DigitalOcean Droplet
- 地區：**Singapore** (亞洲最近)
- 映像：**Ubuntu 22.04 LTS**
- 規格：**Basic - $12/月 (2GB RAM, 1 vCPU)**
- 認證：上傳您的 SSH 金鑰

### 2. 連接伺服器並執行一鍵安裝
```bash
# SSH 連接到您的伺服器
ssh root@your_droplet_ip

# 下載並執行安裝腳本
curl -sSL https://raw.githubusercontent.com/nnimab/dahudemo/main/deploy-simple.sh | bash

# 重新登入以套用 Docker 權限
logout
ssh root@your_droplet_ip
```

### 3. 部署應用程式
```bash
# 下載專案
git clone https://github.com/nnimab/dahudemo.git
cd dahudemo

# 設定環境變數
cp backend/env.example backend/.env
nano backend/.env
# 在編輯器中填入您的 GEMINI_API_KEY

# 啟動服務
docker-compose up -d

# 設定 Nginx
sudo cp nginx.conf /etc/nginx/sites-available/dahudemo
sudo ln -s /etc/nginx/sites-available/dahudemo /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 4. 完成！
打開瀏覽器訪問：`http://your_droplet_ip`

## 🔧 管理命令

```bash
# 查看服務狀態
docker-compose ps

# 查看日誌
docker-compose logs -f

# 重啟服務
docker-compose restart

# 停止服務
docker-compose down

# 更新代碼
git pull
docker-compose up -d --build
```

## 💰 成本估算
- **Droplet**: $12/月 (2GB RAM)
- **流量**: 免費 1TB/月
- **總成本**: ~$12/月
- **免費額度**: 可用 16+ 個月

## 🆘 故障排除

### 服務無法啟動
```bash
# 檢查 Docker 狀態
sudo systemctl status docker

# 檢查端口佔用
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :8000
```

### API 錯誤
```bash
# 檢查環境變數
cat backend/.env

# 檢查後端日誌
docker-compose logs backend
```

### 無法訪問網站
```bash
# 檢查 Nginx 狀態
sudo systemctl status nginx

# 檢查防火牆
sudo ufw status
sudo ufw allow 80
sudo ufw allow 22
```

## 📱 展示重點
- **智慧小豐**: AI 助手功能
- **市場數據**: 台股即時資訊
- **投資筆記**: 個人筆記管理
- **社群功能**: 投資社群互動

完成後您就有一個完整的台股投資 Demo 網站了！🎉 