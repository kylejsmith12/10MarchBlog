import React, { useContext, useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AppContext } from "../context/AppContext";
import { Select, MenuItem } from "@mui/material";

const generateRandomParagraph = (selectedWord) => {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit.,
    Sed do eiusmod tempor incididunt ut ${selectedWord} et dolore magna aliqua.,
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.,
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.,
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
};

const PdfEditor = () => {
  const [selectedWord, setSelectedWord] = useState("");
  const [content, setContent] = useState("");
  const { setPdfContent } = useContext(AppContext);
  const quillRef = useRef(null);

  useEffect(() => {
    const initialParagraph = generateRandomParagraph(selectedWord);
    setContent(initialParagraph); // Set initial content
    setPdfContent(initialParagraph); // Set initial content in context
  }, [selectedWord, setPdfContent]);

  useEffect(() => {
    if (quillRef.current && quillRef.current.getEditor()) {
      const editor = quillRef.current.getEditor();
      editor.clipboard.dangerouslyPasteHTML(content);
    }
  }, [content]);

  const handleQuillChange = (content, delta, source, editor) => {
    // const editorHtml = editor.root.innerHTML;
    setContent(content);
    setPdfContent(content);
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedWord(selectedOption);
  };

  const logEditorContent = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const editorHtml = editor.root.innerHTML; // Get the HTML content
      console.log("Editor HTML content:", editorHtml);
    }
  };

  return (
    <div>
      <h2>Edit PDF Content</h2>
      <Select value={selectedWord} onChange={handleSelectChange}>
        <MenuItem value="test">Test</MenuItem>
        <MenuItem value="example">Example</MenuItem>
        {/* Add more options as needed */}
      </Select>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={handleQuillChange}
      />
      <button onClick={logEditorContent}>Log Editor Content</button>
    </div>
  );
};

export default PdfEditor;
