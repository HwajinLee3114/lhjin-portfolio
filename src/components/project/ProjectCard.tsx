'use client'

import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'

import { ProjectDetailModal } from './detail/ProjectDetailModal'
import ModalPortal from '../comn/ModalPortal'
import { formatPeriod } from '@/lib/period'

interface Tag {
  name: string
  color: string
  txtcolor?: string
}
export interface SkillItem {
  id: string
  name: string
  url?: string
}

interface ProjectCardProps {
  id?: string
  title?: string
  filter?: Tag[]
  periodStart?: string
  periodEnd?: string
  feature?: string[]
  link?: string
  imageSrc?: string
  skillItem: SkillItem[]
  description: string
}

const TxtButton = tw.button`
  px-3 
  py-1 
  border 
  border-gray-300 
  rounded 
  font-medium 
  text-sm 
  outline-none 
  cursor-pointer 
  hover:bg-yellow-400 
  hover:text-white 
  hover:border-yellow-400
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-yellow-400
  focus-visible:ring-offset-2
`

const ModalWrapper = tw.div`
fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-60 z-40 
overflow-y-auto
scrollbar-hide
`

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const closeModal = () => {
    setIsOpen(false)
    setActiveId('')
  }

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <>
      <div className="w-full max-w-sm h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 p-4 bg-white dark:bg-[#273038] dark:text-darkfg cursor-pointer transition-transform">
        <div className="flex justify-center">
          <img
            className="w-full h-48 object-cover"
            src={`/images/thumb/${imageSrc}`}
            alt={title}
            loading="lazy"
          />
        </div>
        <div className="py-2">
          <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
            <h2 className="text-base font-bold">{title}</h2>
            {filter && (
              <div className="flex gap-2 flex-wrap">
                {filter.map((fil, idx) => (
                  <p
                    key={`projectfilter${idx}`}
                    className="text-xs px-2 py-0.5 rounded-lg"
                    style={{
                      backgroundColor: fil.color,
                      color: fil.txtcolor ? fil.txtcolor : '#ffffff',
                    }}
                  >
                    {fil.name}
                  </p>
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
            <TxtButton
              onClick={() => {
                setIsOpen(true)
                setActiveId(id)
              }}
            >
              DETAIL
            </TxtButton>
          </div>
        )}
      </div>

      {isOpen && (
        <ModalPortal>
          <ModalWrapper
            onClick={closeModal}
            onKeyDown={(e) => {
              if (e.key === 'Escape') closeModal()
            }}
            role="presentation"
            tabIndex={-1}
          >
            <ProjectDetailModal isOpen={isOpen} activeId={activeId} onClose={closeModal} />
          </ModalWrapper>
        </ModalPortal>
      )}
    </>
  )
}

export default ProjectCard
