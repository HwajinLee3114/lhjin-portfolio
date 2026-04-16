'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Monitor, FileText, Github, Globe, Mail } from 'lucide-react'

import { profile } from '@/data/profile'

export default function LandingPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-white px-6 py-16 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md text-center"
      >
        <div className="relative mx-auto mb-6 h-28 w-28 overflow-hidden rounded-[2rem] border-4 border-white shadow-xl dark:border-zinc-800">
          <Image
            src={profile.profileImage}
            alt={profile.name}
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>

        <h1 className="mb-1 text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
          {profile.name}
        </h1>
        <p className="mb-2 text-sm font-bold text-zinc-400">{profile.role}</p>
        <p className="mb-6 text-xs leading-relaxed text-zinc-400">{profile.intro}</p>

        <div className="mx-auto mb-8 flex justify-center gap-3">
          {[
            { href: profile.social.github, icon: Github, label: 'GitHub' },
            { href: profile.social.blog, icon: Globe, label: 'Blog' },
            { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 transition-all hover:bg-zinc-900 hover:text-white dark:bg-zinc-800 dark:hover:bg-white dark:hover:text-zinc-900"
            >
              <link.icon size={16} />
            </a>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-1.5">
          {profile.coreSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-[11px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/resume"
            className="group flex items-center justify-center gap-2.5 rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-black text-zinc-900 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          >
            <FileText size={18} className="transition-transform group-hover:scale-110" />
            이력서 보기
          </Link>

          <Link
            href="/os"
            className="group flex items-center justify-center gap-2.5 rounded-2xl bg-zinc-900 px-6 py-4 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-zinc-900"
          >
            <Monitor size={18} className="transition-transform group-hover:scale-110" />
            포트폴리오 둘러보기
          </Link>
        </div>

        <p className="mt-6 text-[10px] text-zinc-300 dark:text-zinc-600">
          모바일에서는 이력서 보기를 권장합니다
        </p>
      </motion.div>
    </main>
  )
}
