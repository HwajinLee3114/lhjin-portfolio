'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Mail, Linkedin, FileText, Globe } from 'lucide-react'

import SlideButton from '@/components/button/SlideButton'
import SectionFrame from '@/components/common/SectionFrame'

export default function About() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [])

  const socialLinks = [
    {
      id: 'github',
      title: 'GitHub',
      url: 'https://github.com/HwajinLee3114',
      icon: Github,
      desc: '소스 코드 저장소',
    },
    {
      id: 'blog',
      title: 'Tistory',
      url: 'https://lhjini.tistory.com',
      icon: Globe,
      desc: '기술 블로그',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hwajinlee',
      icon: Linkedin,
      desc: '커리어 네트워크',
    },
  ]

  return (
    <SectionFrame id="about" title="Profile" headerClassName="mb-8">
      {loading ? (
        <div className="animate-pulse space-y-12">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="h-48 w-48 shrink-0 rounded-full bg-zinc-100" />
            <div className="flex-1 space-y-4">
              <div className="h-4 w-48 rounded bg-zinc-100" />
              <div className="h-4 w-full rounded bg-zinc-100" />
              <div className="h-4 w-full rounded bg-zinc-100" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16"
          >
            <div className="relative shrink-0">
              <div className="h-48 w-48 rotate-3 overflow-hidden rounded-[3rem] border-4 border-white bg-zinc-100 shadow-xl transition-transform duration-500 hover:rotate-0 dark:border-zinc-900 dark:bg-zinc-800">
                <img
                  src="/images/profile.jpg"
                  alt="Profile"
                  className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg dark:bg-white dark:text-zinc-900">
                <FileText size={20} />
              </div>
            </div>

            <div className="flex-1 pt-2 text-center md:text-left">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <h3 className="text-3xl font-black text-zinc-900 dark:text-white">이화진</h3>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Frontend Developer
                </span>
              </div>

              <p className="mb-8 text-xl font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
                지속적인 변화에 도전하며 <br className="hidden md:block" />더 나은 사용자 경험을
                고민하는 개발자입니다.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
                <SlideButton
                  text="이력서 다운로드"
                  url="/files/resume.pdf"
                  isDown={true}
                  color="#dbeafe"
                />{' '}
                <a
                  href="mailto:hwajin3114@gmail.com"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-50 px-6 py-4 text-sm font-black text-zinc-900 transition-colors hover:bg-zinc-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                >
                  <Mail size={18} />
                  CONTACT ME
                </a>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {socialLinks.map((link, idx) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="group rounded-[1.5rem] border border-zinc-100 bg-zinc-50/50 p-5 transition-all duration-500 hover:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:border-white"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-900 dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                    <Icon size={20} />
                  </div>
                  <h4 className="mb-1 text-lg font-black text-zinc-900 dark:text-white">
                    {link.title}
                  </h4>
                  <p className="text-sm font-medium text-zinc-400 transition-colors group-hover:text-zinc-600">
                    {link.desc}
                  </p>
                </motion.a>
              )
            })}
          </div>
        </div>
      )}
    </SectionFrame>
  )
}
