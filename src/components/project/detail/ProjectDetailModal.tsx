import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Users, MonitorSmartphone, ExternalLink, type LucideIcon } from 'lucide-react'

import { getProjectById } from '@/data/projects'
import { ImagePreviewModal } from '@/components/common/ImagePreviewModal'
import { formatPeriod } from '@/lib/period'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  activeId?: string
  onClose?: () => void
}

const tabs = [
  { id: 'pj-info', label: '정보' },
  { id: 'pj-feature', label: '기능' },
  { id: 'pj-contrib', label: '기여' },
  { id: 'pj-images', label: '화면' },
]

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

  const closePreview = () => setPreviewImgUrl(undefined)

  useEffect(() => {
    if (!project || !isOpen || !containerRef.current) return
    const targets = tabs
      .map((t) => containerRef.current?.querySelector(`#${t.id}`))
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
        threshold: [0, 0.25, 0.5],
      },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isOpen, activeId, project])

  if (!project) return null

  const visibleTabs = tabs.filter((t) => {
    if (t.id === 'pj-contrib') return project.contribution.length > 0
    if (t.id === 'pj-images') return project.images.length > 0
    return true
  })

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
            className="w-[92vw] sm:w-[85vw] lg:w-[75vw] max-w-5xl h-[85dvh] sm:h-[80dvh] flex flex-col overflow-hidden rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 dark:text-zinc-100 relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
              <div className="flex items-center gap-2" role="tablist">
                {visibleTabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
                      activeTab === tab.id
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                        : 'text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200',
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                onClick={onClose}
                aria-label="모달 닫기"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden">
              <div className="px-6 sm:px-10 md:px-16 pt-8 pb-6">
                <div id="pj-info" className="-mt-8 pt-8" />
                <h1 className="mb-2 text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                  {project.title}
                </h1>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {formatPeriod(project.periodStart, project.periodEnd)}
                </p>

                <div className="mb-6 flex flex-wrap gap-1.5">
                  {project.skillItem.map((item) => (
                    <span
                      key={item.name}
                      className="rounded-lg bg-zinc-100 px-2.5 py-1 text-[11px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>

                <p className="mb-6 whitespace-pre-line text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>

                {(project.git || project.site) && (
                  <div className="flex gap-3 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                    {project.git && (
                      <a
                        href={project.git}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-xl bg-zinc-100 px-4 py-2 text-xs font-bold text-zinc-700 transition-colors hover:bg-zinc-900 hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-white dark:hover:text-zinc-900"
                      >
                        <ExternalLink size={12} />
                        GitHub
                      </a>
                    )}
                    {project.site && (
                      <a
                        href={project.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-xl bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
                      >
                        <ExternalLink size={12} />
                        사이트
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-8 px-6 sm:px-10 md:px-16 pb-16">
                {project.feature.length > 0 && (
                  <section id="pj-feature" className="scroll-mt-16">
                    <SectionHeading icon={Star} color="yellow">
                      주요 기능
                    </SectionHeading>
                    <ul className="space-y-2 pl-1">
                      {project.feature.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {project.contribution.length > 0 && (
                  <section id="pj-contrib" className="scroll-mt-16">
                    <SectionHeading icon={Users} color="emerald">
                      기여 부분
                    </SectionHeading>
                    <div className="space-y-6">
                      {project.contribution.map((contri, cIdx) => (
                        <div key={cIdx}>
                          {contri.title && (
                            <div className="mb-2 border-l-4 border-zinc-300 bg-zinc-50 py-2 pl-4 text-sm font-bold text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-300">
                              {contri.title}
                            </div>
                          )}
                          <ul className="space-y-1.5 pl-1">
                            {contri.desc.map((d, dIdx) => (
                              <li
                                key={dIdx}
                                className="flex gap-2.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400"
                              >
                                <span className="mt-2 shrink-0 text-zinc-300 dark:text-zinc-600">
                                  -
                                </span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {project.images.length > 0 && (
                  <section id="pj-images" className="scroll-mt-16">
                    <SectionHeading icon={MonitorSmartphone} color="blue">
                      작업 화면
                    </SectionHeading>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {project.images.map((img) => (
                        <button
                          key={img.url}
                          onClick={() => setPreviewImgUrl(`/images/project/${img.url}`)}
                          className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-800/50"
                        >
                          <img
                            src={`/images/project/${img.url}`}
                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                            alt={img.name}
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SectionHeading({
  icon: Icon,
  color,
  children,
}: {
  icon: LucideIcon
  color: 'yellow' | 'emerald' | 'blue'
  children: React.ReactNode
}) {
  const bg = {
    yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  }

  return (
    <div className="mb-4 flex items-center gap-2.5">
      <div className={cn('flex h-8 w-8 items-center justify-center rounded-xl', bg[color])}>
        <Icon size={16} />
      </div>
      <h2 className="text-base font-black tracking-tight text-zinc-900 dark:text-white">
        {children}
      </h2>
    </div>
  )
}
