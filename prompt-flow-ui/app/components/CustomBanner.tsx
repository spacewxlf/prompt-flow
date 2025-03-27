import { Banner, BannerCollapseButton } from "flowbite-react";
import { RiChatAiLine } from "react-icons/ri";

export function CustomBanner() {
    return (
        <Banner>
            <div className="flex w-full items-center justify-between rounded-lg border-b border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-800">
                <div className="flex items-center gap-6">
                    <RiChatAiLine className="h-12 w-12 text-blue-600 dark:text-blue-500" />
                    <div>
                        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Welcome to PromptFlow</h2>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                            Build Agentic AI Solutions with PromptFlow
                        </p>
                    </div>
                </div>
            </div>
        </Banner>
    );
}
