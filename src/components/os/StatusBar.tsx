'use client'

import { FileText, Eye, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export function StatusBar() {
  const [time, setTime] = useState(new Date())
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [menuPos, setMenuPos] = useState({ left: 0 })

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

  useEffect(() => {
    if (!menuOpen) return
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

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

        <div ref={menuRef} className="relative">
          <button
            ref={btnRef}
            onClick={() => {
              if (btnRef.current) {
                setMenuPos({ left: btnRef.current.getBoundingClientRect().left })
              }
              setMenuOpen((v) => !v)
            }}
            className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-900"
          >
            메뉴
            <ChevronDown
              size={10}
              className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {menuOpen && (
            <div
              style={{ left: menuPos.left }}
              className="fixed top-8 z-[1001] w-40 overflow-hidden rounded-lg border border-zinc-200/80 bg-white/95 py-1 shadow-xl backdrop-blur-xl"
            >
              <Link
                href="/resume"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                <FileText size={14} className="text-zinc-400" />
                문서 모드
              </Link>
              <Link
                href="/resume/preview"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                <Eye size={14} className="text-zinc-400" />
                이력서 미리보기
              </Link>
            </div>
          )}
        </div>

        <div className="h-3 w-[1px] bg-zinc-300 shrink-0" />
        <span className="text-zinc-500 truncate hidden sm:inline">이화진 (Frontend Developer)</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0 pl-2">
        <span className="hidden sm:inline">{formattedDate}</span>
        <span className="font-bold">{formattedTime}</span>
      </div>
    </header>
  )
}
