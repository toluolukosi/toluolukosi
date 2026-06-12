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
import ContactPage from "./pages/ContactPage";

// new still pages
import BrutalistCities from "./pages/Stills/BrutalistCities";
import LSDmp3 from "./pages/Stills/LSDmp3";
import FergieEra from "./pages/Stills/FergieEra";
import Reduced from "./pages/Stills/Reduced";
// (add more as you create them)

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

        {/* Stills detail pages */}
        <Route path="/stills/brutalist-cities" element={<BrutalistCities />} />
        <Route path="/stills/LSDmp3" element={<LSDmp3 />} />
        <Route path="/stills/fergie-era" element={<FergieEra />} />
        <Route path="/stills/Reduced" element={<Reduced />} />
        {/* Add more still pages here */}

        {/* Projects */}
        <Route path="/project1" element={<SprezzaturraPage />} />
        <Route path="/otis" element={<OtisPage />} />
        <Route path="/tolukosi" element={<TolukosiPage />} />

        {/* Projects */}
        <Route path="/contact" element={<ContactPage />} />

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
