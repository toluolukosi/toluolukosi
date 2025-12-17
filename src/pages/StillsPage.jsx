// src/pages/StillsPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const stills = [
  {
    title: "Illustrations",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1734509830/studiomood_xxx.jpg",
    route: "/stills/Retro",
    locked: false,
  },
  {
    title: "Brutalist Cities",
    image:
      "https://res.cloudinary.com/dzl5osene/image/upload/v1765987428/BC_ovhoa6.png",
    route: "/stills/brutalist-cities",
    locked: false,
  },
  {
    title: "Media Blending",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1734509830/tokyo_xxx.jpg",
    route: "/stills/Media Blending",
    locked: false,
  },
  {
    title: "Photography",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1734509830/noir_xxx.jpg",
    route: "/stills/Photography",
    locked: true,
    lockNote: "Protected",
  },
  {
    title: "Psychedlic",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1734509830/studiomood_xxx.jpg",
    route: "/stills/Psychedelic",
    locked: false,
  },
  {
    title: "Retro",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1734509830/studiomood_xxx.jpg",
    route: "/stills/Retro",
    locked: false,
  },
  {
    title: "Minimalist",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1734509830/studiomood_xxx.jpg",
    route: "/stills/Minimalist",
    locked: false,
  },
];

const StillsPage = () => {
  return (
    <section className="min-h-screen bg-black px-[4%] py-16">
      <h1 className="text-white font-thedus-condensed text-[48px] md:text-[64px] tracking-wide mb-10">
        Gallery
      </h1>

      {/* Grid of stills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
        {stills.map((still) =>
          still.locked ? (
            // 🔒 LOCKED CARD
            <div
              key={still.title}
              className="
                group relative
                w-full h-[250px]
                rounded-2xl overflow-hidden
                bg-[#050609]
                border border-white/10
                opacity-80
                cursor-not-allowed
                transition-all duration-300
              "
            >
              <div
                className="
                  absolute inset-0 bg-cover bg-center
                  transition-transform duration-300 ease-out
                  grayscale-0 lg:grayscale-80 lg:group-hover:grayscale-0
                  lg:group-hover:scale-105
                "
                style={{ backgroundImage: `url(${still.image})` }}
              />

              <div className="absolute inset-0 bg-black/40 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-[24px] font-bold font-thedus-condensed leading-none flex items-center gap-2">
                  <span>{still.title}</span>
                  <img
                    src="https://res.cloudinary.com/dzl5osene/image/upload/v1765545065/Padlock_fpevps.png"
                    alt="locked"
                    className="w-4 h-4 object-contain"
                  />
                </p>
                {still.lockNote && (
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-gray-300">
                    {still.lockNote}
                  </p>
                )}
              </div>
            </div>
          ) : (
            // ✅ UNLOCKED CARD
            <Link
              key={still.title}
              to={still.route}
              className="
                group relative
                w-full h-[250px]
                rounded-2xl overflow-hidden
                bg-[#050609]
                border border-white/10
                lg:hover:border-white/20
                cursor-pointer
                transition-all duration-300
              "
            >
              <div
                className="
                  absolute inset-0 bg-cover bg-center
                  transition-transform duration-300 ease-out
                  grayscale-0 lg:grayscale-80 lg:group-hover:grayscale-0
                  lg:group-hover:scale-105
                "
                style={{ backgroundImage: `url(${still.image})` }}
              />

              <div className="absolute inset-0 bg-black/40 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-[24px] font-bold font-thedus-condensed leading-none">
                  {still.title}
                </p>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default StillsPage;
