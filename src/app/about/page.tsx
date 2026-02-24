'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Mail, Linkedin, FileText, Globe } from 'lucide-react'

import SlideButton from '@/components/button/SlideButton'

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
    <section
      id="about"
      className="flex flex-col items-center min-h-full bg-white dark:bg-[#1a1f24] p-8 md:p-16"
    >
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center">
          <span className="text-zinc-400 text-xs font-black tracking-[0.2em] uppercase">
            Profile
          </span>
          <div className="mt-4 h-1 w-12 bg-zinc-900 dark:bg-white mx-auto rounded-full" />
        </header>

        {loading ? (
          <div className="animate-pulse space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 bg-zinc-100 rounded-full shrink-0" />
              <div className="flex-1 space-y-4">
                <div className="h-4 w-48 bg-zinc-100 rounded" />
                <div className="h-4 w-full bg-zinc-100 rounded" />
                <div className="h-4 w-full bg-zinc-100 rounded" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16"
            >
              <div className="relative shrink-0">
                <div className="w-48 h-48 rounded-[3rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl border-4 border-white dark:border-zinc-900">
                  <img
                    src="/images/profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-zinc-900 shadow-lg">
                  <FileText size={20} />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left pt-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                  <h3 className="text-3xl font-black text-zinc-900 dark:text-white">이화진</h3>
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest border border-blue-100 dark:border-blue-800">
                    Frontend Developer
                  </span>
                </div>

                <p className="text-xl font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                  지속적인 변화에 도전하며 <br className="hidden md:block" />더 나은 사용자 경험을
                  고민하는 개발자입니다.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <SlideButton
                    text="이력서 다운로드"
                    url="/files/resume.pdf"
                    isDown={true}
                    color="#dbeafe"
                  />{' '}
                  <a
                    href="mailto:hwajin3114@gmail.com"
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-sm font-black text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <Mail size={18} />
                    CONTACT ME
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Social Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className="group p-8 rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-all duration-500">
                      <Icon size={20} />
                    </div>
                    <h4 className="text-lg font-black text-zinc-900 dark:text-white mb-2">
                      {link.title}
                    </h4>
                    <p className="text-sm font-medium text-zinc-400 group-hover:text-zinc-600 transition-colors">
                      {link.desc}
                    </p>
                  </motion.a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
