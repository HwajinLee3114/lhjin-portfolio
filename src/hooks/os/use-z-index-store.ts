import { create } from 'zustand'

type ZIndexStore = {
  maxZIndex: number
  getNextZIndex: () => number
}

export const useZIndexStore = create<ZIndexStore>((set, get) => ({
  maxZIndex: 100,
  getNextZIndex: () => {
    const nextZ = get().maxZIndex + 1
    set({ maxZIndex: nextZ })
    return nextZ
  },
}))
