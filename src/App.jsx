// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-black overflow-auto min-h-screen max-w-screen w-full">
      {/* NAVBAR */}
      <nav
        className="sticky z-10 flex items-center justify-between px-10 py-2 gap-8 h-[100px] bg-black"
        id="navbar"
      >
        <Link to="/">
          <img
            src="src/assets/otis ambigram.png"
            alt="OTIS Ambigram"
            className="h-10 w-auto z-10"
          />
        </Link>

        {/* Hamburger Icon for small screens */}
        <button
          className="md:hidden flex items-center justify-center w-8 h-8 border border-gray-400 rounded-md"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Menu */}
        <ul
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex items-center ml-auto gap-8 flex-col md:flex-row md:gap-8`}
        >
          {/* These hash links only really make sense on the homepage,
              but they won't break on other pages. */}
          <a
            href="/#projects"
            className="group text-left font-thedus-condensed leading-tight cursor-pointer"
          >
            <div className="text-white text-[18px] leading-[15px] group-hover:text-yellow-400 transition duration-300">
              01
            </div>
            <div className="text-gray-400 text-[18px] leading-[15px]">
              Projects
            </div>
          </a>
          <a
            href="/#gallery"
            className="group text-left font-thedus-condensed leading-tight cursor-pointer"
          >
            <div className="text-white text-[18px] leading-[15px] group-hover:text-yellow-400 transition duration-300">
              02
            </div>
            <div className="text-gray-400 text-[18px] leading-[15px]">
              Gallery
            </div>
          </a>
          <a
            href="/#about"
            className="group text-left font-thedus-condensed leading-tight cursor-pointer"
          >
            <div className="text-white text-[18px] leading-[15px] group-hover:text-yellow-400 transition duration-300">
              03
            </div>
            <div className="text-gray-400 text-[18px] leading-[15px]">
              About Me
            </div>
          </a>
        </ul>
      </nav>

      {/* ROUTES */}
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
