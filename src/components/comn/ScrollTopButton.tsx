'use client'

import React, { useEffect, useState } from 'react'

const ScrollTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-themacolor4 text-white shadow-lg hover:shadow-xl transition-all"
    >
      ↑
    </button>
  )
}

export default ScrollTopButton
