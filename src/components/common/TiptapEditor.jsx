import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';
import HardBreak from '@tiptap/extension-hard-break';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import HorizontalRule from '@tiptap/extension-horizontal-rule';


const TiptapEditor = ({ setFormData, formData }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false, 
      }),
      Paragraph,
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      HardBreak.configure({ keepMarks: false }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      CodeBlock,
      HorizontalRule,
     
    ],
    content: '<p>Start writing your blog here...</p>',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    },
   
  });

  if (!editor) return null;

  const buttonBase = 'px-3 py-1 rounded-md text-sm font-medium transition-all duration-200';
  const activeStyle = 'bg-blue-600 text-white';
  const inactiveStyle = 'bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white';

  return (
    <div className="w-full p-6 bg-white rounded-xl space-y-4 border border-stone-200">
      <div className="flex flex-wrap gap-2 pb-3">
        {[
          { label: 'Bold', command: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
          { label: 'Italic', command: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
          { label: 'Underline', command: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline') },
          { label: 'Paragraph', command: () => editor.chain().focus().setParagraph().run(), active: editor.isActive('paragraph') },
          { label: 'H1', command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
          { label: 'H2', command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
          { label: 'H3', command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }) },
          { label: 'Bullet List', command: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
          { label: 'Ordered List', command: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
          { label: 'Blockquote', command: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote') },
          { label: 'Code Block', command: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock') },
          { label: 'Horizontal Rule', command: () => editor.chain().focus().setHorizontalRule().run(), active: false },
          { label: 'Clear', command: () => editor.chain().focus().clearNodes().unsetAllMarks().run(), active: false },
          { label: 'Undo', command: () => editor.chain().focus().undo().run(), active: false },
          { label: 'Redo', command: () => editor.chain().focus().redo().run(), active: false },
        ].map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.command}
            className={`${buttonBase} ${btn.active ? activeStyle : inactiveStyle}`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="min-h-[200px] rounded-md border border-gray-300 p-4 text-base leading-relaxed prose max-w-none">
        <EditorContent
          editor={editor}
          className="focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );
};

export default TiptapEditor;

