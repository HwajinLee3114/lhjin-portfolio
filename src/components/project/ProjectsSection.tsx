'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, LayoutGrid, List } from 'lucide-react'

import Image from 'next/image'

import { projects } from '@/data/projects'
import { formatPeriod } from '@/lib/period'
import SectionFrame from '@/components/common/SectionFrame'
import ProjectCard from '@/components/project/ProjectCard'
import { ProjectDetailModal } from '@/components/project/detail/ProjectDetailModal'
import ModalPortal from '@/components/common/ModalPortal'
import ModalOverlay from '@/components/common/ModalOverlay'
import TagBadge from '@/components/common/TagBadge'
import { cn } from '@/lib/utils'

export default function ProjectsSection() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [filter, setFilter] = useState<string>(searchParams.get('filter') || 'feature')
  const [query, setQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const q = searchParams.get('filter')
    if (q && q !== filter) {
      setFilter(q)
    }
  }, [searchParams, filter])

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
    const params = new URLSearchParams(searchParams.toString())
    params.set('filter', newFilter)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  const filteredPj = useMemo(() => {
    return projects
      .filter((project) => {
        if (filter === 'personal') return project.filter.some((f) => f.name === 'personal')
        if (filter === 'team') return project.filter.some((f) => f.name === 'team')
        if (filter === 'feature') return project.filter.some((f) => f.name === 'feature')
        return true
      })
      .filter((project) => {
        if (!query.trim()) return true
        const q = query.toLowerCase()
        const inTitle = project.title.toLowerCase().includes(q)
        const inDesc = project.description.toLowerCase().includes(q)
        const inSkill = project.skillItem.some((s) => s.name.toLowerCase().includes(q))
        return inTitle || inDesc || inSkill
      })
      .sort((a, b) => (b.periodStart || '').localeCompare(a.periodStart || ''))
  }, [filter, query])

  return (
    <SectionFrame id="projects" title="Archive" containerClassName="max-w-6xl">
      <div className="mb-10 flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['all', 'feature', 'personal', 'team'].map((f) => {
              const isActive = filter === f
              return (
                <button
                  key={f}
                  onClick={() => handleFilterChange(f)}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-all duration-300',
                    isActive
                      ? 'bg-zinc-900 text-white shadow-xl dark:bg-white dark:text-zinc-900'
                      : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800',
                  )}
                >
                  {f}
                </button>
              )
            })}
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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: index * 0.03 }}
        onClick={() => setIsOpen(true)}
        className="group flex cursor-pointer items-center gap-4 rounded-2xl p-3 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      >
        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={`/images/project/thumb/${project.thumb}`}
            alt={project.title}
            fill
            sizes="80px"
            className="object-cover"
          />
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
        {isOpen && (
          <ModalPortal>
            <ModalOverlay onClose={() => setIsOpen(false)}>
              <ProjectDetailModal
                isOpen={isOpen}
                activeId={project.id}
                onClose={() => setIsOpen(false)}
              />
            </ModalOverlay>
          </ModalPortal>
        )}
      </AnimatePresence>
    </>
  )
}
