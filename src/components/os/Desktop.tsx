'use client'

import { AnimatePresence } from 'framer-motion'
import { User, Code, Briefcase, Folder, Music, Heart, Terminal } from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'

import { DesktopIcon } from './DesktopIcon'
import { Dock } from './Dock'
import { GuestbookWidget } from './GuestbookWidget'
import { MiniTerminalWidget } from './MiniTerminalWidget'
import { MusicPlayer } from './MusicPlayer'
import { StatusBar } from './StatusBar'
import { StickyMemo } from './StickyMemo'
import { WindowFrame } from './WindowFrame'

import About from '@/app/about/page'
import Career from '@/app/career/page'
import HomeSec from '@/app/home/page'
import Skills from '@/app/skills/page'
import ProjectsSection from '@/components/project/ProjectsSection'
import { useOSStore } from '@/hooks/os/use-os-store'
import { useWindowStore } from '@/hooks/os/use-window-store'
import { cn } from '@/lib/utils'

export function Desktop() {
  const { windows, openWindow } = useWindowStore()
  const { stickyMemos, toggleMusicPlayer } = useOSStore()
  const [mounted, setMounted] = useState(false)
  const [singleTapToOpen, setSingleTapToOpen] = useState(false)
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)

    const storeWindows = useWindowStore.getState().windows
    const isAboutOpen = Object.values(storeWindows).some((w) => w.id === 'about' && w.isOpen)

    if (!isAboutOpen) {
      setTimeout(() => {
        openWindow('about', 'About Me')
      }, 500)
    }
  }, [openWindow])

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)')
    const syncTapMode = () => {
      setSingleTapToOpen(media.matches || window.innerWidth < 768)
    }

    syncTapMode()
    media.addEventListener('change', syncTapMode)
    window.addEventListener('resize', syncTapMode)

    return () => {
      media.removeEventListener('change', syncTapMode)
      window.removeEventListener('resize', syncTapMode)
    }
  }, [])

  const desktopIcons = [
    { id: 'about', title: 'About Me', icon: User },
    { id: 'skills', title: 'Skills', icon: Code },
    { id: 'projects', title: 'Projects', icon: Folder },
    { id: 'career', title: 'Career', icon: Briefcase },
  ]

  const widgetIcons = [
    {
      id: 'music-player',
      title: 'Music',
      icon: Music,
      onClick: () => toggleMusicPlayer(),
      color: 'bg-indigo-500 text-white shadow-indigo-100',
    },
    {
      id: 'guestbook',
      title: 'Guestbook',
      icon: Heart,
      onClick: () => setIsGuestbookOpen((prev) => !prev),
      color: 'bg-rose-400 text-white shadow-rose-100',
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: Terminal,
      onClick: () => setIsTerminalOpen((prev) => !prev),
      color: 'bg-zinc-800 text-emerald-400 shadow-zinc-200',
    },
  ]

  if (!mounted) return null

  return (
    <div className="relative h-screen w-full select-none overflow-hidden bg-white">
      <StatusBar />

      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
        <HomeSec />
      </div>

      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="relative h-full w-full pointer-events-auto">
          {stickyMemos.map((memo) => (
            <StickyMemo key={memo.id} memo={memo} />
          ))}
        </div>
      </div>

      <div className="absolute top-12 right-4 z-10 grid auto-rows-max grid-flow-row gap-2">
        {desktopIcons.map((icon) => (
          <DesktopIcon key={icon.id} {...icon} singleTapToOpen={singleTapToOpen} />
        ))}
      </div>

      <div className="absolute top-12 left-4 z-10 flex flex-col gap-4">
        {widgetIcons.map((icon) => (
          <button
            key={icon.id}
            onDoubleClick={icon.onClick}
            onClick={() => {
              if (singleTapToOpen) icon.onClick()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                icon.onClick()
              }
            }}
            aria-label={`${icon.title} widget open`}
            className="group flex w-24 flex-col items-center gap-1 rounded-lg p-2 transition-all hover:bg-black/5 active:bg-black/10"
          >
            <div
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-all group-hover:scale-110',
                icon.color,
              )}
            >
              <icon.icon size={28} strokeWidth={2.5} />
            </div>
            <span className="text-[12px] font-bold text-zinc-800">{icon.title}</span>
          </button>
        ))}
      </div>

      <div className="pointer-events-none relative h-full w-full">
        <AnimatePresence mode="popLayout">
          {Object.values(windows).map((window) => {
            if (!window.isOpen) return null

            return (
              <WindowFrame key={window.id} window={window}>
                <div className="h-full w-full text-zinc-900">
                  {window.id === 'about' && <About />}
                  {window.id === 'skills' && <Skills />}
                  {window.id === 'projects' && (
                    <Suspense
                      fallback={<div className="p-8 text-zinc-500">Loading projects...</div>}
                    >
                      <ProjectsSection />
                    </Suspense>
                  )}
                  {window.id === 'career' && <Career />}
                </div>
              </WindowFrame>
            )
          })}
        </AnimatePresence>
      </div>

      <MusicPlayer />
      <GuestbookWidget isOpen={isGuestbookOpen} onClose={() => setIsGuestbookOpen(false)} />
      <MiniTerminalWidget isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <Dock />

      <div id="modalTmp" className="z-[2000]"></div>
    </div>
  )
}
