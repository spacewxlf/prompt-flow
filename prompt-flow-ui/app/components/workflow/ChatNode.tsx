"use client";

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import { NodeTitleBar } from './NodeTitleBar';
import NodeCard from './NodeCard';
import { BsChatText } from "react-icons/bs";


interface ChatNodeProps {
  data: {
    index: number;
    onDelete?: () => void;
    onEdit?: () => void;
  };
  isConnectable: boolean;
}

export const ChatNode = memo(({ data, isConnectable }: ChatNodeProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };
    
  return (
    <NodeCard borderColor="border-red-500" nodeId={data.index}>
      
      <div className="flex flex-col gap-2">
        <NodeTitleBar 
          icon={<BsChatText className="h-8 w-8 text-white" />} 
          title="Chat Bot" 
          onEdit={data.onEdit}
          onDelete={data.onDelete}
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ width: '16px', height: '16px', backgroundColor: 'white', border: '3px solid #ef4444' }}  // Added size styling        
      />
    </NodeCard>
  );
});

ChatNode.displayName = 'ChatNode';

