import React from "react";
import StillLayout from "../../components/StillLayout";

const Reduced = () => {
  return (
    <StillLayout
      title="Reduced"
      overview={[
        "LSD.mp3 is a poster series that reinterprets some of my favourite music albums through a psychedelic visual language.",
        "Using fluid typography, warped compositions, saturated color gradients, and hallucinatory textures, each piece translates the emotional and sonic identity of an album into immersive, surreal forms.",
        "The project explores how distortion, color, and visual rhythm can evoke sound, memory, and mood beyond literal representation."
      ]}
      images={[
        "https://res.cloudinary.com/dzl5osene/image/upload/v1781007774/REDUCED_qeutvv.png",
        "https://res.cloudinary.com/dzl5osene/image/upload/v1781007943/INTERSTELLAR_tvdkgx.png",
        "https://res.cloudinary.com/dzl5osene/image/upload/v1781007774/WOLF_OF_WALL_SREET_uouxhr.png",
        "https://res.cloudinary.com/dzl5osene/image/upload/v1781007775/DUNE_lepqfb.png",
        "https://res.cloudinary.com/dzl5osene/image/upload/v1781007774/WHIPLASH_nccybw.png",
        "https://res.cloudinary.com/dzl5osene/image/upload/v1781007774/AMERICAN_PSYCHO_fstddl.png"
      ]}
    />
  );
};

export default Reduced;
