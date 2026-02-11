import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImagePreviewModalProps {
  isOpen: boolean
  imageUrl?: string
  onClose: (e: React.MouseEvent) => void
}

export const ImagePreviewModal = ({ isOpen, imageUrl, onClose }: ImagePreviewModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && imageUrl && (
        <div
          key="imagePreviewModal"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => onClose(e)}
        >
          <motion.img
            src={imageUrl}
            alt=""
            className="cursor-pointer h-auto max-w-xs max-h-80p sm:max-w-lg md:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
