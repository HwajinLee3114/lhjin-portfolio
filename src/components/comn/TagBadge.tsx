'use client'

import React from 'react'

interface TagBadgeProps {
  name: string
  color: string
  txtcolor?: string
}

const TagBadge: React.FC<TagBadgeProps> = ({ name, color, txtcolor }) => {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-lg"
      style={{ backgroundColor: color, color: txtcolor ?? '#ffffff' }}
    >
      {name}
    </span>
  )
}

export default TagBadge
