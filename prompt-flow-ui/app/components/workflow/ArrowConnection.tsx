"use client";

import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';
import { useState } from 'react';
import { HiTrash } from 'react-icons/hi';

export default function ArrowConnection({
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
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#d1d5db" />
                </marker>
            </defs>
            <BaseEdge 
                path={edgePath}
                style={{
                    ...style,
                    strokeWidth: 5,
                    stroke: '#d1d5db',
                    pointerEvents: 'all',
                }}
                markerEnd="url(#arrow)"
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
