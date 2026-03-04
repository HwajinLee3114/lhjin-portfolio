/**
 * @jest-environment jsdom
 */

import { useWindowStore } from '@/hooks/os/use-window-store'
import { useZIndexStore } from '@/hooks/os/use-z-index-store'

describe('useWindowStore', () => {
  beforeEach(() => {
    useWindowStore.setState({ windows: {} })
    useZIndexStore.setState({ windowMaxZIndex: 300, widgetMaxZIndex: 100 })

    Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true })
  })

  test('openWindow scales size based on viewport', () => {
    useWindowStore.getState().openWindow('about', 'About Me')
    const win = useWindowStore.getState().windows.about

    expect(win).toBeDefined()
    expect(typeof win.size.width).toBe('number')
    expect(typeof win.size.height).toBe('number')

    const expectedScale = Math.min((800 * 0.9) / 1000, (600 * 0.8) / 700, 1)
    const expectedWidth = Math.max(320, Math.round(1000 * expectedScale))
    const expectedHeight = Math.max(240, Math.round(700 * expectedScale))

    expect(win.size.width).toBe(expectedWidth)
    expect(win.size.height).toBe(expectedHeight)
  })

  test('reopen clears minimized state', () => {
    useWindowStore.getState().openWindow('about', 'About Me')
    useWindowStore.getState().minimizeWindow('about')
    useWindowStore.getState().openWindow('about', 'About Me')

    const win = useWindowStore.getState().windows.about
    expect(win.isOpen).toBe(true)
    expect(win.isMinimized).toBe(false)
  })
})
