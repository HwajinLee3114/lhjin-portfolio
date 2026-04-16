'use client'

import { FileText } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function StatusBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const update = () => setTime(new Date())
    const msUntilNextMinute = (60 - new Date().getSeconds()) * 1000
    const initialTimer = setTimeout(() => {
      update()
      const interval = setInterval(update, 60000)
      return () => clearInterval(interval)
    }, msUntilNextMinute)
    return () => clearTimeout(initialTimer)
  }, [])

  const formattedTime = time.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const formattedDate = time.toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  })

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] flex h-8 select-none items-center justify-between border-b border-zinc-200/50 bg-white/70 px-4 text-[13px] font-medium text-zinc-700 backdrop-blur-md">
      <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
        <span className="font-black tracking-tighter text-zinc-900 shrink-0">LHJIN OS</span>
        <div className="h-3 w-[1px] bg-zinc-300 shrink-0" />
        <span className="text-zinc-500 truncate">이화진 (Frontend Developer)</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0 pl-2">
        <Link
          href="/resume"
          className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-900"
        >
          <FileText size={12} />
          <span className="hidden sm:inline">이력서</span>
        </Link>
        <div className="h-3 w-[1px] bg-zinc-300" />
        <span className="hidden sm:inline">{formattedDate}</span>
        <span className="font-bold">{formattedTime}</span>
      </div>
    </header>
  )
}
