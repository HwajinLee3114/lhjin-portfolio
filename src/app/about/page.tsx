'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, Mail, Linkedin, FileText, Globe } from 'lucide-react'

import SlideButton from '@/components/button/SlideButton'
import SectionFrame from '@/components/common/SectionFrame'
import { profile } from '@/data/profile'

export default function About() {
  const socialLinks = [
    {
      id: 'github',
      title: 'GitHub',
      url: profile.social.github,
      icon: Github,
      desc: '소스 코드 저장소',
    },
    { id: 'blog', title: 'Tistory', url: profile.social.blog, icon: Globe, desc: '기술 블로그' },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      url: profile.social.linkedin,
      icon: Linkedin,
      desc: '커리어 네트워크',
    },
  ]

  return (
    <SectionFrame id="about" title="Profile" headerClassName="mb-8">
      <div className="flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-16"
        >
          <div className="relative shrink-0">
            <div className="relative h-36 w-36 md:h-48 md:w-48 rotate-3 overflow-hidden rounded-[2.25rem] md:rounded-[3rem] border-4 border-white bg-zinc-100 shadow-xl transition-transform duration-500 hover:rotate-0 dark:border-zinc-900 dark:bg-zinc-800">
              <Image
                src={profile.profileImage}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 144px, 192px"
                className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                priority
              />
            </div>
            <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-zinc-900 text-white shadow-lg dark:bg-white dark:text-zinc-900">
              <FileText size={20} />
            </div>
          </div>

          <div className="flex-1 pt-1 text-center md:text-left">
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">
                {profile.name}
              </h3>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-blue-600 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {profile.role}
              </span>
            </div>

            <p className="mb-6 text-base md:text-md font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
              {profile.intro}
            </p>

            <div className="flex flex-col justify-center gap-3 md:flex-row md:flex-wrap md:justify-start">
              <SlideButton
                text="이력서 다운로드"
                url="/files/resume.pdf"
                isDown={true}
                color="#dbeafe"
              />{' '}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-50 px-5 py-3.5 text-xs md:text-sm font-black text-zinc-900 transition-colors hover:bg-zinc-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
              >
                <Mail size={18} />
                CONTACT ME
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
                className="group rounded-[2rem] md:rounded-[2.5rem] border border-zinc-100 bg-zinc-50/50 p-6 md:p-8 transition-all duration-500 hover:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:border-white"
              >
                <div className="mb-4 md:mb-6 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-900 dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                  <Icon size={20} />
                </div>
                <h4 className="mb-1.5 text-base md:text-lg font-black text-zinc-900 dark:text-white">
                  {link.title}
                </h4>
                <p className="text-xs md:text-sm font-medium text-zinc-400 transition-colors group-hover:text-zinc-600">
                  {link.desc}
                </p>
              </motion.a>
            )
          })}
        </div>
      </div>
    </SectionFrame>
  )
}
