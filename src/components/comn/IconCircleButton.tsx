'use client'

import React from 'react'
import { focusRing } from '@/styles/ui'

interface IconCircleButtonProps {
  href: string
  ariaLabel: string
  imgSrc: string
  imgAlt: string
  imgClassName?: string
  className?: string
}

const IconCircleButton: React.FC<IconCircleButtonProps> = ({
  href,
  ariaLabel,
  imgSrc,
  imgAlt,
  imgClassName,
  className,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center rounded-full bg-white dark:bg-[#1f262e] shadow-md hover:shadow-lg transition-shadow ${focusRing} ${className ?? ''}`}
    >
      <img src={imgSrc} className={imgClassName ?? 'w-6'} alt={imgAlt} />
    </a>
  )
}

export default IconCircleButton
