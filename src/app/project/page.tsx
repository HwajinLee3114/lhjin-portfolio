import { Suspense } from 'react'

import ProjectsSection from '@/components/project/ProjectsSection'

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProjectsSection />
    </Suspense>
  )
}
