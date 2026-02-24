'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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
        <header className="mb-16 text-center">
          <span className="text-zinc-400 text-xs font-black tracking-[0.2em] uppercase">
            Journey
          </span>
          <h2 className="mt-2 text-3xl font-black text-zinc-900 dark:text-white">
            나의 경력 및 경험
          </h2>
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
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-zinc-50 rounded-full" />
                    <div className="h-6 w-16 bg-zinc-50 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {sortedCareer.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col md:flex-row gap-8"
              >
                {/* Logo Placeholder */}
                <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-400 font-black text-2xl group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-all duration-300">
                  {item.company.charAt(0)}
                </div>

                <div className="flex-1 pt-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                      {item.company}
                    </h3>
                    <div className="flex flex-col items-start md:items-end gap-1 text-sm font-bold text-zinc-400">
                      {item.roles.map((role, rIdx) => (
                        <div key={rIdx}>
                          {role.role} · {formatPeriod(role.periodStart, role.periodEnd)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed font-medium">
                    {item.companyInfo}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tag.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-[11px] font-black text-zinc-400 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {item.projectDetails && item.projectDetails.length > 0 && (
                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="flex items-center gap-2 text-xs font-black text-zinc-900 dark:text-white hover:opacity-70 transition-opacity uppercase tracking-widest"
                      >
                        Projects
                        <ChevronDown
                          size={14}
                          className={cn(
                            'transition-transform duration-300',
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
                            <div className="mt-4 space-y-4 pb-4">
                              {item.projectDetails.map(
                                (pj) =>
                                  pj && (
                                    <div
                                      key={pj.id}
                                      className="p-5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800"
                                    >
                                      <div className="flex justify-between items-start gap-4 mb-2">
                                        <h4 className="text-sm font-black text-zinc-900 dark:text-white">
                                          {pj.title}
                                        </h4>
                                        <span className="text-[10px] font-black text-zinc-400">
                                          {formatPeriod(pj.periodStart, pj.periodEnd)}
                                        </span>
                                      </div>
                                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                                        {pj.description}
                                      </p>
                                    </div>
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
