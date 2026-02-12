import React from 'react'

import SlideButton from '@/components/button/SlideButton'
import ProfileCircle from '@/components/about/ProfileCircle'
import HoverAMenu from '@/components/comn/HoverAMenu'
import { projects } from '@/data/projects'

export default function About() {
  const teamProjects = projects.filter((project) =>
    project.filter.some((f) => f.name === 'team'),
  ).length
  const personalProjects = projects.filter((project) =>
    project.filter.some((f) => f.name === 'personal'),
  ).length
  return (
    <section
      id="about"
      className="flex flex-col md:flex-row items-center gap-5 justify-around min-h-50 md:min-h-43 bg-themacolor3 dark:bg-[#202a24] dark:text-darkfg"
    >
      <div className="w-full md:w-96 text-center mb-5">
        <h2 className="text-2xl text-white g_titleEngFontBlack">About Me</h2>
        <p className="text-lg text-gray-300 dark:text-darkfg/80">
          개발자로서의 여정을
          <br />
          나누고 싶습니다
        </p>
      </div>

      <div className="h-full p-2 w-full md:w-2/4 flex flex-col items-center justify-center rounded-lg">
        <ProfileCircle />
        <div className="pb-5" />
        <SlideButton text="이력서 다운로드" url="/files/resume.pdf" isDown={true} color="#FAAD1A" />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-md">
          <div className="rounded-xl bg-white/90 dark:bg-[#273038] px-3 py-3 text-center shadow">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-darkfg/70">
              Team
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-darkfg">{teamProjects}+</div>
          </div>
          <div className="rounded-xl bg-white/90 dark:bg-[#273038] px-3 py-3 text-center shadow">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-darkfg/70">
              Personal
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-darkfg">
              {personalProjects}+
            </div>
          </div>
          <div className="rounded-xl bg-white/90 dark:bg-[#273038] px-3 py-3 text-center shadow">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-darkfg/70">
              Focus
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-darkfg">
              UX · 성능
            </div>
          </div>
        </div>
      </div>

      <div className="h-full flex-grow w-full flex flex-col items-center justify-center">
        <div className="flex flex-col flex-wrap xl:flex-row gap-5">
          <HoverAMenu
            url="https://github.com/HwajinLee3114"
            title="Git Hub"
            description="소스 코드 관리"
          />
          <HoverAMenu
            url="https://lhjini.tistory.com"
            title="lhjin.log"
            description="공부 및 기록 목적의 블로그"
          />
          <HoverAMenu url="https://www.linkedin.com/in/hwajinlee" title="링크드인" description="" />
        </div>
      </div>
    </section>
  )
}
