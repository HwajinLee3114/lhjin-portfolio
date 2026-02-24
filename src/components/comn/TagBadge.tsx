'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface TagBadgeProps {
  name: string
  color: string
  txtcolor?: string
  className?: string
}

const TagBadge: React.FC<TagBadgeProps> = ({ name, color, className }) => {
  return (
    <span
      className={cn(
        'text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider',
        className,
      )}
      style={{
        backgroundColor: color + '15',
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {name}
    </span>
  )
}

export default TagBadge
