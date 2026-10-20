// src/pages/LivePage.jsx
// Moving-image work, grouped by kind. Each card opens the full-screen player.
import React, { useRef, useState } from "react";
import NavIconButton from "../components/NavIconButton";
import FilmPlayer from "../components/FilmPlayer";

const CLD = "https://res.cloudinary.com/dzl5osene/video/upload";
const ECLIPSE_FILM = "v1790496971/A_BLACK_AFFAIR_1_vv9q9q";
const ECLIPSE_LOGO = "v1790342274/Untitled_design_1_vcngzo";

// To add a piece: add an entry to the right section.
// aspect = width / height (16 / 9 wide, 4 / 5 feed post, 9 / 16 reel).
// To add a category: add another { title, note, items } block.
const sections = [
  {
    title: "Films",
    note: "Recorded and shot",
    items: [
      {
        title: "Eclipse: A Black Affair",
        meta: "Event film · 2024",
        src: `${CLD}/q_auto,w_1280/${ECLIPSE_FILM}.mp4`,
        poster: `${CLD}/so_40,c_crop,g_north,h_0.78,w_1.0/c_fill,w_960,h_540,f_jpg,q_auto/${ECLIPSE_FILM}.jpg`,
        aspect: 16 / 9,
        note: "Music: “Black” by Dave, arranged for orchestra by Tolu Olukosi",
      },
    ],
  },
  {
    title: "Motion Design",
    note: "Animation and product motion",
    items: [
      {
        title: "ShangeIt: Brand Ad",
        meta: "15 sec · 2026",
        src: "/videos/shangeit-brand-ad.mp4",
        poster: "/img/shangeit/poster-brand-ad.webp",
        aspect: 9 / 16,
      },
      {
        title: "ShangeIt: Search Loop",
        meta: "Product motion · 2026",
        src: "/videos/shangeit-ui-loop.mp4",
        poster: "/img/shangeit/poster-ui-loop.webp",
        aspect: 4 / 5,
      },
      {
        title: "ShangeIt: Map Pin",
        meta: "Product motion · 2026",
        src: "/videos/shangeit-map-pin.mp4",
        poster: "/img/shangeit/poster-map-pin.webp",
        aspect: 4 / 5,
        note: "Map data © OpenStreetMap contributors", // required credit
      },
      {
        title: "ShangeIt: 3D Tour",
        meta: "Product motion · 2026",
        src: "/videos/shangeit-3d-tour.mp4",
        poster: "/img/shangeit/poster-3d-tour.webp",
        aspect: 4 / 5,
      },
      {
        title: "Eclipse: Logo Animation",
        meta: "Logo motion · 2024",
        src: `${CLD}/q_auto,w_1280/${ECLIPSE_LOGO}.mp4`,
        poster: `${CLD}/so_5,w_960,f_jpg,q_auto/${ECLIPSE_LOGO}.jpg`,
        aspect: 16 / 9,
      },
    ],
  },
];

// One piece: poster with a play button. On desktop, hovering plays a silent
// preview (the video only loads then); clicking opens the player with sound.
const LiveCard = ({ item, onOpen }) => {
  const videoRef = useRef(null);
  const wide = item.aspect > 1;

  const preview = (play) => {
    const v = videoRef.current;
    if (!v) return;
    if (play) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.load(); // back to the poster
    }
  };

  return (
    <div
      className={
        wide
          ? "w-full md:w-auto" // wide pieces fill the phone's width
          : "w-[calc(50%-8px)] md:w-auto" // tall pieces sit two-up on phones
      }
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        onMouseEnter={() => preview(true)}
        onMouseLeave={() => preview(false)}
        aria-label={`Play ${item.title}`}
        style={{ aspectRatio: item.aspect }}
        className="
          group relative block
          w-full md:w-auto md:h-[400px]
          rounded-2xl!
          border! border-white/10! hover:border-white/25!
          bg-[#050609]!
          p-0!
          overflow-hidden
          cursor-pointer
          transition-colors duration-300
        "
      >
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors duration-300">
          <span className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 ml-[3px] fill-black"
              aria-hidden="true"
            >
              <path d="M6 4l14 8-14 8z" />
            </svg>
          </span>
        </span>
      </button>

      <p className="mt-3 text-[15px] text-white font-thedus-condensed tracking-wide leading-tight">
        {item.title}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-gray-500 font-thedus-condensed">
        {item.meta}
      </p>
    </div>
  );
};

const LivePage = () => {
  const [playing, setPlaying] = useState(null);

  return (
    <section className="min-h-screen bg-black px-[4%] py-16">
      {/* PAGE TITLE */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-white font-thedus-condensed text-[3.2rem] leading-[1.1] tracking-wide">
          Live
        </h1>

        {/* 🏠 BACK TO HOME BUTTON */}
        <NavIconButton to="/" icon="back" label="Back to home" />
      </div>

      {sections.map((section) => (
        <div key={section.title} className="mb-16">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-6 border-b border-white/10 pb-3">
            <h2 className="text-white font-thedus-condensed text-[22px] md:text-[26px] tracking-wide whitespace-nowrap">
              {section.title}
            </h2>
            <span className="text-[10px] uppercase tracking-[0.22em] text-gray-500 font-thedus-condensed">
              {section.note} · {section.items.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-8 md:gap-x-6">
            {section.items.map((item) => (
              <LiveCard key={item.title} item={item} onOpen={setPlaying} />
            ))}
          </div>
        </div>
      ))}

      {playing && (
        <FilmPlayer
          film={{ ...playing, label: playing.title }}
          onClose={() => setPlaying(null)}
        />
      )}
    </section>
  );
};

export default LivePage;
