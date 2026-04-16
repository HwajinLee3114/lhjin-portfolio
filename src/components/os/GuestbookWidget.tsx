'use client'

import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { FormEvent, useState, useEffect, useRef, useCallback } from 'react'
import { MessageCircleHeart, Send, X, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWidgetStore } from '@/hooks/os/use-widget-store'
import { supabase } from '@/lib/supabase/client'

type GuestbookEntry = {
  id: string
  name: string
  message: string
  created_at: string
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

const getColor = (id: string) => {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0
  return pastelColors[Math.abs(hash) % pastelColors.length]
}

const formatTimeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function GuestbookWidget({ isOpen, onClose }: GuestbookWidgetProps) {
  const { widgets, focusWidget, initWidget } = useWidgetStore()
  const widgetId = 'guestbook'

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [cooldown, setCooldown] = useState(false)

  const [size, setSize] = useState({ width: 340, height: 460 })
  const [isResizing, setIsResizing] = useState(false)

  const x = useMotionValue(120)
  const y = useMotionValue(60)
  const [isMobile, setIsMobile] = useState(false)
  const wasMobileRef = useRef(false)

  const DEFAULT_SIZE = { width: 340, height: 460 }
  const DEFAULT_POS = { x: 120, y: 60 }

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('portfolio_guestbook')
      .select('id,name,message,created_at')
      .eq('is_visible', true)
      .order('created_at', { ascending: false })
      .limit(50)

    if (!error && data) setEntries(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isOpen) fetchEntries()
  }, [isOpen, fetchEntries])

  useEffect(() => {
    const applyViewportLayout = (w: number) => {
      const nextIsMobile = w < 768
      setIsMobile(nextIsMobile)

      if (nextIsMobile) {
        x.set(20)
        y.set(80)
        setSize({ width: Math.max(280, w - 40), height: 500 })
      } else if (wasMobileRef.current) {
        x.set(DEFAULT_POS.x)
        y.set(DEFAULT_POS.y)
        setSize(DEFAULT_SIZE)
      }

      wasMobileRef.current = nextIsMobile
    }

    const w = globalThis.window.innerWidth
    applyViewportLayout(w)

    const handleResize = () => {
      applyViewportLayout(globalThis.window.innerWidth)
    }

    globalThis.window.addEventListener('resize', handleResize)
    return () => globalThis.window.removeEventListener('resize', handleResize)
  }, [x, y])

  useEffect(() => {
    initWidget(widgetId)
  }, [initWidget])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed || submitting || cooldown) return

    setSubmitting(true)

    const { data, error } = await supabase
      .from('portfolio_guestbook')
      .insert({ name: name.trim() || 'Anonymous', message: trimmed })
      .select('id,name,message,created_at')
      .single()

    if (!error && data) {
      setEntries((prev) => [data, ...prev])
      setMessage('')
      setName('')
      setCooldown(true)
      setTimeout(() => setCooldown(false), 10000)
    }

    setSubmitting(false)
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

  const zIndex = widgets[widgetId]?.zIndex || 120

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          drag={!isResizing && !isMobile}
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="pointer-events-auto flex flex-col overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
        >
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
                  aria-label="작성자 이름"
                  disabled={submitting}
                  className="w-24 rounded-2xl border border-zinc-100 bg-zinc-50 px-3 py-2.5 text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-yellow-400/50 transition-all disabled:opacity-50"
                />
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={60}
                  placeholder="메시지를 남겨주세요!"
                  aria-label="방명록 메시지"
                  disabled={submitting}
                  className="flex-1 rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:ring-2 focus:ring-yellow-400/50 transition-all disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || cooldown}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-3 text-xs font-black text-white shadow-lg shadow-zinc-200 transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : cooldown ? (
                  <span>잠시 후 다시 시도해주세요</span>
                ) : (
                  <>
                    <span>보내기</span>
                    <Send size={14} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 mb-3 flex items-center gap-2 px-1 shrink-0">
              <Sparkles size={12} className="text-yellow-500" />
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.1em]">
                Recent Messages
              </p>
            </div>

            <ul className="custom-scrollbar flex-1 space-y-3 overflow-y-auto pr-1">
              {loading ? (
                <li className="flex items-center justify-center py-8">
                  <Loader2 size={20} className="animate-spin text-zinc-300" />
                </li>
              ) : entries.length === 0 ? (
                <li className="py-8 text-center text-xs text-zinc-400">
                  아직 메시지가 없어요. 첫 번째로 남겨보세요!
                </li>
              ) : (
                entries.map((entry) => (
                  <motion.li
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'rounded-2xl border border-transparent p-4 transition-all hover:shadow-md',
                      getColor(entry.id),
                    )}
                  >
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-black">{entry.name}</span>
                      <span className="text-[9px] font-bold opacity-50 uppercase">
                        {formatTimeAgo(entry.created_at)}
                      </span>
                    </div>
                    <p className="text-xs font-bold leading-relaxed">{entry.message}</p>
                  </motion.li>
                ))
              )}
            </ul>
          </div>

          {!isMobile && (
            <div
              className="absolute bottom-0 right-0 h-6 w-6 cursor-nwse-resize flex items-end justify-end p-1 group/resize"
              onMouseDown={startResize}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover/resize:bg-yellow-400 transition-colors" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
