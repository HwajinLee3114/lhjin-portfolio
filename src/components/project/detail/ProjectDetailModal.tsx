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
  py-2
  pl-4
  mb-4
  border-l-4 border-zinc-300
  text-zinc-600
  bg-zinc-50
  rounded-r-lg
  dark:border-zinc-600
  dark:text-zinc-300
  dark:bg-zinc-800/50
`

export const ProjectDetailModal = ({ isOpen, activeId, onClose }: ModalProps) => {
  const project = activeId ? getProjectById(activeId) : null
  const [previewImgUrl, setPreviewImgUrl] = useState<string | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<string>('pj-info')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    isScrolling.current = true

    document.getElementById(tabId)?.scrollIntoView({ behavior: 'smooth' })

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false
    }, 800)
  }

  const lf_showImgPreview = (imgUrl: string) => {
    if (imgUrl) {
      setPreviewImgUrl(`/images/project/${imgUrl}`)
    }
  }

  const closePreview = () => {
    setPreviewImgUrl(undefined)
  }

  useEffect(() => {
    if (!project || !isOpen || !containerRef.current) return
    const targets = ['pj-info', 'pj-feature', 'pj-contrib', 'pj-images']
      .map((id) => containerRef.current?.querySelector(`#${id}`))
      .filter(Boolean) as HTMLElement[]

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveTab(visible[0].target.id)
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '-10% 0px -40% 0px',
        threshold: [0, 0.25, 0.5]
      },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isOpen, activeId, project])

  if (!project) {
    return null
  }

  return (
    <>
      <ImagePreviewModal isOpen={!!previewImgUrl} imageUrl={previewImgUrl} onClose={closePreview} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={containerRef}
            key="projectDetailModal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[92vw] sm:w-[85vw] lg:w-[75vw] max-w-5xl h-[85vh] sm:h-[80vh] flex flex-col overflow-hidden rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl border border-zinc-200/50 dark:border-zinc-800/50 dark:text-zinc-100 relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <section className="relative h-full flex flex-col items-center w-full">
              <div className="shrink-0 z-40 w-full relative">
                <IconButton
                  onClick={onClose}
                  ariaLabel="모달 닫기"
                  imgSrc="/images/b2close-100.png"
                  imgAlt="닫기"
                  imgClassName="w-5"
                  className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 z-50 rounded-full transition-colors"
                />

                <div className="flex gap-2 justify-center text-xs md:text-sm px-4">
                  <button
                    onClick={() => handleTabClick('pj-info')}
                    className={`px-4 py-1.5 rounded-full font-semibold transition-all ${activeTab === 'pj-info'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                  >
                    정보
                  </button>
                  <button
                    onClick={() => handleTabClick('pj-feature')}
                    className={`px-4 py-1.5 rounded-full font-semibold transition-all ${activeTab === 'pj-feature'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                  >
                    기능
                  </button>
                  {project.contribution && project.contribution.length > 0 && <button
                    onClick={() => handleTabClick('pj-contrib')}
                    className={`px-4 py-1.5 rounded-full font-semibold transition-all ${activeTab === 'pj-contrib'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                  >
                    기여
                  </button>}
                  <button
                    onClick={() => handleTabClick('pj-images')}
                    className={`px-4 py-1.5 rounded-full font-semibold transition-all ${activeTab === 'pj-images'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                  >
                    이미지
                  </button>
                </div>
              </div>

              <div ref={scrollContainerRef} className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col items-center pb-12 relative">
                <div className="w-full flex flex-col items-center px-6 sm:px-10 md:px-16 pt-8 pb-10">
                  <div id="pj-info" className="-mt-8 pt-8" />
                  <h1 className="text-3xl sm:text-4xl font-black mb-3 text-zinc-900 dark:text-white tracking-tight">{project.title}</h1>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm font-medium tracking-widest uppercase mb-6">
                    {formatPeriod(project.periodStart, project.periodEnd)}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center py-2 mb-8">
                    {project.skillItem.map((item) => (
                      <span
                        key={item.name}
                        className="px-3.5 py-1.5 bg-zinc-100/80 dark:bg-zinc-800/50 rounded-full text-xs font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>

                  <div className="whitespace-pre-line text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-8 max-w-3xl">
                    {project.description}
                  </div>

                  <div className="flex items-center justify-center gap-4 py-4 w-full border-b border-zinc-100 dark:border-zinc-800/50">
                    {project.git && (
                      <IconCircleButton
                        href={project.git}
                        ariaLabel="GitHub 열기"
                        imgSrc="/images/tech/github-100.png"
                        imgAlt="GitHub"
                        imgClassName="w-6"
                        className="p-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                      />
                    )}
                    {project.site && (
                      <IconCircleButton
                        href={project.site}
                        ariaLabel="프로젝트 사이트 열기"
                        imgSrc="/images/link-100.png"
                        imgAlt="사이트 링크"
                        imgClassName="w-5"
                        className="p-3.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                      />
                    )}
                  </div>
                </div>

                <div className="w-full max-w-4xl flex flex-col gap-10 px-0 md:px-16 pb-20">
                  {project.feature && project.feature.length > 0 && (
                    <section id="pj-feature" className="w-full scroll-mt-24">
                      <div className="flex items-center gap-3 text-2xl font-black text-left mb-6 text-zinc-900 dark:text-white">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                          <img src="/images/popular-100.png" className="w-6 h-6 object-contain" alt="주요 기능" />
                        </div>
                        <h2 className="tracking-tight">주요 기능</h2>
                      </div>
                      <ul className="space-y-3 text-left pl-2">
                        {project.feature.map((feat, idx) => (
                          <li
                            key={`${project.id}_feat_${idx}`}
                            className="flex gap-3 text-zinc-700 dark:text-zinc-300 text-[15px] sm:text-base leading-relaxed"
                          >
                            <span className="text-zinc-300 dark:text-zinc-600 mt-1.5">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {project.contribution && project.contribution.length > 0 && (
                    <section id="pj-contrib" className="w-full scroll-mt-24">
                      <div className="flex items-center gap-3 text-2xl font-black text-left mb-6 text-zinc-900 dark:text-white">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                          <img src="/images/hand-100.png" className="w-6 h-6 object-contain" alt="기여 부분" />
                        </div>
                        <h2 className="tracking-tight">기여 부분</h2>
                      </div>
                      <ul className="text-left space-y-8 pl-2">
                        {project.contribution.map((contri) => (
                          <li key={`${project.id}_contri_${contri.id}`} className="list-none">
                            {contri?.title && <QuoteDiv className="font-bold text-[15px]">{contri.title}</QuoteDiv>}
                            <ul className="space-y-2 mt-3">
                              {contri.desc.map((condesc, idx) => (
                                <li
                                  key={`${contri.id}_contrili_${idx}`}
                                  className="flex gap-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-[15px] leading-relaxed"
                                >
                                  <span className="text-zinc-300 dark:text-zinc-600 mt-1.5">-</span>
                                  <span>{condesc}</span>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {project.images && project.images.length > 0 && (
                    <section id="pj-images" className="w-full scroll-mt-24">
                      <div className="flex items-center gap-3 text-2xl font-black text-left mb-6 text-zinc-900 dark:text-white">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                          <img src="/images/monitor-100.png" className="w-6 h-6 object-contain" alt="작업 화면" />
                        </div>
                        <h2 className="tracking-tight">작업 화면</h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {project.images.map((img) => (
                          <div
                            key={`${project.id}_detailImg_${img.url}`}
                            className="relative group bg-zinc-50 dark:bg-zinc-800/80 shadow-sm rounded-3xl border border-zinc-200/80 dark:border-zinc-700/80 w-full aspect-[4/3] cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-6 flex items-center justify-center overflow-hidden"
                            onClick={() => lf_showImgPreview(img.url)}
                          >
                            <img
                              src={`/images/project/${img.url}`}
                              className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                              alt={img.name}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-zinc-900/5 dark:group-hover:bg-white/5 transition-colors pointer-events-none" />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

