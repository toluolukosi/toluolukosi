import { useEffect, useState } from "react";

const images = [
    "public/images/AboutPictures/IMG_1552.jpg",
    "public/images/AboutPictures/IMG_0220.jpg",
    "public/images/AboutPictures/IMG_1566.jpg",
    "public/images/AboutPictures/IMG_0344.jpg",
    "public/images/AboutPictures/IMG_0549.jpg",
    "public/images/AboutPictures/IMG_0586.jpg",
    "public/images/AboutPictures/IMG_0767.jpg",
    "public/images/AboutPictures/IMG_4792.jpg",
    "public/images/AboutPictures/IMG_1298.jpg",
    "public/images/AboutPictures/IMG_1462.jpg",
    "public/images/AboutPictures/IMG_7642.jpg",
    "public/images/AboutPictures/IMG_8181.jpg",
    "public/images/AboutPictures/IMG_9535.jpg",
    "public/images/AboutPictures/IMG_6769.jpg",
    "public/images/AboutPictures/IMG_9665.jpg",
    "public/images/AboutPictures/IMG_0199.jpg",
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
    <div className="group w-[478px] h-[500px] bg-gray-800 rounded-2xl overflow-hidden relative">
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
