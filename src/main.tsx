import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SiteDataProvider } from "./context/SiteDataContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SiteDataProvider>
      <App />
    </SiteDataProvider>
  </React.StrictMode>
);
