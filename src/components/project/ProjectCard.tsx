'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { ProjectDetailModal } from './detail/ProjectDetailModal'
import ModalPortal from '../common/ModalPortal'
import ModalOverlay from '../common/ModalOverlay'
import { formatPeriod } from '@/lib/period'
import type { FilterTag, SkillItem } from '@/data/projects'
import useBodyScrollLock from '@/hooks/useBodyScrollLock'
import useEscapeKey from '@/hooks/useEscapeKey'
import TagBadge from '../common/TagBadge'

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
        className="group relative flex flex-col h-full rounded-2xl bg-white dark:bg-zinc-900 cursor-pointer transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1"
      >
        <div className="relative aspect-[16/10] rounded-t-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            src={`/images/thumb/${imageSrc}`}
            alt={title || ''}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col flex-1 space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-base font-black text-zinc-900 dark:text-white leading-tight">
              {title}
            </h2>
            <ArrowUpRight
              size={14}
              className="mt-1 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
            />
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-1">
            {filter?.map((fil, idx) => (
              <TagBadge key={`pj-filter-${idx}`} name={fil.name} color={fil.color} />
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-3">
            <div className="flex items-center -space-x-1">
              {skillItem?.slice(0, 4).map(
                (skill, idx) =>
                  skill.url && (
                    <div
                      key={`${id}_skill_${idx}`}
                      className="w-6 h-6 rounded-full bg-white dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 flex items-center justify-center p-0.5"
                    >
                      <img
                        src={`/images/tech/${skill.url}`}
                        className="w-full h-full object-contain"
                        alt={skill.name}
                      />
                    </div>
                  ),
              )}
              {skillItem.length > 4 && (
                <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[8px] font-black text-zinc-400">
                  +{skillItem.length - 4}
                </div>
              )}
            </div>
            <span className="text-[10px] font-bold text-zinc-300 dark:text-zinc-600">
              {formatPeriod(periodStart, periodEnd)}
            </span>
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
