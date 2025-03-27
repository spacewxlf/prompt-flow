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


interface SQLNodeProps {
  data: {
    sql: string;
    index: number;
    onDelete?: () => void;
    onEdit?: () => void;
  };
  isConnectable: boolean;
}

export const SQLNode = memo(({ data, isConnectable }: SQLNodeProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [sql, setSQL] = useState(data.sql);

    const handleEdit = () => {
        setIsEditing(true);
    };
    
  return (
    <NodeCard borderColor="border-green-500" nodeId={data.index}>
      
      <div className="flex flex-col gap-2">
        <NodeTitleBar 
          icon={<TbSql className="h-8 w-8 text-white" />} 
          title="" 
          onEdit={data.onEdit}
          onDelete={data.onDelete}
        />
        <div className="p-2 bg-gray-300 rounded min-h-[60px] text-sm">
          {data.sql || "Click edit to add sql"}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ width: '16px', height: '16px', backgroundColor: 'white', border: '3px solid #0c9f6e' }}  // Added size styling        
      />
    </NodeCard>
  );
});

SQLNode.displayName = 'SQLNode';

