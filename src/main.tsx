import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ApplicationProvider } from "./client/context/ApplicationContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApplicationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApplicationProvider>
  </React.StrictMode>,
);
