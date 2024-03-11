// src/components/PdfViewer.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ReactHtmlParser from "react-html-parser";
import { Paper, Grid } from "@mui/material";

const PdfViewer = () => {
  const { pdfContent } = useContext(AppContext);

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
                {ReactHtmlParser(pdfContent)}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PdfViewer;
