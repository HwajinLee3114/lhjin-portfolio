import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import tw from "tailwind-styled-components";

interface ModalProps {
  isOpen: boolean;
}

const QuoteDiv = tw.div`
  py-1
  pl-4
  mb-4
  border-l-4 border-gray-600
  text-gray-600
`;

export const ProjectDetailModal = ({ isOpen }: ModalProps) => {
  return (
    <AnimatePresence>
      <div className="absolute top-20 right-16 z-10">
        <img src="/images/b2close-100.png" className="w-8" alt="" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-center w-4/5 h-4/5 overflow-y-auto rounded-md shadow-md bg-themacolor1"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <section className="h-full flex flex-col items-center px-10">
          <div className="border-b-2 w-full flex flex-col items-center px-10 py-3">
            <div className="text-2xl font-bold pb-2 text-center">
              여기 제목 어쩌구
            </div>
            <div className="text-gray-600 text-sm md:text-base mb-1 text-center">
              2024.11 ~ 2024.12
            </div>

            <div className="flex flex-row items-center mb-2">
              <img src="/images/js-100.png" className="w-7" alt="" />
              <img src="/images/java-100.png" className="w-7" alt="" />
              <img src="/images/tailwind-100.png" className="w-7" alt="" />
            </div>

            <div>
              여기에 프로젝트 설명 여기에 프로젝트 설명 여기에 프로젝트 설명
              여기에 프로젝트 설명 여기에 프로젝트 설명 여기에 프로젝트 설명
              여기에 프로젝트 설명
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 py-3">
              <a href="#" target="_blank">
                <div className="bg-white rounded-full p-2 hover:shadow-md">
                  <img src="/images/github-100.png" className="w-7" alt="" />
                </div>
              </a>
              <a href="#" target="_blank">
                <div className="bg-white rounded-full p-2.5 shadow-md hover:shadow-lg">
                  <img src="/images/link-100.png" className="w-6" alt="" />
                </div>
              </a>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 items-center px-10 py-3">
            <section className="w-full h-full">
              <div className="flex gap-2 text-xl font-bold text-left mb-5">
                <img src="/images/monitor-100.png" className="w-7" alt="" />
                <div>작업 화면</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                <div className="relative bg-yellow-50 w-[38vw] h-[25vw] sm:w-[22vw] sm:h-[15vw] md:w-[18vw] md:h-[13vw]">
                  <img
                    src=""
                    className="absolute w-full h-full text-transparent object-cover border-stone-400"
                    alt=""
                  />
                </div>
                <div className="relative bg-yellow-50 w-[38vw] h-[25vw] sm:w-[22vw] sm:h-[15vw] md:w-[18vw] md:h-[13vw]">
                  <img
                    src=""
                    className="absolute w-full h-full text-transparent object-cover border-stone-400"
                    alt=""
                  />
                </div>
                <div className="relative bg-yellow-50 w-[38vw] h-[25vw] sm:w-[22vw] sm:h-[15vw] md:w-[18vw] md:h-[13vw]">
                  <img
                    src=""
                    className="absolute w-full h-full text-transparent object-cover border-stone-400"
                    alt=""
                  />
                </div>
                <div className="relative bg-yellow-50 w-[38vw] h-[25vw] sm:w-[22vw] sm:h-[15vw] md:w-[18vw] md:h-[13vw]">
                  <img
                    src=""
                    className="absolute w-full h-full text-transparent object-cover border-stone-400"
                    alt=""
                  />
                </div>
              </div>
            </section>

            <section className="w-full h-full">
              <div className="flex gap-2 text-xl font-bold text-left mb-5">
                <img src="/images/popular-100.png" className="w-7" alt="" />
                <div>주요 기능</div>
              </div>
              <ul className="list-disc pl-3 text-left">
                <li className="text-gray-700 text-base">wer1</li>
                <li className="text-gray-700 text-base">wer2</li>
                <li className="text-gray-700 text-base">wer3</li>
              </ul>
            </section>

            <section className="w-full h-full">
              <div className="flex gap-2 text-xl font-bold text-left mb-5">
                <img src="/images/hand-100.png" className="w-7" alt="" />
                <div>기여 부분</div>
              </div>
            </section>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};
