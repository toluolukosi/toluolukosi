// src/pages/OtisPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const OtisPage = () => {
  return (
    <div className="min-h-[calc(100vh-60px)] px-[4%] py-10 text-white font-thedus-condensed">
      <Link
        to="/"
        className="inline-block mb-6 text-sm text-gray-400 hover:text-yellow-400 transition"
      >
        ⟵ Back to projects
      </Link>
      <h1 className="text-5xl mb-4 tracking-wide">otis</h1>
      <p className="text-gray-400 mb-8">
        Multidisciplinary Creative Company – Film, Design, Music, Fashion.
      </p>
    </div>
  );
};

export default OtisPage;
