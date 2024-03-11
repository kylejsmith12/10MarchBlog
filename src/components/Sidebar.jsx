// src/components/Sidebar.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Select, MenuItem } from "@mui/material";

const Sidebar = () => {
  const { pdfView, setPdfView } = useContext(AppContext);

  const handleViewChange = (event) => {
    setPdfView(event.target.value);
  };

  return (
    <div>
      <Select value={pdfView} onChange={handleViewChange} variant="outlined">
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="single">Single</MenuItem>
      </Select>
    </div>
  );
};

export default Sidebar;
