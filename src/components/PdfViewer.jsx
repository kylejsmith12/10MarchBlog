// src/components/PdfViewer.jsx
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import ReactHtmlParser from "react-html-parser";
import { Paper, Grid } from "@mui/material";

const PAGE_HEIGHT = 10; // Height of content area in inches, excluding padding

const PdfViewer = () => {
  const { pdfContent } = useContext(AppContext);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Calculate maximum content height for a single page
    const maxContentHeight = PAGE_HEIGHT - 2; // Subtract padding
    // Split content into pages based on maximum height
    const contentPages = [];
    let currentPageContent = "";
    let totalHeight = -5;
    let lastParagraphHeight = -90;
    const paragraphs = pdfContent.split("<p>");
    paragraphs.forEach((paragraph, index) => {
      // Skip empty paragraphs
      if (!paragraph.trim()) return;

      // Calculate the height of the paragraph including tags
      const paragraphHeight = (paragraph.match(/<\/p>/g) || []).length;

      // Check if adding this paragraph exceeds the max content height
      if (
        totalHeight + paragraphHeight + lastParagraphHeight <=
        maxContentHeight
      ) {
        // Add the paragraph to the current page
        currentPageContent += index === 0 ? `${paragraph}` : `<p>${paragraph}`; // Don't add <p> tag for the first paragraph
        totalHeight += paragraphHeight;
        lastParagraphHeight = paragraphHeight;
      } else {
        // If adding the paragraph exceeds the max height, start a new page
        contentPages.push(currentPageContent);
        currentPageContent = `<p>${paragraph}`;
        totalHeight = paragraphHeight;
      }
    });

    // Push the remaining content onto the last page
    if (currentPageContent !== "") {
      contentPages.push(currentPageContent);
    }
    setPages(contentPages);
    setCurrentPage(0);
  }, [pdfContent]);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2>All PDF Content</h2>
      <div style={{}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper
              elevation={2}
              style={{
                width: "100%",
                height: "100%",
                width: "8.5in",
                height: "11in",
                margin: "auto",
              }}
            >
              <div style={{ padding: "1in" }}>
                {ReactHtmlParser(pages[currentPage])}
              </div>
            </Paper>
            <div>
              <button onClick={handlePrevPage}>Previous Page</button>
              <button onClick={handleNextPage}>Next Page</button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PdfViewer;
