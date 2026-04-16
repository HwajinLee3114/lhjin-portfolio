'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Github,
  Mail,
  Linkedin,
  Globe,
  ChevronDown,
  Briefcase,
  ArrowUpRight,
  Monitor,
  FileText,
  Rss,
} from 'lucide-react'
import Link from 'next/link'

import { projects } from '@/data/projects'
import SkillList from '@/components/skills/SkillList'
import { sortedCareer } from '@/data/career'
import { profile } from '@/data/profile'
import { formatPeriod } from '@/lib/period'
import { cn } from '@/lib/utils'
import SlideButton from '@/components/button/SlideButton'
import TagBadge from '@/components/common/TagBadge'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

const sectionIds = ['about', 'skills', 'projects', 'career'] as const

export default function ResumePage() {
  const [openCareer, setOpenCareer] = useState<Record<string, boolean>>({})
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
      projects
        .filter((p) => {
          if (filter === 'all') return true
          return p.filter.some((f) => f.name === filter)
        })
        .sort((a, b) => (b.periodStart || '').localeCompare(a.periodStart || '')),
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
          {[
            { title: 'GitHub', url: profile.social.github, icon: Github, desc: '소스 코드 저장소' },
            { title: 'Tistory', url: profile.social.blog, icon: Globe, desc: '기술 블로그' },
            {
              title: 'LinkedIn',
              url: profile.social.linkedin,
              icon: Linkedin,
              desc: '커리어 네트워크',
            },
          ].map((link) => {
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
            {['all', 'feature', 'personal', 'team'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-xl px-4 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all',
                  filter === f
                    ? 'bg-zinc-900 text-white shadow-lg dark:bg-white dark:text-zinc-900'
                    : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700',
                )}
              >
                {f}
              </button>
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
                className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-white transition-all hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-50 dark:bg-zinc-800">
                  <Image
                    src={`/images/thumb/${project.thumb}`}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="text-base font-black leading-tight">{project.title}</h3>
                    <ArrowUpRight
                      size={14}
                      className="mt-1 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
                    />
                  </div>
                  <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {project.description}
                  </p>
                  <div className="mb-2 flex flex-wrap gap-1">
                    {project.filter.map((fil, fIdx) => (
                      <TagBadge key={fIdx} name={fil.name} color={fil.color} />
                    ))}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    {formatPeriod(project.periodStart, project.periodEnd)}
                  </p>
                </div>
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

          <div className="relative space-y-10">
            <div className="absolute bottom-10 left-8 top-10 hidden w-[2px] bg-gradient-to-b from-zinc-200 via-zinc-100 to-transparent dark:from-zinc-700 dark:via-zinc-800 md:block" />

            {sortedCareer.map((item, idx) => (
              <motion.div
                key={item.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.08 }}
                className="group relative flex flex-col gap-6 md:flex-row md:gap-10"
              >
                <div className="relative z-10 shrink-0">
                  <div
                    className={cn(
                      'flex h-16 w-16 items-center justify-center rounded-3xl border-2 text-2xl font-black shadow-sm transition-all',
                      idx === 0
                        ? 'scale-110 border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900'
                        : 'border-zinc-200 bg-white text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500',
                    )}
                  >
                    {item.company.charAt(0)}
                  </div>
                  {idx === 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-4 w-4 scale-50 rounded-full bg-emerald-500" />
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="mb-3 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <h3 className="text-xl font-black">{item.company}</h3>
                    <div className="flex flex-col items-start gap-1 md:items-end">
                      {item.roles.map((role, rIdx) => (
                        <span
                          key={rIdx}
                          className="rounded bg-zinc-100 px-2 py-1 text-[11px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          {role.role} · {formatPeriod(role.periodStart, role.periodEnd)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {item.companyInfo}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {item.tag.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-lg border border-zinc-100 bg-zinc-50 px-2.5 py-1 text-[10px] font-bold text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {item.projectDetails && item.projectDetails.length > 0 && (
                    <div className="border-t border-zinc-100 pt-4 dark:border-zinc-800">
                      <button
                        onClick={() =>
                          setOpenCareer((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                        }
                        className="flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all hover:opacity-70"
                      >
                        <Briefcase size={14} />
                        Projects ({item.projectDetails.length})
                        <ChevronDown
                          size={14}
                          className={cn(
                            'transition-transform duration-300',
                            openCareer[item.id] && 'rotate-180',
                          )}
                        />
                      </button>

                      {openCareer[item.id] && (
                        <div className="mt-4 space-y-3">
                          {item.projectDetails.map(
                            (pj) =>
                              pj && (
                                <div
                                  key={pj.id}
                                  className="rounded-xl border border-zinc-100 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800/50"
                                >
                                  <div className="mb-1 flex items-start justify-between gap-3">
                                    <h4 className="text-sm font-black">{pj.title}</h4>
                                    <span className="shrink-0 text-[10px] font-bold text-zinc-400">
                                      {formatPeriod(pj.periodStart, pj.periodEnd)}
                                    </span>
                                  </div>
                                  <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                    {pj.description}
                                  </p>
                                </div>
                              ),
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
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

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-12 text-center">
      <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">{title}</span>
      <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-zinc-900 dark:bg-white" />
    </div>
  )
}
