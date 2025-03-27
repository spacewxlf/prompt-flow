import { createTheme } from "flowbite-react";

const customTheme = createTheme({
    theme: {
        color: {
            primary: 'blue',
            secondary: 'gray',
            success: 'green',
            warning: 'yellow',
            error: 'red',
        }
    },		
    sidebar: {
        root: {
            base: "h-full border-r border-gray-200 dark:border-gray-700",
            inner: "h-full overflow-y-auto overflow-x-hidden rounded-none bg-white py-4 px-3 dark:bg-gray-800"
        }
    },
    banner: {
        root: {
            base: "bg-gray-800",
        }
    },
    table: {
        root: {
            base: "w-full text-left text-sm text-gray-300"
        },
        head: {
            base: "bg-gray-800 text-gray-100",
        },
        body: {
            base: "divide-y divide-gray-400 bg-gray-300 text-gray-700 border-gray-400"
        },
        row: {
            base: "hover:bg-gray-200",
        }
    }
});

export default customTheme;