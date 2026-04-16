import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import ModalPortal from './ModalPortal'

interface ImagePreviewModalProps {
  isOpen: boolean
  imageUrl?: string
  onClose: () => void
}

export const ImagePreviewModal = ({ isOpen, imageUrl, onClose }: ImagePreviewModalProps) => {
  const [scale, setScale] = useState(1)

  const zoomIn = () => setScale((s) => Math.min(2.5, Math.round((s + 0.2) * 10) / 10))
  const zoomOut = () => setScale((s) => Math.max(0.6, Math.round((s - 0.2) * 10) / 10))
  const reset = () => setScale(1)

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && imageUrl && (
        <ModalPortal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex flex-col bg-black/90 backdrop-blur-sm"
            onClick={handleClose}
          >
            <div className="flex shrink-0 items-center justify-end px-4 py-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClose()
                }}
                aria-label="닫기"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center overflow-hidden px-4">
              <motion.img
                src={imageUrl}
                alt="이미지 미리보기"
                className="max-h-[80dvh] max-w-full rounded-lg object-contain shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                style={{ transform: `scale(${scale})` }}
              />
            </div>

            <div className="flex shrink-0 items-center justify-center gap-2 px-4 py-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  zoomOut()
                }}
                aria-label="축소"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <ZoomOut size={16} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  reset()
                }}
                aria-label="원본 크기"
                className="flex h-9 items-center justify-center rounded-xl bg-white/10 px-3 text-xs font-bold text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <RotateCcw size={14} className="mr-1.5" />
                {Math.round(scale * 100)}%
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  zoomIn()
                }}
                aria-label="확대"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  )
}
