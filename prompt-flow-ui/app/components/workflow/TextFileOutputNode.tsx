"use client";

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import { NodeTitleBar } from './NodeTitleBar';
import NodeCard from './NodeCard';
import { FaRegFileAlt } from "react-icons/fa";

interface TextFileOutputNodeProps {
  data: {
    sql: string;
    index: number;
    onDelete?: () => void;
    onEdit?: () => void;
  };
  isConnectable: boolean;
}

export const TextFileOutputNode = memo(({ data, isConnectable }: TextFileOutputNodeProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [sql, setSQL] = useState(data.sql);

    const handleEdit = () => {
        setIsEditing(true);
    };
    
  return (
    <NodeCard borderColor="border-purple-500" nodeId={data.index}>
      
      <div className="flex flex-col gap-2">
        <NodeTitleBar 
          icon={<FaRegFileAlt className="h-8 w-8 text-white" />} 
          title="Text File Output" 
          onEdit={data.onEdit}
          onDelete={data.onDelete}
        />
      </div>

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        id="input"
        style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: 'white', 
            border: '3px solid #A855F7' 
        }}
      />
    </NodeCard>
  );
});

TextFileOutputNode.displayName = 'TextFileOutputNode';

