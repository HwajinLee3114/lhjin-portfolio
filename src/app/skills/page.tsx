import React from 'react'

import SkillItem from '@/components/skill/SkillItem'
import { skills } from '@/data/skills'

export default function Skills() {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center bg-themacolor2 min-h-50 md:min-h-35 md:h-full"
    >
      <h2 className="text-3xl g_titleEngFontBlack mt-52 md:mt-0">Skills</h2>
      <p className="mt-4">지속적인 변화에 도전하며 개발 역량을 확장하고 있습니다</p>

      <div className="w-full xl:w-9/12 h-3/5 md:h-96 shadow-md mt-5 rounded-lg bg-themacolor1 p-5 md:p-10">
        {skills.map((skill, index) => (
          <SkillItem
            key={`skills_${index}`}
            title={skill.title}
            skills={skill.skills}
            img={skill.img}
          />
        ))}
      </div>
    </section>
  )
}
