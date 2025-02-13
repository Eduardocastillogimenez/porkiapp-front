import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// createRoot(document.getElementById('root')).render()

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
