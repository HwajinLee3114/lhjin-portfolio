import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import * as LucideIcons from 'lucide-react'

export type ServiceNodeData = {
  label: string
  iconName?: keyof typeof LucideIcons
  description?: string
  color?: string
}

function ServiceNode({
  data,
  isConnectable,
}: {
  data: ServiceNodeData
  isConnectable: boolean
}) {
  const Icon = data.iconName
    ? (LucideIcons[data.iconName] as React.ElementType)
    : null

  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-900 border-2 shadow-lg min-w-[200px]"
      style={{ borderColor: data.color || '#444' }}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-white"
        style={{ borderColor: data.color || '#444' }}
      />

      {Icon && (
        <Icon
          className="w-8 h-8 mb-2"
          style={{ color: data.color || '#fff' }}
        />
      )}

      <div className="text-white font-bold text-sm text-center">
        {data.label}
      </div>
      {data.description && (
        <div className="text-zinc-400 text-xs mt-1 text-center">
          {data.description}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-white"
        style={{ borderColor: data.color || '#444' }}
      />
    </div>
  )
}

export default memo(ServiceNode)
