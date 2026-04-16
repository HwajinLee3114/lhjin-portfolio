'use client'

import React from 'react'

import SectionFrame from '@/components/common/SectionFrame'
import CareerList from '@/components/career/CareerList'

export default function Career() {
  return (
    <SectionFrame id="career" title="Career">
      <CareerList />
    </SectionFrame>
  )
}
