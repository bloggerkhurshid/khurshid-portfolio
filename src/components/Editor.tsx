"use client";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Essentials,
    Bold,
    Italic,
    Font,
    Paragraph,
    Alignment,
    List,
    Link,
    Heading,
    BlockQuote,
    Indent,
    IndentBlock,
    CodeBlock,
    Undo
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

export default function Editor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    return (
        <div className="ckeditor-wrapper text-black">
            <CKEditor
                editor={ ClassicEditor }
                config={ {
                    licenseKey: 'GPL',
                    plugins: [
                        Essentials, Bold, Italic, Font, Paragraph, Alignment, List, Link, Heading, BlockQuote, Indent, IndentBlock, CodeBlock, Undo
                    ],
                    toolbar: [
                        'heading', '|',
                        'bold', 'italic', 'fontColor', 'fontBackgroundColor', '|',
                        'alignment', 'bulletedList', 'numberedList', 'outdent', 'indent', '|',
                        'link', 'blockQuote', 'codeBlock', '|',
                        'undo', 'redo'
                    ],
                } }
                data={value}
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    onChange(data);
                } }
            />
        </div>
    );
}
