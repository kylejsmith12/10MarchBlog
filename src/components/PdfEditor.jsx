import React, { useContext, useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AppContext } from "../context/AppContext";
import { Select, MenuItem } from "@mui/material";

const generateRandomParagraph = (selectedWord) => {
  const sentences = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.,
    Sed do eiusmod tempor incididunt ut ${selectedWord} et dolore magna aliqua.,
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.,
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.,
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  return sentences;
};

const PdfEditor = () => {
  const [selectedWord, setSelectedWord] = useState("");
  const { setPdfContent } = useContext(AppContext);
  const quillRef = useRef(null);

  useEffect(() => {
    const initialParagraph = generateRandomParagraph(selectedWord);
    setPdfContent(initialParagraph); // Set initial content
  }, [selectedWord, setPdfContent]);

  const handleQuillChange = (content, delta, source, editor) => {
    console.log("content: ", content);
    setPdfContent(content);
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedWord(selectedOption);
  };

  const logEditorContent = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const content = editor.root.innerHTML; // Get the HTML content
      console.log("Editor HTML content:", content);
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
        defaultValue={generateRandomParagraph(selectedWord)} // Set defaultValue to random paragraph
        onChange={handleQuillChange}
      />
      <button onClick={logEditorContent}>Log Editor Content</button>
    </div>
  );
};

export default PdfEditor;
