#!/bin/bash

echo "🚀 大戶投Demo - DigitalOcean 一鍵部署腳本"
echo "============================================"

# 更新系統
echo "📦 更新系統套件..."
sudo apt update && sudo apt upgrade -y

# 安裝 Docker
echo "🐳 安裝 Docker..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 安裝 Docker Compose
echo "🔧 安裝 Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 將當前用戶加入 docker 群組
sudo usermod -aG docker $USER

# 安裝 Git
echo "📥 安裝 Git..."
sudo apt install -y git

# 安裝 Nginx (用於反向代理)
echo "🌐 安裝 Nginx..."
sudo apt install -y nginx

echo "✅ 基礎環境安裝完成！"
echo ""
echo "🔄 請執行以下命令重新登入以套用 Docker 權限："
echo "logout"
echo ""
echo "然後繼續執行："
echo "git clone https://github.com/nnimab/dahudemo.git"
echo "cd dahudemo"
echo "cp backend/env.example backend/.env"
echo "# 編輯 .env 文件，填入您的 GEMINI_API_KEY"
echo "nano backend/.env"
echo "# 啟動服務"
echo "docker-compose up -d" 