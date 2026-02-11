import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import tw from 'tailwind-styled-components'

import { getProjectById } from '@/data/projects'
import { ImagePreviewModal } from '@/components/comn/ImagePreviewModal'
import { formatPeriod } from '@/lib/period'
import IconCircleButton from '@/components/comn/IconCircleButton'
import IconButton from '@/components/comn/IconButton'

interface ModalProps {
  isOpen: boolean
  activeId?: string
  onClose?: () => void
}

const QuoteDiv = tw.div`
  py-1
  pl-4
  mb-4
  border-l-4 border-gray-600
  text-gray-600
  bg-quotecolor
  dark:border-darkfg/40
  dark:text-darkfg/80
  dark:bg-[#273038]
`

export const ProjectDetailModal = ({ isOpen, activeId, onClose }: ModalProps) => {
  const project = activeId ? getProjectById(activeId) : null
  const [previewImgUrl, setPreviewImgUrl] = useState<string | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<string>('pj-info')
  const containerRef = useRef<HTMLDivElement | null>(null)

  if (!project) {
    return null
  }

  const lf_showImgPreview = (imgUrl: string) => {
    // const img = project.images.find((image) => image.id === imgId);
    if (imgUrl) {
      setPreviewImgUrl(`/images/project/${imgUrl}`)
    }
  }

  const closePreview = () => {
    setPreviewImgUrl(undefined)
  }

  useEffect(() => {
    if (!isOpen || !containerRef.current) return
    const targets = ['pj-info', 'pj-feature', 'pj-contrib', 'pj-images']
      .map((id) => containerRef.current?.querySelector(`#${id}`))
      .filter(Boolean) as HTMLElement[]

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveTab(visible[0].target.id)
      },
      { root: containerRef.current, threshold: [0.2, 0.5, 0.8] },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isOpen, activeId])

  return (
    <>
      <ImagePreviewModal
        isOpen={!!previewImgUrl}
        imageUrl={previewImgUrl}
        onClose={closePreview}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={containerRef}
            key="projectDetailModal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="text-center w-[92vw] sm:w-[85vw] lg:w-[75vw] max-w-5xl h-[85vh] sm:h-[80vh] overflow-y-auto rounded-md shadow-md bg-themacolor1 dark:bg-[#273038] dark:text-darkfg"
            onClick={(e) => e.stopPropagation()} // 모달 클릭 시 이벤트 전파 막기
            role="dialog"
            aria-modal="true"
          >
            <section className="relative h-full flex flex-col items-center px-4 sm:px-6 md:px-10">
              <IconButton
                onClick={onClose}
                ariaLabel="모달 닫기"
                imgSrc="/images/b2close-100.png"
                imgAlt="닫기"
                imgClassName="w-6"
                className="sticky top-2 self-end z-20 p-1.5 rounded-full bg-white/90 dark:bg-[#1f262e]/90 shadow-md"
              />
              <div className="sticky top-0 z-10 w-full bg-themacolor1/80 dark:bg-[#273038]/80 backdrop-blur border-b border-black/10 dark:border-white/10">
                <div className="flex gap-1.5 justify-center text-xs md:text-sm py-2 pr-12">
                  <button
                    onClick={() => document.getElementById('pj-info')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`px-3 py-1 rounded-full border border-black/10 dark:border-white/10 transition-colors ${
                      activeTab === 'pj-info'
                        ? 'bg-themacolor4 text-white'
                        : 'bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10'
                    }`}
                  >
                    정보
                  </button>
                  <button
                    onClick={() => document.getElementById('pj-feature')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`px-3 py-1 rounded-full border border-black/10 dark:border-white/10 transition-colors ${
                      activeTab === 'pj-feature'
                        ? 'bg-themacolor4 text-white'
                        : 'bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10'
                    }`}
                  >
                    기능
                  </button>
                  <button
                    onClick={() => document.getElementById('pj-contrib')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`px-3 py-1 rounded-full border border-black/10 dark:border-white/10 transition-colors ${
                      activeTab === 'pj-contrib'
                        ? 'bg-themacolor4 text-white'
                        : 'bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10'
                    }`}
                  >
                    기여
                  </button>
                  <button
                    onClick={() => document.getElementById('pj-images')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`px-3 py-1 rounded-full border border-black/10 dark:border-white/10 transition-colors ${
                      activeTab === 'pj-images'
                        ? 'bg-themacolor4 text-white'
                        : 'bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10'
                    }`}
                  >
                    이미지
                  </button>
                </div>
              </div>
              <div className="border-b-2 w-full flex flex-col items-center px-4 sm:px-6 md:px-10 py-3">
                <div id="pj-info" />
                <div className="text-2xl font-bold pb-2 text-center">{project.title}</div>
                <div className="text-gray-600 dark:text-darkfg/80 text-sm md:text-base mb-1 text-center">
                  {formatPeriod(project.periodStart, project.periodEnd)}
                </div>

                <div className="items-center py-1 px-3 mb-2 bg-themacolor15 border-2 border-themacolor4 rounded text-sm dark:bg-[#1f262e] dark:border-darkfg/30">
                  {project.skillItem.map((item) => item.name).join(', ')}
                </div>

                {/* <div className="flex flex-row items-center mb-2">
                  {project.skillItem &&
                    project.skillItem.map((skill) => skillI.url && (
                      <img
                        key={`${project.id}_skill_${skill.id}`}
                        src={`/images/tech/${skill.url}`}
                        className="w-7"
                        alt={skill.name}
                      />
                    ))}
                </div> */}

                <div className="whitespace-pre-line">{project.description}</div>

                <div className="flex flex-col md:flex-row items-center gap-3 py-3">
                  {project.git && (
                    <IconCircleButton
                      href={project.git}
                      ariaLabel="GitHub 열기"
                      imgSrc="/images/tech/github-100.png"
                      imgAlt="GitHub"
                      imgClassName="w-7"
                      className="p-2"
                    />
                  )}
                  {project.site && (
                    <IconCircleButton
                      href={project.site}
                      ariaLabel="프로젝트 사이트 열기"
                      imgSrc="/images/link-100.png"
                      imgAlt="사이트 링크"
                      imgClassName="w-6"
                      className="p-2.5"
                    />
                  )}
                </div>
              </div>

                <div className="w-full flex flex-col gap-3 items-center px-4 sm:px-6 md:px-10 py-3">
                {project.feature && project.feature.length > 0 && (
                  <section id="pj-feature" className="w-full h-full">
                    <div className="flex gap-2 text-xl font-bold text-left mb-5">
                      <img src="/images/popular-100.png" className="w-7" alt="주요 기능" />
                      <div>주요 기능</div>
                    </div>
                    <ul className="list-disc text-left">
                      {project.feature.map((feat, idx) => (
                        <li key={`${project.id}_feat_${idx}`} className="text-gray-700 dark:text-darkfg/80 text-base">
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {project.contribution && project.contribution.length > 0 && (
                  <section id="pj-contrib" className="w-full h-full">
                    <div className="flex gap-2 text-xl font-bold text-left mb-5">
                      <img src="/images/hand-100.png" className="w-7" alt="기여 부분" />
                      <div>기여 부분</div>
                    </div>
                    <ul className="list-disc text-left">
                      {project.contribution.map((contri) => (
                        <div key={`${project.id}_contri_${contri.id}`} className="mb-5">
                          {contri?.title && <QuoteDiv>{contri.title}</QuoteDiv>}
                          {contri.desc.map((condesc, idx) => (
                            <li
                              key={`${contri.id}_contrili_${idx}`}
                              className="text-gray-700 dark:text-darkfg/80 text-base"
                            >
                              {condesc}
                            </li>
                          ))}
                        </div>
                      ))}
                    </ul>
                  </section>
                )}

                {project.images && project.images.length > 0 && (
                  <section id="pj-images" className="w-full h-full">
                    <div className="flex gap-2 text-xl font-bold text-left mb-5">
                      <img src="/images/monitor-100.png" className="w-7" alt="작업 화면" />
                      <div>작업 화면</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center cursor-pointer">
                      {project.images.map((img) => (
                        <div
                          key={`${project.id}_detailImg_${img.url}`}
                          className="relative bg-yellow-50 dark:bg-[#26303a] shadow-md rounded-md hover:border-2 border-themacolor4
                          w-full max-w-[320px] aspect-[4/3]"
                          onClick={() => lf_showImgPreview(img.url)}
                        >
                          <img
                            src={`/images/project/${img.url}`}
                            className="absolute w-full h-full text-transparent object-contain border-stone-400"
                            alt={img.name}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
