'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Monitor, FileText, Rss } from 'lucide-react'
import Link from 'next/link'

import { projects } from '@/data/projects'
import { FILTER_NAMES, filterProjects } from '@/data/filters'
import SkillList from '@/components/skills/SkillList'
import { profile } from '@/data/profile'
import { socialLinks } from '@/data/socialLinks'
import { cn } from '@/lib/utils'
import { fadeUp } from '@/lib/animations'
import SlideButton from '@/components/button/SlideButton'
import FilterButton from '@/components/common/FilterButton'
import SectionHeader from '@/components/common/SectionHeader'
import ProjectCard from '@/components/project/ProjectCard'
import CareerList from '@/components/career/CareerList'

const sectionIds = ['about', 'skills', 'projects', 'career'] as const

export default function ResumePage() {
  const [filter, setFilter] = useState('feature')
  const [activeSection, setActiveSection] = useState<string>('about')
  const [blogPosts, setBlogPosts] = useState<{ title: string; link: string; pubDate: string }[]>([])

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => setBlogPosts(d.posts || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const entries = new Map<string, boolean>()

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          entries.set(id, entry.isIntersecting)
          const visible = sectionIds.filter((s) => entries.get(s))
          if (visible.length > 0) setActiveSection(visible[0])
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const filteredProjects = useMemo(
    () =>
      filterProjects(projects, filter).sort((a, b) =>
        (b.periodStart || '').localeCompare(a.periodStart || ''),
      ),
    [filter],
  )

  return (
    <div className="min-h-dvh bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <nav className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/os" className="text-sm font-black tracking-tighter">
            LHJIN
          </Link>
          <div className="flex items-center gap-6">
            {sectionIds.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'hidden text-xs font-bold uppercase tracking-widest transition-colors sm:inline-block',
                  activeSection === id
                    ? 'text-zinc-900 dark:text-white'
                    : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white',
                )}
              >
                {id}
                {activeSection === id && (
                  <span className="block mx-auto mt-1 h-0.5 w-full rounded-full bg-zinc-900 dark:bg-white" />
                )}
              </a>
            ))}
            <Link
              href="/resume/preview"
              className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-4 py-2 text-[11px] font-black text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <FileText size={14} />
              이력서 미리보기
            </Link>
            <Link
              href="/os"
              className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-[11px] font-black text-white transition-all hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Monitor size={14} />
              OS 모드
            </Link>
          </div>
        </div>
      </nav>

      <section id="about" className="mx-auto max-w-5xl px-6 py-16">
        <motion.div {...fadeUp} className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
          <div className="relative shrink-0">
            <div className="relative h-40 w-40 rotate-3 overflow-hidden rounded-[3rem] border-4 border-white bg-zinc-100 shadow-xl transition-transform duration-500 hover:rotate-0 dark:border-zinc-800">
              <Image
                src={profile.profileImage}
                alt={profile.name}
                fill
                sizes="160px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <h1 className="text-4xl font-black tracking-tight">{profile.name}</h1>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {profile.role}
              </span>
            </div>
            <p className="mb-6 text-lg font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
              {profile.intro}
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <SlideButton
                text="이력서 다운로드"
                url="/files/resume.pdf"
                isDown={true}
                color="#dbeafe"
              />
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded-2xl bg-zinc-50 px-5 py-3.5 text-sm font-black text-zinc-900 transition-colors hover:bg-zinc-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
              >
                <Mail size={18} />
                CONTACT ME
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-600"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-800 dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-black">{link.title}</p>
                  <p className="text-xs text-zinc-400">{link.desc}</p>
                </div>
              </a>
            )
          })}
        </motion.div>
      </section>

      <section
        id="skills"
        className="border-t border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30"
      >
        <div className="mx-auto max-w-5xl px-6 py-20">
          <motion.div {...fadeUp}>
            <SectionHeader title="Tech Stack" />
          </motion.div>

          <SkillList
            variant={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
          />
        </div>
      </section>

      <section id="projects" className="border-t border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <motion.div {...fadeUp}>
            <SectionHeader title="Projects" />
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mb-10 flex flex-wrap items-center justify-center gap-3"
          >
            {FILTER_NAMES.map((f) => (
              <FilterButton key={f} isActive={filter === f} onClick={() => setFilter(f)}>
                {f}
              </FilterButton>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="career"
        className="border-t border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30"
      >
        <div className="mx-auto max-w-5xl px-6 py-20">
          <motion.div {...fadeUp}>
            <SectionHeader title="Career" />
          </motion.div>

          <CareerList
            variant={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
          />
        </div>
      </section>

      {blogPosts.length > 0 && (
        <section className="border-t border-zinc-100 dark:border-zinc-800">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <motion.div {...fadeUp}>
              <SectionHeader title="Blog" />
            </motion.div>
            <div className="space-y-3">
              {blogPosts.map((post) => (
                <motion.a
                  key={post.link}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...fadeUp}
                  className="group flex items-center justify-between rounded-2xl border border-zinc-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-center gap-3">
                    <Rss
                      size={14}
                      className="shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
                    />
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                      {post.title}
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] text-zinc-400">
                    {new Date(post.pubDate).toLocaleDateString('ko-KR')}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
          <span className="text-xs font-bold text-zinc-400">
            &copy; {new Date().getFullYear()} LHJIN
          </span>
          <Link
            href="/os"
            className="text-xs font-bold text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white"
          >
            OS 모드로 보기 →
          </Link>
        </div>
      </footer>
    </div>
  )
}
