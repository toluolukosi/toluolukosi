// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import AboutSlider from "../components/AboutSlider";

const HomePage = () => {
  const [heroProgress, setHeroProgress] = useState(0); // 0 → top, 1 → passed hero
  const [menuOpen, setMenuOpen] = useState(false); // mobile / tablet nav

  const sides = [
    {
      title: "Stills",
      route: "/stills",
      image: "/images/AboutPictures/IMG_3747.jpg",
      locked: false,
    },
    {
      title: "Live",
      route: "/live",
      image: "/images/AboutPictures/IMG_3747.jpg",
      locked: true, // 🔒 this one is protected
      lockNote: "Protected", // text you want to show
    },
    {
      title: "Sound",
      route: "/sound",
      image: "/images/AboutPictures/IMG_3747.jpg",
      locked: true, // 🔒 this one is protected
      lockNote: "Protected", // text you want to show
    },
    {
      title: "Dev",
      route: "/dev",
      image: "/images/AboutPictures/IMG_3747.jpg",
      locked: true, // 🔒 this one is protected
      lockNote: "Protected", // text you want to show
    },
  ];

  const toolIcons = [
    "src/assets/TOOLS/tool1.png",
    "src/assets/TOOLS/tool2.png",
    "src/assets/TOOLS/tool3.png",
    "src/assets/TOOLS/tool4.png",
    "src/assets/TOOLS/tool5.png",
    "src/assets/TOOLS/tool6.png",
    "src/assets/TOOLS/tool7.png",
    "src/assets/TOOLS/tool8.png",
    "src/assets/TOOLS/tool9.png",
    "src/assets/TOOLS/tool10.png",
  ];

  const certifications = [
    {
      period: "2024",
      title: "Placeholder Certification Name",
      org: "Issuing Organization / Platform",
      linkLabel: "View credential",
    },
    {
      period: "2023",
      title: "Another Certification Title",
      org: "Another Platform",
      linkLabel: "See details",
    },
    {
      period: "2022",
      title: "Yet Another Certification",
      org: "Some Academy",
      linkLabel: "Open certificate",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const height = rect.height || 1;
        const distance = Math.min(Math.max(-rect.top, 0), height);
        const progress = distance / height;
        setHeroProgress(progress);
      }

      const indicator = document.getElementById("scroll-indicator");
      if (indicator) {
        indicator.style.opacity = window.scrollY > 10 ? "0" : "1";
      }
    };

    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // ===== PARALLAX VALUES (for hero) =====
  const clamped = Math.min(Math.max(heroProgress, 0), 1);
  const topTranslate = clamped * -140;
  const bottomTranslate = clamped * 140;
  const bigLinesOpacity = 1 - clamped * 1.3;
  const middleOpacity = Math.min(Math.max((clamped - 0.15) / 0.55, 0), 1);

  // flag for when we've scrolled past (most of) the hero
  const passedHero = heroProgress >= 0.9;

  // scroll-to-top behavior for logo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // helper to close mobile menu when clicking a link
  const handleNavClick = (hash) => {
    setMenuOpen(false);
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* ========== FIXED HEADER: ICON (SCROLL TO TOP) + NAV ========== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-10 pt-4 flex items-start justify-between pointer-events-none">
        {/* Icon as click-to-top image — NO background */}
        <img
          src="src/assets/otis ambigram.png"
          alt="Back to top"
          onClick={scrollToTop}
          className="pointer-events-auto h-10 w-auto cursor-pointer select-none"
        />

        {/* ===== MOBILE / TABLET NAV (hamburger) ===== */}
        <div className="pointer-events-auto ml-auto flex items-center lg:hidden relative">
          {/* Hamburger button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
    flex flex-col items-center justify-center
    w-9 h-9 rounded-md border border-gray-400 bg-transparent
    gap-[4px]
  "
          >
            {/* top line */}
            <span
              className={`
      block h-[2px] w-5 bg-white transition-transform duration-200
      ${menuOpen ? "translate-y-[6px] rotate-45" : ""}
    `}
            />
            {/* middle line */}
            <span
              className={`
      block h-[2px] w-5 bg-white transition-opacity duration-200
      ${menuOpen ? "opacity-0" : "opacity-100"}
    `}
            />
            {/* bottom line */}
            <span
              className={`
      block h-[2px] w-5 bg-white transition-transform duration-200
      ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}
    `}
            />
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute top-11 right-0 bg-black/80 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg">
              <ul className="flex flex-col items-start gap-3 font-thedus-condensed text-[16px] leading-tight">
                <button
                  onClick={() => handleNavClick("#projects")}
                  className="text-left group"
                >
                  <div className="text-white leading-[15px] group-hover:text-yellow-400 transition duration-300">
                    01
                  </div>
                  <div className="text-gray-400 leading-[15px]">Projects</div>
                </button>
                <button
                  onClick={() => handleNavClick("#gallery")}
                  className="text-left group"
                >
                  <div className="text-white leading-[15px] group-hover:text-yellow-400 transition duration-300">
                    02
                  </div>
                  <div className="text-gray-400 leading-[15px]">Gallery</div>
                </button>
                <button
                  onClick={() => handleNavClick("#about")}
                  className="text-left group"
                >
                  <div className="text-white leading-[15px] group-hover:text-yellow-400 transition duration-300">
                    03
                  </div>
                  <div className="text-gray-400 leading-[15px]">About Me</div>
                </button>
              </ul>
            </div>
          )}
        </div>

        {/* ===== DESKTOP NAV (lg and up) ===== */}
        <nav className="pointer-events-auto ml-auto hidden lg:block">
          <ul
            className={`
              hidden lg:flex font-thedus-condensed leading-tight text-[18px]
              text-left transition-all duration-500 ease-in-out
              ${
                passedHero
                  ? "flex-col items-start gap-3 bg-black/70 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg"
                  : "flex-row items-center gap-8 bg-transparent"
              }
            `}
          >
            <a
              href="#projects"
              className="group text-left leading-tight cursor-pointer"
            >
              <div className="text-white text-[18px] leading-[15px] group-hover:text-yellow-400 transition duration-300">
                01
              </div>
              <div className="text-gray-400 text-[18px] leading-[15px]">
                Projects
              </div>
            </a>
            <a
              href="#gallery"
              className="group text-left leading-tight cursor-pointer"
            >
              <div className="text-white text-[18px] leading-[15px] group-hover:text-yellow-400 transition duration-300">
                02
              </div>
              <div className="text-gray-400 text-[18px] leading-[15px]">
                Gallery
              </div>
            </a>
            <a
              href="#about"
              className="group text-left leading-tight cursor-pointer"
            >
              <div className="text-white text-[18px] leading-[15px] group-hover:text-yellow-400 transition duration-300">
                03
              </div>
              <div className="text-gray-400 text-[18px] leading-[15px]">
                About Me
              </div>
            </a>
          </ul>
        </nav>
      </header>

      {/* ========== HERO ========== */}
      <section id="hero" className="relative h-screen bg-black overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/images/portfolio-landing-page.jpg"
            alt="Tolu Olukosi portrait"
            className="h-[72vh] w-auto object-cover transition-opacity duration-500"
            style={{ opacity: 0.7 + middleOpacity * 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center">
          {/* Outer width container for responsiveness */}
          <div className="mx-auto w-[80%] max-w-5xl flex justify-center">
            {/* This inline-flex block is the DESIGN width.
                All three lines live inside it so they scale together. */}
            <div
              className="inline-flex flex-col items-stretch text-white leading-none"
              style={{
                fontFamily: "Thedus-StencilWide, system-ui, sans-serif",
              }}
            >
              {/* DIGITAL */}
              <span
                className="
                  block text-center
                  tracking-[0.02em]
                  leading-[0.45em]
                  text-[clamp(3rem,10vw,13.25rem)]
                "
                style={{
                  transform: `translateY(${topTranslate}px)`,
                  opacity: bigLinesOpacity,
                }}
              >
                DIGITAL
              </span>

              {/* TOLU | OLUKOSI */}
              <div
                className="mt-3 mb-3 font-thedus-condensed uppercase"
                style={{ opacity: 0.35 + middleOpacity * 0.65 }}
              >
                <div
                  className="
                    flex justify-between
                    text-[clamp(0.7rem,2vw,1.9rem)]
                    tracking-[0.3em]
                  "
                >
                  <span>TOLU</span>
                  <span>OLUKOSI</span>
                </div>
              </div>

              {/* CREATOR */}
              <span
                className="
                  block text-center
                  tracking-[0.035em]
                  leading-[0.45em]
                  text-[clamp(2.8rem,9.2vw,12.5rem)]
                "
                style={{
                  transform: `translateY(${bottomTranslate}px)`,
                  opacity: bigLinesOpacity,
                }}
              >
                CREATOR
              </span>
            </div>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="absolute inset-x-0 bottom-5 px-6 sm:px-10 lg:px-16 flex items-center justify-between text-[11px] sm:text-xs lg:text-[18px] text-white tracking-[0.05em] leading -[0.05em] ext-gray-400 font-thedus-condensed">
          <div className="uppercase">
            Based in Lagos, Nigeria
            <div className="text-[10px] sm:text-[11px] text-gray-500 lg:text-[16px] normal-case">
              for now
            </div>
          </div>

          <div
            id="scroll-indicator"
            className="flex flex-col items-center gap-1 opacity-100 transition-opacity duration-500"
          >
            <span className="text-[10px] tracking-[0.25em] lg:text-[13px] uppercase">
              Scroll
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <div className="text-right lg:text-[16px] uppercase">
            Freelance Availability
            <div className="text-[10px] sm:text-[11px] lg:text-[18px] text-white">
              <span className="text-[#f97316] align-middle mr-1">●</span>
              Limited Hours
            </div>
          </div>
        </div>
      </section>

      {/* ========== INTRO + SIDES (responsive stack) ========== */}
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-6 px-[4%] mt-10">
        {/* Left text block */}
        <div className="flex flex-col gap-10 w-full lg:basis-[505px] lg:flex-none">
          <div className="text-gray-400 text-[32px] md:text-[50px] leading-[1.2] tracking-wide font-thedus-condensed">
            Nigerian Digital creator who uses different tools <br />
            to express his ideas and those of others
          </div>

          <div className="scroll-container w-full md:w-[405px] overflow-hidden whitespace-nowrap">
            <div className="scroll-track flex gap-5 w-max">
              {[
                "src/assets/ICONS/aftereffects.png",
                "src/assets/ICONS/illustrator.png",
                "src/assets/ICONS/indesign.png",
                "src/assets/ICONS/photoshop.png",
                "src/assets/ICONS/premierpro.png",
                "src/assets/ICONS/flstudio.png",
                "src/assets/ICONS/figma.png",
                "src/assets/ICONS/html.png",
                "src/assets/ICONS/css.png",
                "src/assets/ICONS/js.png",
              ].map((icon, idx) => (
                <img
                  key={idx}
                  src={icon}
                  alt={`icon-${idx}`}
                  className="h-[43px] w-auto opacity-10 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sides grid */}
        {/* Sides grid */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-[10px] flex-1 w-full">
          {sides.map((side) =>
            side.locked ? (
              // 🔒 LOCKED – looks the same, but NOT clickable
              <div
                key={side.title}
                className="
                  group relative
                  w-full sm:basis-[calc(50%-10px)]
                  h-[250px]
                  rounded-2xl
                  overflow-hidden
                  bg-[#050609]
                  border border-white/10
                  opacity-80
                  cursor-not-allowed
                  transition-colors duration-300
                "
              >
                {/* IMAGE LAYER */}
                <div
                  className="
                    absolute inset-0 bg-cover bg-center
                    transition-transform duration-300 ease-out
                    grayscale-0
                    lg:grayscale-80
                    lg:group-hover:grayscale-0
                    lg:group-hover:scale-105
                  "
                  style={{ backgroundImage: `url(${side.image})` }}
                />

                {/* OVERLAY LAYER */}
                <div
                  className="
                    absolute inset-0 bg-black/40
                    opacity-100
                    lg:opacity-0
                    lg:group-hover:opacity-100
                    transition-opacity duration-300
                  "
                />

                {/* 📱 Mobile & tablet: text always visible */}
                <div className="absolute bottom-4 left-4 text-white lg:hidden">
                  <p className="text-[24px] font-bold font-thedus-condensed leading-none flex items-center gap-2">
                    <span>{side.title}</span>
                    <img
                      src="src/assets/ICONS/padlock.png"
                      alt="locked"
                      className="w-4 h-4 object-contain"
                    />
                  </p>
                  {side.lockNote && (
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-gray-300">
                      {side.lockNote}
                    </p>
                  )}
                </div>

                {/* 🖥 Desktop: text only on hover */}
                <div
                  className="
                    absolute bottom-4 left-4
                    text-white
                    hidden lg:block
                    opacity-0
                    lg:group-hover:opacity-100
                    transition-opacity duration-300
                  "
                >
                  <p className="text-[24px] font-bold font-thedus-condensed leading-none flex items-center gap-2">
                    <span>{side.title}</span>
                    <img
                      src="src/assets/ICONS/padlock.png"
                      alt="locked"
                      className="w-4 h-4 object-contain"
                    />
                  </p>
                  {side.lockNote && (
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-gray-300">
                      {side.lockNote}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              // ✅ UNLOCKED – regular Link
              <Link
                key={side.title}
                to={side.route}
                className="
                  group relative
                  w-full sm:basis-[calc(50%-10px)]
                  h-[250px]
                  rounded-2xl
                  overflow-hidden
                  bg-[#050609]
                  border border-white/10
                  lg:hover:border-white/20
                  cursor-pointer
                  transition-colors duration-300
                "
              >
                {/* IMAGE LAYER */}
                <div
                  className="
                    absolute inset-0 bg-cover bg-center
                    transition-transform duration-300 ease-out
                    grayscale-0
                    lg:grayscale-80
                    lg:group-hover:grayscale-0
                    lg:group-hover:scale-105
                  "
                  style={{ backgroundImage: `url(${side.image})` }}
                />

                {/* OVERLAY LAYER */}
                <div
                  className="
                    absolute inset-0 bg-black/40
                    opacity-100
                    lg:opacity-0
                    lg:group-hover:opacity-100
                    transition-opacity duration-300
                  "
                />

                {/* 📱 Mobile & tablet: text always visible */}
                <div className="absolute bottom-4 left-4 text-white lg:hidden">
                  <p className="text-[24px] font-bold font-thedus-condensed leading-none">
                    {side.title}
                  </p>
                </div>

                {/* 🖥 Desktop: text only on hover */}
                <div
                  className="
                    absolute bottom-4 left-4
                    text-white
                    hidden lg:block
                    opacity-0
                    lg:group-hover:opacity-100
                    transition-opacity duration-300
                  "
                >
                  <p className="text-[24px] font-bold font-thedus-condensed leading-none">
                    {side.title}
                  </p>
                </div>
              </Link>
            )
          )}
        </div>
      </div>

      {/* ========== PROJECTS SECTION (aligned edges) ========== */}
      <section id="projects" className="mt-[100px] px-[4%]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-wrap gap-6 justify-center">
            {/* Card 1 */}
            <div
              className="
                project-card-width
                basis-full
                sm:basis-[calc((100%-24px)/2)]
                lg:basis-[calc((100%-48px)/3)]
              "
            >
              <ProjectCard
                title="Sprezzaturra"
                year="2022"
                image="/images/AboutPictures/IMG_3747.jpg"
                logo="src/assets/Spprezzatura.png"
                line1="Music Project"
                line2="Album?"
                route="/project1"
              />
            </div>

            {/* Card 2 */}
            <div
              className="
                project-card-width
                basis-full
                sm:basis-[calc((100%-24px)/2)]
                lg:basis-[calc((100%-48px)/3)]
              "
            >
              <ProjectCard
                title="otis"
                year="2023"
                image="/images/AboutPictures/IMG_3747.jpg"
                logo="src/assets/BRANDICONS/otisambigramforwebsite.png"
                line1="Multidisciplinary Creative Company"
                line2="Film, Design, Music, Fashion"
                route="/otis"
              />
            </div>

            {/* Card 3 */}
            <div
              className="
                project-card-width
                basis-full
                sm:basis-[calc((100%-24px)/2)]
                lg:basis-[calc((100%-48px)/3)]
              "
            >
              <ProjectCard
                title="tolukosi"
                year="2024"
                image="/images/AboutPictures/IMG_3747.jpg"
                logo="src/assets/BRANDICONS/tolukosiicon.png"
                line1="Luxury Fashion"
                line2="Suits, Concept Fashion"
                route="/tolukosi"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT SECTION (3 columns → vertical stack on small) ========== */}
      <section id="about" className="mt-[200px] px-[4%] z-10">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-[24.5px]">
          {/* LEFT COLUMN – ABOUT ME + TOOL STACK */}
          <div className="w-full lg:flex-1 flex flex-col gap-[24.5px]">
            {/* ABOUT ME CARD */}
            <section
              className="
                w-full
                self-start
                rounded-2xl
                border border-white/10
                bg-[#151822]/90
                px-5 py-5 md:px-6 md:py-5
                text-gray-300
                font-thedus-condensed
                tracking-wide
                shadow-[0_18px_60px_rgba(0,0,0,0.7)]
              "
            >
              <h2 className="text-[13px] md:text-[14px] uppercase tracking-[0.24em] text-gray-300 mb-4">
                ABOUT ME
              </h2>

              <div className="text-[14px] md:text-[15px] text-gray-300 space-y-4 leading-relaxed">
                <p>
                  I am a multidisciplinary creative based in Lagos, working at
                  the intersection of design, technology, and storytelling. My
                  work spans visual and motion content. To be honest, I'll do
                  anything with good internet and the required tools.
                </p>
                <p>
                  My creative process often begins with imitation, not in malice
                  but in reverence. I draw from things that inspire me, and then
                  evolve those ideas into original expressions. Because of this,
                  I feel my work lacks the emotional and moral weight that, to
                  me, defines true art. Still, it may evoke emotions in others,
                  and some might see it as art regardless.
                </p>
                <p>
                  This portfolio is a demonstration of my willingness to learn,
                  my adaptability and ability to identify patterns and apply
                  knowledge across fields. It's evidence of my willingness to
                  grow — to sharpen my skill and feed my soul. At the heart of
                  my creative pursuit is the drive to master craft and make
                  things that leave an impression.
                </p>
              </div>
            </section>

            {/* TOOL STACK UNDER ABOUT ME */}
            <section
              className="
                w-full
                rounded-2xl
                border border-white/10
                bg-[#151822]/90
                px-5 py-5 md:px-6 md:py-5
                text-white
                font-thedus-condensed
                tracking-wide
                shadow-[0_18px_60px_rgba(0,0,0,0.7)]
              "
            >
              <h2 className="text-[13px] md:text-[14px] uppercase tracking-[0.24em] text-gray-300 mb-4">
                TOOL STACK
              </h2>

              <div className="flex flex-wrap gap-3 md:gap-3.5">
                {toolIcons.map((src, index) => (
                  <div
                    key={index}
                    className="
                      w-9 h-9 md:w-10 md:h-10
                      rounded-[12px]
                      bg-black/40
                      border border-white/8
                      flex items-center justify-center
                      overflow-hidden
                      shadow-[0_12px_30px_rgba(0,0,0,0.7)]
                    "
                  >
                    <img
                      src={src}
                      alt={`tool-${index + 1}`}
                      className="w-7 h-7 md:w-8 md:h-8 object-contain"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* MIDDLE COLUMN – SLIDER + CERTIFICATIONS */}
          <div className="w-full lg:flex-1 flex flex-col gap-[24.5px]">
            <AboutSlider />

            {/* CERTIFICATIONS UNDER SLIDER */}
            <section
              className="
                w-full
                rounded-2xl
                border border-white/10
                bg-[#151822]/90
                px-5 py-5 md:px-6 md:py-5
                text-white
                font-thedus-condensed
                tracking-wide
                shadow-[0_18px_60px_rgba(0,0,0,0.7)]
              "
            >
              <h2 className="text-[13px] md:text-[14px] uppercase tracking-[0.24em] text-gray-300 mb-4">
                CERTIFICATIONS
              </h2>

              <div className="space-y-4 md:space-y-4.5">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="
                      grid grid-cols-[auto_minmax(0,1fr)]
                      gap-4
                    "
                  >
                    {/* left – date / period */}
                    <div className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-gray-500 pt-[2px]">
                      {cert.period}
                    </div>

                    {/* right – details */}
                    <div className="flex flex-col gap-1">
                      <div className="text-[13px] md:text-[14px] text-gray-100 leading-tight">
                        {cert.title}
                      </div>
                      <div className="text-[11px] md:text-[12px] text-gray-500 leading-snug">
                        {cert.org}{" "}
                        <a
                          href="#"
                          className="
                            text-gray-400
                            hover:text-white
                            underline-offset-2
                            hover:underline
                          "
                        >
                          {cert.linkLabel}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN – VIDEO + STRAVA (unchanged) */}
          <div className="w-full lg:flex-1 flex flex-col gap-y-[24.5px]">
            <div
              className="group w-full bg-gray-800 border border-white/10 rounded-2xl overflow-hidden"
              style={{ height: "420px" }}
            >
              <a
                href="https://i.airbuds.fm/tolukosi/r0bSHeN1m4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <video
                  src="/images/videos/weeklyRecap-2025-08-04.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-all duration-[1500ms] ease-in-out grayscale-[80%] group-hover:grayscale-0 scale-100 group-hover:scale-105"
                />
              </a>
            </div>

            <div
              className="group w-full bg-gray-800 border border-white/10 rounded-2xl overflow-hidden"
              style={{ height: "200px" }}
            >
              <a
                href="https://strava.app.link/29lfoeGVyVb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/Strava-logo.png"
                  className="w-full h-full object-cover transition-all duration-[1500ms] ease-in-out grayscale-[80%] group-hover:grayscale-0 scale-100 group-hover:scale-105"
                  alt="Strava"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer
        className="
          relative mt-32
          border-t border-white/5
          bg-black
          px-[4%]
          py-10 md:py-14 lg:py-16
          overflow-hidden
        "
      >
        {/* BIG GHOST 'THANK YOU' TEXT IN THE BACKGROUND */}
        <div
          className="
            pointer-events-none select-none
            absolute inset-x-0 bottom-[-3vw]
            text-center
            text-[24vw] sm:text-[20vw] md:text-[16vw]
            font-thedus-condensed
            tracking-[0.2em]
            text-white/5
            uppercase
          "
        >
          THANK&nbsp;YOU
        </div>

        {/* MAIN CONTENT */}
        <div
          className="
            relative max-w-[1440px] mx-auto
            flex flex-col items-center text-center gap-8
            lg:flex-row lg:items-center lg:justify-between lg:text-left
          "
        >
          {/* LOGO + COPYRIGHT – CENTERED ON MOBILE/TABLET */}
          <div className="flex flex-col items-center lg:items-start gap-0 font-thedus-condensed">
            <img
              src="src/assets/otis ambigram.png"
              alt="Tolu logo"
              className="h-15 w-auto"
            />

            <div className="text-gray-200 text-[11px] md:text-[13px] uppercase tracking-[0.18em]">
              © {new Date().getFullYear()} · Tolu Olukosi
            </div>
            <div className="text-gray-500 text-[9px] md:text-[12px] uppercase tracking-[0.22em]">
              ALL RIGHTS RESERVED
            </div>
          </div>

          {/* SOCIAL ICONS – ONLY SHOW ON DESKTOP */}
          <div className="hidden lg:flex justify-center">
            <div className="flex items-center gap-4">
              {[
                {
                  label: "Email",
                  src: "src/assets/social/email.png",
                  alt: "Email",
                },
                {
                  label: "LinkedIn",
                  src: "src/assets/social/linkedin.png",
                  alt: "LinkedIn",
                },
                {
                  label: "Dribbble",
                  src: "src/assets/social/dribbble.png",
                  alt: "Dribbble",
                },
                {
                  label: "X",
                  src: "src/assets/social/x.png",
                  alt: "X (Twitter)",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  aria-label={item.label}
                  className="
                    w-8 h-8 md:w-9 md:h-9
                    rounded-full
                    border border-white/20
                    bg-white/5
                    flex items-center justify-center
                    hover:bg-white hover:text-black
                    transition-colors duration-200
                  "
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-4 h-4 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* CREATED WITH LOVE – CENTERED ON MOBILE/TABLET */}
          <div className="flex flex-col items-center lg:items-end gap-0 font-thedus-condensed">
            <div className="text-gray-200 text-[11px] md:text-[13px] uppercase tracking-[0.18em]">
              Created with <span className="text-pink-500 align-middle">♥</span>{" "}
              in Lagos
            </div>
            <div className="text-gray-500 text-[9px] md:text-[12px] uppercase tracking-[0.22em]">
              NOT MADE IN FRAMER
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
