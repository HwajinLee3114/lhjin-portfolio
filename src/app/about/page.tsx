import React from 'react'

import SlideButton from '@/components/button/SlideButton'
import ProfileCircle from '@/components/about/ProfileCircle'
import HoverAMenu from '@/components/comn/HoverAMenu'

export default function About() {
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
