"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';

interface SQLEditorProps {
    initialValue?: string;
    onChange?: (value: string) => void;
    height?: string;
}

export const SQLEditor = ({ initialValue = '', onChange, height = '100%' }: SQLEditorProps) => {
    const [value, setValue] = useState(initialValue);

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            setValue(value);
            if (onChange) {
                onChange(value);
            }
        }
    };

    return (
        <Editor
            height={height}
            defaultLanguage="sql"
            theme="eiffel"
            value={value}
            onChange={handleEditorChange}
            options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: true,
                fontSize: 14,
                tabSize: 4,
                wordWrap: "off",
                automaticLayout: true
            }}
        />
    );
};

