'use client'

import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { Music2, Play, Pause, SkipBack, SkipForward, X, GripHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useOSStore } from '@/hooks/os/use-os-store'
import { useWidgetStore } from '@/hooks/os/use-widget-store'

export function MusicPlayer() {
  const { widgets, focusWidget, initWidget } = useWidgetStore()
  const widgetId = 'music-player'

  const { musicInfo, updateMusic, isMusicPlayerOpen, toggleMusicPlayer } = useOSStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioAvailable, setAudioAvailable] = useState(Boolean(musicInfo.audioUrl))

  const x = useMotionValue(musicInfo.position?.x ?? 800)
  const y = useMotionValue(musicInfo.position?.y ?? 300)

  useEffect(() => {
    initWidget(widgetId)
  }, [initWidget])

  useEffect(() => {
    if (musicInfo.position) {
      x.set(musicInfo.position.x)
      y.set(musicInfo.position.y)
    }
  }, [musicInfo.position, x, y])

  useEffect(() => {
    setAudioAvailable(Boolean(musicInfo.audioUrl))
    if (!audioRef.current || !musicInfo.audioUrl) return
    audioRef.current.src = musicInfo.audioUrl
  }, [musicInfo.audioUrl])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !musicInfo.audioUrl || !audioAvailable) return
    if (musicInfo.isPlaying) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [musicInfo.isPlaying, musicInfo.audioUrl, audioAvailable])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const formatTime = (totalSeconds: number) => {
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = Math.floor(totalSeconds % 60)
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    const handleTimeUpdate = () => {
      const current = audio.currentTime || 0
      const duration = audio.duration || 0
      const progress = duration ? Math.min(100, (current / duration) * 100) : 0
      updateMusic({
        startTime: formatTime(current),
        endTime: duration ? formatTime(duration) : musicInfo.endTime,
        progress: Math.round(progress),
      })
    }

    const handleEnded = () => {
      updateMusic({ isPlaying: false })
    }

    const handleError = () => {
      setAudioAvailable(false)
      updateMusic({
        startTime: '00:00',
        endTime: '00:00',
        progress: 0,
      })
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [musicInfo.endTime, updateMusic])

  const zIndex = widgets[widgetId]?.zIndex || 2000

  return (
    <AnimatePresence>
      {isMusicPlayerOpen && (
        <motion.div
          drag
          dragMomentum={false}
          onPointerDown={() => focusWidget(widgetId)}
          style={{
            x,
            y,
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: musicInfo.backgroundColor ?? 'rgba(255,255,255,0.6)',
            zIndex
          }}
          onDragEnd={() => {
            updateMusic({ position: { x: x.get(), y: y.get() } })
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="pointer-events-auto z-[2000] w-[340px] select-none rounded-[2.5rem] border border-white/40 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.25)] backdrop-blur-3xl group cursor-grab active:cursor-grabbing"
        >
          <audio ref={audioRef} />
          <div className="absolute top-4 left-1/2 flex h-4 w-12 -translate-x-1/2 items-center justify-center opacity-40 group-hover:opacity-100">
            <GripHorizontal size={16} className="text-zinc-400" />
          </div>

          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                toggleMusicPlayer(false)
              }}
              className="rounded-full p-2 transition-all hover:bg-black/5 active:scale-90"
            >
              <X size={18} className="text-zinc-400" />
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: musicInfo.isPlaying ? 360 : 0 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="h-48 w-48 overflow-hidden rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] ring-[12px] ring-white/30"
              >
                {musicInfo.albumArt ? (
                  <img
                    src={musicInfo.albumArt}
                    alt="Album Art"
                    className="h-full w-full scale-110 object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-200/70 text-zinc-500">
                    <Music2 size={48} />
                  </div>
                )}
              </motion.div>
              <div className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black/5 bg-[#f8f9fa] shadow-inner" />
            </div>

            <div className="mb-8 w-full text-center">
              <h3 className="mb-1 truncate text-2xl font-[900] tracking-tighter text-zinc-900">
                {musicInfo.title}
              </h3>
              <p className="text-sm font-bold tracking-widest text-zinc-400/80 uppercase">
                {musicInfo.artist}
              </p>
            </div>

            <div className="mb-10 flex items-center gap-10">
              <button className="text-zinc-300 transition-all hover:text-zinc-900 active:scale-75">
                <SkipBack size={28} fill="currentColor" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  updateMusic({ isPlaying: !musicInfo.isPlaying })
                }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-white shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all hover:scale-110 active:scale-90"
              >
                {musicInfo.isPlaying ? (
                  <Pause size={32} fill="currentColor" />
                ) : (
                  <Play size={32} fill="currentColor" className="ml-1.5" />
                )}
              </button>
              <button className="text-zinc-300 transition-all hover:text-zinc-900 active:scale-75">
                <SkipForward size={28} fill="currentColor" />
              </button>
            </div>

            <div className="w-full space-y-3">
              <div
                className="relative h-2 w-full cursor-pointer overflow-hidden rounded-full bg-zinc-200/50"
                onClick={(event) => {
                  event.stopPropagation()
                  const rect = event.currentTarget.getBoundingClientRect()
                  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
                  const audio = audioRef.current
                  if (audio && audio.duration) {
                    audio.currentTime = ratio * audio.duration
                  }
                }}
              >
                <motion.div
                  animate={{
                    width: `${typeof musicInfo.progress === 'number' ? musicInfo.progress : 60}%`,
                  }}
                  className="absolute top-0 left-0 h-full shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                  style={{ backgroundColor: musicInfo.progressColor ?? '#111827' }}
                />
              </div>
              <div className="flex w-full justify-between text-[11px] font-black tabular-nums text-zinc-400">
                <span>{musicInfo.startTime || '00:00'}</span>
                <span>{musicInfo.endTime || '00:00'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
