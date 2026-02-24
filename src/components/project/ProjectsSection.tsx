'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

import { projects } from '@/data/projects'
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
  }, [searchParams])

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
    <section
      id="projects"
      className="flex flex-col items-center min-h-full bg-white dark:bg-[#1a1f24] p-8 md:p-16"
    >
      <div className="w-full max-w-6xl">
        <header className="mb-16 text-center">
          <span className="text-zinc-400 text-xs font-black tracking-[0.2em] uppercase">
            Archive
          </span>
          <h2 className="mt-2 text-4xl font-black text-zinc-900 dark:text-white">
            프로젝트 결과물
          </h2>
          <div className="mt-4 h-1 w-12 bg-zinc-900 dark:bg-white mx-auto rounded-full" />
        </header>

        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['all', 'feature', 'personal', 'team'].map((f) => {
              const isActive = filter === f
              return (
                <button
                  key={f}
                  onClick={() => handleFilterChange(f)}
                  className={cn(
                    'relative px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300',
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg scale-105'
                      : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800',
                  )}
                >
                  <span className="relative z-10">{f}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 rounded-2xl bg-zinc-900 dark:bg-white shadow-xl"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="relative w-full max-w-md group">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="프로젝트 검색 (제목/설명/스택)"
              className="w-full pl-12 pr-6 py-4 rounded-[2rem] border-none bg-zinc-50 dark:bg-zinc-800/50 text-sm font-medium focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="w-full">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="animate-pulse space-y-4">
                    <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-3xl" />
                    <div className="h-4 w-2/3 bg-zinc-100 dark:bg-zinc-800 rounded" />
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                      <div className="h-6 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.ul
                layout
                className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16"
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
            <div className="text-center py-20">
              <p className="text-zinc-400 font-medium">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
