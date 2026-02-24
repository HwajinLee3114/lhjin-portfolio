'use client'

import { AnimatePresence } from 'framer-motion'
import { User, Code, Briefcase, Folder } from 'lucide-react'
import { Suspense } from 'react'

import { DesktopIcon } from './DesktopIcon'
import { Dock } from './Dock'
import { StatusBar } from './StatusBar'
import { WindowFrame } from './WindowFrame'

import About from '@/app/about/page'
import Career from '@/app/career/page'
import HomeSec from '@/app/home/page'
import Skills from '@/app/skills/page'
import ProjectsSection from '@/components/project/ProjectsSection'
import { useWindowStore } from '@/hooks/os/use-window-store'

export function Desktop() {
  const { windows } = useWindowStore()

  const desktopIcons = [
    { id: 'about', title: 'About Me', icon: User },
    { id: 'skills', title: 'Skills', icon: Code },
    { id: 'projects', title: 'Projects', icon: Folder },
    { id: 'career', title: 'Career', icon: Briefcase },
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white select-none">
      {/* OS Layout */}
      <StatusBar />

      {/* Background Content (Home Section) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-100">
        <HomeSec />
      </div>

      {/* Desktop Icons Container */}
      <div className="absolute top-12 right-4 z-10 grid auto-rows-max grid-flow-row gap-2">
        {desktopIcons.map((icon) => (
          <DesktopIcon key={icon.id} {...icon} />
        ))}
      </div>

      {/* Windows Layer */}
      <div className="pointer-events-none relative z-20 h-full w-full">
        <AnimatePresence>
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

      <Dock />

      {/* Overlay for modals or other global UI */}
      <div id="modalTmp" className="z-[2000]"></div>
    </div>
  )
}
