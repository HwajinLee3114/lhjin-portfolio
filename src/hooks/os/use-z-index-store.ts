import { create } from 'zustand'

type ZIndexStore = {
  maxZIndex: number
  getNextZIndex: () => number
  windowMaxZIndex: number
  widgetMaxZIndex: number
  getNextWindowZIndex: () => number
  getNextWidgetZIndex: () => number
}

export const useZIndexStore = create<ZIndexStore>((set, get) => ({
  maxZIndex: 300,

  getNextZIndex: () => {
    const nextZ = get().maxZIndex + 1
    set({ maxZIndex: nextZ })
    return nextZ
  },

  windowMaxZIndex: 300,
  widgetMaxZIndex: 300,
  getNextWindowZIndex: () => {
    const nextZ = get().maxZIndex + 1
    set({ maxZIndex: nextZ, windowMaxZIndex: nextZ })
    return nextZ
  },
  getNextWidgetZIndex: () => {
    const nextZ = get().maxZIndex + 1
    set({ maxZIndex: nextZ, widgetMaxZIndex: nextZ })
    return nextZ
  },
}))
