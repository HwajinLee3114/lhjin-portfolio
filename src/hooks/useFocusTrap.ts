import { useEffect } from 'react'

const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

const useFocusTrap = (container: HTMLElement | null, enabled: boolean) => {
  useEffect(() => {
    if (!enabled || !container) return

    const focusables = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (first) first.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (!first || !last) return

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [container, enabled])
}

export default useFocusTrap
