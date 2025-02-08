// context/SortContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const SortContext = createContext();

export function SortProvider({ children }) {
  // Initialize state from localStorage or use defaults
  const [sortType, setSortType] = useState(() => {
    // Try to get saved sort type from localStorage, fallback to default if none exists
    return localStorage.getItem('sortType') || "Rank Descending";
  });

  const [highlightState, setHighlightState] = useState(() => {
    // Try to get saved highlight state from localStorage, fallback to default if none exists
    return localStorage.getItem('highlightState') || "none";
  });

  // Update localStorage whenever sort type changes
  useEffect(() => {
    localStorage.setItem('sortType', sortType);
  }, [sortType]);

  // Update localStorage whenever highlight state changes
  useEffect(() => {
    localStorage.setItem('highlightState', highlightState);
  }, [highlightState]);

  // Function to update sort type
  const updateSortType = (newSortType) => {
    setSortType(newSortType);
    // Update highlight state based on sort type
    if (newSortType.includes("Rank")) {
      setHighlightState("points");
    } else if (newSortType.includes("Age")) {
      setHighlightState("age");
    } else if (newSortType.includes("Type")) {
      setHighlightState("type");
    } else {
      setHighlightState("none");
    }
  };

  return (
    <SortContext.Provider
      value={{
        sortType,
        updateSortType,
        highlightState,
        setHighlightState,
      }}
    >
      {children}
    </SortContext.Provider>
  );
}

export function useSortContext() {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSortContext must be used within a SortProvider");
  }
  return context;
}