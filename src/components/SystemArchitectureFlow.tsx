'use client'

import { useCallback, useEffect, useRef } from 'react'
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  Connection,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import ServiceNode from './nodes/ServiceNode'

const nodeTypes = {
  serviceNode: ServiceNode,
}

interface SystemArchitectureFlowProps {
  initialNodes: Node[]
  initialEdges: Edge[]
}

function FlowContent({ initialNodes, initialEdges }: SystemArchitectureFlowProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const { fitView } = useReactFlow()
  const containerRef = useRef<HTMLDivElement>(null)

  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds) => addEdge({ ...params, animated: true, type: 'smoothstep' }, eds)),
    [setEdges],
  )

  // ResizeObserver를 통해 컨테이너 크기가 변경될 때 비율을 맞춰줌
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        fitView({ duration: 500, padding: 0.2 })
      })
    })

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [fitView])

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="dark"
        colorMode="dark"
        proOptions={{ hideAttribution: true }}
      >
        <Controls className="bg-zinc-800 border-zinc-700 fill-white" />
        <MiniMap
          className="bg-zinc-900 border-zinc-800"
          nodeColor={(node) => (node.data?.color as string) || '#fff'}
        />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#333" />
      </ReactFlow>
    </div>
  )
}

export default function SystemArchitectureFlow(props: SystemArchitectureFlowProps) {
  return (
    <ReactFlowProvider>
      <FlowContent {...props} />
    </ReactFlowProvider>
  )
}
