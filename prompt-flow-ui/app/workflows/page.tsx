"use client";

import { BsStars } from "react-icons/bs";
import { CustomSideBar } from "../components/CustomSideBar";
import { CustomTable } from "../components/CustomTable";
import customTheme from "../theme";
import { ThemeProvider } from "flowbite-react";
import { useState } from "react";
import { Button } from "flowbite-react";
import { LuWorkflow } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function WorkflowPage() {

    const router = useRouter();

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

    const [showModal, setShowModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState("");
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

    const handleActionClick = (action: string, rowIndex: number) => {
        setSelectedAction(action);
        setSelectedRowIndex(rowIndex);
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        onActionClick(selectedAction, selectedRowIndex);
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

	return (
        <ThemeProvider theme={customTheme}>
            <Modal show={showModal} onClose={handleCancel} onConfirm={handleConfirm} title={getModalTitle()} message={getModalMessage()} /> 
			<main className="flex min-h-screen h-screen">
				<CustomSideBar activeTab="workflows" />
				<div className="flex-1 p-20">
                    <br/><br/>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-blue-500 flex items-center">
                            <LuWorkflow className="mr-2 h-6 w-6" />
                            Workflows
                        </h1>
                        <Button color="blue" size="sm" onClick={() => router.push('/workflows/new')}>
                            <LuWorkflow className="mr-2 h-3 w-3" /> Design
                        </Button>
                    </div>
                    <br/>   
                    <p>
                        Solutions are workflows that are built using LLM's and other tools to automate analysis and tasks.
                    </p>
                    <br/>
                    <CustomTable headers={["Status", "Workflow", "Description", "Actions"]} rows={[
                        ["status:green","Workflow 1", "Description 1", "action:play|edit|delete|logs"],
                        ["status:red","Workflow 2", "Description 2", "action:play|edit|delete|logs"],
                        ["status:green","Workflow 3", "Description 3", "action:play|edit|delete|logs"]
                    ]} onActionClick={onActionClick} />
				</div>
			</main>
		</ThemeProvider>
	);
}
