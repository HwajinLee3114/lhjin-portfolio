'use client'

import React, { useState } from 'react'
import { ProjectDetailModal } from './detail/ProjectDetailModal'
import ModalPortal from '../comn/ModalPortal'
import ModalOverlay from '../comn/ModalOverlay'
import { formatPeriod } from '@/lib/period'
import type { FilterTag, SkillItem } from '@/data/projects'
import useBodyScrollLock from '@/hooks/useBodyScrollLock'
import useEscapeKey from '@/hooks/useEscapeKey'
import { focusRing } from '@/styles/ui'
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
  // feature,
  // link,
  imageSrc,
  skillItem,
  description,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeId, setActiveId] = useState<string>('') // 상세 프로젝트

  useBodyScrollLock(isOpen)

  const closeModal = () => {
    setIsOpen(false)
    setActiveId('')
  }

  useEscapeKey(isOpen, closeModal)

  return (
    <>
      <div className="group relative w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 p-4 bg-white dark:bg-[#273038] dark:text-darkfg cursor-pointer transition-transform">
        <div className="flex justify-center">
          <img
            className="w-full h-48 object-cover"
            src={`/images/thumb/${imageSrc}`}
            alt={title}
            loading="lazy"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-3 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
          {description}
        </div>
        <div className="py-2">
          <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
            <h2 className="text-base font-bold">{title}</h2>
            {filter && (
              <div className="flex gap-2 flex-wrap">
                {filter.map((fil, idx) => (
                  <TagBadge key={`projectfilter${idx}`} name={fil.name} color={fil.color} />
                ))}
              </div>
            )}
          </div>

          {(periodStart || periodEnd) && (
            <p className="text-gray-600 dark:text-darkfg/80 text-base md:text-sm">
              {formatPeriod(periodStart, periodEnd)}
            </p>
          )}

          {/* {feature && (
            <ul className="list-disc pl-3">
              {feature.map((feat, index) => (
                <li key={`projectfeat${index}`} className="text-gray-700 text-base">
                  <span className="block overflow-hidden whitespace-nowrap overflow-ellipsis max-w-xs">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>
          )} */}
          <span className="block overflow-hidden whitespace-nowrap overflow-ellipsis max-w-xs dark:text-darkfg/90">
            {description}
          </span>
        </div>
        {/* <div className="self-start py-1 px-3 mb-2 bg-themacolor15 border-2 border-themacolor4 rounded text-sm">
          {skillItem.map(item => item.name).join(', ')}
        </div> */}
        <div className="flex flex-row gap-1 items-center mb-2 flex-wrap">
          {skillItem &&
            skillItem.map(
              (skillI) =>
                skillI.url && (
                  <img
                    key={`${id}_skill_${skillI.id}`}
                    src={`/images/tech/${skillI.url}`}
                    className="w-7"
                    alt={skillI.name}
                  />
                ),
            )}
        </div>
        {id && (
          <div className="flex justify-end">
            <button
              className={`px-3 py-1 border border-gray-300 rounded font-medium text-sm outline-none cursor-pointer hover:bg-yellow-400 hover:text-white hover:border-yellow-400 ${focusRing} focus-visible:ring-yellow-400 focus-visible:ring-offset-2`}
              onClick={() => {
                setIsOpen(true)
                setActiveId(id)
              }}
            >
              DETAIL
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <ModalPortal>
          <ModalOverlay onClose={closeModal}>
            <ProjectDetailModal isOpen={isOpen} activeId={activeId} onClose={closeModal} />
          </ModalOverlay>
        </ModalPortal>
      )}
    </>
  )
}

export default ProjectCard
