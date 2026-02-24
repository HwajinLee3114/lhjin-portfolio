import { create } from 'zustand'
import { useZIndexStore } from './use-z-index-store'

export type WidgetState = {
  id: string
  zIndex: number
}

type WidgetStore = {
  widgets: Record<string, WidgetState>
  focusWidget: (id: string) => void
  initWidget: (id: string) => void
}

export const useWidgetStore = create<WidgetStore>((set) => ({
  widgets: {},

  initWidget: (id) =>
    set((state) => {
      if (state.widgets[id]) return state
      const nextZ = useZIndexStore.getState().getNextZIndex()
      return {
        widgets: {
          ...state.widgets,
          [id]: { id, zIndex: nextZ },
        },
      }
    }),

  focusWidget: (id) =>
    set((state) => {
      const nextZ = useZIndexStore.getState().getNextZIndex()
      return {
        widgets: {
          ...state.widgets,
          [id]: { ...state.widgets[id], zIndex: nextZ },
        },
      }
    }),
}))
