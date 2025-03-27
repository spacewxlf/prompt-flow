"use client";

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, Label, Button } from 'flowbite-react';
import { FaEdit } from 'react-icons/fa';
import { BsStars } from "react-icons/bs";
import { useState } from 'react';
import { NodeTitleBar } from './NodeTitleBar';
import NodeCard from './NodeCard';
import { TbSql } from "react-icons/tb";
import { LuRefreshCcw } from "react-icons/lu";

interface ThinkActPlanNodeProps {
  data: {
    index: number;
    onDelete?: () => void;
    onEdit?: () => void;
  };
  isConnectable: boolean;
}

export const ThinkActPlanNode = memo(({ data, isConnectable }: ThinkActPlanNodeProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };
    
  return (
    <NodeCard borderColor="border-red-500" nodeId={data.index}>
      
      <div className="flex flex-col gap-2">
        <NodeTitleBar 
          icon={<LuRefreshCcw className="h-8 w-8 text-white" />} 
          title="Think Act Plan Loop" 
          onEdit={data.onEdit}
          onDelete={data.onDelete}
        />
        <div className="p-2 bg-gray-300 rounded min-h-[60px] text-sm">
          Maximum Steps: 5
        </div>
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

ThinkActPlanNode.displayName = 'ThinkActPlanNode';

