// src/App.jsx
import React, { useState } from "react";
import { AppProvider } from "./context/AppContext";
import PdfViewer from "./components/PdfViewer";
import PdfEditor from "./components/PdfEditor";
import { Grid } from "@mui/material";
import EditingContainer from "./components/EditingContainer";

const App = () => {
  const [pdfContent, setPdfContent] = useState(
    "<h1>This is a sample PDF content</h1>"
  );

  const handleSave = (content) => {
    setPdfContent(content);
  };

  return (
    <AppProvider>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <EditingContainer>
            <PdfEditor content={pdfContent} onSave={handleSave} />
          </EditingContainer>
        </Grid>
        <Grid item xs={6}>
          <PdfViewer content={pdfContent} />
        </Grid>
      </Grid>
    </AppProvider>
  );
};

export default App;
