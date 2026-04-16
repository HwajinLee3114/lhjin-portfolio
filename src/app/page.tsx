'use client'

import { motion } from 'framer-motion'
import { Monitor, FileText } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-white px-6 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg text-center"
      >
        <h1 className="mb-2 text-4xl font-black tracking-tighter text-zinc-900 dark:text-white md:text-5xl">
          LHJIN
        </h1>
        <p className="mb-12 text-sm font-medium text-zinc-400">
          프론트엔드 개발자 이화진 포트폴리오
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/resume"
            className="group flex items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white px-8 py-5 text-sm font-black text-zinc-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-500"
          >
            <FileText size={20} className="transition-transform group-hover:scale-110" />
            <div className="text-left">
              <div className="text-base">이력서 보기</div>
              <div className="text-[11px] font-medium text-zinc-400">문서형 · 빠른 탐색</div>
            </div>
          </Link>

          <Link
            href="/os"
            className="group flex items-center justify-center gap-3 rounded-2xl bg-zinc-900 px-8 py-5 text-sm font-black text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-zinc-900"
          >
            <Monitor size={20} className="transition-transform group-hover:scale-110" />
            <div className="text-left">
              <div className="text-base">체험하기</div>
              <div className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                OS 시뮬레이터 · 인터랙티브
              </div>
            </div>
          </Link>
        </div>

        <p className="mt-8 text-[11px] text-zinc-300 dark:text-zinc-600">
          모바일에서는 이력서 보기를 권장합니다
        </p>
      </motion.div>
    </main>
  )
}
