'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import SectionFrame from '@/components/common/SectionFrame'
import { skills } from '@/data/skills'

export default function Skills() {
  return (
    <SectionFrame id="skills" title="Tech Stack">
      <div className="space-y-8">
        {skills.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="group flex flex-col gap-5 md:flex-row md:items-start"
          >
            <div className="flex items-center gap-3 md:w-32 md:shrink-0 md:pt-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-50 transition-colors group-hover:bg-zinc-100 dark:bg-zinc-800/50 dark:group-hover:bg-zinc-800">
                <Image
                  src={category.img}
                  alt={category.title}
                  width={28}
                  height={28}
                  className="object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              <h3 className="text-base font-black text-zinc-900 dark:text-white">
                {category.title}
              </h3>
            </div>

            <div className="flex flex-1 flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: `${skill.color}18`,
                    color: skill.color,
                    border: `1px solid ${skill.color}25`,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  )
}
