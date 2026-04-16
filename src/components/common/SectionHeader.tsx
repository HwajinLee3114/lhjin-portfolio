export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-12 text-center">
      <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">{title}</span>
      <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-zinc-900 dark:bg-white" />
    </div>
  )
}
