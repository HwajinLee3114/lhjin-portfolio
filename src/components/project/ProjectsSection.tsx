'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'

import { projects } from '@/data/projects'
import ProjectCard from '@/components/project/ProjectCard'

export default function ProjectsSection() {
  const [filter, setFilter] = useState<string>('feature')
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const q = searchParams.get('filter')
    if (q && q !== filter) setFilter(q)
  }, [searchParams, filter])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('filter', filter)
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [filter, router, searchParams])

  const filteredPj = projects
    .filter((project) => {
      if (filter === 'personal') return project.filter.some((f) => f.name === 'personal')
      if (filter === 'team') return project.filter.some((f) => f.name === 'team')
      if (filter === 'feature') return project.filter.some((f) => f.name === 'feature')
      return true
    })
    .filter((project) => {
      if (!query.trim()) return true
      const q = query.toLowerCase()
      const inTitle = project.title.toLowerCase().includes(q)
      const inDesc = project.description.toLowerCase().includes(q)
      const inSkill = project.skillItem.some((s) => s.name.toLowerCase().includes(q))
      return inTitle || inDesc || inSkill
    })
    .sort((a, b) => Number(b.id) - Number(a.id))

  return (
    <section id="projects" className="flex flex-col min-h-screen bg-themacolor3 dark:bg-[#202a24]">
      <div className="text-center text-white dark:text-darkfg">
        <h2 className="text-3xl g_titleEngFontOutline mt-5">Projects</h2>
        {/* <p className="mt-4">다양한 프로젝트 경험을 통해</p> */}
      </div>

      <div className="flex flex-col items-center gap-4 mt-10">
        <ul className="l_pjfilter flex gap-3 cursor-pointer justify-center">
          <img src="/images/filterYellow-100.png" className="w-6" alt="filter" />
          <li
            className={`cursor-pointer g_RiaSansFont ${filter === 'all' ? 'selected' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </li>
          <li
            className={`cursor-pointer g_RiaSansFont ${filter === 'feature' ? 'selected' : ''}`}
            onClick={() => setFilter('feature')}
          >
            Feature
          </li>
          <li
            className={`cursor-pointer g_RiaSansFont ${filter === 'personal' ? 'selected' : ''}`}
            onClick={() => setFilter('personal')}
          >
            Personal
          </li>
          <li
            className={`cursor-pointer g_RiaSansFont ${filter === 'team' ? 'selected' : ''}`}
            onClick={() => setFilter('team')}
          >
            Team
          </li>
        </ul>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="프로젝트 검색 (제목/설명/스택)"
          className="w-full max-w-md px-4 py-2 rounded-full border border-black/10 bg-white/80 dark:bg-[#273038] dark:text-darkfg"
        />
      </div>
      {/* link, imageSrc */}
      {/*
        initial: 시작 상태. opacity, 위치 지정
        whileInView: 뷰 진입 시. opacity, 위치 지정
        transition: 전환 효과 / ease: 속도 조절 함수. duration: 지속 시간. delay: 지연.
      */}
      <div className="w-full h-full flex-grow shadow-md mt-5 mb-5 rounded-lg bg-themacolor1 dark:bg-[#273038] p-5 md:p-10">
        <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-14 font-scoreRegular">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <li key={`project_skeleton_${idx}`} className="w-full max-w-sm">
                  <div className="skeleton w-full h-48 mb-3" />
                  <div className="skeleton h-5 w-2/3 mb-2" />
                  <div className="skeleton h-4 w-1/2 mb-3" />
                  <div className="flex gap-2">
                    <div className="skeleton h-6 w-16 rounded-full" />
                    <div className="skeleton h-6 w-16 rounded-full" />
                  </div>
                </li>
              ))
            : filteredPj.map((project, index) => (
                <motion.li
                  key={`project_${project.id}`}
                  className="w-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                >
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    periodStart={project.periodStart}
                    periodEnd={project.periodEnd}
                    skillItem={project.skillItem}
                    filter={project.filter}
                    imageSrc={project.thumb}
                    feature={project.feature}
                    description={project.description}
                  />
                </motion.li>
              ))}
        </ul>
      </div>
    </section>
  )
}
