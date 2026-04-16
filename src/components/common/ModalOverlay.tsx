'use client'

import React, { useRef } from 'react'
import useFocusTrap from '@/hooks/useFocusTrap'

interface ModalOverlayProps {
  onClose: () => void
  children: React.ReactNode
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose, children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  useFocusTrap(containerRef.current, true)

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full flex flex-col justify-start sm:justify-center items-center bg-black bg-opacity-60 z-[999] overflow-y-auto scrollbar-hide px-4 py-8 sm:py-0"
      onClick={onClose}
      role="presentation"
      tabIndex={-1}
    >
      {children}
    </div>
  )
}

export default ModalOverlay
