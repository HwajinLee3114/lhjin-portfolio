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
  const featuredProject = projects.find((project) => project.featured)

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
    <section
      id="projects"
      className="relative flex flex-col min-h-screen bg-themacolor3 dark:bg-[#202a24] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.2),transparent_55%)] dark:bg-[radial-gradient(circle_at_center,rgba(244,176,94,0.15),transparent_55%)]" />
      <div className="relative z-10 text-center text-white dark:text-darkfg">
        <h2 className="text-3xl g_titleEngFontOutline mt-5">Projects</h2>
        {/* <p className="mt-4">다양한 프로젝트 경험을 통해</p> */}
      </div>

      {featuredProject && featuredProject.caseStudy && (
        <div className="relative z-10 mt-6 w-full max-w-5xl mx-auto px-5">
          <div className="rounded-2xl bg-white/90 dark:bg-[#273038] shadow-xl p-6 ring-1 ring-black/5 dark:ring-white/5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-darkfg/70">
                  Featured Case Study
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-darkfg">
                  {featuredProject.title}
                </h3>
                {featuredProject.role && (
                  <p className="text-sm text-gray-600 dark:text-darkfg/70 mt-1">
                    {featuredProject.role}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {featuredProject.git && (
                  <a
                    href={featuredProject.git}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-sm"
                  >
                    GitHub
                  </a>
                )}
                {featuredProject.site && (
                  <a
                    href={featuredProject.site}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-full bg-themacolor4 text-white text-sm"
                  >
                    Live
                  </a>
                )}
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-themacolor1 dark:bg-[#1f262e] p-4">
                <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-darkfg/70">
                  Problem
                </p>
                <p className="mt-1 text-sm text-gray-700 dark:text-darkfg/90">
                  {featuredProject.caseStudy.problem}
                </p>
              </div>
              <div className="rounded-xl bg-themacolor1 dark:bg-[#1f262e] p-4">
                <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-darkfg/70">
                  Solution
                </p>
                <ul className="mt-1 text-sm text-gray-700 dark:text-darkfg/90 list-disc pl-5">
                  {featuredProject.caseStudy.solution.map((item, idx) => (
                    <li key={`solution_${idx}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-themacolor1 dark:bg-[#1f262e] p-4">
                <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-darkfg/70">
                  Result
                </p>
                <ul className="mt-1 text-sm text-gray-700 dark:text-darkfg/90 list-disc pl-5">
                  {featuredProject.caseStudy.result.map((item, idx) => (
                    <li key={`result_${idx}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-4 mt-10">
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
      <div className="relative z-10 w-full h-full flex-grow shadow-md mt-5 mb-5 rounded-lg bg-themacolor1 dark:bg-[#273038] p-5 md:p-10">
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
                    role={project.role}
                    impact={project.impact}
                    git={project.git}
                    site={project.site}
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
