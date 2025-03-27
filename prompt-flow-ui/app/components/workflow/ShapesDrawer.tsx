"use client";

import { useState } from 'react';
import { BsStars, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { TbSql } from "react-icons/tb";
import { PiEmptyBold } from "react-icons/pi";
import { IoWaterOutline } from "react-icons/io5";
import { TbSum } from "react-icons/tb";
import { LuFileStack } from "react-icons/lu";
import { TbApi } from "react-icons/tb";
import { LuRefreshCcw } from "react-icons/lu";
import { PiDna } from "react-icons/pi";
import { GiChoice } from "react-icons/gi";
import { TbJson } from "react-icons/tb";
import { FaRegFileAlt } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";
import { GoDatabase } from "react-icons/go";


interface ShapesDrawerProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export const ShapesDrawer = ({ onDragStart }: ShapesDrawerProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className={`bg-white p-4 border-l border-gray-200 overflow-y-auto transition-all duration-300 shadow-sm ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="flex items-center justify-between mb-4">
        {!isCollapsed && 
            (
                <div className="flex flex-col gap-2">
                    <h3 className="text-gray-800 text-lg font-semibold">Nodes</h3>
                    <p className="text-gray-600 text-sm">
                        Add nodes to your workflow by dragging and dropping them here.
                    </p>
                </div>
            )
        }
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          {isCollapsed ? <BsChevronRight /> : <BsChevronLeft />}
        </button>
      </div>
      
      <div className="space-y-3">

      {
          isCollapsed && (
            <>
              <hr className="border-gray-300"/>
              <p className="text-gray-500 text-xs text-center">Triggers</p>
            </>
          )
      }
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'dbQuery')}
          title={isCollapsed ? "Database Query" : undefined}
        >
          <GoDatabase className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">Database Query</span>}
        </div>
      {
          isCollapsed && (
            <>
              <hr className="border-gray-300"/>
              <p className="text-gray-500 text-xs text-center">AI</p>
            </>
          )
        }        
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'prompt')}
          title={isCollapsed ? "AI Prompt" : undefined}
        >
          <BsStars className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">AI Prompt</span>}
        </div>
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'splitter')}
          title={isCollapsed ? "Splitter" : undefined}
        >
          <GiChoice className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">Splitter</span>}
        </div>
        {
          isCollapsed && (
            <>
              <hr className="border-gray-300"/>
              <p className="text-gray-500 text-xs text-center">Tool Kits</p>
            </>
          )
        }
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'sql')}
          title={isCollapsed ? "SQL" : undefined}
        >
          <TbSql className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">SQL</span>}
        </div>
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'api')}
          title={isCollapsed ? "API" : undefined}
        >
          <TbApi className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">REST API</span>}
        </div>
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'rag')}
          title={isCollapsed ? "RAG" : undefined}
        >
          <LuFileStack className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">Document Store</span>}
        </div>
        {
          isCollapsed && (
            <>
              <hr className="border-gray-300"/>
              <p className="text-gray-500 text-xs text-center">Memory</p>
            </>
          )
        }

        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'leakyMemory')}
          title={isCollapsed ? "Leaky Memory" : undefined}
        >
          <IoWaterOutline className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">Leaky Memory</span>}
        </div>

        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'noMemory')}
          title={isCollapsed ? "No Memory" : undefined}
        >
          <PiEmptyBold className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">No Memory</span>}
        </div>

        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'summaryMemory')}
          title={isCollapsed ? "Summary Memory" : undefined}
        >
          <TbSum className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">Summary Memory</span>}
        </div>
        {
          isCollapsed && (
            <>
              <hr className="border-gray-300"/>
              <p className="text-gray-500 text-xs text-center">Engine</p>
            </>
          )
        }

        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'thinkActPlan')}
          title={isCollapsed ? "Think Act Plan" : undefined}
        >
          <LuRefreshCcw className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">Think Act Plan</span>}
        </div>

        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'chat')}
          title={isCollapsed ? "Chat" : undefined}
        >
          <BsChatText className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">Chat</span>}
        </div>

        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'geneticAlgorithm')}
          title={isCollapsed ? "Genetic Algorithm" : undefined}
        >
          <PiDna className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">Genetic Algorithm</span>}
        </div>
        {
          isCollapsed && (
            <>
              <hr className="border-gray-300"/>
              <p className="text-gray-500 text-xs text-center">Outputs</p>
            </>
          )
        }
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'json')}
          title={isCollapsed ? "Output As JSON" : undefined}
        >
          <TbJson className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">JSON</span>}
        </div>
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'gap-2'
          } p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200`}
          draggable
          onDragStart={(event) => onDragStart(event, 'textFile')}
          title={isCollapsed ? "Output As Text File" : undefined}
        >
          <FaRegFileAlt className="h-4 w-4 text-gray-600" />
          {!isCollapsed && <span className="text-gray-700">Text File</span>}
        </div>

      </div>
    </div>
  );
};