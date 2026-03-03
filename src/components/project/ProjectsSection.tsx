'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

import { projects } from '@/data/projects'
import SectionFrame from '@/components/common/SectionFrame'
import ProjectCard from '@/components/project/ProjectCard'
import { cn } from '@/lib/utils'

export default function ProjectsSection() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [filter, setFilter] = useState<string>(searchParams.get('filter') || 'feature')
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [])

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
      .sort((a, b) => Number(b.id) - Number(a.id))
  }, [filter, query])

  return (
    <SectionFrame id="projects" title="Archive" containerClassName="max-w-6xl">
      <div className="mb-10 flex flex-col items-center gap-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {['all', 'feature', 'personal', 'team'].map((f) => {
            const isActive = filter === f
            return (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={cn(
                  'relative rounded-2xl px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all duration-300',
                  isActive
                    ? 'scale-105 bg-zinc-900 text-white shadow-lg dark:bg-white dark:text-zinc-900'
                    : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800',
                )}
              >
                <span className="relative z-10">{f}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 rounded-2xl bg-zinc-900 shadow-xl dark:bg-white"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </button>
            )
          })}
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
          {loading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="animate-pulse space-y-4">
                  <div className="aspect-video rounded-3xl bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-4 w-2/3 rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                    <div className="h-6 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.ul
              layout
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
          )}
        </AnimatePresence>

        {!loading && filteredPj.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-medium text-zinc-400">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </SectionFrame>
  )
}
