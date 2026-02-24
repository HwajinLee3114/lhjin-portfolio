'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Briefcase } from 'lucide-react'

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
    <section
      id="career"
      className="flex flex-col items-center min-h-full bg-white dark:bg-[#1a1f24] p-8 md:p-16"
    >
      <div className="w-full max-w-4xl">
        <header className="mb-20 text-center">
          <span className="text-zinc-400 text-xs font-black tracking-[0.2em] uppercase">
            Journey
          </span>
          <h2 className="mt-2 text-4xl font-black text-zinc-900 dark:text-white">경력 및 경험</h2>
          <div className="mt-4 h-1 w-12 bg-zinc-900 dark:bg-white mx-auto rounded-full" />
        </header>

        {loading ? (
          <div className="space-y-12">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="animate-pulse flex gap-8">
                <div className="w-16 h-16 bg-zinc-100 rounded-2xl shrink-0" />
                <div className="flex-1 space-y-4 pt-2">
                  <div className="h-4 w-48 bg-zinc-100 rounded" />
                  <div className="h-3 w-32 bg-zinc-50 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative space-y-10">
            <div className="absolute left-8 top-10 bottom-10 w-[2px] bg-gradient-to-b from-zinc-200 via-zinc-100 to-transparent dark:from-zinc-700 dark:via-zinc-800 dark:to-transparent hidden md:block" />

            {sortedCareer.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col md:flex-row gap-10"
              >
                <div className="relative z-10 shrink-0">
                  <div
                    className={cn(
                      'w-16 h-16 flex items-center justify-center rounded-3xl border-2 transition-all duration-500 shadow-sm overflow-hidden font-black text-2xl',
                      idx === 0
                        ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-900 shadow-xl scale-110'
                        : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 group-hover:border-zinc-900 dark:group-hover:border-white group-hover:text-zinc-900 dark:group-hover:text-white',
                    )}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-500">
                      {item.company.charAt(0)}
                    </span>
                  </div>
                  {idx === 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 scale-50"></span>
                    </span>
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
                      {item.company}
                    </h3>
                    <div className="flex flex-col items-start md:items-end gap-1.5">
                      {item.roles.map((role, rIdx) => (
                        <div
                          key={rIdx}
                          className="text-[11px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider bg-zinc-50 dark:bg-zinc-800/30 px-2 py-1 rounded"
                        >
                          {role.role} · {formatPeriod(role.periodStart, role.periodEnd)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed font-medium text-lg">
                    {item.companyInfo}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {item.tag.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 border border-zinc-100 dark:border-zinc-800 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {item.projectDetails && item.projectDetails.length > 0 && (
                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="group/btn flex items-center gap-4 text-xs font-black text-zinc-900 dark:text-white hover:opacity-70 transition-all uppercase tracking-widest"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover/btn:bg-zinc-900 group-hover/btn:text-white dark:group-hover/btn:bg-white dark:group-hover/btn:text-zinc-900 transition-all duration-300">
                          <Briefcase size={16} />
                        </div>
                        <span className="flex flex-col items-start gap-0.5">
                          <span className="opacity-50 text-[10px]">Case Studies</span>
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
                                      className="relative p-8 rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-800/20 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all group/pj"
                                    >
                                      <div className="flex justify-between items-start gap-4 mb-4">
                                        <h4 className="text-lg font-black text-zinc-900 dark:text-white group-hover/pj:text-zinc-900 transition-colors">
                                          {pj.title}
                                        </h4>
                                        <span className="text-[10px] font-black text-zinc-400 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full shadow-sm border border-zinc-100 dark:border-zinc-800">
                                          {formatPeriod(pj.periodStart, pj.periodEnd)}
                                        </span>
                                      </div>
                                      <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
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
      </div>
    </section>
  )
}
