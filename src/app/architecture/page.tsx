import SystemArchitectureFlow from '@/components/SystemArchitectureFlow'
import { initialNodes, initialEdges } from '@/data/architecture'

export default function ArchitecturePage() {
  return (
    <main className="w-screen h-screen bg-black p-8 text-white flex flex-col gap-4">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <span className="text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
            <polyline points="7.5 19.79 7.5 14.6 3 12" />
            <polyline points="21 12 16.5 14.6 16.5 19.79" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </span>
        시스템 아키텍처
      </h1>

      <p className="text-zinc-400">
        해당 플로우차트는 예시이며, 노드를 드래그하여 이동해 볼 수 있습니다.
      </p>

      <div className="flex-1 w-full relative">
        <SystemArchitectureFlow initialNodes={initialNodes} initialEdges={initialEdges} />
      </div>
    </main>
  )
}
