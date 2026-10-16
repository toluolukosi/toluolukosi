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
        "/img/stills/reduced/reduced.webp",
        "/img/stills/reduced/interstellar.webp",
        "/img/stills/reduced/wolf-of-wall-sreet.webp",
        "/img/stills/reduced/dune.webp",
        "/img/stills/reduced/whiplash.webp",
        "/img/stills/reduced/american-psycho.webp"
      ]}
    />
  );
};

export default Reduced;
