import React, { useEffect } from "react";
import ProjectCard from './components/ProjectCard';
import AboutSlider from './components/AboutSlider';

const App = () => {

  useEffect(() => {
  const handleScroll = () => {
    const indicator = document.getElementById("scroll-indicator");
    if (window.scrollY > 10) {
      indicator.style.opacity = "0";
    } else {
      indicator.style.opacity = "1";
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <div className="bg-black overflow-auto">
        
      {/*Background Image*/}
      <img
        src="/images/portfolio-landing-page.jpg"
        alt="Background"
        className="absolute top-0 left-1/3 h-full object-cover brightness-75 contrast-110 z-0"
      />

      {/*logo in top left corner(Click to refresh)*/}
      <img
        src="src\assets\otis ambigram.png"
        alt="OTIS Ambigram"
        className="absolute top-4 left-[4%] h-10 w-auto z-10"
      />

      {/* Navigation - Top Right */}
      <nav className="absolute top-[4%] right-[4%] z-10 flex gap-[32px]" id="navbar">
      {[
        { number: "01", text: "Projects", link: "#projects" },
        { number: "02", text: "Gallery", link: "#gallery" },
        { number: "03", text: "About Me", link: "#about" },
      ].map((item, idx) => (
      <a
      key={idx}
      href={item.link}
      className="group text-left font-thedus-condensed leading-tight cursor-pointer"
      >
      <div className="text-white text-[18px] leading-[15px] group-hover:text-yellow-400 transition duration-300">{item.number}</div>
      <div className="text-gray-400 text-[18px] leading-[15px]">{item.text}</div>
      </a>
      ))}
      </nav>

      {/* Bottom left corner */}
      <div className="absolute top-[90.8%] left-[4%] text-[18px] leading-[15px] tracking-[1.5px] text-white font-thedus-condensed">Based in Lagos, Nigeria<br />
      <span className="text-[#848484] text-[14px]">for now</span>
      </div>
      
      {/* Bottom right corner */}
      <div className="absolute top-[90.8%] right-[4%] text-[14px] leading-[15px] tracking-[1.5px] text-[#848484] font-thedus-condensed text-right">Freelance Availability<br />
      <span className="text-white text-[18px]">LIMITED HOURS</span>
      </div>

      {/* NAME */}
      <div className="flex text-gray-400 absolute top-[42.5%] left-[25%] text-[30px] tracking-wide font-thedus-condensed">TOLU OLUKOSI</div>

      {/* ROLE */}
      <div className="flex text-gray-400 absolute top-[42.5%] right-[25%] text-[30px] tracking-wide font-thedus-condensed">DIGITAL CREATOR</div>

      {/* Scroll Section */}
<div className="absolute top-[120%] left-0 w-full flex justify-between px-[4%] z-10">
  {/* Left Side - CAP and Icon Bar */}
  <div className="flex flex-col gap-10 max-w-[700px]">
    {/* CAP */}
    <div className="text-gray-400 text-[50px] leading-[1.2] tracking-wide font-thedus-condensed">
      Nigerian Digital creator who uses different tools <br />
      to express his ideas and those of others
    </div>

    {/* Horizontal Icon Bar */}
    <div className="scroll-container w-[405px] overflow-hidden whitespace-nowrap">
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

  {/* Right Side - Quadrilateral Grid */}
  <div className="flex flex-col gap-[10px] -mt-[50px] mb-[150px]">
    <div className="flex gap-[10px]">
      <div className="w-[380px] h-[250px] bg-gray-800 rounded-2xl"></div>
      <div className="w-[380px] h-[250px] bg-gray-800 rounded-2xl"></div>
    </div>
    <div className="flex gap-[10px]">
      <div className="w-[380px] h-[250px] bg-gray-800 rounded-2xl"></div>
      <div className="w-[380px] h-[250px] bg-gray-800 rounded-2xl"></div>
    </div>
  </div>
</div>

{/* Scroll Down Indicator */}
<div
  id="scroll-indicator"
  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce text-white opacity-100 transition-opacity duration-500 z-20"
>
  <span className="text-sm text-white mb-1 tracking-widest font-thedus-condensed">SCROLL</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
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


{/* PROJECTS SECTION */}
<section id="projects" className="mt-[100px] px-[48.5px] flex gap-[24.5px] z-10 absolute top-[200%]">
  <ProjectCard
    title="Sprezzaturra"
    year="2022"
    image="/images/project1.jpg"
    logo="src/assets/Spprezzatura.png"
    line1="Music Project"
    line2="Portfolio Design"
  />
  <ProjectCard
    title="otis"
    year="2023"
    image="/images/project2.jpg"
    logo="src/assets/BRANDICONS/otisambigramforwebsite.png"
    line1="multidisciplinary creative company"
    line2="Film, Design, Music, fashion"
  />
  <ProjectCard
    title="tolukosi"
    year="2024"
    image="/images/project3.jpg"
    logo="src/assets/BRANDICONS/tolukosiicon.png"
    line1="luxury fashion"
    line2="Admin Panel"
  />
</section>


  {/* Left Column - About Text */}

<section id="about" className="mt-[200px] px-[48.5px] z-10 flex gap-[24.5px] absolute top-[300%]">

  {/* Left Column - About Text */}
  <div className="w-[478px] bg-gray-800 text-gray-300 p-6 rounded-2xl font-thedus-condensed leading-relaxed tracking-wide" style={{ height: "930px" }}>
    <h2 className="text-[31px] text-white mb-4">About Me</h2>
    <div className="text-[20px] font-normal  text-gray-400 space-y-4">
      <p>I am a multidisciplinary creative based in Lagos, working at the intersection of design, technology, and storytelling. My work spans visual and motion content. To be honest, I'll do anything with good internet and the required tools.</p>
      <p>I don’t consider myself an artist. My creative process often begins with imitation, not in malice but in reverence. I draw from things that inspire me, and then evolve those ideas into something original. Because of this, I feel my work lacks the emotional and moral weight that, to me, defines true art. Still, it may evoke emotions in others, and some might see it as art regardless.</p>
      <p>Although I’ve completed a fair amount of contracted work, the pieces I value most are those I created for no reason other than to grow — to sharpen my skill and feed my soul. At the heart of my creative pursuit is the drive to master craft and make things that leave an impression.</p>
    </div>
  </div>

  
 {/* Middle - Slideshow + Something Underneath */}
<div className="flex flex-col gap-[24.5px]">
  <AboutSlider />
  {/* Something else under the slider */}
  <div className="w-[478px] h-[200px] bg-gray-800 text-gray-300 p-6 rounded-2xl text-white flex font-thedus-condensed leading-relaxed tracking-wide">
    <h2 className="text-[31px] text-white mb-4">Tool stack</h2>
  </div>
  <div className="w-[478px] h-[50px] bg-gray-800 text-gray-300 px-6 pt-1 rounded-2xl text-white flex font-thedus-condensed leading-relaxed tracking-wide">
  <h2 className="text-[31px]">certifications</h2>
</div>
</div>

  {/* Right Column - Stack both video cards vertically */}
 <div className="flex flex-col gap-y-[24.5px]">
  {/* Airbuds video card */}
  <div className="group w-[478px] bg-gray-800 rounded-2xl overflow-hidden" style={{ height: "420px" }}>
    <a href="https://i.airbuds.fm/tolukosi/r0bSHeN1m4" target="_blank" rel="noopener noreferrer">
      <video
        src="public/images/videos/weeklyRecap-2025-08-04.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover transition-all duration-[1500ms] ease-in-out grayscale-[80%] group-hover:grayscale-0 scale-100 group-hover:scale-105"
      />
    </a>
  </div>

  {/* Strava image card */}
  <div className="group w-[478px] bg-gray-800 rounded-2xl overflow-hidden" style={{ height: "200px" }}>
    <a href="https://strava.app.link/29lfoeGVyVb" target="_blank" rel="noopener noreferrer">
      <img
        src="public/images/Strava-logo.png"
        className="w-full h-full object-cover transition-all duration-[1500ms] ease-in-out grayscale-[80%] group-hover:grayscale-0 scale-100 group-hover:scale-105"
      />
    </a>
  </div>
</div>


</section>



{/* FOOTER */}
<section id="footer" className="mt-[300px] px-[48.5px] z-10 flex gap-[24.5px] absolute top-[450%]">
<div
    className="w-[478px] bg-gray-800 text-gray-300 p-6 rounded-2xl font-thedus-condensed leading-relaxed tracking-wide"
    style={{ height: "550px" }} // Adjust this height as needed
  ></div>
</section>

    </div>
  );
};

export default App;
