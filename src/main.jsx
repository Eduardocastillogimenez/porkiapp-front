import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import Dasboards from "./views/dasboards";


// createRoot(document.getElementById('root')).render()

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
         <StrictMode>
          <App />
        </StrictMode>
      } />
      <Route path="/dasboards" element={
         <StrictMode>
          <Dasboards />
        </StrictMode>
      } />
    </Routes>
  </BrowserRouter>
);
