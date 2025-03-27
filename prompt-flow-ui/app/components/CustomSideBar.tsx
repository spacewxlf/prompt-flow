"use client";

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { BsStars } from "react-icons/bs";
import { RiChatAiLine } from "react-icons/ri";
import { GoTools } from "react-icons/go";
import { useRouter } from "next/navigation";
import { LuWorkflow } from "react-icons/lu";

export function CustomSideBar({activeTab}: {activeTab: string}) {

    const isActive = (tab: string) => {

        if(activeTab === tab) {
            return true;
        }
        return false;
    }
    const router = useRouter();

    const handleClick = (tab: string) => {
        console.log('Clicking tab:', tab);
        router.push(`/${tab}`);
    }


    return (
        <Sidebar aria-label="Sidebar with logo branding example">
            <SidebarItems>
                <SidebarItemGroup>
                    <SidebarItem icon={RiChatAiLine} className={`cursor-pointer [&>svg]:text-blue-500 ${isActive("") ? "text-blue-500" : ""}`} onClick={() => handleClick("")}>
                        <span className="text-xl font-bold">PromptFlow</span>
                    </SidebarItem>
                </SidebarItemGroup>
                <SidebarItemGroup>
                    <SidebarItem icon={HiChartPie} active={isActive("dashboard")} className={`cursor-pointer ${isActive("dashboard") ? "text-blue-500" : ""}`} onClick={() => handleClick("dashboard")}>
                        Dashboard
                    </SidebarItem>
                    <SidebarItem icon={LuWorkflow} active={isActive("workflows")} className={`cursor-pointer ${isActive("workflows") ? "text-blue-500" : ""}`} onClick={() => handleClick("workflows")}>
                        Workflows
                    </SidebarItem>
                    <SidebarItem icon={GoTools} active={isActive("tools")} className={`cursor-pointer ${isActive("tools") ? "text-blue-500" : ""}`} onClick={() => handleClick("tools")}>
                        Tools
                    </SidebarItem>                    
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    );
}
