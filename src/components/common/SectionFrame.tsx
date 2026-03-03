import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionFrameProps = {
  id: string
  title: string
  children: ReactNode
  containerClassName?: string
  headerClassName?: string
}

export default function SectionFrame({
  id,
  title,
  children,
  containerClassName,
  headerClassName,
}: SectionFrameProps) {
  return (
    <section
      id={id}
      className="flex min-h-full flex-col items-center bg-white p-8 dark:bg-[#1a1f24] md:p-16"
    >
      <div className={cn('w-full max-w-4xl', containerClassName)}>
        <header className={cn('mb-10 text-center', headerClassName)}>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
            {title}
          </span>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-zinc-900 dark:bg-white" />
        </header>
        {children}
      </div>
    </section>
  )
}
