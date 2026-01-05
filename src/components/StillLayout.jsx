import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const StillLayout = ({
  title,
  overview = [],
  contributions = [],
  images = [],
  company = "Design Studio",
  year = "2025",
  projectOptions = [],
  prevProject = null,
  nextProject = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [slideClass, setSlideClass] = useState(
    location.state?.from === "left"
      ? "-translate-x-full opacity-0"
      : "translate-x-full opacity-0"
  );

  const hasImages = images && images.length > 0;
  const hasMultiple = images.length > 1;

  const handleNext = () => {
    if (!hasImages) return;
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (!hasImages) return;
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleProjectSelect = (path) => {
    navigate(path);
    setProjectMenuOpen(false);
  };

  const handlePrevProject = () => prevProject && navigate(prevProject.path);
  const handleNextProject = () => nextProject && navigate(nextProject.path);

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setSlideClass("translate-x-0 opacity-100")
    );
    return () => cancelAnimationFrame(id);
  }, []);

  // Mobile swipe logic
  useEffect(() => {
    const slider = document.getElementById("still-slider");
    if (!slider) return;

    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => (startX = e.touches[0].clientX);
    const handleTouchMove = (e) => (endX = e.touches[0].clientX);
    const handleTouchEnd = () => {
      const distance = startX - endX;
      if (Math.abs(distance) > 50) {
        distance > 0 ? handleNext() : handlePrev();
      }
    };

    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, [current]);

  return (
    <section
      className={`
        fixed inset-0 z-[60]
        bg-[#050609]
        flex justify-center items-start lg:items-center
        px-4 md:px-6 lg:px-10 py-6 lg:py-10
        overflow-y-auto lg:overflow-y-hidden
        transition-transform transition-opacity duration-500
        ease-[cubic-bezier(0.22,0.61,0.36,1)]
        ${slideClass}
      `}
      style={{ fontFamily: "var(--project-font, system-ui, sans-serif)" }}
    >
      <div className="w-full mx-auto grid gap-6 lg:gap-4 lg:grid-cols-[65%_35%] items-stretch lg:h-[90vh]">
        {/* ========== LEFT – IMAGE GALLERY ========== */}
        <div
          id="still-slider"
          onClick={() => setFullscreen(true)}
          className="
            relative cursor-pointer
            rounded-[10px] overflow-hidden
            border border-white/10 bg-black
            shadow-[0_26px_80px_rgba(0,0,0,0.75)]
            h-[360px] sm:h-[420px] md:h-[480px] lg:h-full
            touch-pan-y select-none
          "
        >
          {hasImages ? (
            <>
              <img
                src={images[current]}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out"
              />

              {/* Hide arrows on mobile */}
              {hasMultiple && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="
                      hidden md:flex
                      absolute left-5 top-1/2 -translate-y-1/2
                      w-9 h-9 md:w-10 md:h-10
                      rounded-[16px]
                      bg-[rgba(6,8,16,0.75)]
                      border border-white/15
                      items-center justify-center
                      text-xs md:text-sm text-white
                      shadow-[0_16px_40px_rgba(0,0,0,0.7)]
                      hover:bg-black transition
                    "
                  >
                    &lt;
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="
                      hidden md:flex
                      absolute right-5 top-1/2 -translate-y-1/2
                      w-9 h-9 md:w-10 md:h-10
                      rounded-[16px]
                      bg-[rgba(6,8,16,0.75)]
                      border border-white/15
                      items-center justify-center
                      text-xs md:text-sm text-white
                      shadow-[0_16px_40px_rgba(0,0,0,0.7)]
                      hover:bg-black transition
                    "
                  >
                    &gt;
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-white/80">
              Add images.
            </div>
          )}
        </div>

        {/* ========== RIGHT – DETAIL PANEL ========== */}
        <article
          className="
            bg-[#111217]
            rounded-[10px]
            border border-white/7
            shadow-[0_26px_80px_rgba(0,0,0,0.85)]
            flex flex-col
            overflow-hidden
            lg:h-full
          "
        >
          {/* HEADER – Clickable Title + Close */}
          <header className="px-4 md:px-6 pt-4 md:pt-5">
            <div className="relative">
              <div className="flex items-center gap-3 flex-nowrap">
                {/* Title Block */}
                <div className="flex-1 min-w-0">
                  <div
                    className="
    w-full rounded-[10px] border border-white/10
    bg-[#171821] px-4 py-2.5
    text-center sm:text-left
  "
                  >
                    <h1
                      className="
      font-thedus-condensed uppercase
      text-[clamp(12px,4vw,24px)] leading-tight
      text-white truncate
    "
                    >
                      {title}
                    </h1>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => navigate("/stills")}
                  className="
                    hidden sm:flex flex-shrink-0
                    w-9 h-9 md:w-10 md:h-10
                    rounded-[10px]
                    border border-white/10
                    bg-[#171821]
                    items-center justify-center
                    text-sm text-gray-300
                    hover:bg-[#1F2937] hover:text-white transition
                  "
                  aria-label="Close project"
                >
                  ×
                </button>
              </div>
            </div>
          </header>

          {/* META ROW */}
          <div className="px-4 md:px-6 pt-3 pb-2">
            <div
              className="
                grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-3
                rounded-[10px] border border-white/10 bg-transparent
                px-4 py-3.5
              "
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-1">
                  Type
                </div>
                <div className="text-[13px] tracking-[0.12em] font-thedus-condensed text-white">
                  {company}
                </div>
              </div>
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

          {/* CONTENT AREA */}
          <div className="px-4 md:px-6 pb-4 md:pb-6 flex-1 min-h-0 flex flex-col gap-3">
            <div className="flex-1 min-h-0">
              <div
                className="
                  h-full rounded-[10px] border border-white/8 bg-transparent
                  px-4 md:px-5 py-4 md:py-5 overflow-y-auto
                  space-y-6 md:space-y-7
                "
              >
                {/* OVERVIEW */}
                <section>
                  <div className="text-[10px] uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-4">
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

                {/* CONTRIBUTIONS */}
                {contributions.length > 0 && (
                  <>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <section>
                      <div className="text-[10px] uppercase tracking-[0.22em] font-thedus-condensed text-gray-400 mb-2">
                        My Contribution
                      </div>
                      <ul className="space-y-2.5">
                        {contributions.map((item, i) => (
                          <li
                            key={i}
                            className="grid grid-cols-[16px_minmax(0,1fr)] gap-2 text-[13px] leading-relaxed text-gray-300"
                          >
                            <span className="mt-[7px] w-[7px] h-[7px] rounded-full border border-white/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </>
                )}
              </div>
            </div>

            {/* PREVIOUS / NEXT BUTTONS */}
            {(prevProject || nextProject) && (
              <div className="flex gap-3 font-thedus-condensed">
                {prevProject && (
                  <button
                    type="button"
                    onClick={handlePrevProject}
                    className="
                      flex-1 rounded-[10px] border border-white/10
                      bg-[#171821] px-5 py-2.5
                      text-[11px] md:text-[12px]
                      tracking-[0.22em] uppercase
                      text-gray-100 hover:bg-white hover:text-black transition
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
                      flex-1 rounded-[10px] border border-white/10
                      bg-[#171821] px-5 py-2.5
                      text-[11px] md:text-[12px]
                      tracking-[0.22em] uppercase
                      text-gray-100 hover:bg-white hover:text-black transition
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

      {/* FULLSCREEN VIEWER */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 flex flex-col items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          <img
            src={images[current]}
            alt={`${title} fullscreen`}
            className="max-w-[95%] max-h-[85vh] object-contain"
          />
          {hasMultiple && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-3xl"
              >
                &lt;
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-3xl"
              >
                &gt;
              </button>
            </>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullscreen(false);
            }}
            className="absolute top-6 right-8 text-white text-2xl"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
};

export default StillLayout;
