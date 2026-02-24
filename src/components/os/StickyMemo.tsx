'use client'

import { motion, useMotionValue } from 'framer-motion'
import { GripHorizontal } from 'lucide-react'
import { useEffect } from 'react'

import { useOSStore, StickyMemo as StickyMemoType } from '@/hooks/os/use-os-store'

export function StickyMemo({ memo }: { memo: StickyMemoType }) {
  const { updateStickyMemo } = useOSStore()

  const x = useMotionValue(memo.position.x)
  const y = useMotionValue(memo.position.y)

  useEffect(() => {
    x.set(memo.position.x)
    y.set(memo.position.y)
  }, [memo.position.x, memo.position.y, x, y])

  return (
    <motion.div
      drag
      dragMomentum={false}
      style={{
        x,
        y,
        backgroundColor: memo.color,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      onDragEnd={() => {
        updateStickyMemo(memo.id, {
          position: { x: x.get(), y: y.get() },
        })
      }}
      className="z-0 flex h-60 w-60 rotate-1 cursor-grab flex-col rounded-sm p-6 shadow-lg active:cursor-grabbing transition-shadow hover:shadow-xl"
    >
      <div className="mb-2 flex items-center justify-center opacity-20 group-hover:opacity-40">
        <GripHorizontal size={16} className="text-black" />
      </div>

      <div className="custom-scrollbar w-full flex-1 overflow-auto whitespace-pre-wrap text-[15px] font-bold leading-relaxed text-zinc-800/90 select-none">
        {memo.content}
      </div>

      <div
        className="absolute bottom-0 right-0 h-5 w-5 bg-black/5"
        style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
      />
    </motion.div>
  )
}
