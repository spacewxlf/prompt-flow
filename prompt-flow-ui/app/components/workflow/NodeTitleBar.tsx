import React from 'react';
import { Button } from 'flowbite-react';
import { HiPencil, HiTrash } from 'react-icons/hi';

interface NodeTitleBarProps {
  icon?: React.ReactNode;
  title: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const NodeTitleBar: React.FC<NodeTitleBarProps> = ({
  icon,
  title,
  onEdit,
  onDelete,
}) => {

    const handleEditClick = () => {
        console.log('Edit button clicked');
        if (onEdit) {
            onEdit();
        }
    }

  return (
    <div className="flex items-center justify-between p-2 bg-gray-600 rounded-t">
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                {icon && <span className="text-gray-600">{icon}</span>}
                <h3 className="font-medium text-gray-100">{title}</h3>
            </div>
            <div className="flex gap-[1]">
                <Button
                size="sm"
                color="gray"
                onClick={handleEditClick}
                className="p-2"
                >
                <HiPencil className="h-4 w-4" />
                </Button>
                <Button
                size="sm"
                color="gray"
                onClick={onDelete}
                className="p-2"
                >
                <HiTrash className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
  );
};

