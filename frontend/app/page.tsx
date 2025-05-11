"use client"

import { useState } from "react"
import BottomNavigation from "@/components/bottom-navigation"
import OverviewPage from "@/components/overview-page"
import StockSelectionPage from "@/components/stock-selection-page"
import FavoritesPage from "@/components/favorites-page"
import AccountPage from "@/components/account-page"
import TaiwanStockOptionsPage from "@/components/taiwan-stock-options-page"
import OverseasPage from "@/components/overseas-page"
import FundsPage from "@/components/funds-page"

export default function Home() {
  const [activePage, setActivePage] = useState("overview")
  const [activeTab, setActiveTab] = useState("taiwan")

  return (
    <main className="flex min-h-screen flex-col bg-[rgb(17,20,27)]">
      <div className="flex-1 pb-16">
        {activePage === "overview" && (
          <>
            {activeTab === "taiwan" && <OverviewPage setActiveTab={setActiveTab} activeTab={activeTab} />}
            {activeTab === "options" && <TaiwanStockOptionsPage setActiveTab={setActiveTab} activeTab={activeTab} />}
            {activeTab === "overseas" && <OverseasPage setActiveTab={setActiveTab} activeTab={activeTab} />}
            {activeTab === "funds" && <FundsPage setActiveTab={setActiveTab} activeTab={activeTab} />}
          </>
        )}
        {activePage === "stocks" && <StockSelectionPage />}
        {activePage === "order" && <div className="flex items-center justify-center h-full">Order Entry Page</div>}
        {activePage === "favorites" && <FavoritesPage />}
        {activePage === "account" && <AccountPage />}
      </div>

      <BottomNavigation activePage={activePage} setActivePage={setActivePage} />
    </main>
  )
}
