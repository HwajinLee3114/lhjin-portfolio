import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import '@/styles/custom.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'lhjin 이화진 포트폴리오',
  description: '이화진 포트폴리오. lhjin Portfolio',
}

import { useState, useEffect } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (saved) setTheme(saved)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.classList.toggle('dark', theme === 'dark')
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="fixed top-4 right-4 z-50">
          <button
            className="px-4 py-2 rounded bg-themacolor4 text-white dark:bg-darkbg dark:text-darkfg shadow-md transition-colors"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? '라이트모드' : '다크모드'}
          </button>
        </div>
        {children}
      </body>
    </html>
  )
}
