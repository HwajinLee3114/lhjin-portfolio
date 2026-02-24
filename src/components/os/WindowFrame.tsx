'use client'

import { motion } from 'framer-motion'
import { X, Minus, Maximize2, GripHorizontal } from 'lucide-react'
import { ReactNode, useRef, useState, useEffect } from 'react'

import { useWindowStore, WindowState } from '@/hooks/os/use-window-store'
import { cn } from '@/lib/utils'

interface WindowFrameProps {
  window: WindowState
  children: ReactNode
}

export function WindowFrame({ window, children }: WindowFrameProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, updateSize } =
    useWindowStore()

  const [isResizing, setIsResizing] = useState(false)
  const resizeRef = useRef<{
    direction: string
    startX: number
    startY: number
    startWidth: number
    startHeight: number
    startLeft: number
    startTop: number
  } | null>(null)

  const startResize = (e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    resizeRef.current = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: Number(window.size.width),
      startHeight: Number(window.size.height),
      startLeft: window.position.x,
      startTop: window.position.y,
    }
    focusWindow(window.id)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeRef.current) return

      const { direction, startX, startY, startWidth, startHeight, startLeft, startTop } =
        resizeRef.current
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      let newWidth = startWidth
      let newHeight = startHeight
      let newX = startLeft
      let newY = startTop

      const minWidth = 400
      const minHeight = 300

      if (direction.includes('right')) {
        newWidth = Math.max(minWidth, startWidth + dx)
      }
      if (direction.includes('left')) {
        const potentialWidth = startWidth - dx
        if (potentialWidth > minWidth) {
          newWidth = potentialWidth
          newX = startLeft + dx
        }
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(minHeight, startHeight + dy)
      }
      if (direction.includes('top')) {
        const potentialHeight = startHeight - dy
        if (potentialHeight > minHeight) {
          newHeight = potentialHeight
          newY = startTop + dy
        }
      }

      updateSize(window.id, newWidth, newHeight)
      updatePosition(window.id, newX, newY)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      resizeRef.current = null
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, window.id, updateSize, updatePosition])

  if (window.isMinimized) return null

  return (
    <motion.div
      drag={!window.isMaximized && !isResizing}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        updatePosition(
          window.id,
          window.position.x + info.offset.x,
          window.position.y + info.offset.y,
        )
      }}
      onPointerDown={() => focusWindow(window.id)}
      initial={{
        opacity: 0,
        scale: 0.95,
        x: window.position.x,
        y: window.position.y + 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: window.isMaximized ? 0 : window.position.x,
        y: window.isMaximized ? 32 : window.position.y,
        width: window.isMaximized ? '100vw' : window.size.width,
        height: window.isMaximized ? 'calc(100vh - 32px)' : window.size.height,
      }}
      style={{ zIndex: window.zIndex }}
      exit={{
        opacity: 0,
        scale: 0.95,
        y: window.position.y + 20,
        transition: { duration: 0.2 },
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
      className={cn(
        'pointer-events-auto fixed flex flex-col overflow-hidden border border-zinc-200/50 bg-white shadow-2xl',
        window.isMaximized ? 'rounded-none' : 'rounded-2xl',
        isResizing ? 'transition-none select-none' : '',
      )}
    >
      {!window.isMaximized && (
        <>
          <div
            className="absolute top-0 right-0 left-0 z-50 h-1 cursor-ns-resize"
            onMouseDown={(e) => startResize(e, 'top')}
          />
          <div
            className="absolute right-0 bottom-0 left-0 z-50 h-1 cursor-ns-resize"
            onMouseDown={(e) => startResize(e, 'bottom')}
          />
          <div
            className="absolute top-0 bottom-0 left-0 z-50 w-1 cursor-ew-resize"
            onMouseDown={(e) => startResize(e, 'left')}
          />
          <div
            className="absolute top-0 right-0 bottom-0 z-50 w-1 cursor-ew-resize"
            onMouseDown={(e) => startResize(e, 'right')}
          />
        </>
      )}

      <div className="group flex h-10 shrink-0 cursor-default items-center justify-between border-b border-zinc-200/50 bg-zinc-50/80 px-4 backdrop-blur-sm select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeWindow(window.id)
              }}
              className="group/btn flex h-3 w-3 items-center justify-center rounded-full bg-rose-400 transition-colors hover:bg-rose-500"
            >
              <X size={8} className="text-rose-900 opacity-0 group-hover/btn:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                minimizeWindow(window.id)
              }}
              className="group/btn flex h-3 w-3 items-center justify-center rounded-full bg-amber-400 transition-colors hover:bg-amber-500"
            >
              <Minus size={8} className="text-amber-900 opacity-0 group-hover/btn:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                maximizeWindow(window.id)
              }}
              className="group/btn flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400 transition-colors hover:bg-emerald-500"
            >
              <Maximize2
                size={8}
                className="text-emerald-900 opacity-0 group-hover/btn:opacity-100"
              />
            </button>
          </div>
          <span className="ml-2 text-[12px] font-black tracking-widest text-zinc-500 uppercase">
            {window.title}
          </span>
        </div>

        <div className="opacity-0 transition-opacity group-hover:opacity-100">
          <GripHorizontal size={16} className="text-zinc-300" />
        </div>
      </div>

      <div className={cn('relative flex-1 overflow-auto bg-white custom-scrollbar')}>
        {children}
      </div>
    </motion.div>
  )
}
