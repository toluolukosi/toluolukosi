// src/components/layouts/StillLayout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const StillLayout = ({ title, description = [], images = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  // For subtle slide-in animation
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

  const handleDotClick = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setSlideClass("translate-x-0 opacity-100");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // ✅ SWIPE HANDLERS (for mobile/tablet)
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
        if (distance > 0) handleNext();
        else handlePrev();
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
      <div className="w-full mx-auto grid gap-6 lg:gap-4 lg:grid-cols-[65%_35%] items-stretch lg:h-[90vh]">
        {/* ========== LEFT: IMAGE GALLERY ========== */}
        <div
          id="still-slider"
          onClick={() => setFullscreen(true)}
          className="
            relative cursor-pointer
            rounded-[10px] md:rounded-[10px]
            overflow-hidden
            border border-white/10
            shadow-[0_26px_80px_rgba(0,0,0,0.75)]
            bg-black
            h-[360px] sm:h-[420px] md:h-[480px] lg:h-full
            touch-pan-y select-none
          "
        >
          {hasImages ? (
            <>
              <img
                src={images[current]}
                alt={title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out"
              />

              {hasMultiple && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="
                      absolute left-5 top-1/2 -translate-y-1/2
                      w-9 h-9 md:w-10 md:h-10
                      rounded-[16px]
                      bg-[rgba(6,8,16,0.75)]
                      border border-white/15
                      flex items-center justify-center
                      text-xs md:text-sm text-white
                      shadow-[0_16px_40px_rgba(0,0,0,0.7)]
                      hover:bg-black transition
                    "
                  >
                    &lt;
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="
                      absolute right-5 top-1/2 -translate-y-1/2
                      w-9 h-9 md:w-10 md:h-10
                      rounded-[16px]
                      bg-[rgba(6,8,16,0.75)]
                      border border-white/15
                      flex items-center justify-center
                      text-xs md:text-sm text-white
                      shadow-[0_16px_40px_rgba(0,0,0,0.7)]
                      hover:bg-black transition
                    "
                  >
                    &gt;
                  </button>
                </>
              )}

              {hasMultiple && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                  <div
                    className="
                      flex items-center gap-1.5
                      px-2.5 py-1
                      rounded-full bg-black/35 backdrop-blur-sm
                      shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                    "
                  >
                    {images.map((_, i) => (
                      <span
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDotClick(i);
                        }}
                        className={`block cursor-pointer w-1.5 h-1.5 rounded-full transition-transform duration-200 ${
                          i === current ? "bg-white scale-125" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-white/80">
              Add images.
            </div>
          )}
        </div>

        {/* ========== RIGHT: INFO PANEL ========== */}
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
          {/* Header */}
          <header className="px-4 md:px-6 pt-4 md:pt-5 flex items-center justify-between">
            <h2 className="font-thedus-condensed text-white uppercase text-[clamp(16px,3vw,22px)]">
              {title}
            </h2>

            <button
              onClick={() => navigate("/stills")}
              className="
                rounded-[10px] border border-white/10
                bg-[#171821]
                text-gray-300 text-sm
                hover:bg-[#1F2937] hover:text-white
                transition px-3 py-1.5
              "
            >
              ←
            </button>
          </header>

          {/* Content */}
          <div className="px-4 md:px-6 pb-6 pt-4 flex-1 overflow-y-auto">
            {Array.isArray(description) ? (
              description.map((para, i) => (
                <p
                  key={i}
                  className={`text-[13px] leading-relaxed text-gray-300 ${
                    i > 0 ? "mt-3" : ""
                  }`}
                >
                  {para}
                </p>
              ))
            ) : (
              <p className="text-[13px] leading-relaxed text-gray-300">
                {description}
              </p>
            )}
          </div>
        </article>
      </div>

      {/* ========== FULLSCREEN VIEWER ========== */}
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
