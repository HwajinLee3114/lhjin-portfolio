import { create } from 'zustand'
import { useZIndexStore } from './use-z-index-store'

const STORAGE_KEY = 'lhjin-os-windows-v2'

const loadWindowsFromStorage = (): Record<string, WindowState> => {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, WindowState>
    return parsed ?? {}
  } catch {
    return {}
  }
}

const persistWindowsToStorage = (windows: Record<string, WindowState>) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(windows))
  } catch {
    // ignore storage errors
  }
}

export type WindowState = {
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number | string; height: number | string }
}

type WindowStore = {
  windows: Record<string, WindowState>
  openWindow: (id: string, title: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updatePosition: (id: string, x: number, y: number) => void
  updateSize: (id: string, width: number, height: number) => void
}

const initialWindows = loadWindowsFromStorage()
const initialMaxZ = Math.max(300, ...Object.values(initialWindows).map((win) => win.zIndex || 0))
useZIndexStore.setState({ windowMaxZIndex: initialMaxZ })

export const useWindowStore = create<WindowStore>((set) => ({
  windows: initialWindows,

  openWindow: (id, title) =>
    set((state) => {
      const nextZ = useZIndexStore.getState().getNextWindowZIndex()
      const isClient = typeof window !== 'undefined'
      const vw = isClient ? window.innerWidth : 1200
      const vh = isClient ? window.innerHeight : 800

      const STATUS_BAR = 32
      const DOCK_AREA = 80
      const availH = vh - STATUS_BAR - DOCK_AREA

      const existing = state.windows[id]
      if (existing) {
        const w = Number(existing.size.width) || 600
        const h = Number(existing.size.height) || 400
        const posX = Math.min(Math.max(0, existing.position.x), Math.max(0, vw - w))
        const posY = Math.min(
          Math.max(STATUS_BAR, existing.position.y),
          Math.max(STATUS_BAR, vh - DOCK_AREA - Math.min(h, 100)),
        )

        return {
          windows: {
            ...state.windows,
            [id]: {
              ...existing,
              isOpen: true,
              isMinimized: false,
              zIndex: nextZ,
              position: { x: posX, y: posY },
            },
          },
        }
      }

      const baseWidth = 1000
      const baseHeight = 700
      const scale = Math.min((vw * 0.85) / baseWidth, (availH * 0.85) / baseHeight, 1)
      const targetWidth = Math.max(320, Math.round(baseWidth * scale))
      const targetHeight = Math.max(240, Math.round(baseHeight * scale))

      const openCount = Object.values(state.windows).filter((w) => w.isOpen).length
      const offset = (openCount % 4) * 24

      const centerX = (vw - targetWidth) / 2
      const centerY = STATUS_BAR + (availH - targetHeight) / 2
      const startX = Math.max(0, Math.min(centerX + offset, vw - targetWidth))
      const startY = Math.max(STATUS_BAR, Math.min(centerY + offset, vh - DOCK_AREA - 100))

      return {
        windows: {
          ...state.windows,
          [id]: {
            id,
            title,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: nextZ,
            position: { x: startX, y: startY },
            size: { width: targetWidth, height: targetHeight },
          },
        },
      }
    }),

  closeWindow: (id) =>
    set((state) => {
      if (!state.windows[id]) return state

      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isOpen: false },
        },
      }
    }),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
    })),

  maximizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized },
      },
    })),

  focusWindow: (id) =>
    set((state) => {
      if (!state.windows[id]) return state
      const nextZ = useZIndexStore.getState().getNextWindowZIndex()
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            zIndex: nextZ,
            isMinimized: false,
          },
        },
      }
    }),

  updatePosition: (id, x, y) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], position: { x, y } },
      },
    })),

  updateSize: (id, width, height) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], size: { width, height } },
      },
    })),
}))

let debounceTimer: ReturnType<typeof setTimeout> | null = null
useWindowStore.subscribe((state) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    persistWindowsToStorage(state.windows)
  }, 400)
})
