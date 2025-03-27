"use client";

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { BsStars } from "react-icons/bs";
import { useState } from 'react';
import { NodeTitleBar } from './NodeTitleBar';
import NodeCard from './NodeCard';
import { GoTools } from "react-icons/go";
import { LuBrain } from "react-icons/lu";
import { BsRocket } from "react-icons/bs";


interface PromptNodeProps {
    data: {
        prompt: string;
        index: number;
        onDelete?: () => void;
        onEdit?: () => void;
    };
    isConnectable: boolean;
}

export const PromptNode = memo(({ data, isConnectable }: PromptNodeProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [prompt, setPrompt] = useState(data.prompt);

    const handleEdit = () => {
        setIsEditing(true);
    };
    
    return (
        <NodeCard borderColor="border-blue-500" nodeId={data.index}>
            <div className="absolute left-0 inset-y-0 -translate-x-[60%] flex flex-col h-full">
                <div className="bg-gray-300 border-4 border-blue-500 p-4 relative w-12 flex-1">
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="left-1"
                        className="!absolute"
                        style={{ 
                            width: '16px', 
                            height: '16px', 
                            backgroundColor: 'white', 
                            border: '3px solid #1b64f2',
                            left: '-5%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                    <div className="flex flex-col items-center justify-center">
                        <GoTools className="text-gray-500 h-4 w-4" />
                        <span className="text-[0.40rem] font-bold text-gray-500">Tools</span>
                    </div>
            </div>
            <div className="bg-gray-300 border-4 border-blue-500 p-4 relative w-12 flex-1 -mt-[4px]">
                <Handle
                    type="target"
                    position={Position.Left}
                    id="left-2"
                    className="!absolute"
                    style={{ 
                    width: '16px', 
                    height: '16px', 
                    backgroundColor: 'white', 
                    border: '3px solid #1b64f2',
                    left: '-5%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                    }}
                />
                <div className="flex flex-col items-center justify-center">
                    <LuBrain className="text-gray-500 h-4 w-4" />
                    <span className="text-[0.40rem] font-bold text-gray-500">Memory</span>
                </div>

            </div>
            <div className="bg-gray-300 border-4 border-blue-500 p-4 relative w-12 flex-1 -mt-[4px]">
                <Handle
                    type="target"
                    position={Position.Left}
                    id="left-3"
                    className="!absolute"
                    style={{ 
                        width: '16px', 
                        height: '16px', 
                        backgroundColor: 'white', 
                        border: '3px solid #1b64f2',
                        left: '-5%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
                <div className="flex flex-col items-center justify-center">
                    <BsRocket className="text-gray-500 h-4 w-4" />
                    <span className="text-[0.40rem] font-bold text-gray-500">Engine</span>
                </div>          
            </div>          
        </div>
            
            <Handle
                type="target"
                id="top-1"
                position={Position.Top}
                isConnectable={isConnectable}
                style={{ width: '16px', height: '16px', backgroundColor: 'white', border: '3px solid #1b64f2' }}       
            />

            <div className="flex flex-col gap-2">
                <NodeTitleBar 
                    icon={<BsStars className="h-8 w-8 text-white" />} 
                    title="AI Prompt" 
                    onEdit={data.onEdit}
                    onDelete={data.onDelete}
                />
                <div className="p-2 bg-gray-300 rounded min-h-[60px] text-sm">
                    {data.prompt?.slice(0, 50) + (data.prompt?.length > 50 ? '...' : '') || "Click edit to add a prompt"}
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                style={{ width: '16px', height: '16px', backgroundColor: 'white', border: '3px solid #1b64f2' }}        
            />
        </NodeCard>
    );
});

PromptNode.displayName = 'PromptNode';

