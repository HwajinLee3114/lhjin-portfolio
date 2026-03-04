import { create } from 'zustand'
import { useZIndexStore } from './use-z-index-store'

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

export const useWindowStore = create<WindowStore>((set) => ({
  windows: {},

  openWindow: (id, title) =>
    set((state) => {
      const existing = state.windows[id]
      const nextZ = useZIndexStore.getState().getNextWindowZIndex()

      if (existing) {
        return {
          windows: {
            ...state.windows,
            [id]: { ...existing, isOpen: true, isMinimized: false, zIndex: nextZ },
          },
        }
      }

      const isClient = typeof window !== 'undefined'
      const wWidth = isClient ? window.innerWidth : 1200
      const wHeight = isClient ? window.innerHeight : 800

      const baseWidth = 1000
      const baseHeight = 700
      const scale = Math.min(wWidth * 0.9 / baseWidth, wHeight * 0.8 / baseHeight, 1)
      const targetWidth = Math.max(320, Math.round(baseWidth * scale))
      const targetHeight = Math.max(240, Math.round(baseHeight * scale))

      const startX = Math.max(0, (wWidth - targetWidth) / 2) + (nextZ % 5) * 20
      const startY = Math.max(0, (wHeight - targetHeight) / 2) + (nextZ % 5) * 20

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
