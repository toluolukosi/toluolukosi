// src/components/ProjectLayout.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProjectLayout = ({
  title,
  company,
  year,
  type,
  overview,
  contributions = [],
  credits = [],
  heroImages = [],
  sections = [],
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Media is a grid: each section is a row (swipe horizontally within it),
  // and rows stack vertically (scroll up/down to move between sections).
  // Pages that only pass heroImages get a single untitled row.
  const mediaSections =
    sections.length > 0
      ? sections.filter((s) => s.images && s.images.length > 0)
      : heroImages.length > 0
      ? [{ title: null, images: heroImages }]
      : [];

  const gridRef = useRef(null);
  const rowRefs = useRef([]);
  const [activeRow, setActiveRow] = useState(0);
  const [activeCols, setActiveCols] = useState({});
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);

  // ✅ INITIAL SLIDE DIRECTION (entry animation)
  // If we came via "Previous", new page should enter from LEFT.
  // If via "Next" or direct link, enter from RIGHT.
  const [slideClass, setSlideClass] = useState(
    location.state?.from === "left"
      ? "-translate-x-full opacity-0" // enter from left
      : "translate-x-full opacity-0" // enter from right (default)
  );

  const hasImages = mediaSections.length > 0;
  const hasMultipleRows = mediaSections.length > 1;
  const currentSection = mediaSections[activeRow];
  const currentCol = activeCols[activeRow] ?? 0;
  const rowHasMultiple = currentSection?.images.length > 1;

  // Track which row / image is in view from the native scroll position
  const handleGridScroll = (e) => {
    const el = e.currentTarget;
    if (!el.clientHeight) return;
    setActiveRow(Math.round(el.scrollTop / el.clientHeight));
  };

  const handleRowScroll = (rowIndex) => (e) => {
    const el = e.currentTarget;
    if (!el.clientWidth) return;
    const col = Math.round(el.scrollLeft / el.clientWidth);
    setActiveCols((prev) =>
      prev[rowIndex] === col ? prev : { ...prev, [rowIndex]: col }
    );
  };

  const goToImage = (rowIndex, colIndex) => {
    const row = rowRefs.current[rowIndex];
    if (!row) return;
    row.scrollTo({ left: colIndex * row.clientWidth, behavior: "smooth" });
  };

  const goToRow = (rowIndex) => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.scrollTo({ top: rowIndex * grid.clientHeight, behavior: "smooth" });
  };

  // Mouse wheel / trackpad: one gesture = one step. Native snap alone lets a
  // single wheel notch snap back to where it started.
  // Vertical → next/prev section, horizontal → next/prev image in the row.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let lastEvent = 0;
    let locked = false;
    let accX = 0;
    let accY = 0;

    const onWheel = (e) => {
      const now = Date.now();
      const quiet = now - lastEvent > 180; // gesture ended (incl. momentum)
      lastEvent = now;
      if (quiet) {
        locked = false;
        accX = 0;
        accY = 0;
      }
      if (locked) {
        e.preventDefault();
        return;
      }

      accX += e.deltaX;
      accY += e.deltaY;
      if (Math.abs(accX) < 25 && Math.abs(accY) < 25) {
        e.preventDefault();
        return;
      }

      const rowCount = grid.children.length;
      const row = Math.round(grid.scrollTop / grid.clientHeight);

      if (Math.abs(accY) >= Math.abs(accX)) {
        const target = row + (accY > 0 ? 1 : -1);
        // At the first/last section, let the page scroll instead (mobile)
        if (target < 0 || target >= rowCount) return;
        e.preventDefault();
        goToRow(target);
      } else {
        e.preventDefault();
        const rowEl = rowRefs.current[row];
        if (!rowEl) return;
        const count = rowEl.children.length;
        const col = Math.round(rowEl.scrollLeft / rowEl.clientWidth);
        const target = col + (accX > 0 ? 1 : -1);
        if (target < 0 || target >= count) return;
        goToImage(row, target);
      }
      locked = true;
    };

    grid.addEventListener("wheel", onWheel, { passive: false });
    return () => grid.removeEventListener("wheel", onWheel);
  }, [hasImages]);

  const handleNextImage = () => {
    if (!rowHasMultiple) return;
    goToImage(activeRow, (currentCol + 1) % currentSection.images.length);
  };

  const handlePrevImage = () => {
    if (!rowHasMultiple) return;
    const count = currentSection.images.length;
    goToImage(activeRow, currentCol === 0 ? count - 1 : currentCol - 1);
  };

  // ===== PROJECT LIST (for dropdown + PREV/NEXT buttons) =====
  const projectOptions = [
    { label: "Eclipse", path: "/project1" },
    { label: "OTIS", path: "/otis" },
    { label: "Tolukosi", path: "/tolukosi" },
  ];

  const currentProjectIndex = projectOptions.findIndex(
    (proj) => proj.path === location.pathname
  );

  const nextProject =
    currentProjectIndex === -1
      ? null
      : projectOptions[(currentProjectIndex + 1) % projectOptions.length];

  const prevProject =
    currentProjectIndex === -1
      ? null
      : projectOptions[
          (currentProjectIndex - 1 + projectOptions.length) %
            projectOptions.length
        ];

  const handleProjectSelect = (path) => {
    setProjectMenuOpen(false);
    navigate(path, { state: { from: "right" } }); // default: enter from right
  };

  // ENTRY ANIMATION – slide from initial position to center
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setSlideClass("translate-x-0 opacity-100");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // NEXT PROJECT swipe: current slides LEFT, next page enters from RIGHT
  const handleNextProject = () => {
    if (!nextProject) return;
    setSlideClass("-translate-x-full opacity-0"); // exit left
    setTimeout(() => {
      navigate(nextProject.path, { state: { from: "right" } }); // new enters from right
    }, 450);
  };

  // PREVIOUS PROJECT swipe:
  // current slides RIGHT, previous page enters from LEFT
  const handlePrevProject = () => {
    if (!prevProject) return;
    setSlideClass("translate-x-full opacity-0"); // exit right
    setTimeout(() => {
      navigate(prevProject.path, { state: { from: "left" } }); // new enters from left
    }, 450);
  };

  return (
    <section
      className={`
        fixed inset-0 z-[60]
        bg-[#050609]
        flex justify-center
        items-start lg:items-center
        px-4 md:px-6 lg:px-10
        py-6 lg:py-10
        overflow-y-auto lg:overflow-y-hidden
        transition-transform transition-opacity duration-500
        ease-[cubic-bezier(0.22,0.61,0.36,1)]
        ${slideClass}
      `}
      style={{ fontFamily: "var(--project-font, system-ui, sans-serif)" }}
    >
      <div className="w-full mx-auto">
        <div
          className="
            w-full
            grid gap-6 lg:gap-4
            lg:grid-cols-[65%_35%]
            items-stretch
            lg:h-[90vh]
          "
        >
          {/* ========== LEFT – MEDIA CARD ========== */}
          {/* Rows = project sections (scroll vertically between them).
              Images inside a row scroll horizontally. Native scroll-snap
              handles wheel, trackpad and touch. */}
          <div
            className="
    relative
    rounded-[10px] md:rounded-[10px]
    overflow-hidden
    border border-white/10
    shadow-[0_26px_80px_rgba(0,0,0,0.75)]
    bg-black
    select-none
    h-[360px]
    sm:h-[420px]
    md:h-[480px]
    lg:h-full
  "
          >
            {hasImages ? (
              <>
                <div
                  ref={gridRef}
                  onScroll={handleGridScroll}
                  className="
                    w-full h-full
                    overflow-y-auto overflow-x-hidden
                    snap-y snap-mandatory
                    no-scrollbar
                  "
                >
                  {mediaSections.map((section, rowIndex) => (
                    <div
                      key={section.title ?? rowIndex}
                      ref={(el) => (rowRefs.current[rowIndex] = el)}
                      onScroll={handleRowScroll(rowIndex)}
                      className="
                        w-full h-full
                        flex
                        overflow-x-auto overflow-y-hidden
                        snap-x snap-mandatory snap-start snap-always
                        overscroll-x-contain
                        no-scrollbar
                      "
                    >
                      {section.images.map((item, colIndex) => {
                        // Items are URL strings, or { src, muted: false } for
                        // a video that should play with sound
                        const src = typeof item === "string" ? item : item.src;
                        const withSound = item?.muted === false;
                        const mediaClass = `
                            w-full h-full flex-shrink-0
                            object-cover object-center
                            snap-start snap-always
                          `;

                        // { src, website: true } shows the live site; the
                        // overlay keeps swipe/scroll working and opens it
                        if (item?.website) {
                          return (
                            <a
                              key={`${src}-${colIndex}`}
                              href={src}
                              target="_blank"
                              rel="noopener noreferrer"
                              draggable={false}
                              className={`${mediaClass} relative block group`}
                            >
                              <iframe
                                src={src}
                                title={`${title} website`}
                                loading="lazy"
                                tabIndex={-1}
                                className="w-full h-full border-0 pointer-events-none bg-black"
                              />
                              <span
                                className="
                                  absolute bottom-16 left-1/2 -translate-x-1/2
                                  px-4 py-2
                                  rounded-full
                                  bg-black/60 backdrop-blur-sm
                                  border border-white/20
                                  text-[11px] uppercase tracking-[0.22em]
                                  font-thedus-condensed text-white
                                  group-hover:bg-white group-hover:text-black
                                  transition
                                "
                              >
                                Visit site ↗
                              </span>
                            </a>
                          );
                        }
                        // Video URLs (.mp4 etc.) render as muted looping clips
                        return /\.(mp4|webm|mov)$/i.test(src) ? (
                          <video
                            key={`${src}-${colIndex}`}
                            src={src}
                            // Browsers block autoplay with sound, so videos
                            // with sound get controls and start on click
                            autoPlay={!withSound}
                            muted={!withSound}
                            loop={!withSound}
                            controls={withSound}
                            playsInline
                            preload={rowIndex === 0 ? "auto" : "metadata"}
                            className={mediaClass}
                          />
                        ) : (
                          <img
                            key={`${src}-${colIndex}`}
                            src={src}
                            alt={
                              section.title
                                ? `${title} – ${section.title} ${colIndex + 1}`
                                : `${title} ${colIndex + 1}`
                            }
                            loading={rowIndex === 0 ? "eager" : "lazy"}
                            draggable={false}
                            className={mediaClass}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Section label – top left */}
                {currentSection?.title && (
                  <div
                    className="
                      absolute top-5 left-5
                      px-3 py-1
                      rounded-full
                      bg-black/35 backdrop-blur-sm
                      text-[10px] uppercase tracking-[0.22em]
                      font-thedus-condensed text-white
                      pointer-events-none
                    "
                  >
                    {currentSection.title}
                    {rowHasMultiple && (
                      <span className="text-white/60">
                        {" "}
                        · {currentCol + 1}/{currentSection.images.length}
                      </span>
                    )}
                  </div>
                )}

                {/* Section dots – top right (vertical) */}
                {hasMultipleRows && (
                  <div
                    className="
                      absolute top-5 right-5
                      flex flex-col items-center gap-1.5
                      px-1 py-2.5
                      rounded-full
                      bg-black/35 backdrop-blur-sm
                      shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                    "
                  >
                    {mediaSections.map((section, i) => (
                      <span
                        key={i}
                        role="button"
                        onClick={() => goToRow(i)}
                        aria-label={`Go to ${section.title ?? `section ${i + 1}`}`}
                        title={section.title ?? undefined}
                        className={`block cursor-pointer w-1.5 h-1.5 rounded-full transition-transform duration-200 ${
                          i === activeRow
                            ? "bg-white scale-125"
                            : "bg-white/30 scale-100"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {rowHasMultiple && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="
                        absolute left-6 top-1/2 -translate-y-1/2
                        w-9 h-9 md:w-10 md:h-10
                        rounded-[16px]
                        bg-[rgba(6,8,16,0.85)]
                        border border-white/15
                        flex items-center justify-center
                        text-xs md:text-sm text-white
                        shadow-[0_16px_40px_rgba(0,0,0,0.7)]
                        hover:bg-black transition
                      "
                      aria-label="Previous image"
                    >
                      &lt;
                    </button>

                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="
                        absolute right-6 top-1/2 -translate-y-1/2
                        w-9 h-9 md:w-10 md:h-10
                        rounded-[16px]
                        bg-[rgba(6,8,16,0.85)]
                        border border-white/15
                        flex items-center justify-center
                        text-xs md:text-sm text-white
                        shadow-[0_16px_40px_rgba(0,0,0,0.7)]
                        hover:bg-black transition
                      "
                      aria-label="Next image"
                    >
                      &gt;
                    </button>

                    {/* Image dots for the current section – bottom */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                      <div
                        className="
                          flex items-center gap-1.5
                          px-2.5 py-1
                          rounded-full
                          bg-black/35
                          backdrop-blur-sm
                          shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                        "
                      >
                        {currentSection.images.map((_, i) => (
                          <span
                            key={i}
                            onClick={() => goToImage(activeRow, i)}
                            className={`block cursor-pointer
                              w-1.5 h-1.5
                              rounded-full
                              flex-shrink-0
                              transition-transform duration-200
                              ${
                                i === currentCol
                                  ? "bg-white scale-125"
                                  : "bg-white/30 scale-100"
                              }
                            `}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-white/80">
                Add media via <code>sections</code> or <code>heroImages</code>.
              </div>
            )}
          </div>

          {/* ========== RIGHT – DETAIL PANEL ========== */}
          <article
            className="
              bg-[#111217]
              rounded-[10px] md:rounded-[10px]
              border border-white/7
              shadow-[0_26px_80px_rgba(0,0,0,0.85)]
              flex flex-col
              overflow-hidden
              lg:h-full
            "
          >
            {/* HEADER – CLICKABLE TITLE + CLOSE */}
            <header className="px-4 md:px-6 pt-4 md:pt-5">
              <div className="relative">
                <div className="flex items-center gap-3 flex-nowrap">
                  {/* Title block (dropdown trigger) */}
                  <div className="flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => setProjectMenuOpen((prev) => !prev)}
                      className="
                        w-full
                        rounded-[10px] md:rounded-[10px]
                        border border-white/10
                        bg-[#111217]
                        px-3 sm:px-4 md:px-5
                        py-2 sm:py-2.5
                        flex items-center
                        hover:text-black
                        cursor-pointer
                      "
                    >
                      <div className="flex items-center gap-2 w-full min-w-0">
                        <span
                          className="
                            flex-1 min-w-0
                            font-thedus-condensed
                            uppercase
                            text-[clamp(12px,4vw,24px)]
                            leading-tight
                            whitespace-nowrap
                            overflow-hidden text-ellipsis
                            text-center sm:text-left
                            hover:text-black
                          "
                        >
                          {title}
                        </span>

                        <span className="flex-shrink-0 text-[11px] text-gray-400">
                          {projectMenuOpen ? "▲" : "▼"}
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Close button – ALWAYS go home */}
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="
                      hidden sm:flex
                      flex-shrink-0
                      w-9 h-9 md:w-10 md:h-10
                      rounded-[10px]
                      border border-white/10
                      bg-[#171821]
                      items-center justify-center
                      text-sm text-gray-300
                      hover:bg-[#1F2937] hover:text-white
                      transition
                    "
                    aria-label="Close project"
                  >
                    ×
                  </button>
                </div>

                {/* DROPDOWN LIST OF PROJECTS */}
                {projectMenuOpen && (
                  <div
                    className="
                      absolute left-0 mt-2
                      w-full sm:w-[260px]
                      rounded-[10px]
                      border border-white/10
                      bg-[#171821]
                      shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                      z-20
                    "
                  >
                    <ul className="py-2">
                      {projectOptions.map((proj) => (
                        <li key={proj.path}>
                          <button
                            type="button"
                            onClick={() => handleProjectSelect(proj.path)}
                            className="
                              w-full text-left
                              px-4 py-2
                              text-[13px]
                              font-thedus-condensed
                              text-gray-100
                              hover:bg-white/5
                              transition
                            "
                          >
                            {proj.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </header>

            {/* META ROW */}
            {/* META ROW – company (left) and year (right) */}
            <div className="px-4 md:px-6 pt-3 pb-2">
              <div
                className="
      grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-3
      rounded-[10px]
      border border-white/10
      bg-transparent
      px-4 py-3.5
    "
              >
                {/* Company – left */}
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-1">
                    TYPE
                  </div>
                  <div className="text-[13px] tracking-[0.12em] font-thedus-condensed text-white">
                    {company}
                  </div>
                </div>

                {/* Year – right (where Type used to be) */}
                <div className="sm:text-right">
                  <div className="text-[10px] uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-1">
                    Year
                  </div>
                  <div className="text-[13px] tracking-[0.12em] font-thedus-condensed text-white">
                    {year}
                  </div>
                </div>
              </div>
            </div>

            {/* SCROLLABLE CONTENT + 5TH ROW: PREV/NEXT */}
            <div className="px-4 md:px-6 pb-4 md:pb-6 flex-1 min-h-0 flex flex-col gap-3">
              {/* Big info quadrilateral */}
              <div className="flex-1 min-h-0">
                <div
                  className="
                    h-full
                    rounded-[10px]
                    border border-white/8
                    bg-transparent
                    px-4 md:px-5 py-4 md:py-5
                    overflow-y-auto project-panel-scroll
                    space-y-6 md:space-y-7
                  "
                >
                  {/* OVERVIEW */}
                  <section>
                    <div className="text-[10px] uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-2">
                      Overview
                    </div>
                    {Array.isArray(overview) ? (
                      overview.map((para, i) => (
                        <p
                          key={i}
                          className={`text-[13px] leading-relaxed text-gray-300 ${
                            i > 0 ? "mt-2" : ""
                          }`}
                        >
                          {para}
                        </p>
                      ))
                    ) : (
                      <p className="text-[13px] leading-relaxed text-gray-300">
                        {overview}
                      </p>
                    )}
                  </section>

                  {contributions.length > 0 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  )}

                  {/* CONTRIBUTIONS */}
                  {contributions.length > 0 && (
                    <section>
                      <div className="text-[10px] uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-2">
                        My Contribution
                      </div>
                      <ul className="space-y-2.5">
                        {contributions.map((item, i) => (
                          <li
                            key={i}
                            className="
                              grid grid-cols-[16px_minmax(0,1fr)]
                              gap-2
                              text-[13px] leading-relaxed text-gray-300
                            "
                          >
                            <span className="mt-[7px] w-[7px] h-[7px] rounded-full border border-white/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {credits.length > 0 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  )}

                  {/* CREDITS */}
                  {credits.length > 0 && (
                    <section>
                      <div className="text-[10px] uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-2">
                        Credits
                      </div>
                      <ul className="space-y-2">
                        {credits.map(({ name, role }, i) => (
                          <li
                            key={i}
                            className="
                              flex justify-between gap-4
                              text-[13px] leading-relaxed
                            "
                          >
                            <span className="text-gray-100">{name}</span>
                            {role && (
                              <span className="text-right text-gray-400">
                                {role}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              </div>

              {/* 5th row – PREVIOUS / NEXT buttons */}
              {(prevProject || nextProject) && (
                <div className="flex gap-3 font-thedus-condensed">
                  {prevProject && (
                    <button
                      type="button"
                      onClick={handlePrevProject}
                      className="
                        flex-1
                        rounded-[10px]
                        border border-white/10
                        bg-[#171821]
                        px-4 md:px-5
                        py-2.5
                        text-center
                        text-[11px] md:text-[12px]
                        tracking-[0.22em]
                        uppercase
                        font-thedus-condensed
                        text-gray-100
                        hover:bg-white hover:text-black
                        transition
                      "
                    >
                      Previous
                    </button>
                  )}

                  {nextProject && (
                    <button
                      type="button"
                      onClick={handleNextProject}
                      className="
                        flex-1
                        rounded-[10px]
                        border border-white/10
                        bg-[#171821]
                        px-4 md:px-5
                        py-2.5
                        text-center
                        text-[11px] md:text-[12px]
                        tracking-[0.22em]
                        uppercase
                        font-thedus-condensed
                        text-gray-100
                        hover:bg:white hover:text-black
                        transition
                      "
                    >
                      Next
                    </button>
                  )}
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProjectLayout;
