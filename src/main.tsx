import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeContextDefaultProvider from "./context/ThemeContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //TODO <React.StrictMode>
    <BrowserRouter>
     <ThemeContextDefaultProvider>
      <App/>
     </ThemeContextDefaultProvider>

    </BrowserRouter>
  // </React.StrictMode>
);
