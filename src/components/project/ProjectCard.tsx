'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { ProjectDetailModal } from './detail/ProjectDetailModal'
import ModalPortal from '../comn/ModalPortal'
import ModalOverlay from '../comn/ModalOverlay'
import { formatPeriod } from '@/lib/period'
import type { FilterTag, SkillItem } from '@/data/projects'
import useBodyScrollLock from '@/hooks/useBodyScrollLock'
import useEscapeKey from '@/hooks/useEscapeKey'
import TagBadge from '../comn/TagBadge'

interface ProjectCardProps {
  id?: string
  title?: string
  filter?: FilterTag[]
  periodStart?: string
  periodEnd?: string
  feature?: string[]
  link?: string
  imageSrc?: string
  skillItem: SkillItem[]
  description: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  filter,
  periodStart,
  periodEnd,
  imageSrc,
  skillItem,
  description,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeId, setActiveId] = useState<string>('')

  useBodyScrollLock(isOpen)

  const closeModal = () => {
    setIsOpen(false)
    setActiveId('')
  }

  useEscapeKey(isOpen, closeModal)

  return (
    <>
      <motion.div
        layout
        onClick={() => {
          if (id) {
            setIsOpen(true)
            setActiveId(id)
          }
        }}
        className="group relative flex flex-col h-full rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 cursor-pointer transition-all duration-500 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1.5"
      >
        <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden bg-zinc-50 dark:bg-zinc-800 mb-4">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={`/images/thumb/${imageSrc}`}
            alt={title}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
            <p className="text-[10px] font-bold text-white/90 leading-snug line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-col flex-1 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-black text-zinc-900 dark:text-white leading-tight">
              {title}
            </h2>
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-zinc-50 dark:bg-zinc-800 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-all duration-300 shrink-0">
              <ArrowUpRight size={14} />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {filter?.map((fil, idx) => (
              <TagBadge key={`pj-filter-${idx}`} name={fil.name} color={fil.color} />
            ))}
          </div>

          <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            {formatPeriod(periodStart, periodEnd)}
          </p>

          <div className="mt-auto pt-4 border-t border-zinc-50 dark:border-zinc-800 flex items-center -space-x-1.5 group-hover:space-x-1 transition-all duration-500">
            {skillItem?.slice(0, 5).map(
              (skill, idx) =>
                skill.url && (
                  <div
                    key={`${id}_skill_${idx}`}
                    className="w-7 h-7 rounded-full bg-white dark:bg-zinc-900 border-2 border-white dark:border-zinc-900 flex items-center justify-center p-1 shadow-sm group-hover:shadow-md transition-shadow grayscale group-hover:grayscale-0"
                  >
                    <img
                      src={`/images/tech/${skill.url}`}
                      className="w-full h-full object-contain"
                      alt={skill.name}
                    />
                  </div>
                ),
            )}
            {skillItem.length > 5 && (
              <div className="w-7 h-7 rounded-full bg-zinc-50 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[9px] font-black text-zinc-400">
                +{skillItem.length - 5}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <ModalPortal>
            <ModalOverlay onClose={closeModal}>
              <ProjectDetailModal isOpen={isOpen} activeId={activeId} onClose={closeModal} />
            </ModalOverlay>
          </ModalPortal>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProjectCard
