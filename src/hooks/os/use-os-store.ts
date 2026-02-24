import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { initialMemos, MemoData } from '@/data/memos'

export type StickyMemo = MemoData

export type MusicInfo = {
  title: string
  artist: string
  albumArt: string
  isPlaying: boolean
  startTime: string
  endTime: string
  progress: number
  backgroundColor: string
  progressColor: string
  audioUrl: string
  position: { x: number; y: number }
}

type OSStore = {
  stickyMemos: StickyMemo[]
  musicInfo: MusicInfo
  isMusicPlayerOpen: boolean

  addStickyMemo: () => void
  updateStickyMemo: (id: string, patch: Partial<StickyMemo>) => void
  deleteStickyMemo: (id: string) => void

  updateMusic: (info: Partial<MusicInfo>) => void
  toggleMusicPlayer: (open?: boolean) => void
}

export const useOSStore = create<OSStore>()(
  persist(
    (set) => ({
      stickyMemos: initialMemos,
      isMusicPlayerOpen: false,
      musicInfo: {
        title: 'Portfolio BGM',
        artist: 'LHJIN',
        albumArt: '',
        isPlaying: false,
        startTime: '00:00',
        endTime: '00:00',
        progress: 0,
        backgroundColor: 'rgba(255,255,255,0.6)',
        progressColor: '#111827',
        audioUrl: '/music/bgm.mp3',
        position: { x: 800, y: 300 },
      },

      addStickyMemo: () =>
        set((state) => ({
          stickyMemos: [
            ...state.stickyMemos,
            {
              id: `memo-${Date.now()}`,
              content: '',
              color: ['#fef08a', '#bbf7d0', '#bfdbfe', '#fecaca'][Math.floor(Math.random() * 4)],
              position: { x: 300 + Math.random() * 100, y: 150 + Math.random() * 100 },
            },
          ],
        })),

      updateStickyMemo: (id, patch) =>
        set((state) => ({
          stickyMemos: state.stickyMemos.map((m) => (m.id === id ? { ...m, ...patch } : m)),
        })),

      deleteStickyMemo: (id) =>
        set((state) => ({
          stickyMemos: state.stickyMemos.filter((m) => m.id !== id),
        })),

      updateMusic: (info) =>
        set((state) => ({
          musicInfo: { ...state.musicInfo, ...info },
        })),

      toggleMusicPlayer: (open) =>
        set((state) => ({
          isMusicPlayerOpen: open !== undefined ? open : !state.isMusicPlayerOpen,
        })),
    }),
    { name: 'lhjin-portfolio-os' },
  ),
)
