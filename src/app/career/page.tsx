'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Briefcase } from 'lucide-react'

import SectionFrame from '@/components/common/SectionFrame'
import { career } from '@/data/career'
import { projects } from '@/data/projects'
import { formatPeriod } from '@/lib/period'
import { cn } from '@/lib/utils'

const careerWithProjects = career.map((c) => ({
  ...c,
  projectDetails: c.projects
    .map((projectId) => projects.find((p) => p.id === projectId))
    .filter(Boolean)
    .reverse(),
}))

export default function Career() {
  const [loading, setLoading] = useState(true)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [])

  const sortedCareer = useMemo(() => {
    return [...careerWithProjects].sort((a, b) => parseInt(b.id) - parseInt(a.id))
  }, [])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <SectionFrame id="career" title="Journey">
      {loading ? (
        <div className="space-y-10">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="animate-pulse flex gap-8">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-zinc-100" />
              <div className="flex-1 space-y-4 pt-2">
                <div className="h-4 w-48 rounded bg-zinc-100" />
                <div className="h-3 w-32 rounded bg-zinc-50" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative space-y-10">
          <div className="absolute bottom-10 left-8 top-10 hidden w-[2px] bg-gradient-to-b from-zinc-200 via-zinc-100 to-transparent dark:from-zinc-700 dark:via-zinc-800 dark:to-transparent md:block" />

          {sortedCareer.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex flex-col gap-10 md:flex-row"
            >
              <div className="relative z-10 shrink-0">
                <div
                  className={cn(
                    'flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl border-2 text-2xl font-black shadow-sm transition-all duration-500',
                    idx === 0
                      ? 'scale-110 border-zinc-900 bg-zinc-900 text-white shadow-xl dark:border-white dark:bg-white dark:text-zinc-900'
                      : 'border-zinc-100 bg-white text-zinc-400 group-hover:border-zinc-900 group-hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500 dark:group-hover:border-white dark:group-hover:text-white',
                  )}
                >
                  <span className="transition-transform duration-500 group-hover:scale-110">
                    {item.company.charAt(0)}
                  </span>
                </div>
                {idx === 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-4 w-4 scale-50 rounded-full bg-emerald-500"></span>
                  </span>
                )}
              </div>

              <div className="flex-1 pt-1">
                <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
                    {item.company}
                  </h3>
                  <div className="flex flex-col items-start gap-1.5 md:items-end">
                    {item.roles.map((role, rIdx) => (
                      <div
                        key={rIdx}
                        className="rounded bg-zinc-50 px-2 py-1 text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:bg-zinc-800/30 dark:text-zinc-500"
                      >
                        {role.role} · {formatPeriod(role.periodStart, role.periodEnd)}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mb-6 text-lg font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {item.companyInfo}
                </p>

                <div className="mb-8 flex flex-wrap gap-2.5">
                  {item.tag.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-1.5 text-[10px] font-bold text-zinc-400 transition-colors group-hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-500 dark:group-hover:border-zinc-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {item.projectDetails && item.projectDetails.length > 0 && (
                  <div className="border-t border-zinc-100 pt-6 dark:border-zinc-800">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="group/btn flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-900 transition-all hover:opacity-70 dark:text-white"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-50 transition-all duration-300 group-hover/btn:bg-zinc-900 group-hover/btn:text-white dark:bg-zinc-800 dark:group-hover/btn:bg-white dark:group-hover/btn:text-zinc-900">
                        <Briefcase size={16} />
                      </div>
                      <span className="flex flex-col items-start gap-0.5">
                        <span className="text-[10px] opacity-50">Case Studies</span>
                        <span>Projects ({item.projectDetails.length})</span>
                      </span>
                      <ChevronDown
                        size={16}
                        className={cn(
                          'ml-auto transition-transform duration-500 ease-in-out',
                          openItems[item.id] && 'rotate-180',
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {openItems[item.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-8 space-y-6 pb-4">
                            {item.projectDetails.map(
                              (pj, pIdx) =>
                                pj && (
                                  <motion.div
                                    key={pj.id}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: pIdx * 0.05 }}
                                    className="group/pj relative rounded-[2.5rem] border border-zinc-100 bg-zinc-50/50 p-8 transition-all hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800/20 dark:hover:border-zinc-700"
                                  >
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                      <h4 className="text-lg font-black text-zinc-900 transition-colors group-hover/pj:text-zinc-900 dark:text-white">
                                        {pj.title}
                                      </h4>
                                      <span className="rounded-full border border-zinc-100 bg-white px-3 py-1.5 text-[10px] font-black text-zinc-400 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                        {formatPeriod(pj.periodStart, pj.periodEnd)}
                                      </span>
                                    </div>
                                    <p className="text-base font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
                                      {pj.description}
                                    </p>
                                  </motion.div>
                                ),
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </SectionFrame>
  )
}
