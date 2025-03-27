interface NodeCardProps {
  children: React.ReactNode;
  borderColor?: string;
  nodeId?: number;
  isStartNode?: boolean;
}

const NodeCard: React.FC<NodeCardProps> = ({isStartNode, children, borderColor = 'border-gray-400', nodeId = 0 }) => {
  return isStartNode ? (
    <div className="relative">
        <div className={`
            p-8
            bg-gray-200 
            border-4
            rounded-full
            w-32
            h-32
            flex
            items-center
            justify-center
            ${borderColor}
        `}>
            {children}
        </div>
    </div>
  ) : (
    <div className="relative">
        <div className={`
            p-8
            bg-gray-200 
            border-4
            rounded-lg
            ${borderColor}
        `}>
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white text-gray-700 flex items-center justify-center text-sm border border-gray-300">
                {nodeId}
            </div>
            {children}
        </div>
    </div>
  );
};

export default NodeCard;
