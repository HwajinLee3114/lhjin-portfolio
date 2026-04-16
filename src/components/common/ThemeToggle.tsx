'use client'

import React, { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'custom'

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) {
      setTheme(saved)
      return
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('theme-custom', theme === 'custom')
    localStorage.setItem('theme', theme)
  }, [theme])

  const isDark = theme === 'dark'
  const isCustom = theme === 'custom'
  const nextTheme = isDark ? 'light' : isCustom ? 'dark' : 'custom'

  return (
    <button
      type="button"
      aria-label="테마 전환"
      aria-pressed={isDark || isCustom}
      onClick={() => setTheme(nextTheme)}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-themacolor4/40 text-themacolor4 bg-white/70 hover:bg-themacolor4 hover:text-white transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2 dark:bg-darkbg dark:text-darkfg dark:border-darkfg/30"
      title={isCustom ? '커스텀 모드' : isDark ? '라이트 모드' : '커스텀 모드'}
    >
      {isCustom ? (
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3a9 9 0 1 0 9 9 1 1 0 1 0-2 0 7 7 0 1 1-7-7 1 1 0 0 0 0-2Z"
          />
        </svg>
      ) : isDark ? (
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 4.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 12 4.75Zm0 14a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 12 18.75Zm7.25-6.75a.75.75 0 0 1 .75-.75v.5a.75.75 0 1 1-1.5 0v-.5a.75.75 0 0 1 .75.75ZM4.75 12a.75.75 0 0 1 .75-.75H6a.75.75 0 1 1 0 1.5h-.5A.75.75 0 0 1 4.75 12ZM6.47 6.47a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 1 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06Zm9.65 9.65a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 1 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06Zm0-9.65a.75.75 0 0 1 0 1.06l-.35.35a.75.75 0 1 1-1.06-1.06l.35-.35a.75.75 0 0 1 1.06 0Zm-9.65 9.65a.75.75 0 0 1 0 1.06l-.35.35a.75.75 0 1 1-1.06-1.06l.35-.35a.75.75 0 0 1 1.06 0ZM12 7.25A4.75 4.75 0 1 0 12 16.75 4.75 4.75 0 0 0 12 7.25Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M14.5 2.75a.75.75 0 0 1 .75.75c0 6.075-4.925 11-11 11a.75.75 0 0 1-.53-1.28A8.5 8.5 0 1 0 14.5 2.75Z"
          />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
