import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import ReactMarkdown from 'react-markdown';
import 'easymde/dist/easymde.min.css';
import { Box } from '@mui/material';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    readOnly?: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, readOnly }) => {
    return (
        <Box>
            {readOnly ? (
                <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
                <SimpleMDE value={value} onChange={onChange} />
            )}
        </Box>
    );
};

export default MarkdownEditor;
