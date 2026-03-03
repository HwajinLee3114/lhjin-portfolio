import { RefObject, useEffect } from 'react'

export function useOutsideClick(ref: RefObject<HTMLElement>, handler: () => void, active = true) {
  useEffect(() => {
    if (!active) return

    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, active])
}
