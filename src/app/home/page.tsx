'use client'

import React, { useState, useEffect } from 'react'

import ScrollDownBtn from '@/components/button/ScrollDownBtn'
import { projects } from '@/data/projects'

export default function HomeSec() {
  const content = '프론트엔드 개발자 이화진 입니다'
  const [title, setTitle] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const totalProjects = projects.length
  const featuredProjects = projects.filter((project) =>
    project.filter.some((f) => f.name === 'feature'),
  ).length

  useEffect(() => {
    const lf_typing = () => {
      if (index < content.length) {
        setTitle((prev) => prev + content[index])
        setIndex((prev) => prev + 1)
      }
    }

    const interval = setInterval(lf_typing, 100)
    return () => clearInterval(interval)
  }, [index, content])

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-35 h-full bg-white dark:bg-[#1f262e] dark:text-darkfg overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(122,166,255,0.25),transparent_55%)]" />
      <div className="l_search_div flex relative">
        <img
          src="/images/search-240.svg"
          alt="icon"
          className="absolute left-2 w-7 md:w-12 md:h-8 lg:w-16 lg:h-10"
        />
        <h1 className="l_main_title g_RiaSansFont text-base md:text-xl lg:text-3xl font-bold text-center text-themacolor2">
          {title}
        </h1>
      </div>
      <p className="mt-4 text-sm md:text-base text-gray-700 dark:text-darkfg/80 text-center max-w-xl">
        사용자 경험과 성능을 동시에 개선하는 프론트엔드 개발을 지향합니다. 문제 정의부터
        UI 구현, 성과 측정까지 일관된 흐름으로 작업합니다.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href="#projects"
          className="px-4 py-2 rounded-full bg-themacolor4 text-white font-semibold shadow hover:shadow-lg transition-shadow"
        >
          프로젝트 보기
        </a>
        <a
          href="/files/resume.pdf"
          className="px-4 py-2 rounded-full border border-themacolor4 text-themacolor4 font-semibold hover:bg-themacolor4 hover:text-white transition-colors"
        >
          이력서 다운로드
        </a>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <div className="rounded-xl bg-white/80 dark:bg-[#273038]/80 backdrop-blur px-4 py-3 shadow">
          <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-darkfg/70">
            Projects
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-darkfg">{totalProjects}+</div>
        </div>
        <div className="rounded-xl bg-white/80 dark:bg-[#273038]/80 backdrop-blur px-4 py-3 shadow">
          <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-darkfg/70">
            Feature
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-darkfg">
            {featuredProjects}+
          </div>
        </div>
        <div className="rounded-xl bg-white/80 dark:bg-[#273038]/80 backdrop-blur px-4 py-3 shadow">
          <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-darkfg/70">
            Domain
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-darkfg">B2B·B2C</div>
        </div>
      </div>

      <ScrollDownBtn />
    </section>
  )
}
