'use client'

import React from 'react'
import { focusRing } from '@/styles/ui'

interface IconButtonProps {
  onClick?: () => void
  ariaLabel: string
  imgSrc: string
  imgAlt: string
  imgClassName?: string
  className?: string
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  ariaLabel,
  imgSrc,
  imgAlt,
  imgClassName,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center ${focusRing} ${className ?? ''}`}
    >
      <img src={imgSrc} className={imgClassName ?? 'w-6'} alt={imgAlt} />
    </button>
  )
}

export default IconButton
