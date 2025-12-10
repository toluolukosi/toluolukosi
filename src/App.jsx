// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import StillsPage from "./pages/StillsPage";
import LivePage from "./pages/LivePage";
import SoundPage from "./pages/SoundPage";
import DevPage from "./pages/DevPage";
import SprezzaturraPage from "./pages/SprezzaturraPage";
import OtisPage from "./pages/OtisPage";
import TolukosiPage from "./pages/TolukosiPage";

const App = () => {
  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden overflow-y-auto">
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Sides */}
        <Route path="/stills" element={<StillsPage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/sound" element={<SoundPage />} />
        <Route path="/dev" element={<DevPage />} />

        {/* Projects */}
        <Route path="/project1" element={<SprezzaturraPage />} />
        <Route path="/otis" element={<OtisPage />} />
        <Route path="/tolukosi" element={<TolukosiPage />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="text-white p-10 font-thedus-condensed">
              <h1 className="text-3xl mb-4">404</h1>
              <p>Page not found.</p>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
