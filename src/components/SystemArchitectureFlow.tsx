'use client'

import { useCallback } from 'react'
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

export default function SystemArchitectureFlow({
    initialNodes,
    initialEdges,
}: SystemArchitectureFlowProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const onConnect = useCallback(
        (params: Connection | Edge) =>
            setEdges((eds) => addEdge({ ...params, animated: true, type: 'smoothstep' }, eds)),
        [setEdges],
    )

    return (
        <div className="w-full h-full min-h-[500px] bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                className="dark"
                colorMode="dark"
            >
                <Controls className="bg-zinc-800 border-zinc-700 fill-white" />
                <MiniMap
                    className="bg-zinc-900 border-zinc-800"
                    nodeColor={(node) => (node.data?.color as string) || '#fff'}
                />
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={16}
                    size={1}
                    color="#333"
                />
            </ReactFlow>
        </div>
    )
}
