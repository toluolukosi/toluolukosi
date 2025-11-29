// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import AboutSlider from "../components/AboutSlider";

const HomePage = () => {
  const [heroProgress, setHeroProgress] = useState(0); // 0 → top, 1 → passed hero

  const sides = [
    {
      title: "Stills",
      route: "/stills",
      image: "/images/AboutPictures/IMG_3747.jpg",
    },
    {
      title: "Live",
      route: "/live",
      image: "/images/AboutPictures/IMG_3747.jpg",
    },
    {
      title: "Sound",
      route: "/sound",
      image: "/images/AboutPictures/IMG_3747.jpg",
    },
    {
      title: "Dev",
      route: "/dev",
      image: "/images/AboutPictures/IMG_3747.jpg",
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

  return (
    <>
      {/* ========== HERO (unchanged) ========== */}
      <section
        id="hero"
        className="relative h-[calc(100vh-130px)] bg-black overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/images/portfolio-landing-page.jpg"
            alt="Tolu Olukosi portrait"
            className="h-[72vh] w-auto object-cover transition-opacity duration-500"
            style={{ opacity: 0.28 + middleOpacity * 0.35 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/80" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="mx-auto w-[80%] max-w-5xl">
            {/* DIGITAL */}
            <div
              className="leading-none text-center text-white"
              style={{
                fontFamily: "Thedus-StencilWide, system-ui, sans-serif",
                transform: `translateY(${topTranslate}px)`,
                opacity: bigLinesOpacity,
              }}
            >
              <span className="block text-[72px] md:text-[120px] lg:text-[212px] tracking-[0.02em] leading-[0.45em]">
                DIGITAL
              </span>
            </div>

            {/* TOLU | OLUKOSI */}
            <div
              className="relative mt-2 mb-2 text-[13px] md:text-[30px] tracking-[0.3em] uppercase text-white font-thedus-condensed"
              style={{ opacity: 0.35 + middleOpacity * 0.65 }}
            >
              <span className="absolute left-7">TOLU</span>
              <span className="absolute right-7">OLUKOSI</span>
            </div>

            {/* CREATOR */}
            <div
              className="leading-none text-center text-white"
              style={{
                fontFamily: "Thedus-StencilWide, system-ui, sans-serif",
                transform: `translateY(${bottomTranslate}px)`,
                opacity: bigLinesOpacity,
              }}
            >
              <span className="block text-[72px] md:text-[112px] lg:text-[200px] tracking-[0.02em] ">
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
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-[10px] flex-1 w-full">
          {sides.map((side) => (
            <Link
              key={side.title}
              to={side.route}
              className="group relative w-full sm:basis-[calc(50%-10px)] h-[250px] rounded-2xl overflow-hidden border border-gray-400 bg-black"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-105 grayscale-80 group-hover:grayscale-0"
                style={{ backgroundImage: `url(${side.image})` }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[24px] font-bold font-thedus-condensed leading-none">
                  {side.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ========== PROJECTS SECTION (responsive grid) ========== */}
      <section id="projects" className="mt-[100px] px-[4%]">
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="project-card-width">
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

          <div className="project-card-width">
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

          <div className="project-card-width">
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
      </section>

      {/* ========== ABOUT SECTION (3 columns → vertical stack on small) ========== */}
      <section id="about" className="mt-[200px] px-[4%] z-10">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-[24.5px]">
          {/* Left Column - About Text */}
          <div
            className="w-full lg:flex-1 bg-gray-800 text-gray-300 p-6 rounded-2xl font-thedus-condensed leading-relaxed tracking-wide"
            style={{ minHeight: "930px" }}
          >
            <h2 className="text-[31px] text-white mb-4">About Me</h2>
            <div className="text-[20px] font-normal text-gray-400 space-y-4">
              <p>
                I am a multidisciplinary creative based in Lagos, working at the
                intersection of design, technology, and storytelling. My work
                spans visual and motion content. To be honest, I'll do anything
                with good internet and the required tools.
              </p>
              <p>
                My creative process often begins with imitation, not in malice
                but in reverence. I draw from things that inspire me, and then
                evolve those ideas into original expressions. Because of this, I
                feel my work lacks the emotional and moral weight that, to me,
                defines true art. Still, it may evoke emotions in others, and
                some might see it as art regardless.
              </p>
              <p>
                This portfolio is a demonstration of my willingness to learn, my
                adaptability and ability to identify patterns and apply
                knowledge across fields. It's evidence of my willingness to grow
                — to sharpen my skill and feed my soul. At the heart of my
                creative pursuit is the drive to master craft and make things
                that leave an impression.
              </p>
            </div>
          </div>

          {/* Middle - Slideshow + Something Underneath */}
          <div className="w-full lg:flex-1 flex flex-col gap-[24.5px]">
            <AboutSlider />
            <div className="w-full h-[200px] bg-gray-800 text-gray-300 p-6 rounded-2xl text-white flex font-thedus-condensed leading-relaxed tracking-wide">
              <h2 className="text-[31px] text-white mb-4">Tool stack</h2>
            </div>
            <div className="w-full h-[50px] bg-gray-800 text-gray-300 px-6 pt-1 rounded-2xl text-white flex font-thedus-condensed leading-relaxed tracking-wide">
              <h2 className="text-[31px]">certifications</h2>
            </div>
          </div>

          {/* Right Column - Stack both video cards vertically */}
          <div className="w-full lg:flex-1 flex flex-col gap-y-[24.5px]">
            <div
              className="group w-full bg-gray-800 rounded-2xl overflow-hidden"
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
              className="group w-full bg-gray-800 rounded-2xl overflow-hidden"
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
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER left as-is for now */}
    </>
  );
};

export default HomePage;
