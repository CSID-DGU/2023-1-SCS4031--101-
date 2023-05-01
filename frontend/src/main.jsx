import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Reset } from "styled-reset";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Reset />
    <App />
  </React.StrictMode>
);
