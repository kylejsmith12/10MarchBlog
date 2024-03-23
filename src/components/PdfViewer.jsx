import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import ReactHtmlParser from "react-html-parser";
import { Paper, Grid, Typography } from "@mui/material";

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
    let totalHeight = 0;
    let lastParagraphHeight = 0;
    const paragraphs = pdfContent.split("<p>");
    paragraphs.forEach((paragraph, index) => {
      // Skip empty paragraphs
      if (!paragraph.trim()) return;

      // Check if the current page is 3
      if (contentPages.length === 2) return; // Skip adding content for page 3

      // Calculate the height of the paragraph including tags
      const paragraphHeight = (paragraph.match(/<\/p>/g) || []).length + 1;

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
                width: "8.5in",
                height: "11in",
                margin: "auto",
                position: "relative",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  position: "absolute",
                  top: "0.25in",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                Header
              </Typography>
              <div style={{ padding: "1in" }}>
                {ReactHtmlParser(pages[currentPage])}
              </div>
              <Typography
                variant="body2"
                style={{
                  position: "absolute",
                  bottom: "0.25in",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                Page {currentPage + 1} of {pages.length}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  position: "absolute",
                  bottom: "0.05in",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                Footer
              </Typography>
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
