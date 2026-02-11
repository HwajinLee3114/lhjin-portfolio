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
            <motion.img
              src={imageUrl}
              alt="이미지 미리보기"
              className="cursor-pointer h-auto max-w-xs max-h-80p sm:max-w-lg md:max-w-2xl xl:max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </ModalOverlay>
        </ModalPortal>
      )}
    </AnimatePresence>
  )
}
