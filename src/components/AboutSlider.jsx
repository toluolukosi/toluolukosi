import { useEffect, useState } from "react";

const images = [
  "/images/AboutPictures/IMG_1552.jpg",
  "/images/AboutPictures/IMG_3747.jpg",
  "/images/AboutPictures/IMG_0220.jpg",
  "/images/AboutPictures/IMG_1566.jpg",
  "/images/AboutPictures/IMG_4792.jpg",
  "/images/AboutPictures/IMG_1298.jpg",
  "/images/AboutPictures/IMG_1462.jpg",
  "/images/AboutPictures/IMG_8181.jpg",
  "/images/AboutPictures/IMG_9535.jpg",
  "/images/AboutPictures/IMG_0199.jpg",
  "/images/AboutPictures/IMG_9665.jpg",
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
    <div className="group w-[478px] border border-white/10 h-[500px] w-full bg-gray-800 rounded-2xl overflow-hidden relative">
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
