// src/components/ProjectCard.jsx
import React from "react";

const ProjectCard = ({ title, year, image, logo, line1, line2 }) => {
  return (
    <div className="flex-1 h-[652px] rounded-2xl bg-black flex flex-col gap-[11px] items-center pt-[10px] pb-[10px] px-[11px] border border-gray-400">
      {/* Top Bar: Title and Year */}
      <div className="w-full h-[62px] bg-black flex justify-between items-center px-4 rounded-t-md rounded-b-md border border-gray-400">
        <span className="text-[16px] font-medium font-thedus-condensed">
          {title}
        </span>
        <span className="text-[16px] font-medium font-thedus-condensed">
          {year}
        </span>
      </div>

      <div
        className="w-full h-[561px] bg-gray-800 relative overflow-hidden rounded-t-md rounded-b-md border border-#848484"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Logo Top-Left */}
        <img src={logo} alt="Logo" className="absolute top-6 left-6 h-15" />

        {/* Text Bottom-Left */}
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-[31px] font-bold font-thedus-condensed leading-none">
            {line1}
          </p>
          <p className="text-[20px] font-normal  text-gray-400 font-thedus-condensed mt-[6px]">
            {line2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
