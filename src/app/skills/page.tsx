'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { skills } from '@/data/skills'

export default function Skills() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="skills"
      className="flex flex-col items-center min-h-full bg-white dark:bg-[#1a1f24] p-8 md:p-16"
    >
      <div className="w-full max-w-4xl">
        <header className="mb-10 text-center">
          <span className="text-zinc-400 text-xs font-black tracking-[0.2em] uppercase">
            Tech Stack
          </span>
          <div className="mt-4 h-1 w-12 bg-zinc-900 dark:bg-white mx-auto rounded-full" />
        </header>

        {loading ? (
          <div className="space-y-12">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="animate-pulse flex items-start gap-8">
                <div className="w-16 h-16 bg-zinc-100 rounded-2xl shrink-0" />
                <div className="flex-1 space-y-4 pt-2">
                  <div className="h-4 w-24 bg-zinc-100 rounded" />
                  <div className="flex gap-2">
                    <div className="h-8 w-20 bg-zinc-100 rounded-full" />
                    <div className="h-8 w-24 bg-zinc-100 rounded-full" />
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
                className="flex flex-col md:flex-row items-start gap-8 group"
              >
                <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 transition-colors">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
                    {category.title}
                    <span className="h-[1px] flex-1 bg-zinc-100 dark:bg-zinc-800" />
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="relative px-5 py-2.5 rounded-2xl bg-zinc-50 dark:bg-[#273038] hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all group/item"
                      >
                        <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300 group-hover/item:text-zinc-900 dark:group-hover/item:text-white transition-colors">
                          {skill.name}
                        </span>
                        <div
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] rounded-full transition-all group-hover/item:w-1/2"
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
      </div>
    </section>
  )
}
