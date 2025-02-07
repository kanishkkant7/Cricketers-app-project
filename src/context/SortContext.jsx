// context/SortContext.jsx
import React, { createContext, useContext, useState } from 'react';

const SortContext = createContext();

export function SortProvider({ children }) {
    const [sortType, setSortType] = useState("None");
    const [highlightState, setHighlightState] = useState("");

    const value = {
        sortType,
        setSortType,
        highlightState,
        setHighlightState
    };

    return (
        <SortContext.Provider value={value}>
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