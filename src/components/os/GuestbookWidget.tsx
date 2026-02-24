'use client'

import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { FormEvent, useState, useEffect } from 'react'
import { MessageCircleHeart, Send, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWidgetStore } from '@/hooks/os/use-widget-store'

type GuestbookEntry = {
  id: string
  name: string
  message: string
  createdAt: string
  color: string
}

interface GuestbookWidgetProps {
  isOpen: boolean
  onClose: () => void
}

const pastelColors = [
  'bg-pink-50 text-pink-700 border-pink-100',
  'bg-blue-50 text-blue-700 border-blue-100',
  'bg-yellow-50 text-yellow-700 border-yellow-100',
  'bg-emerald-50 text-emerald-700 border-emerald-100',
  'bg-purple-50 text-purple-700 border-purple-100',
]

const initialEntries: GuestbookEntry[] = [
  {
    id: 'seed-1',
    name: '화진',
    message: '방문해주셔서 감사합니다! 💖',
    createdAt: 'just now',
    color: pastelColors[0],
  },
  {
    id: 'seed-2',
    name: '익명',
    message: '심플하게 바꿔봤어요! 😊',
    createdAt: '1m ago',
    color: pastelColors[1],
  },
]

export function GuestbookWidget({ isOpen, onClose }: GuestbookWidgetProps) {
  const { widgets, focusWidget, initWidget } = useWidgetStore()
  const widgetId = 'guestbook'

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries)

  const [size, setSize] = useState({ width: 340, height: 500 })
  const [isResizing, setIsResizing] = useState(false)

  const x = useMotionValue(120)
  const y = useMotionValue(420)

  useEffect(() => {
    initWidget(widgetId)
  }, [initWidget])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed) return

    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)]

    setEntries((prev) => [
      {
        id: `entry-${Date.now()}`,
        name: name.trim() || '익명',
        message: trimmed,
        createdAt: 'just now',
        color: randomColor,
      },
      ...prev,
    ])
    setMessage('')
    setName('')
  }

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    focusWidget(widgetId)

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = size.width
    const startHeight = size.height

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX))
      const newHeight = Math.max(400, startHeight + (moveEvent.clientY - startY))
      setSize({ width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const zIndex = widgets[widgetId]?.zIndex || 2000

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          drag={!isResizing}
          dragMomentum={false}
          onPointerDown={() => focusWidget(widgetId)}
          style={{
            x,
            y,
            position: 'fixed',
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            zIndex,
          }}
          initial={{ opacity: 0, scale: 0.9, y: 450 }}
          animate={{ opacity: 1, scale: 1, y: 420 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="pointer-events-auto flex flex-col overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
        >
          {/* Header */}
          <header className="flex shrink-0 items-center justify-between bg-yellow-400 px-6 py-4 cursor-default">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm">
                <MessageCircleHeart size={18} className="text-pink-500" />
              </div>
              <span className="text-sm font-black uppercase tracking-widest text-zinc-900">
                Guestbook
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="flex h-8 w-8 items-center justify-center rounded-xl transition-colors hover:bg-black/10 active:scale-90"
            >
              <X size={18} className="text-zinc-900" strokeWidth={3} />
            </button>
          </header>

          <div className="flex flex-1 flex-col overflow-hidden p-5">
            <form onSubmit={handleSubmit} className="shrink-0 space-y-3">
              <div className="flex gap-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={10}
                  placeholder="이름"
                  className="w-24 rounded-2xl border border-zinc-100 bg-zinc-50 px-3 py-2.5 text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-yellow-400/50 transition-all"
                />
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={60}
                  placeholder="메시지를 남겨주세요!"
                  className="flex-1 rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-yellow-400/50 transition-all"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-3 text-xs font-black text-white shadow-lg shadow-zinc-200 transition-all hover:bg-zinc-800 active:scale-[0.98]"
              >
                <span>보내기</span>
                <Send size={14} strokeWidth={2.5} />
              </button>
            </form>

            <div className="mt-6 mb-3 flex items-center gap-2 px-1 shrink-0">
              <Sparkles size={12} className="text-yellow-500" />
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.1em]">
                Recent Messages
              </p>
            </div>

            <ul className="custom-scrollbar flex-1 space-y-3 overflow-y-auto pr-1">
              {entries.map((entry) => (
                <motion.li
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'rounded-2xl border border-transparent p-4 transition-all hover:shadow-md',
                    entry.color,
                  )}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-black">{entry.name}</span>
                    <span className="text-[9px] font-bold opacity-50 uppercase">
                      {entry.createdAt}
                    </span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">{entry.message}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          <div
            className="absolute bottom-0 right-0 h-6 w-6 cursor-nwse-resize flex items-end justify-end p-1 group/resize"
            onMouseDown={startResize}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover/resize:bg-yellow-400 transition-colors" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
