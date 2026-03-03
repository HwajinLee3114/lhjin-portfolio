'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import SectionFrame from '@/components/common/SectionFrame'
import { skills } from '@/data/skills'

export default function Skills() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [])

  return (
    <SectionFrame id="skills" title="Tech Stack">
      {loading ? (
        <div className="space-y-12">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="animate-pulse flex items-start gap-8">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-zinc-100" />
              <div className="flex-1 space-y-4 pt-2">
                <div className="h-4 w-24 rounded bg-zinc-100" />
                <div className="flex gap-2">
                  <div className="h-8 w-20 rounded-full bg-zinc-100" />
                  <div className="h-8 w-24 rounded-full bg-zinc-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {skills.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col items-start gap-8 md:flex-row"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-zinc-50 transition-colors group-hover:bg-zinc-100 dark:bg-zinc-800/50 dark:group-hover:bg-zinc-800">
                <img
                  src={category.img}
                  alt={category.title}
                  className="h-12 w-12 object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>

              <div className="flex-1 pt-1">
                <h3 className="mb-4 flex items-center gap-3 text-lg font-black text-zinc-900 dark:text-white">
                  {category.title}
                  <span className="h-[1px] flex-1 bg-zinc-100 dark:bg-zinc-800" />
                </h3>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/item relative rounded-2xl bg-zinc-50 px-5 py-2.5 transition-all hover:bg-zinc-100 dark:bg-[#273038] dark:hover:bg-zinc-700"
                    >
                      <span className="text-sm font-bold text-zinc-600 transition-colors group-hover/item:text-zinc-900 dark:text-zinc-300 dark:group-hover/item:text-white">
                        {skill.name}
                      </span>
                      <div
                        className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full transition-all group-hover/item:w-1/2"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </SectionFrame>
  )
}
