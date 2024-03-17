import React, { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AppContext } from "../context/AppContext";

const PdfEditor = () => {
  // const [pdfContent, setPdfContent] = useState("");
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const [pages, setPages] = useState([]);
  const { pdfContent, setPdfContent } = useContext(AppContext);

  useEffect(() => {
    const updatePageSize = () => {
      setPageSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", updatePageSize);
    updatePageSize();

    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  useEffect(() => {
    paginateContent();
  }, [pdfContent, pageSize]);

  const paginateContent = () => {
    const quill = document.querySelector(".ql-editor");
    if (!quill) return;

    const lines = quill.children;
    const pageHeight = 11 * 96 - 2 * 96; // 11 inches * 96 pixels per inch - 2 * 1 inch padding
    const pageWidth = 8.5 * 96 - 2 * 96; // 8.5 inches * 96 pixels per inch - 2 * 1 inch padding
    const pageContent = [];
    let currentPage = [];
    let currentHeight = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineHeight = line.offsetHeight;

      if (currentHeight + lineHeight > pageHeight) {
        pageContent.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }

      if (line.offsetWidth <= pageWidth) {
        currentHeight += lineHeight;
        currentPage.push(line.outerHTML);
      } else {
        // If line width exceeds page width, split it into smaller parts
        let pdfContent = line.innerHTML;
        while (pdfContent.length > 0) {
          const cutIndex = Math.floor(pageWidth / 10); // Assuming average letter width is 10px
          currentPage.push(`<div>${pdfContent.substring(0, cutIndex)}</div>`);
          pdfContent = pdfContent.substring(cutIndex);
          currentHeight += lineHeight;
        }
      }
    }

    if (currentPage.length > 0) {
      pageContent.push(currentPage);
    }

    setPages(pageContent);
  };

  return (
    <div>
      <ReactQuill theme="snow" value={pdfContent} onChange={setPdfContent} />
    </div>
  );
};

export default PdfEditor;
