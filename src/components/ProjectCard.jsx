// src/components/ProjectCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ title, year, image, logo, line1, line2, route }) => {
  return (
    <Link
      to={route}
      className="
        group
        relative w-full h-[652px]
        rounded-2xl
        bg-[#050609]
        border border-white/10
        lg:hover:border-white/20          /* hover border only on desktop */
        transition-colors duration-300
        overflow-hidden
        p-[10px]
        flex
      "
    >
      {/* Inner wrapper so spacing is consistent all around */}
      <div className="flex flex-col h-full w-full">
        {/* Top Bar: Title and Year with hover-only purple gradient */}
        <div
          className="
            w-full h-[62px]
            flex justify-between items-center
            px-4
            rounded-xl
            border border-white/10

            /* base: subtle dark bar */
            bg-[#111217]
            bg-gradient-to-br
            from-[#111217]
            via-[#111217]
            to-[#111217]
            shadow-[0_8px_24px_rgba(0,0,0,0.6)]

            /* 🖥 desktop hover: purple gradient effect */
            lg:group-hover:from-[rgba(139,92,246,0.28)]
            lg:group-hover:via-[#151822]
            lg:group-hover:to-[#151822]
            lg:group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.75)]
            transition-[background,box-shadow] duration-300
          "
        >
          <span className="text-[16px] font-medium font-thedus-condensed text-white">
            {title}
          </span>
          <span className="text-[16px] font-medium font-thedus-condensed text-white">
            {year}
          </span>
        </div>

        {/* gap between top bar and image section */}
        <div className="h-[11px]" />

        {/* Bottom Image Section */}
        <div
          className="
            w-full flex-1
            relative
            rounded-xl
            border border-white/10
            bg-[#111217]
            overflow-hidden
          "
        >
          {/* 📸 IMAGE LAYER (zoom + grayscale) */}
          <div
            className="
              absolute inset-0
              bg-cover bg-center
              grayscale-0                      /* mobile & tablet: color */
              lg:grayscale-[75%]               /* desktop default: grayscale */
              lg:group-hover:grayscale-0       /* desktop hover: color */

              transform scale-100
              lg:group-hover:scale-105         /* zoom on desktop hover */
              transition-transform duration-500 ease-out
            "
            style={{ backgroundImage: `url(${image})` }}
          />

          {/* You can optionally add a subtle overlay here if you like:
              <div className='absolute inset-0 bg-black/10 lg:group-hover:bg-black/20 transition-colors' />
          */}

          {/* Logo overlay */}
          <img
            src={logo}
            alt="Logo"
            className="
              absolute top-6 left-6 h-15
              drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]
              lg:group-hover:scale-110        /* desktop hover only */
              transition-transform duration-300
            "
          />

          {/* 📱 Mobile & tablet: text always visible */}
          <div className="absolute bottom-4 left-4 text-white lg:hidden">
            <p className="text-[31px] font-bold font-thedus-condensed leading-none">
              {line1}
            </p>
            <p className="text-[20px] font-normal text-gray-400 font-thedus-condensed mt-[6px]">
              {line2}
            </p>
          </div>

          {/* 🖥 Desktop: text only on hover */}
          <div
            className="
              absolute bottom-4 left-4
              text-white
              hidden lg:block           /* only exist on desktop */
              opacity-0                 /* hidden by default */
              lg:group-hover:opacity-100
              transition-opacity duration-300
            "
          >
            <p className="text-[31px] font-bold font-thedus-condensed leading-none">
              {line1}
            </p>
            <p className="text-[20px] font-normal text-gray-400 font-thedus-condensed mt-[6px]">
              {line2}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
