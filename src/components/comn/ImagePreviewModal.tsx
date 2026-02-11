import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModalPortal from './ModalPortal'
import ModalOverlay from './ModalOverlay'

interface ImagePreviewModalProps {
  isOpen: boolean
  imageUrl?: string
  onClose: () => void
}

export const ImagePreviewModal = ({ isOpen, imageUrl, onClose }: ImagePreviewModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && imageUrl && (
        <ModalPortal>
          <ModalOverlay onClose={onClose}>
            <div className="relative flex items-center justify-center w-full h-full">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                aria-label="이미지 미리보기 닫기"
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1 rounded-full bg-white/80 dark:bg-[#1f262e]/80 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2"
              >
                <img src="/images/b2close-100.png" className="w-8" alt="닫기" />
              </button>
              <motion.img
                src={imageUrl}
                alt="이미지 미리보기"
                className="cursor-pointer h-auto max-w-xs max-h-80p sm:max-w-lg md:max-w-2xl xl:max-w-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </ModalOverlay>
        </ModalPortal>
      )}
    </AnimatePresence>
  )
}
