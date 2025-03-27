"use client";

import Image from "next/image";
import { Button } from "flowbite-react";
import { CustomSideBar } from "./components/CustomSideBar";
import customTheme from "./theme";
import { ThemeProvider } from "flowbite-react";
import { CustomBanner } from "./components/CustomBanner";
import { GetStartedSolutionCard } from "./components/GetStartedSolutionCard";
import { GetStartedToolCard } from "./components/GetStartedToolCard";

export default function Home() {

	return (
		<ThemeProvider theme={customTheme}>
			<main className="flex min-h-screen h-screen">
				<CustomSideBar activeTab="home" />
				<div className="flex-1 p-20">
					<br/>
					<CustomBanner />
					<br/>
					<div className="flex gap-4">
						<GetStartedSolutionCard />
						<GetStartedToolCard />
					</div>
				</div>
			</main>
		</ThemeProvider>
	);
}
