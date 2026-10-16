import { useEffect, useState } from "react";

const images = [
  "/img/about/IMG_1552.webp",
  "/img/about/IMG_3747.webp",
  "/img/about/IMG_0220.webp",
  "/img/about/IMG_1566.webp",
  "/img/about/IMG_4792.webp",
  "/img/about/IMG_1298.webp",
  "/img/about/IMG_1462.webp",
  "/img/about/IMG_8181.webp",
  "/img/about/IMG_9535.webp",
  "/img/about/IMG_0199.webp",
  "/img/about/IMG_9665.webp",
];

function AboutSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="group w-full border border-white/10 h-[500px] lg:h-auto lg:min-h-[500px] lg:flex-1 bg-gray-800 rounded-2xl overflow-hidden relative">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover
            transition-all duration-[1500ms] ease-in-out 
            grayscale-80 group-hover:grayscale-0 
            scale-100 group-hover:scale-105 
            ${i === index ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}
    </div>
  );
}

export default AboutSlider;
