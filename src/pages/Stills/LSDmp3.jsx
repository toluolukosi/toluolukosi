import React from "react";
import StillLayout from "../../components/StillLayout";

const LSDmp3 = () => {
  return (
    <StillLayout
      title="LSD.mp3"
      overview={[
        "LSD.mp3 is a poster series that reinterprets some of my favourite music albums through a psychedelic visual language.",
        "Using fluid typography, warped compositions, saturated color gradients, and hallucinatory textures, each piece translates the emotional and sonic identity of an album into immersive, surreal forms.",
        "The project explores how distortion, color, and visual rhythm can evoke sound, memory, and mood beyond literal representation."
      ]}
      images={[
        "/img/stills/lsd-mp3/take-care.webp",
        "/img/stills/lsd-mp3/kod.webp",
        "/img/stills/lsd-mp3/syre.webp",
        "/img/stills/lsd-mp3/psychoddrama.webp",
        "/img/stills/lsd-mp3/the-melodic-blue.webp",
      ]}
    />
  );
};

export default LSDmp3;
