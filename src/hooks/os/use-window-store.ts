/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'

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
  maxZIndex: number
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
  maxZIndex: 10,

  openWindow: (id, title) =>
    set((state) => {
      const existing = state.windows[id]
      const nextZ = state.maxZIndex + 1

      if (existing) {
        return {
          windows: {
            ...state.windows,
            [id]: { ...existing, isOpen: true, isMinimized: false, zIndex: nextZ },
          },
          maxZIndex: nextZ,
        }
      }

      // Default initial state for new windows
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
            position: { x: 100 + nextZ * 5, y: 50 + nextZ * 5 },
            size: { width: 1000, height: 700 },
          },
        },
        maxZIndex: nextZ,
      }
    }),

  closeWindow: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.windows
      return { windows: rest }
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
      const nextZ = state.maxZIndex + 1
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            zIndex: nextZ,
            isMinimized: false, // Ensure it's no longer minimized when focused
          },
        },
        maxZIndex: nextZ,
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
