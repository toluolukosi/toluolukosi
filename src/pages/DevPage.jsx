import React from "react";
import { Link } from "react-router-dom";

const DevPage = () => {
  return (
    <div className="min-h-[calc(100vh-60px)] px-[4%] py-10 text-white font-thedus-condensed">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl tracking-wide">Dev</h1>
        <Link
          to="/"
          className="text-sm text-gray-400 hover:text-yellow-400 transition"
        >
          ⟵ Back to home
        </Link>
      </div>
      <p className="text-gray-400 max-w-2xl mb-8">
        This is the Dev page. Showcase web projects, tools, experiments, etc.
      </p>
    </div>
  );
};

export default DevPage;
