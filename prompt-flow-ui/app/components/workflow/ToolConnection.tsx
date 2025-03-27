"use client";

import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';
import { useState } from 'react';
import { HiTrash } from 'react-icons/hi';

export default function ToolConnection({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data,
}: EdgeProps) {
    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnter = () => {
        setIsHovered(true);
    };

    const onMouseLeave = () => {
        setTimeout(() => {
            setIsHovered(false);
        }, 2500);
    };
    const onDelete = data?.onDelete;

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <BaseEdge 
                path={edgePath}
                    style={{
                    ...style,
                    strokeWidth: 3,
                    stroke: '#d1d5db',
                    pointerEvents: 'all',
                    animation: 'flow 20s linear infinite', 
                }}
                className="react-flow__edge-path-selector" 
                markerEnd={markerEnd}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
            {isHovered && (
                <g
                    transform={`translate(${labelX - 10} ${labelY - 10})`}
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log('Delete clicked, onDelete exists:', !!onDelete);
                        if (onDelete) {
                            onDelete();
                        } 
                    }}
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                >
                    <circle
                        r={12}
                        fill="white"
                    />
                    <foreignObject
                        width={24}
                        height={24}
                        x={-12}
                        y={-12}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <HiTrash className="h-6 w-6 text-gray-500" />
                    </foreignObject>
                </g>
            )}
        </>
    );
}
