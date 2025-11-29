// src/components/ProjectCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ title, year, image, logo, line1, line2, route }) => {
  return (
    <Link
      to={route}
      className="relative w-full h-[652px] rounded-2xl bg-black flex flex-col items-center pt-[10px] pb-[10px] border border-black group overflow-hidden"
    >
      {/* Top Bar: Title and Year */}
      <div className="w-full h-[62px] bg-black flex justify-between items-center px-4 rounded-t-md border border-gray-400">
        <span className="text-[16px] font-medium font-thedus-condensed text-white">
          {title}
        </span>
        <span className="text-[16px] font-medium font-thedus-condensed text-white">
          {year}
        </span>
      </div>

      <div className="h-[11px]" />

      {/* Bottom Image Section */}
      <div
        className="w-full h-[561px] bg-gray-800 relative overflow-hidden rounded-t-md rounded-b-md border grayscale-80 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-300 ease-in-out"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="absolute top-6 left-6 h-15 group-hover:scale-110 transition-all duration-300"
        />

        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-[31px] font-bold font-thedus-condensed leading-none">
            {line1}
          </p>
          <p className="text-[20px] font-normal text-gray-400 font-thedus-condensed mt-[6px]">
            {line2}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
