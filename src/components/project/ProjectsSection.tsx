'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, LayoutGrid, List } from 'lucide-react'

import Image from 'next/image'

import { projects } from '@/data/projects'
import { FILTER_NAMES, filterProjects } from '@/data/filters'
import { formatPeriod } from '@/lib/period'
import { imagePath } from '@/lib/paths'
import SectionFrame from '@/components/common/SectionFrame'
import ProjectCard from '@/components/project/ProjectCard'
import { ProjectDetailModal } from '@/components/project/detail/ProjectDetailModal'
import ModalPortal from '@/components/common/ModalPortal'
import ModalOverlay from '@/components/common/ModalOverlay'
import TagBadge from '@/components/common/TagBadge'
import { cn } from '@/lib/utils'
import useModal from '@/hooks/useModal'
import FilterButton from '@/components/common/FilterButton'

export default function ProjectsSection() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [filter, setFilter] = useState<string>(searchParams.get('filter') || 'feature')
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const q = searchParams.get('filter')
    if (q && q !== filter) {
      setFilter(q)
    }
  }, [searchParams, filter])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 200)
    return () => clearTimeout(timer)
  }, [query])

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
    const params = new URLSearchParams(searchParams.toString())
    params.set('filter', newFilter)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  const filteredPj = useMemo(() => {
    return filterProjects(projects, filter)
      .filter((project) => {
        if (!debouncedQuery.trim()) return true
        const q = debouncedQuery.toLowerCase()
        const inTitle = project.title.toLowerCase().includes(q)
        const inDesc = project.description.toLowerCase().includes(q)
        const inSkill = project.skillItem.some((s) => s.name.toLowerCase().includes(q))
        return inTitle || inDesc || inSkill
      })
      .sort((a, b) => (b.periodStart || '').localeCompare(a.periodStart || ''))
  }, [filter, debouncedQuery])

  return (
    <SectionFrame id="projects" title="Archive" containerClassName="max-w-6xl">
      <div className="mb-10 flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {FILTER_NAMES.map((f) => (
              <FilterButton key={f} isActive={filter === f} onClick={() => handleFilterChange(f)}>
                {f}
              </FilterButton>
            ))}
          </div>
          <div className="flex rounded-xl bg-zinc-50 p-1 dark:bg-zinc-800/50">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="카드 보기"
              className={cn(
                'rounded-lg p-2 transition-all',
                viewMode === 'grid'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200',
              )}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="리스트 보기"
              className={cn(
                'rounded-lg p-2 transition-all',
                viewMode === 'list'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200',
              )}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        <div className="group relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 transition-colors group-focus-within:text-zinc-900 dark:group-focus-within:text-white"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="프로젝트 검색 (제목/설명/스택)"
            className="w-full rounded-[2rem] border-none bg-zinc-50 py-4 pl-12 pr-6 text-sm font-medium shadow-inner outline-none transition-all focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800/50 dark:focus:ring-white"
          />
        </div>
      </div>

      <div className="w-full">
        <AnimatePresence mode="popLayout">
          {viewMode === 'grid' ? (
            <motion.ul
              layout
              key="grid"
              className="mb-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPj.map((project, index) => (
                <motion.li
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    periodStart={project.periodStart}
                    periodEnd={project.periodEnd}
                    skillItem={project.skillItem}
                    filter={project.filter}
                    imageSrc={project.thumb}
                    feature={project.feature}
                    description={project.description}
                  />
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-16 space-y-3"
            >
              {filteredPj.map((project, index) => (
                <ProjectListItem key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredPj.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-medium text-zinc-400">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </SectionFrame>
  )
}

function ProjectListItem({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const modal = useModal()

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: index * 0.03 }}
        onClick={() => modal.open(project.id)}
        className="group flex cursor-pointer items-center gap-4 rounded-2xl p-3 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      >
        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          {project.thumb ? (
            <Image
              src={imagePath.projectThumb(project.thumb)}
              alt={project.title}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-black text-zinc-300 dark:text-zinc-600">
              {project.title.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black text-zinc-900 dark:text-white truncate">
              {project.title}
            </h3>
            <div className="flex shrink-0 gap-1">
              {project.filter.map((fil, idx) => (
                <TagBadge key={idx} name={fil.name} color={fil.color} />
              ))}
            </div>
          </div>
          <p className="mt-0.5 text-xs text-zinc-400 truncate">{project.description}</p>
        </div>
        <span className="shrink-0 text-[10px] font-bold text-zinc-300 dark:text-zinc-600">
          {formatPeriod(project.periodStart, project.periodEnd)}
        </span>
      </motion.div>

      <AnimatePresence>
        {modal.isOpen && (
          <ModalPortal>
            <ModalOverlay onClose={modal.close}>
              <ProjectDetailModal
                isOpen={modal.isOpen}
                activeId={modal.activeId}
                onClose={modal.close}
              />
            </ModalOverlay>
          </ModalPortal>
        )}
      </AnimatePresence>
    </>
  )
}
