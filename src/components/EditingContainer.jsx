// src/components/EditingContainer.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Paper, Select, MenuItem } from "@mui/material";
import PdfViewer from "./PdfViewer";
import PdfEditor from "./PdfEditor";

const EditingContainer = () => {
  const { pdfView, setPdfView } = useContext(AppContext);

  const handleViewChange = (event) => {
    setPdfView(event.target.value);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Paper style={{ flex: 1, margin: 10, padding: 10 }}>
        <Select value={pdfView} onChange={handleViewChange} variant="outlined">
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="single">Single</MenuItem>
        </Select>
        {pdfView === "single" && <PdfEditor />}
      </Paper>
    </div>
  );
};

export default EditingContainer;
