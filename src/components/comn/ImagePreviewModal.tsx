import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImagePreviewModalProps {
  isOpen: boolean;
  imageUrl?: string;
  onClose: (e: React.MouseEvent) => void;
}

export const ImagePreviewModal = ({
  isOpen,
  imageUrl,
  onClose,
}: ImagePreviewModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && imageUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => onClose(e)}
        >
          <motion.img
            src={imageUrl}
            alt=""
            className="max-w-96	"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};
