import { useState } from 'react'
import useBodyScrollLock from './useBodyScrollLock'
import useEscapeKey from './useEscapeKey'

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useBodyScrollLock(isOpen)

  const close = () => {
    setIsOpen(false)
    setActiveId('')
  }

  useEscapeKey(isOpen, close)

  const open = (id: string) => {
    setIsOpen(true)
    setActiveId(id)
  }

  return { isOpen, activeId, open, close }
}
