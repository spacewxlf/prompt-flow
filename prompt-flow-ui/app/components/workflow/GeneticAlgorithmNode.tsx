"use client";

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { PiDna } from "react-icons/pi";
import { useState } from 'react';
import { NodeTitleBar } from './NodeTitleBar';
import NodeCard from './NodeCard';

interface GeneticAlgorithmNodeProps {
  data: {
    index: number;
    onDelete?: () => void;
    onEdit?: () => void;
  };
  isConnectable: boolean;
}

export const GeneticAlgorithmNode = memo(({ data, isConnectable }: GeneticAlgorithmNodeProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };
    
  return (
    <NodeCard borderColor="border-red-500" nodeId={data.index}>
      
      <div className="flex flex-col gap-2">
        <NodeTitleBar 
          icon={<PiDna className="h-8 w-8 text-white" />} 
          title="Genetic Algorithm" 
          onEdit={data.onEdit}
          onDelete={data.onDelete}
        />
        <div className="p-2 bg-gray-300 rounded min-h-[60px] text-sm">
          Maximum Samples: 350
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ width: '16px', height: '16px', backgroundColor: 'white', border: '3px solid #ef4444' }}  // Added size styling        
      />

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ width: '16px', height: '16px', backgroundColor: 'white', border: '3px solid #ef4444' }}  // Added size styling        
      />
    </NodeCard>
  );
});

GeneticAlgorithmNode.displayName = 'GeneticAlgorithmNode';

