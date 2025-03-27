"use client";

import { CustomSideBar } from "../../components/CustomSideBar";
import customTheme from "../../theme";
import { ThemeProvider, Spinner } from "flowbite-react";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { LuWorkflow } from "react-icons/lu";
import { ReactFlow, Background, Controls, MiniMap, Edge, useNodesState, useEdgesState, addEdge, Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { PromptNode } from "../../components/workflow/PromptNode";
import { LeakyMemoryNode } from "../../components/workflow/LeakyMemoryNode";
import { ShapesDrawer } from "../../components/workflow/ShapesDrawer";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { WorkflowToolBar } from "../../components/workflow/ToolBar";
import { StartNode } from "../../components/workflow/StartNode";
import { SQLNode } from "../../components/workflow/SQLNode";
import ToolConnection from "../../components/workflow/ToolConnection";
import ArrowConnection from "../../components/workflow/ArrowConnection";
import { NoMemoryNode } from "../../components/workflow/NoMemoryNode";
import { ThinkActPlanNode } from "../../components/workflow/ThinkActPlanNode";
import { ChatNode } from "../../components/workflow/ChatNode";
import { GeneticAlgorithmNode } from "../../components/workflow/GeneticAlgorithmNode";
import { SummaryMemoryNode } from "../../components/workflow/SummaryMemoryNode";
import { SQLSourceNode } from "../../components/workflow/SQLSourceNode";
import { SQLEditor } from "../../components/SQLEditor";
import { TextFileOutputNode } from "../../components/workflow/TextFileOutputNode";

export default function NewWorkflowPage() {
    const [isLoading, setIsLoading] = useState(true);


    const randomUUID = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const onActionClick = async (action: string, rowIndex: number) => {

        if (action === "play") {
            setSelectedAction(action);
            setSelectedRowIndex(rowIndex);
            setShowModal(true);
        } else if (action === "edit") {
            setSelectedAction(action);
            setSelectedRowIndex(rowIndex);
            setShowModal(true);
        } else if (action === "delete") {
            setSelectedAction(action);
            setSelectedRowIndex(rowIndex);
            setShowModal(true);
        } else if (action === "logs") {
            setSelectedAction(action);
            setSelectedRowIndex(rowIndex);
            setShowModal(true);
        }
    };

    // Define initialNodes first
    const initialNodes = [
        {
            id: '0',
            type: 'start',
            position: { x: 100, y: 100 },
            data: {
                index: 0,
                label: 'Start',
            }
        }
    ];

    // Initialize states
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState("");
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
    const [nodeToDelete, setNodeToDelete] = useState<string | null>(null);
    const [editingNode, setEditingNode] = useState<any>(null);
    
    // Add useEffect to simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            setNodes(initialNodes);
        }, 650); // Show spinner for 500ms

        return () => clearTimeout(timer);
    }, []);

    // Initialize ref with initial value
    const nodesRef = useRef(initialNodes);
    
    // Keep nodesRef updated
    useEffect(() => {
        nodesRef.current = nodes;
    }, [nodes]);

    const handleActionClick = (action: string, rowIndex: number) => {
        setSelectedAction(action);
        setSelectedRowIndex(rowIndex);
        setShowModal(true);
    };

    const handleNodeDelete = (nodeId: string) => {
        setNodeToDelete(nodeId);
        setShowModal(true);
        setSelectedAction("deleteNode");
    };

    const handleNodeEdit = (nodeId: string) => {
        console.log('handleNodeEdit called with nodeId:', nodeId);
        console.log('Current nodes:', nodesRef.current);
        
        const node = nodesRef.current.find((n) => n.id === nodeId);
        console.log('Found node:', node);
        
        if (node) {
            setEditingNode(node);
            setShowEditModal(true);
            console.log('Set showEditModal to true');
        }
    };

    const handleEditSave = (updatedData: any) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === editingNode.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            ...updatedData,
                        },
                    };
                }
                return node;
            })
        );
        setShowEditModal(false);
        setEditingNode(null);
    };

    const handleConfirm = () => {
        setShowModal(false);
        if (selectedAction === "deleteNode" && nodeToDelete) {
            setNodes((nodes) => nodes.filter((node) => node.id !== nodeToDelete));
            setNodeToDelete(null);
        } else {
            onActionClick(selectedAction, selectedRowIndex);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const getModalMessage = () => {
        switch(selectedAction) {
            case "play":
                return `Are you sure you want to run workflow ${selectedRowIndex + 1}?`;
            case "edit":
                return `Are you sure you want to edit workflow ${selectedRowIndex + 1}?`;
            case "delete":
                return `Are you sure you want to delete workflow ${selectedRowIndex + 1}?`;
            case "logs":
                return `Are you sure you want to view logs for workflow ${selectedRowIndex + 1}?`;
            case "deleteNode":
                return "Are you sure you want to delete this node?";
            default:
                return "Are you sure you want to proceed?";
        }
    };

    const getModalTitle = () => {
        return `Confirm ${selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)}`;
    };

    const Modal = ({ show, onClose, onConfirm, title, message }: { show: boolean, onClose: () => void, onConfirm: () => void, title: string, message: string }) => {
        if (!show) return null;

        return (
            <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">{title}</h3>
                    <p className="mb-6 dark:text-gray-300">{message}</p>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const nodeTypes = useMemo(() => ({
        prompt: PromptNode,
        start: StartNode,
        sql: SQLNode,
        leakyMemory: LeakyMemoryNode,
        noMemory: NoMemoryNode,
        thinkActPlan: ThinkActPlanNode,
        chat: ChatNode,
        geneticAlgorithm: GeneticAlgorithmNode,
        summaryMemory: SummaryMemoryNode,
        dbQuery: SQLSourceNode,
        textFile: TextFileOutputNode
    }), []);

    // Add edgeTypes definition
    const edgeTypes = useMemo(() => ({
        tools: ToolConnection,
        default: ArrowConnection,
    }), []);

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event: React.DragEvent) => {
        event.preventDefault();

        const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        if (!reactFlowBounds || !type) return;

        const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        };

        // Get current node count
        const nodeCount = nodes.length;
        const newNodeId = randomUUID();
        let newNode:any;

        if(type === 'sql') {
            newNode = {
                id: newNodeId,
                type: 'sql',
                position,
                data: {
                    index: nodeCount,
                    label: `${type} node`,
                    sql: '',
                    onEdit: () => handleNodeEdit(newNodeId),
                    onDelete: () => handleNodeDelete(newNodeId)

                }
            }
        }

        if(type === 'textFile') {
            newNode = {
                id: newNodeId,
                type: 'textFile',
                position,
                data: {
                    index: nodeCount,
                    label: `${type} node`,
                    onEdit: () => handleNodeEdit(newNodeId),
                    onDelete: () => handleNodeDelete(newNodeId)
                }
            }
        }

        if(type === 'summaryMemory') {
            newNode = {
                id: newNodeId,
                type: 'summaryMemory',
                position,
                data: {
                    index: nodeCount,
                    label: `${type} node`,
                    onEdit: () => handleNodeEdit(newNodeId),
                    onDelete: () => handleNodeDelete(newNodeId)
                }
            }
        }

        if(type === 'geneticAlgorithm') {
            newNode = {
                id: newNodeId,
                type: 'geneticAlgorithm',
                position,
                data: {
                    index: nodeCount,
                    label: `${type} node`,
                    samples: 350,
                    onEdit: () => handleNodeEdit(newNodeId),
                    onDelete: () => handleNodeDelete(newNodeId)

                }
            }
        }

        if(type === 'leakyMemory') {
            newNode = {
                id: newNodeId,
                type: 'leakyMemory',
                position,
                data: {
                    index: nodeCount,
                    label: `${type} node`,
                    onEdit: () => handleNodeEdit(newNodeId),
                    onDelete: () => handleNodeDelete(newNodeId)
                }
            }
        }

        if(type === 'noMemory') {
            newNode = {
                id: newNodeId,
                type: 'noMemory',
                position,
                data: {
                    index: nodeCount,
                    label: `${type} node`,
                    onEdit: () => handleNodeEdit(newNodeId),
                    onDelete: () => handleNodeDelete(newNodeId)
                }
            }
        }

        if(type === 'thinkActPlan') {
            newNode = {
                id: newNodeId,
                type: 'thinkActPlan',
                position,
                data: {
                    index: nodeCount,
                    label: `${type} node`,
                    onEdit: () => handleNodeEdit(newNodeId),
                    onDelete: () => handleNodeDelete(newNodeId)
                }
            }
        }

        if(type === 'chat') {
            newNode = {
                id: newNodeId,
                type: 'chat',
                position,
                data: {
                    index: nodeCount,
                    label: `${type} node`,
                    onEdit: () => handleNodeEdit(newNodeId),
                    onDelete: () => handleNodeDelete(newNodeId)
                }
            }
        }

        if(type === 'dbQuery') {
            newNode = {
                id: newNodeId,
                type: 'dbQuery',
                position,
                data: {
                    index: nodeCount,
                    label: `${type} node`,
                    sql: '',
                    onEdit: () => handleNodeEdit(newNodeId),
                    onDelete: () => handleNodeDelete(newNodeId)

                }
            }
        }

        if(type === 'prompt') {
            newNode = {
                id: newNodeId,
                type: 'prompt',
                position,
                data: { 
                    index: nodeCount,
                    label: `${type} node`,
                    prompt: '',
                    onEdit: () => handleNodeEdit(newNodeId),
                    onDelete: () => handleNodeDelete(newNodeId)
                }
            };

        }

        console.log('Creating new node:', newNode);
        
        setNodes((nds) => {
            const updatedNodes = nds.concat(newNode);
            console.log('Updated nodes:', updatedNodes);
            return updatedNodes;
        });
    };

    const onEdgeDelete = useCallback((edge: Edge) => {
        setEdges((eds) => eds.filter(e => e.id !== edge.id));
    }, []);

    const onConnect = useCallback((params: Connection) => {
        // Find source and target nodes
        const sourceNode = nodes.find(n => n.id === params.source);
        const targetNode = nodes.find(n => n.id === params.target);

        const flowConnections = [
            'start',
            'prompt',
            'dbQuery',
            'textFile'
        ];

        // Determine if either node is a tool type
        var isToolConnection:boolean = true;
        
        if(flowConnections.includes(sourceNode?.type)) {
            isToolConnection = false;
        }
        else{
            isToolConnection = true;
        }

        setEdges((eds) => addEdge({
            ...params,
            type: isToolConnection ? 'tools' : 'default',
            animated: isToolConnection,
            data: { onDelete: () => onEdgeDelete(params as Edge) },
        }, eds));

    }, [nodes, onEdgeDelete]);

	return (
        <ThemeProvider theme={customTheme}>
            {isLoading && (
                <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-3">
                        <svg className="animate-spin h-8 w-8 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-blue-900">Loading workflow editor...</span>
                    </div>
                </div>
            )}
            <>
                <Modal show={showModal} onClose={handleCancel} onConfirm={handleConfirm} title={getModalTitle()} message={getModalMessage()} /> 
                <EditNodeModal
                    show={showEditModal}
                    node={editingNode}
                    onClose={() => {
                        setShowEditModal(false);
                        setEditingNode(null);
                    }}
                    onSave={handleEditSave}
                />
                <main className="flex min-h-screen h-screen">
                    <CustomSideBar activeTab="workflows" />
                    <div className="flex-1 p-20">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold text-blue-500 flex items-center">
                                <LuWorkflow className="mr-2 h-8 w-8" />
                                New Workflow
                            </h1>
                            <WorkflowToolBar />
                        </div>
                        <div style={{ width: '100%', height: '100%' }}>
                            <ReactFlow
                                nodeTypes={nodeTypes}
                                edgeTypes={edgeTypes}
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                                onDragOver={onDragOver}
                                onDrop={onDrop}
                                defaultEdgeOptions={{ animated: false }}
                                minZoom={0.1}
                                maxZoom={3}
                                defaultViewport={{ x: 375, y: 75, zoom: 1 }}
                                elevateNodesOnSelect={true}
                                nodesDraggable={true}
                                proOptions={{ hideAttribution: true }}
                            >
                                <Background 
                                    gap={20}
                                    size={1.5}
                                />
                                <Controls />
                            </ReactFlow>
                        </div>
                    </div>
                    <ShapesDrawer onDragStart={onDragStart} />
                </main>
            </>
        </ThemeProvider>
	);
}

interface EditNodeModalProps {
    show: boolean;
    node: any;
    onClose: () => void;
    onSave: (data: any) => void;
}

export const EditNodeModal = ({ show, node, onClose, onSave }: EditNodeModalProps) => {
    const isSQLNode = () => {
        return node?.type === 'sql' || node?.type === 'dbQuery';
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
        },
    });

    const [sqlContent, setSqlContent] = useState('');

    // Reset editor content when node changes
    useEffect(() => {
        if (editor && node && !isSQLNode()) {
            editor.commands.setContent(node.data.prompt || '');
        }
        if (isSQLNode() && node) {
            setSqlContent(node.data.sql || '');
        }
    }, [node, editor]);

    // Reset editor when modal is closed
    useEffect(() => {
        if (!show && editor) {
            editor.commands.setContent('');
        }
    }, [show, editor]);

    if (!show) return null;

    const handleSave = () => {
        if (isSQLNode()) {
            onSave({ sql: sqlContent });
        } else if (editor) {
            onSave({ prompt: editor.getHTML() });
        }
        editor?.commands.setContent('');
    };

    if (isSQLNode()) {
        return (
            <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[65vw] h-[75vh]">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                        Edit SQL Query
                    </h3>
                        <div className="flex justify-end mb-4">
                            <select 
                                id="dataSources"
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5"
                            >
                                <option selected>Choose a data source</option>
                                <option value="postgres-ecb">PostgreSQL | ECB</option>
                                <option value="oracle-esp">Oracle | ESP</option>
                                <option value="mssql-ecb-staging">SQL Server | ECB Staging</option>
                            </select>
                        </div>                    
                    <div className="mb-6 bg-gray-900 rounded h-[calc(100%-160px)]">
                        <SQLEditor
                            initialValue={node.data.sql || ''}
                            onChange={(value) => setSqlContent(value)}
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-400 hover:text-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[800px]">
                <h3 className="text-xl font-semibold mb-4 text-white">
                    Edit AI Prompt
                </h3>
                <div className="mb-6 bg-white rounded p-4 min-h-[300px]">
                    <EditorContent 
                        editor={editor} 
                        className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => {
                            editor?.commands.setContent('');
                            onClose();
                        }}
                        className="px-4 py-2 text-gray-400 hover:text-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
