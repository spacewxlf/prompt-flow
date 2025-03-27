"use client";

import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from "flowbite-react";
import { FaPlay, FaEdit, FaTrash, FaClipboardList } from "react-icons/fa";
import { FaRegFileLines } from "react-icons/fa6";


interface CustomTableProps {
  headers: string[];
  rows: string[][];
  onActionClick?: (action: string, rowIndex: number) => void;
}

export function CustomTable({ headers, rows, onActionClick }: CustomTableProps) {
  const renderCell = (content: string, rowIndex: number, cellIndex: number) => {
    if (content.startsWith('action:')) {
      const actions = content.replace('action:', '').split('|');
      return (
        <div className="flex gap-2">
          {actions.map((action, index) => {
            let icon = null;
            switch (action.trim().toLowerCase()) {
              case 'play':
                icon = <FaPlay className="text-gray-500 hover:text-green-700" />;
                break;
              case 'edit':
                icon = <FaEdit className="text-gray-500 hover:text-blue-700" />;
                break;
              case 'delete':
                icon = <FaTrash className="text-gray-500 hover:text-red-700" />;
                break;
            case 'logs':
                icon = <FaRegFileLines className="text-gray-500 hover:text-blue-700" />;
                break;
            }
            return icon && (
              <button
                key={index}
                onClick={() => onActionClick?.(action, rowIndex)}
                className="p-1 hover:bg-gray-100 rounded"
                title={action.charAt(0).toUpperCase() + action.slice(1)}
              >
                {icon}
              </button>
            );
          })}
        </div>
      );
    } else if (content.startsWith('status:')) {
      const status = content.replace('status:', '').toLowerCase();
      const colorClass = status === 'green' 
        ? 'bg-green-500' 
        : status === 'red' 
        ? 'bg-red-500' 
        : 'bg-gray-500';
      
      return (
        <div className="flex gap-2">
          <div className={`w-3.5 h-3.5 rounded-full ${colorClass}`}></div>
        </div>
      );
    }
    return content;
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header, index) => (
            <TableHeadCell key={index}>{header}</TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>
                {renderCell(cell, rowIndex, cellIndex)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
