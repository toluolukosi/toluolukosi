// src/components/NavIconButton.jsx
// Back / close button styled like the ProjectCard (dark shell, inner bar, hover glow)
import React from "react";
import { Link } from "react-router-dom";

const icons = {
  back: <path d="M19 12H5M11 6l-6 6 6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
};

const NavIconButton = ({ to, onClick, icon = "back", label, className = "" }) => {
  const Wrapper = to ? Link : "button";
  const wrapperProps = to ? { to } : { type: "button", onClick };

  return (
    <Wrapper
      {...wrapperProps}
      aria-label={label}
      title={label}
      className={`
        group
        shrink-0
        w-10 h-10 md:w-11 md:h-11
        rounded-xl!
        bg-[#050609]!
        border! border-white/10!
        hover:border-white/20!
        p-[3px]!
        transition-colors duration-300
        cursor-pointer
        ${className}
      `}
    >
      <span
        className="
          flex items-center justify-center
          w-full h-full
          rounded-[9px]
          border border-white/10
          bg-[#111217]
          bg-gradient-to-br from-[#111217] via-[#111217] to-[#111217]
          shadow-[0_8px_24px_rgba(0,0,0,0.6)]
          group-hover:from-white/5 group-hover:via-white/5 group-hover:to-white/5
          group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.75)]
          text-gray-300 group-hover:text-white
          transition-[background,box-shadow,color] duration-300
        "
      >
        <svg
          viewBox="0 0 24 24"
          className={`
            w-[18px] h-[18px]
            transition-transform duration-300
            ${icon === "back" ? "group-hover:-translate-x-[2px]" : "group-hover:rotate-90"}
          `}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {icons[icon]}
        </svg>
      </span>
    </Wrapper>
  );
};

export default NavIconButton;
