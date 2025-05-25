import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Paragraph from '@tiptap/extension-paragraph';
import Underline from '@tiptap/extension-underline';
import HardBreak from '@tiptap/extension-hard-break';


const TiptapEditor = ({ setFormData, formData }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph,
      Bold,
      Italic,
      Underline,
      HardBreak.configure({
      HTMLAttributes: {
        class: 'my-hard-break',
      },
    }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: '<p>Start writing your blog here...</p>',
    onUpdate: ({ editor }) => {
  setFormData(prev => ({ ...prev, content: editor.getHTML() }));
},

  });

  if (!editor) return null;

  const buttonBase =
    'px-3 py-1 rounded-md text-sm font-medium transition-all duration-200';

  const activeStyle = 'bg-blue-600 text-white';
  const inactiveStyle =
    'bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white';

  return (
    <div className="w-full  p-6 bg-white  rounded-xl space-y-4 border-1 border-stone-200 ">
      <div className="flex flex-wrap gap-2  pb-3">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonBase} ${
            editor.isActive('bold') ? activeStyle : inactiveStyle
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonBase} ${
            editor.isActive('italic') ? activeStyle : inactiveStyle
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${buttonBase} ${
            editor.isActive('underline') ? activeStyle : inactiveStyle
          }`}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${buttonBase} ${
            editor.isActive('paragraph') ? activeStyle : inactiveStyle
          }`}
        >
          Paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${buttonBase} ${
            editor.isActive('heading', { level: 1 }) ? activeStyle : inactiveStyle
          }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${buttonBase} ${
            editor.isActive('heading', { level: 2 }) ? activeStyle : inactiveStyle
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${buttonBase} ${
            editor.isActive('heading', { level: 3 }) ? activeStyle : inactiveStyle
          }`}
        >
          H3
        </button>
        <button
  onClick={() => editor.chain().focus().setHardBreak().run()}
  className={`${buttonBase} ${inactiveStyle}`}
>
  Line Break
</button>

      </div>

      <div className="prose max-w-none min-h-[200px]">
        <EditorContent editor={editor} className='outline-none border-0' />
      </div>
    </div>
  );
};

export default TiptapEditor;
