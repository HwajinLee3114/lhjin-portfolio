'use client'

import { User, Code, Briefcase, Folder, LucideIcon } from 'lucide-react'

import { useWindowStore } from '@/hooks/os/use-window-store'
import { cn } from '@/lib/utils'

interface DockItem {
  id: string
  title: string
  icon: LucideIcon
}

const dockItems: DockItem[] = [
  { id: 'about', title: 'About Me', icon: User },
  { id: 'skills', title: 'Skills', icon: Code },
  { id: 'projects', title: 'Projects', icon: Folder },
  { id: 'career', title: 'Career', icon: Briefcase },
]

export function Dock() {
  const { windows, openWindow, focusWindow } = useWindowStore()

  return (
    <div className="fixed bottom-6 left-1/2 z-[1000] flex -translate-x-1/2 items-end gap-2 rounded-[2rem] border border-white/20 bg-white/40 px-3 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-all hover:bg-white/60">
      {dockItems.map((item) => {
        const Icon = item.icon
        const windowState = windows[item.id]
        const isOpen = windowState?.isOpen

        return (
          <button
            key={item.id}
            onClick={() => {
              if (isOpen) {
                focusWindow(item.id)
              } else {
                openWindow(item.id, item.title)
              }
            }}
            className="group relative flex flex-col items-center gap-1 transition-all active:scale-90"
          >
            {/* Tooltip */}
            <div className="pointer-events-none absolute bottom-full mb-4 scale-90 rounded-lg bg-zinc-900/90 px-3 py-1.5 text-[11px] font-black whitespace-nowrap text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
              {item.title}
            </div>

            {/* Icon Container */}
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl shadow-sm transition-all',
                isOpen
                  ? 'bg-white text-zinc-900 shadow-md'
                  : 'bg-zinc-100/50 text-zinc-500 hover:bg-white hover:text-zinc-900',
              )}
            >
              <Icon size={24} strokeWidth={2.5} />
            </div>

            {/* Indicator Dot */}
            {isOpen && (
              <div className="h-1 w-1 rounded-full bg-zinc-900 duration-300 animate-in fade-in zoom-in" />
            )}
          </button>
        )
      })}
    </div>
  )
}
