import { create } from 'zustand'

type ZIndexStore = {
  windowMaxZIndex: number
  widgetMaxZIndex: number
  getNextWindowZIndex: () => number
  getNextWidgetZIndex: () => number
}

export const useZIndexStore = create<ZIndexStore>((set, get) => ({
  windowMaxZIndex: 300,
  widgetMaxZIndex: 100,
  getNextWindowZIndex: () => {
    const nextZ = get().windowMaxZIndex + 1
    set({ windowMaxZIndex: nextZ })
    return nextZ
  },
  getNextWidgetZIndex: () => {
    const nextZ = get().widgetMaxZIndex + 1
    set({ widgetMaxZIndex: nextZ })
    return nextZ
  },
}))
