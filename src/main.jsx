import { StrictMode } from "react"; // to be removed before deployment
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./components/Layout.jsx"; // Common layout
import { BrowserRouter, Routes, Route } from "react-router-dom"; // For routing
import Cricketers from "./pages/Cricketers.jsx"; // component for /all-cricketers route

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="all-cricketers" element={<Cricketers/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);