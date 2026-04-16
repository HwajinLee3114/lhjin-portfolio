'use client'

import React from 'react'

import SectionFrame from '@/components/common/SectionFrame'
import SkillList from '@/components/skills/SkillList'

export default function Skills() {
  return (
    <SectionFrame id="skills" title="Tech Stack">
      <SkillList />
    </SectionFrame>
  )
}
