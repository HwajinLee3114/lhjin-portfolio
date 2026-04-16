'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { sortedCareer } from '@/data/career'
import { profile } from '@/data/profile'
import { formatPeriod } from '@/lib/period'

export default function ResumePreviewPage() {
  const router = useRouter()

  return (
    <div className="min-h-dvh bg-zinc-100 print:bg-white">
      <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-white px-6 py-3 print:hidden">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-bold text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft size={16} />
          돌아가기
        </button>
        {/* <button
          onClick={() => globalThis.window.print()}
          className="flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-black text-white transition-colors hover:bg-zinc-700"
        >
          <Printer size={14} />
          인쇄 / PDF 저장
        </button> */}
      </div>

      <div className="mx-auto max-w-[210mm] px-4 py-8 print:max-w-none print:px-0 print:py-0">
        <div className="overflow-hidden rounded-lg bg-white shadow-xl print:rounded-none print:shadow-none">
          <div className="space-y-3 p-10 print:px-16 print:py-12">
            <header className="border-b-2 border-zinc-900 pb-5">
              <h1 className="mb-1 text-3xl font-black tracking-tight text-zinc-900">
                {profile.name}
              </h1>
              <p className="mb-4 text-base font-bold text-zinc-500">{profile.role}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-zinc-600">
                <span>{profile.email}</span>
                <span>{profile.social.github.replace('https://', '')}</span>
                <span>{profile.social.blog.replace('https://', '')}</span>
              </div>
            </header>

            <section>
              <SectionTitle>소개</SectionTitle>
              <p className="text-sm leading-relaxed text-zinc-700">{profile.introResume}</p>
            </section>

            <section>
              <SectionTitle>기술 스택</SectionTitle>
              <div className="space-y-2">
                {skills.map((category) => (
                  <div key={category.title} className="flex gap-3 text-sm">
                    <span className="w-20 shrink-0 font-bold text-zinc-900">{category.title}</span>
                    <span className="text-zinc-600">
                      {category.skills.map((s) => s.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>경력</SectionTitle>
              <div className="space-y-6">
                {sortedCareer.map((item) => (
                  <div key={item.id}>
                    <div className="mb-1 flex items-baseline justify-between gap-4">
                      <h3 className="text-sm font-black text-zinc-900">{item.company}</h3>
                      <div className="shrink-0 text-right">
                        {item.roles.map((role, rIdx) => (
                          <div key={rIdx} className="text-[11px] leading-tight text-zinc-500">
                            {role.role} | {formatPeriod(role.periodStart, role.periodEnd)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="mb-2 text-xs text-zinc-500">{item.companyInfo}</p>

                    {item.projectDetails.length > 0 && (
                      <div className="ml-3 space-y-3 border-l-2 border-zinc-100 pl-4">
                        {item.projectDetails.map(
                          (pj) =>
                            pj && (
                              <div key={pj.id}>
                                <div className="mb-0.5 flex items-baseline justify-between gap-2">
                                  <h4 className="text-xs font-bold text-zinc-800">{pj.title}</h4>
                                  <span className="shrink-0 text-[10px] text-zinc-400">
                                    {formatPeriod(pj.periodStart, pj.periodEnd)}
                                  </span>
                                </div>
                                <p className="text-[11px] leading-relaxed text-zinc-600">
                                  {pj.description}
                                </p>
                                {pj.contribution.length > 0 && (
                                  <ul className="mt-1 space-y-0.5">
                                    {pj.contribution.flatMap((c, cIdx) =>
                                      c.desc.map((d, dIdx) => (
                                        <li
                                          key={`${cIdx}-${dIdx}`}
                                          className="flex gap-1.5 text-[11px] leading-relaxed text-zinc-600"
                                        >
                                          <span className="mt-1 shrink-0 text-zinc-300">-</span>
                                          <span>{d}</span>
                                        </li>
                                      )),
                                    )}
                                  </ul>
                                )}
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {pj.skillItem.map((skill) => (
                                    <span
                                      key={skill.name}
                                      className="rounded bg-zinc-100 px-1.5 py-0.5 text-[9px] font-bold text-zinc-500 print:border print:border-zinc-200 print:bg-transparent"
                                    >
                                      {skill.name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ),
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>활동 & 사이드 프로젝트</SectionTitle>
              <div className="space-y-3">
                {projects
                  .filter((p) => p.filter.some((f) => f.name === 'personal'))
                  .sort((a, b) => (b.periodStart || '').localeCompare(a.periodStart || ''))
                  .map((pj) => (
                    <div key={pj.id}>
                      <div className="mb-0.5 flex items-baseline justify-between gap-2">
                        <h4 className="text-xs font-bold text-zinc-800">
                          {pj.title}
                          {pj.git && (
                            <span className="ml-2 font-normal text-zinc-400">({pj.git})</span>
                          )}
                        </h4>
                        <span className="shrink-0 text-[10px] text-zinc-400">
                          {formatPeriod(pj.periodStart, pj.periodEnd)}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-zinc-600">{pj.description}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {pj.skillItem.map((skill) => (
                          <span
                            key={skill.name}
                            className="rounded bg-zinc-100 px-1.5 py-0.5 text-[9px] font-bold text-zinc-500 print:border print:border-zinc-200 print:bg-transparent"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 border-b border-zinc-200 pb-1 text-sm font-black uppercase tracking-widest text-zinc-900">
      {children}
    </h2>
  )
}
