import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
    {/* Vercel Web Analytics: visitors, pages, referrers (see the Analytics tab on Vercel) */}
    <Analytics />
  </StrictMode>
);
