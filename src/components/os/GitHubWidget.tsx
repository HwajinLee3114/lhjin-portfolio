'use client'

import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GitBranch, X } from 'lucide-react'
import { useWidgetStore } from '@/hooks/os/use-widget-store'
import { profile } from '@/data/profile'

type ContributionDay = { date: string; count: number; level: number }

type GitHubData = {
  contributions: ContributionDay[]
  totalContributions: number
  publicRepos: number
}

interface GitHubWidgetProps {
  isOpen: boolean
  onClose: () => void
}

const LEVEL_COLORS = [
  'bg-zinc-100 dark:bg-zinc-700',
  'bg-emerald-200 dark:bg-emerald-900',
  'bg-emerald-400 dark:bg-emerald-700',
  'bg-emerald-500 dark:bg-emerald-500',
  'bg-emerald-700 dark:bg-emerald-400',
]

export function GitHubWidget({ isOpen, onClose }: GitHubWidgetProps) {
  const { widgets, focusWidget, initWidget } = useWidgetStore()
  const widgetId = 'github'

  const [data, setData] = useState<GitHubData | null>(null)
  const x = useMotionValue(180)
  const y = useMotionValue(100)
  const [isMobile, setIsMobile] = useState(false)
  const [width, setWidth] = useState(520)

  useEffect(() => {
    initWidget(widgetId)
  }, [initWidget])

  useEffect(() => {
    if (!isOpen) return
    fetch('/api/github')
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => {})
  }, [isOpen])

  useEffect(() => {
    const w = globalThis.window.innerWidth
    const mobile = w < 768
    setIsMobile(mobile)
    if (mobile) {
      x.set(10)
      y.set(60)
      setWidth(w - 20)
    }
  }, [x, y])

  const zIndex = widgets[widgetId]?.zIndex || 120

  const weeks: ContributionDay[][] = []
  if (data) {
    let currentWeek: ContributionDay[] = []
    data.contributions.forEach((day, i) => {
      const dow = new Date(day.date).getDay()
      if (dow === 0 && i > 0) {
        weeks.push(currentWeek)
        currentWeek = []
      }
      currentWeek.push(day)
    })
    if (currentWeek.length > 0) weeks.push(currentWeek)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          drag={!isMobile}
          dragMomentum={false}
          onPointerDown={() => focusWidget(widgetId)}
          style={{ x, y, position: 'fixed', top: 0, left: 0, zIndex, width }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="pointer-events-auto overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:border-zinc-700 dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <GitBranch size={14} className="text-emerald-500" />
              <span className="text-xs font-black text-zinc-900 dark:text-white">
                GitHub Activity
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="flex h-6 w-6 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <X size={14} />
            </button>
          </div>

          <div className="px-4 pb-4">
            {!data ? (
              <div className="flex items-center justify-center py-6">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-600" />
              </div>
            ) : (
              <>
                <div className="mb-3 flex items-center gap-3 text-[10px] font-bold text-zinc-400">
                  <span>{data.totalContributions} contributions</span>
                  <span>{data.publicRepos} repos</span>
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-emerald-500 hover:underline"
                  >
                    @{profile.social.github.split('/').pop()}
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <div className="flex gap-[2px]">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[2px]">
                        {week.map((day) => (
                          <div
                            key={day.date}
                            title={`${day.date}: ${day.count} contributions`}
                            className={`h-[10px] w-[10px] rounded-sm ${LEVEL_COLORS[day.level] || LEVEL_COLORS[0]}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
