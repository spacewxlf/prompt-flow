"use client";

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import { NodeTitleBar } from './NodeTitleBar';
import NodeCard from './NodeCard';
import { PiEmptyBold } from "react-icons/pi";


interface NoMemoryNodeProps {
    data: {
        index: number;
        onDelete?: () => void;
        onEdit?: () => void;
    };
    isConnectable: boolean;
}

export const NoMemoryNode = memo(({ data, isConnectable }: NoMemoryNodeProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };
    
    return (
        <NodeCard borderColor="border-pink-500" nodeId={data.index}>
        
        <div className="flex flex-col gap-2">
            <NodeTitleBar 
            icon={<PiEmptyBold className="h-8 w-8 text-white" />} 
            title="Memory Reset Per Chat" 
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

NoMemoryNode.displayName = 'NoMemoryNode';

