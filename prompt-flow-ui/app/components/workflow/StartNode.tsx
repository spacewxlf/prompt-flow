"use client";

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { TbPlugConnected } from "react-icons/tb";
import { useState } from 'react';
import NodeCard from './NodeCard';

interface StartNodeProps {
	data: {
		prompt: string;
		index: number;
		onDelete?: () => void;
		onEdit?: () => void;
	};
	isConnectable: boolean;
}

export const StartNode = memo(({ data, isConnectable }: StartNodeProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [prompt, setPrompt] = useState(data.prompt);

    const handleEdit = () => {
        setIsEditing(true);
    };
    
	return (
			<NodeCard borderColor="border-orange-500" nodeId={data.index} isStartNode={true}>
				<div className="flex flex-col items-center justify-center">
					<h3 className="text-orange-500 text-xl font-bold">Begin</h3>
					<TbPlugConnected className="text-orange-500 h-14 w-14" />
				</div>
			<Handle
				type="source"
				position={Position.Bottom}
				isConnectableStart={true}
				isConnectableEnd = {true}
				isConnectable={isConnectable}
				style={{ width: '16px', height: '16px', backgroundColor: 'white', border: '3px solid #ff5a1f' }}       
			/>
			</NodeCard>
	);
});

StartNode.displayName = 'StartNode';
