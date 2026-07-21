import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/index.css"; // Adjust the path if necessary
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app);
  } else {
    createRoot(rootElement).render(app);
  }
}
