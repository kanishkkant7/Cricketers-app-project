import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./components/Layout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cricketers from "./pages/Cricketers.jsx";
import { SortProvider } from "./context/SortContext.jsx";
import CricketerDetail from "./pages/CricketerPage.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode> not needed anymore as site gets ready for deployment
    <BrowserRouter>
    {/* Sort provider is used here so that the states are accessible 
    {/* by child components of Layout and so on */}
      <SortProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="all-cricketers">
              <Route index element={<Cricketers />} />
              <Route path=":cricketerId" element={<CricketerDetail />} />
            </Route>
          </Route>
        </Routes>
      </SortProvider>
    </BrowserRouter>
  // </StrictMode>
);