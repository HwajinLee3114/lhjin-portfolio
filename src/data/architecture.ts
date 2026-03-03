import { Node, Edge } from '@xyflow/react'
import { ServiceNodeData } from '../components/nodes/ServiceNode'

export const initialNodes: Node<ServiceNodeData>[] = [
    {
        id: 'github',
        type: 'serviceNode',
        position: { x: 50, y: 300 },
        data: {
            label: 'GitHub Repository',
            description: 'Source Code',
            iconName: 'Github',
            color: '#ffffff',
        },
    },
    {
        id: 'actions',
        type: 'serviceNode',
        position: { x: 300, y: 300 },
        data: {
            label: 'GitHub Actions',
            description: 'CI Build & Test',
            iconName: 'PlayCircle',
            color: '#3b82f6', // blue
        },
    },
    {
        id: 'docker',
        type: 'serviceNode',
        position: { x: 550, y: 150 },
        data: {
            label: 'Docker Hub',
            description: 'Image Registry',
            iconName: 'Box',
            color: '#6b7280', // gray
        },
    },
    {
        id: 's3',
        type: 'serviceNode',
        position: { x: 550, y: 450 },
        data: {
            label: 'AWS S3',
            description: 'Static Assets',
            iconName: 'Database',
            color: '#f59e0b', // amber
        },
    },
    {
        id: 'ec2',
        type: 'serviceNode',
        position: { x: 800, y: 300 },
        data: {
            label: 'AWS EC2 / ECS',
            description: 'Production Server',
            iconName: 'Server',
            color: '#10b981', // emerald
        },
    },
]

export const initialEdges: Edge[] = [
    {
        id: 'e1',
        source: 'github',
        target: 'actions',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#ffffff', strokeWidth: 2, strokeDasharray: '5, 5' },
    },
    {
        id: 'e2',
        source: 'actions',
        target: 'docker',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5, 5' },
    },
    {
        id: 'e3',
        source: 'actions',
        target: 's3',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5, 5' },
    },
    {
        id: 'e4',
        source: 'docker',
        target: 'ec2',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#6b7280', strokeWidth: 2, strokeDasharray: '5, 5' },
    },
]
