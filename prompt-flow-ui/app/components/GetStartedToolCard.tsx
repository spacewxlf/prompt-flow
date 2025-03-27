
import { Card } from "flowbite-react";
import { GoTools } from "react-icons/go";
import { FaPlay } from "react-icons/fa";

export function GetStartedToolCard() {
  return (
    <Card className="max-w-sm">
      <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white flex items-center">
        <GoTools className="mr-2 h-4 w-4" />
        Add MCP Tool
      </h5>
      <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        Create a new capability for your Agentic AI workflow utilizing the Model Context Protocol
    </p>
      <div className="space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
      <a
          href="#"
          className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 sm:w-auto dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <div className="text-left flex items-center">
            <FaPlay className="mr-2 h-4 w-4" />
            <div>
              <div className="font-sans text-sm font-semibold">Create</div>
              <div className="font-sans text-sm font-semibold">MCP Tool</div>            
            </div>
          </div>
        </a>

      </div>
    </Card>
  );
}
