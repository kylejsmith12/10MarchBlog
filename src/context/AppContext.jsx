// AppContext.js
import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [pdfView, setPdfView] = useState("all");
  const [pdfContent, setPdfContent] = useState("");
  const [paragraphs, setParagraphs] = useState([
    {
      id: 1,
      immutablePart: "First few sentences",
      mutableValue: "Default value",
    },
    // Add more paragraph objects as needed
  ]);

  return (
    <AppContext.Provider
      value={{
        pdfView,
        setPdfView,
        pdfContent,
        setPdfContent,
        paragraphs,
        setParagraphs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
