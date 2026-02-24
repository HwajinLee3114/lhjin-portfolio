'use client'

import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { GripHorizontal, Terminal, X } from 'lucide-react'

import { useWindowStore } from '@/hooks/os/use-window-store'
import { useWidgetStore } from '@/hooks/os/use-widget-store'

interface MiniTerminalWidgetProps {
  isOpen: boolean
  onClose: () => void
}

const WINDOW_MAP: Record<string, { id: string; title: string }> = {
  about: { id: 'about', title: 'About Me' },
  skills: { id: 'skills', title: 'Skills' },
  projects: { id: 'projects', title: 'Projects' },
  career: { id: 'career', title: 'Career' },
}

const ORDERED_WINDOWS = ['about', 'skills', 'projects', 'career']

export function MiniTerminalWidget({ isOpen, onClose }: MiniTerminalWidgetProps) {
  const { widgets, focusWidget, initWidget } = useWidgetStore()
  const widgetId = 'terminal'

  const { openWindow, focusWindow } = useWindowStore()
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<string[]>([
    'Mini Terminal ready. type `help`',
    'commands: help, about, skills, projects, career, open 3, clear, exit',
  ])
  const endRef = useRef<HTMLDivElement | null>(null)

  const x = useMotionValue(520)
  const y = useMotionValue(130)

  useEffect(() => {
    initWidget(widgetId)
  }, [initWidget])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const append = (...nextLines: string[]) => {
    setLines((prev) => [...prev, ...nextLines])
  }

  const launchWindow = (target: string) => {
    const win = WINDOW_MAP[target]
    if (!win) return false
    openWindow(win.id, win.title)
    focusWindow(win.id)
    append(`opened ${win.id}`)
    return true
  }

  const runCommand = (raw: string) => {
    const command = raw.trim()
    if (!command) return

    append(`$ ${command}`)
    const [head, ...args] = command.toLowerCase().split(/\s+/)

    if (head === 'help') {
      append(
        'help: show command list',
        'about|skills|projects|career: open section window',
        'open <name|index>: ex) open projects, open 3',
        'clear: clear terminal logs',
        'exit: close terminal widget',
      )
      return
    }

    if (head === 'clear') {
      setLines([])
      return
    }

    if (head === 'exit') {
      onClose()
      return
    }

    if (head === 'open') {
      const arg = args[0]
      if (!arg) {
        append('usage: open <name|index>')
        return
      }

      if (/^\d+$/.test(arg)) {
        const idx = Number(arg) - 1
        const section = ORDERED_WINDOWS[idx]
        if (!section) {
          append(`unknown index: ${arg}`)
          return
        }
        launchWindow(section)
        return
      }

      if (!launchWindow(arg)) {
        append(`unknown target: ${arg}`)
      }
      return
    }

    if (!launchWindow(head)) {
      append(`unknown command: ${head}`)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    runCommand(input)
    setInput('')
  }

  const zIndex = widgets[widgetId]?.zIndex || 2000

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          drag
          dragMomentum={false}
          onPointerDown={() => focusWidget(widgetId)}
          style={{ x, y, position: 'fixed', top: 0, left: 0, zIndex }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="pointer-events-auto z-[2000] w-[440px] overflow-hidden rounded-2xl border border-zinc-800 bg-[#0f1115] text-zinc-100 shadow-[0_35px_90px_rgba(0,0,0,0.35)]"
        >
          <header className="flex items-center justify-between border-b border-zinc-700 bg-zinc-900/70 px-4 py-2">
            <div className="flex items-center gap-2">
              <Terminal size={15} />
              <span className="text-xs font-black uppercase tracking-wide">Mini Terminal</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
            >
              <X size={14} />
            </button>
          </header>

          <div className="flex items-center justify-center py-1 text-zinc-500">
            <GripHorizontal size={14} />
          </div>

          <div className="custom-scrollbar h-64 overflow-y-auto px-4 pb-3 pt-1 text-xs leading-5">
            {lines.map((line, idx) => (
              <p key={`${line}-${idx}`} className="font-mono text-zinc-200">
                {line}
              </p>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-zinc-700 bg-zinc-900/60 p-3">
            <label className="flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-400">$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type command..."
                className="w-full bg-transparent font-mono text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
              />
            </label>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
