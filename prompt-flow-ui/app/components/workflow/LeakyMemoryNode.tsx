"use client";

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import { NodeTitleBar } from './NodeTitleBar';
import NodeCard from './NodeCard';
import { IoWaterOutline } from "react-icons/io5";


interface LeakyMemoryNodeProps {
  data: {
    index: number;
    onDelete?: () => void;
    onEdit?: () => void;
  };
  isConnectable: boolean;
}

export const LeakyMemoryNode = memo(({ data, isConnectable }: LeakyMemoryNodeProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };
    
  return (
    <NodeCard borderColor="border-pink-500" nodeId={data.index}>
      
      <div className="flex flex-col gap-2">
        <NodeTitleBar 
          icon={<IoWaterOutline className="h-8 w-8 text-white" />} 
          title="Leaky Memory" 
          onDelete={data.onDelete}
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ width: '16px', height: '16px', backgroundColor: 'white', border: '3px solid #e74794' }}  // Added size styling        
      />
    </NodeCard>
  );
});

LeakyMemoryNode.displayName = 'LeakyMemoryNode';

