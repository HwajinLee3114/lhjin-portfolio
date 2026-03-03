'use client'

import { LucideIcon } from 'lucide-react'

import { useWindowStore } from '@/hooks/os/use-window-store'

interface DesktopIconProps {
  id: string
  title: string
  icon: LucideIcon
  singleTapToOpen?: boolean
}

export function DesktopIcon({ id, title, icon: Icon, singleTapToOpen }: DesktopIconProps) {
  const { openWindow, closeWindow, focusWindow, windows } = useWindowStore()

  const handleOpen = () => {
    const windowState = windows[id]
    const isOpen = windowState?.isOpen

    if (isOpen) {
      closeWindow(id)
    } else {
      openWindow(id, title)
      focusWindow(id)
    }
  }

  return (
    <button
      onDoubleClick={handleOpen}
      onClick={() => {
        if (singleTapToOpen) handleOpen()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleOpen()
        }
      }}
      aria-label={`${title} window open`}
      className="group flex w-24 flex-col items-center gap-1 rounded-lg p-2 transition-all hover:bg-black/5 active:bg-black/10"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900/10 text-zinc-900 shadow-sm ring-1 ring-black/10 transition-all group-hover:bg-zinc-900/20">
        <Icon size={32} strokeWidth={2} />
      </div>
      <span className="text-[12px] font-medium text-zinc-900 drop-shadow-sm">{title}</span>
    </button>
  )
}
