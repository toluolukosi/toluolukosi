// src/pages/ProjectsPage.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

const ProjectsPage = () => {
  const scrollerRef = useRef(null);

  // Mouse wheel (vertical) scrolls the row horizontally
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // trackpad sideways swipe: leave native
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="min-h-screen bg-black py-16">
      {/* PAGE TITLE */}
      <div className="flex items-center justify-between mb-10 px-[4%]">
        <h1 className="text-white font-thedus-condensed text-[48px] md:text-[64px] tracking-wide">
          Projects
        </h1>

        {/* 🏠 BACK TO HOME BUTTON */}
        <Link
          to="/"
          className="
            text-white text-[14px] md:text-[15px]
            uppercase tracking-[0.22em]
            border border-white/20
            px-4 py-2 rounded-[8px]
            hover:bg-white hover:text-black
            transition duration-300
          "
        >
          ←
        </Link>
      </div>

      {/* HORIZONTAL SCROLL ROW OF PROJECT CARDS */}
      <div
        ref={scrollerRef}
        className="
          no-scrollbar
          flex gap-6
          overflow-x-auto
          snap-x snap-proximity
          px-[4%] scroll-px-[4%]
        "
      >
        {projects.map((project) => (
          <div
            key={project.route}
            className="shrink-0 snap-start w-[85vw] sm:w-[480px] lg:w-[520px]"
          >
            <ProjectCard {...project} />
          </div>
        ))}
        {/* keeps the right-hand gutter after the last card */}
        <div className="shrink-0 w-px" aria-hidden="true" />
      </div>
    </section>
  );
};

export default ProjectsPage;
