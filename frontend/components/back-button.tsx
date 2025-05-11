"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()

  return (
    <button 
      className="flex items-center bg-[#1c1f26] px-3 py-1.5 rounded-full text-gray-300 hover:bg-[#2a2f3a]" 
      onClick={() => router.push('/')}
    >
      <ChevronLeft className="w-5 h-5 mr-1" />
      <span className="text-sm">回大戶投</span>
    </button>
  )
} 