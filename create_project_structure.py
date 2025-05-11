import os

def create_file(path):
    """創建空文件"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        pass

def create_project_structure():
    # 前端結構
    frontend_files = [
        # components/common
        "frontend/src/components/common/Button.tsx",
        "frontend/src/components/common/Card.tsx",
        "frontend/src/components/common/Icon.tsx",
        "frontend/src/components/common/LoadingSpinner.tsx",
        
        # components/layout
        "frontend/src/components/layout/BottomNavBar.tsx",
        "frontend/src/components/layout/TopHeader.tsx",
        "frontend/src/components/layout/PageWrapper.tsx",
        
        # components/specific
        "frontend/src/components/specific/SmartAssistantPopup.tsx",
        "frontend/src/components/specific/MarketIndexBar.tsx",
        "frontend/src/components/specific/StockListItem.tsx",
        "frontend/src/components/specific/NewsListItem.tsx",
        "frontend/src/components/specific/AiSummaryButton.tsx",
        "frontend/src/components/specific/FunctionGrid.tsx",
        "frontend/src/components/specific/AccountInfoCard.tsx",
        "frontend/src/components/specific/OrderEntryForm.tsx",
        
        # components/charts
        "frontend/src/components/charts/KLineChart.tsx",
        
        # pages
        "frontend/src/pages/OverviewPage.tsx",
        "frontend/src/pages/StockSelectPage.tsx",
        "frontend/src/pages/OrderEntryPage.tsx",
        "frontend/src/pages/WatchlistPage.tsx",
        "frontend/src/pages/AccountPage.tsx",
        "frontend/src/pages/NewsFeedPage.tsx",
        
        # services
        "frontend/src/services/apiClient.ts",
        
        # contexts (空資料夾)
        "frontend/src/contexts/.gitkeep",
        
        # hooks (空資料夾)
        "frontend/src/hooks/.gitkeep",
        
        # styles
        "frontend/src/styles/global.css",
        "frontend/src/styles/tailwind.config.js",
        
        # assets (空資料夾)
        "frontend/src/assets/.gitkeep",
        
        # root files
        "frontend/src/App.tsx",
        "frontend/src/main.tsx"
    ]
    
    # 後端結構
    backend_files = [
        # api/endpoints
        "backend/app/api/endpoints/assistant.py",
        "backend/app/api/endpoints/summary.py",
        "backend/app/api/endpoints/market_data.py",
        "backend/app/api/deps.py",
        
        # core
        "backend/app/core/config.py",
        
        # services
        "backend/app/services/rag_service.py",
        "backend/app/services/summarization_service.py",
        "backend/app/services/taiwan_stock_service.py",
        "backend/app/services/news_feed_service.py",
        "backend/app/services/llm_interface.py",
        
        # models (空資料夾)
        "backend/app/models/.gitkeep",
        
        # main
        "backend/app/main.py",
        
        # data (空資料夾)
        "backend/data/.gitkeep"
    ]
    
    # 創建所有文件
    for file_path in frontend_files + backend_files:
        create_file(file_path)
        print(f"已創建: {file_path}")

if __name__ == "__main__":
    create_project_structure()
    print("目錄結構已成功創建！") 