'use client'

import { useEffect, useState } from 'react'

export function StatusBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
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
      <div className="flex items-center gap-4">
        <span className="font-black tracking-tighter text-zinc-900">LHJIN Portfolio OS</span>
        <div className="h-3 w-[1px] bg-zinc-300" />
        <span className="text-zinc-500">이화진 (Frontend Developer)</span>
      </div>

      <div className="flex items-center gap-4">
        <span>{formattedDate}</span>
        <span className="font-bold">{formattedTime}</span>
      </div>
    </header>
  )
}
