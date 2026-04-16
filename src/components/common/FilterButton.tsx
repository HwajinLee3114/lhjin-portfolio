import { cn } from '@/lib/utils'

interface FilterButtonProps {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}

export default function FilterButton({ isActive, onClick, children }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-2xl px-4 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all duration-300',
        isActive
          ? 'bg-zinc-900 text-white shadow-lg dark:bg-white dark:text-zinc-900'
          : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800',
      )}
    >
      {children}
    </button>
  )
}
