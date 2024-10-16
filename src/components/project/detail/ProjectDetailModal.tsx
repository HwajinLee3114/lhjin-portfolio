import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tw from "tailwind-styled-components";
import { getProjectById } from "@/data/projects";
import { ImagePreviewModal } from "@/components/comn/ImagePreviewModal";

interface ModalProps {
  isOpen: boolean;
  activeId?: string;
}

const QuoteDiv = tw.div`
  py-1
  pl-4
  mb-4
  border-l-4 border-gray-600
  text-gray-600
  bg-quotecolor
`;

export const ProjectDetailModal = ({ isOpen, activeId }: ModalProps) => {
  const project = activeId ? getProjectById(activeId) : null;
  const [previewImgUrl, setPreviewImgUrl] = useState<string | undefined>(
    undefined
  );

  if (!project) {
    return null;
  }

  const lf_showImgPreview = (imgId: string) => {
    const img = project.images.find((image) => image.id === imgId);
    if (img) {
      setPreviewImgUrl(img.url);
    }
  };

  const closePreview = (e: React.MouseEvent) => {
    setPreviewImgUrl(undefined);
  };

  return (
    <>
      <ImagePreviewModal
        isOpen={!!previewImgUrl}
        imageUrl={previewImgUrl}
        onClose={(e) => {
          e.stopPropagation();
          closePreview(e);
        }}
      />
      <AnimatePresence>
        <div className="absolute top-20 right-16 z-10">
          <img src="/images/b2close-100.png" className="w-8" alt="" />
        </div>
        {isOpen && (
          <motion.div
            key="projectDetailModal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center w-4/5 h-4/5 overflow-y-auto rounded-md shadow-md bg-themacolor1"
            onClick={(e) => e.stopPropagation()} // 모달 클릭 시 이벤트 전파 막기
          >
            <section className="h-full flex flex-col items-center px-10">
              <div className="border-b-2 w-full flex flex-col items-center px-10 py-3">
                <div className="text-2xl font-bold pb-2 text-center">
                  {project.title}
                </div>
                <div className="text-gray-600 text-sm md:text-base mb-1 text-center">
                  {project.period}
                </div>

                <div className="flex flex-row items-center mb-2">
                  {project.skillItem &&
                    project.skillItem.map((skill) => (
                      <img
                        key={`${project.id}_skill_${skill.id}`}
                        src={skill.url}
                        className="w-7"
                        alt={skill.name}
                      />
                    ))}
                </div>

                <div>{project.description}</div>

                <div className="flex flex-col md:flex-row items-center gap-3 py-3">
                  {project.git && (
                    <a href={project.git} target="_blank">
                      <div className="bg-white rounded-full p-2 hover:shadow-md">
                        <img
                          src="/images/tech/github-100.png"
                          className="w-7"
                          alt=""
                        />
                      </div>
                    </a>
                  )}
                  {project.site && (
                    <a href={project.site} target="_blank">
                      <div className="bg-white rounded-full p-2.5 shadow-md hover:shadow-lg">
                        <img
                          src="/images/link-100.png"
                          className="w-6"
                          alt=""
                        />
                      </div>
                    </a>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-3 items-center px-10 py-3">
                {project.images && project.images.length > 0 && (
                  <section className="w-full h-full">
                    <div className="flex gap-2 text-xl font-bold text-left mb-5">
                      <img
                        src="/images/monitor-100.png"
                        className="w-7"
                        alt=""
                      />
                      <div>작업 화면</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center cursor-pointer">
                      {project.images.map((img) => (
                        <div
                          key={`${project.id}_detailImg_${img.id}`}
                          className="relative bg-yellow-50 w-[38vw] h-[25vw] sm:w-[22vw] sm:h-[15vw] md:w-[18vw] md:h-[13vw]"
                          onClick={() => lf_showImgPreview(img.id)}
                        >
                          <img
                            src={img.url}
                            className="absolute w-full h-full text-transparent object-cover border-stone-400"
                            alt={img.name}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section className="w-full h-full">
                  <div className="flex gap-2 text-xl font-bold text-left mb-5">
                    <img src="/images/popular-100.png" className="w-7" alt="" />
                    <div>주요 기능</div>
                  </div>
                  <ul className="list-disc text-left">
                    {project.feature.map((feat, idx) => (
                      <li
                        key={`${project.id}_feat_${idx}`}
                        className="text-gray-700 text-base"
                      >
                        {feat}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="w-full h-full">
                  <div className="flex gap-2 text-xl font-bold text-left mb-5">
                    <img src="/images/hand-100.png" className="w-7" alt="" />
                    <div>기여 부분</div>
                  </div>
                  <ul className="list-disc text-left">
                    {project.contribution.map((contri, index) => (
                      <div
                        key={`${project.id}_contri_${contri.id}`}
                        className="mb-5"
                      >
                        {contri?.title && <QuoteDiv>{contri.title}</QuoteDiv>}
                        {contri.desc.map((condesc, idx) => (
                          <li
                            key={`${contri.id}_contrili_${idx}`}
                            className="text-gray-700 text-base"
                          >
                            {condesc}
                          </li>
                        ))}
                      </div>
                    ))}
                  </ul>
                </section>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
