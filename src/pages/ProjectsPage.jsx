// src/pages/ProjectsPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

const ProjectsPage = () => {
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false); // more cards off-screen?
  const [atEnd, setAtEnd] = useState(false);

  // Track whether the row overflows and whether we've reached the end
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      setCanScroll(el.scrollWidth > el.clientWidth + 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Mouse wheel (vertical) scrolls the row horizontally
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // trackpad sideways swipe: leave native
      const atStart = el.scrollLeft <= 0;
      const atRightEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atRightEnd)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // 👉 On arrival: the row "peeks" left twice, hinting there's more to the right
  useEffect(() => {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    if (el.scrollWidth <= el.clientWidth + 1) return; // nothing to scroll to
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let anim;
    const timer = setTimeout(() => {
      anim = track.animate(
        [
          { transform: "translateX(0)", offset: 0 },
          { transform: "translateX(-64px)", offset: 0.22 },
          { transform: "translateX(0)", offset: 0.5 },
          { transform: "translateX(-28px)", offset: 0.68 },
          { transform: "translateX(0)", offset: 1 },
        ],
        { duration: 1400, easing: "cubic-bezier(0.45, 0, 0.25, 1)" }
      );
    }, 700);

    // stop the hint as soon as the user takes over
    const cancel = () => {
      clearTimeout(timer);
      anim?.cancel();
    };
    el.addEventListener("pointerdown", cancel);
    el.addEventListener("wheel", cancel, { passive: true });
    el.addEventListener("touchstart", cancel, { passive: true });

    return () => {
      cancel();
      el.removeEventListener("pointerdown", cancel);
      el.removeEventListener("wheel", cancel);
      el.removeEventListener("touchstart", cancel);
    };
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
      <div className="relative">
        <div
          ref={scrollerRef}
          className="
            no-scrollbar
            overflow-x-auto
            snap-x snap-proximity
            scroll-px-[4%]
          "
        >
          <div ref={trackRef} className="flex gap-6 w-max px-[4vw]">
            {projects.map((project) => (
              <div
                key={project.title}
                className="shrink-0 snap-start w-[85vw] sm:w-[480px] lg:w-[520px]"
              >
                <ProjectCard {...project} />
              </div>
            ))}
            {/* keeps the right-hand gutter after the last card */}
            <div className="shrink-0 w-px" aria-hidden="true" />
          </div>
        </div>

        {/* Right-edge fade + pulsing arrow while there's more to see */}
        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute inset-y-0 right-0 w-[12vw] min-w-[60px]
            bg-gradient-to-l from-black/90 to-transparent
            flex items-center justify-end pr-[2vw]
            transition-opacity duration-500
            ${canScroll && !atEnd ? "opacity-100" : "opacity-0"}
          `}
        >
          <span className="scroll-hint-arrow text-white/70 text-[28px] font-thedus-condensed">
            →
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
