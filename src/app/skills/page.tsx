'use client'

import React, { useEffect, useState } from 'react'

import SkillItem from '@/components/skill/SkillItem'
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
      className="flex flex-col items-center justify-center bg-themacolor2 dark:bg-[#1f2a24] dark:text-darkfg min-h-50 md:min-h-35 md:h-full"
    >
      <h2 className="text-3xl g_titleEngFontBlack mt-52 md:mt-0">Skills</h2>
      <p className="mt-4">지속적인 변화에 도전하며 개발 역량을 확장하고 있습니다</p>

      <div className="w-full xl:w-9/12 shadow-md mt-5 rounded-lg bg-themacolor1 dark:bg-[#273038] p-5 md:p-10">
        {loading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`skill_skeleton_${idx}`}
                className="flex flex-col md:flex-row gap-5 items-center"
              >
                <div className="skeleton w-14 h-14 rounded-full" />
                <div className="skeleton h-5 w-24" />
                <div className="flex gap-3 flex-wrap">
                  {Array.from({ length: 6 }).map((__, j) => (
                    <div
                      key={`skill_skeleton_tag_${idx}_${j}`}
                      className="skeleton h-6 w-16 rounded-full"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          skills.map((skill, index) => (
            <SkillItem
              key={`skills_${index}`}
              title={skill.title}
              skills={skill.skills}
              img={skill.img}
            />
          ))
        )}
      </div>
    </section>
  )
}
