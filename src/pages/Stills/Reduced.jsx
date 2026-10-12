import React from "react";
import StillLayout from "../../components/StillLayout";

const Reduced = () => {
  return (
    <StillLayout
      title="Reduced"
      company="Poster series"
      overview={[
        "Reduced is a minimalist film poster series that strips each film down to a single idea.",
        "Using only shape, line and one accent colour, with no faces and no scenes, each poster asks you to recognise the film from its essence. Interstellar becomes a field of lines and a single glowing ring.",
        "The series covers Interstellar, The Wolf of Wall Street, Dune, Whiplash and American Psycho."
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
