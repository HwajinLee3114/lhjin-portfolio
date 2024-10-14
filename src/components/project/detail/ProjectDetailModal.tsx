import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
}

export const ProjectDetailModal = ({ isOpen }: ModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="">
          <section className="">
            <div>여기 제목 어쩌구</div>
            <ul>
              <li>dsfsd1</li>
              <li>dsfsd2</li>
              <li>dsfsd3</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
