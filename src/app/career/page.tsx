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
                <li key={`career_skeleton_${idx}`} className="relative bg-white/80 dark:bg-[#273038] rounded-xl shadow-md p-4">
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
                  className="relative bg-white/90 dark:bg-[#273038] rounded-xl shadow-md p-5 hover:shadow-xl"
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

                  {item.projectDetails &&
                    item.projectDetails.map(
                      (pj, idx) =>
                        pj && (
                          <section className="mt-3 rounded-lg bg-black/5 dark:bg-white/5 p-3" key={`${pj.id}_career_${idx}`}>
                            <div className="py-1 pl-3 mb-2 border-l-2 border-gray-600 dark:border-darkfg/40 text-gray-600 dark:text-darkfg/80 bg-quotecolor/60 dark:bg-[#273038]/60">
                              {pj.title}
                            </div>
                            <div className="text-gray-600 dark:text-darkfg/80 text-base md:text-sm mb-1">
                              {formatPeriod(pj.periodStart, pj.periodEnd)}
                            </div>
                            <div>{pj.description}</div>
                          </section>
                        ),
                    )}
                </li>
              ))}
        </ul>
      </div>
    </section>
  )
}
