'use client'

import { Suspense, useState } from 'react'

import About from './about/page'
import Career from './career/page'
import HomeSec from './home/page'
import Skills from './skills/page'

import Footer from '@/components/comn/Footer'
import Header from '@/components/comn/Header'
import ScrollTopButton from '@/components/comn/ScrollTopButton'
import ProjectsSection from '@/components/project/ProjectsSection'

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('')
  return (
    <div>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <HomeSec />
        <About />
        <Skills />
        <Suspense fallback={<div className="min-h-screen" />}>
          <ProjectsSection />
        </Suspense>
        <Career />
      </main>
      <Footer />
      <div id="modalTmp"></div>
      <ScrollTopButton />
    </div>
  )
}
