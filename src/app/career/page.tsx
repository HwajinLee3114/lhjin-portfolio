'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { career } from '@/data/career'
import { projects } from '@/data/projects'
import { formatPeriod } from '@/lib/period'

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

  return (
    <section
      id="career"
      className="flex flex-col items-center justify-center min-h-screen bg-themacolor1 dark:bg-[#1f262e] dark:text-darkfg"
    >
      <h2 className="text-3xl g_titleEngFontBlack mt-3">Career</h2>
      <p className="my-4"></p>

      <div className="max-w-2xl w-full">
        <ul className="relative flex flex-col gap-6 pl-6 border-l border-black/10 dark:border-white/10">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <li
                  key={`career_skeleton_${idx}`}
                  className="relative bg-white/80 dark:bg-[#273038] rounded-xl shadow-md p-4"
                >
                  <span className="absolute left-[-1.9rem] top-6 h-3 w-3 rounded-full bg-themacolor4 shadow ring-4 ring-themacolor1 dark:ring-[#1f262e]" />
                  <div className="skeleton h-5 w-40 mb-2" />
                  <div className="skeleton h-4 w-56 mb-3" />
                  <div className="skeleton h-4 w-full mb-3" />
                  <div className="flex gap-2">
                    <div className="skeleton h-6 w-16 rounded-full" />
                    <div className="skeleton h-6 w-20 rounded-full" />
                    <div className="skeleton h-6 w-14 rounded-full" />
                  </div>
                </li>
              ))
            : sortedCareer.map((item, index) => (
                <li
                  key={`career_${index}`}
                  className="relative bg-white/90 dark:bg-[#273038] rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow"
                  // initial={{ opacity: 0, y: 20 }}
                  // whileInView={{ opacity: 1, y: 0 }}
                  // transition={{
                  //   ease: "easeInOut",
                  //   duration: 0.5,
                  //   delay: sortedCareer.indexOf(item) * 0.1,
                  //   y: { duration: 0.5 },
                  // }}
                >
                  <span className="absolute left-[-1.9rem] top-6 h-3 w-3 rounded-full bg-themacolor4 shadow ring-4 ring-themacolor1 dark:ring-[#1f262e]" />
                  <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                    <h2 className="text-lg font-bold">{item.company}</h2>
                  </div>
                  <div className="flex flex-col gap-1 mb-1">
                    {item.roles.map((roleItem, roleIndex) => (
                      <div
                        key={`${item.id}_role_${roleIndex}`}
                        className="text-gray-600 dark:text-darkfg/80 text-sm md:text-base"
                      >
                        {roleItem.role} {roleItem.role ? '· ' : ''}
                        {formatPeriod(roleItem.periodStart, roleItem.periodEnd)}
                      </div>
                    ))}
                  </div>
                  <div className="my-2">{item.companyInfo}</div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {item.tag.map((t, idx) => (
                      <p
                        key={`carrerTag_${idx}`}
                        className="text-xs px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80"
                      >
                        {t}
                      </p>
                    ))}
                  </div>

                  {item.projectDetails && item.projectDetails.length > 0 && (
                    <div className="mt-3">
                      <button
                        type="button"
                        className="text-sm font-semibold text-themacolor4 hover:text-themacolor4/80 inline-flex items-center gap-2"
                        onClick={() =>
                          setOpenItems((prev) => ({
                            ...prev,
                            [item.id]: !prev[item.id],
                          }))
                        }
                        aria-expanded={!!openItems[item.id]}
                        aria-controls={`career-details-${item.id}`}
                      >
                        자세히 보기
                        <span
                          className={`transition-transform ${openItems[item.id] ? 'rotate-180' : 'rotate-0'}`}
                        >
                          ▾
                        </span>
                      </button>

                      <div
                        id={`career-details-${item.id}`}
                        className={`transition-all duration-300 ease-out overflow-hidden ${
                          openItems[item.id] ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="mt-3 space-y-3 rounded-xl bg-gradient-to-br from-black/5 via-black/0 to-black/5 dark:from-white/5 dark:via-white/0 dark:to-white/5 p-4 ring-1 ring-black/5 dark:ring-white/5">
                          {item.projectDetails.map(
                            (pj, idx) =>
                              pj && (
                                <section
                                  className="rounded-lg bg-white/70 dark:bg-[#1f272e]/70 p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5"
                                  key={`${pj.id}_career_${idx}`}
                                >
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <div className="flex items-center gap-2">
                                      <span className="h-2 w-2 rounded-full bg-themacolor4 shadow-[0_0_12px_rgba(80,160,255,0.5)]" />
                                      <h3 className="text-sm md:text-base font-semibold text-gray-800 dark:text-darkfg">
                                        {pj.title}
                                      </h3>
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-500 dark:text-darkfg/70">
                                      {formatPeriod(pj.periodStart, pj.periodEnd)}
                                    </div>
                                  </div>
                                  <div className="h-px w-full bg-black/5 dark:bg-white/5 mb-2" />
                                  <div className="text-gray-700 dark:text-darkfg/90 leading-relaxed text-sm md:text-base">
                                    {pj.description}
                                  </div>
                                  <div className="mt-2 text-xs text-gray-500 dark:text-darkfg/60">
                                    {formatPeriod(pj.periodStart, pj.periodEnd)}
                                  </div>
                                </section>
                              ),
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
        </ul>
      </div>
    </section>
  )
}
