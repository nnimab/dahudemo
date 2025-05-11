"use client"

import { useRouter } from "next/navigation"

type NavigationTab = "豐社群" | "豐神榜" | "類股看板"

interface CommunityNavigationProps {
  activeTab: NavigationTab
}

export default function CommunityNavigation({ activeTab }: CommunityNavigationProps) {
  const router = useRouter()

  const navigateTo = (tab: NavigationTab) => {
    switch (tab) {
      case "豐社群":
        router.push("/feng-community")
        break
      case "豐神榜":
        router.push("/feng-community/leaderboard")
        break
      case "類股看板":
        router.push("/feng-community/stock-board")
        break
    }
  }

  return (
    <div className="flex bg-[#111419] border-b border-gray-800">
      {(["豐社群", "豐神榜", "類股看板"] as NavigationTab[]).map((tab) => (
        <div
          key={tab}
          className={`flex-1 py-4 text-center ${
            activeTab === tab
              ? "border-b-2 border-[#daa360] text-[#daa360]"
              : "text-gray-400"
          } cursor-pointer`}
          onClick={() => navigateTo(tab)}
        >
          <span>{tab}</span>
        </div>
      ))}
    </div>
  )
} 