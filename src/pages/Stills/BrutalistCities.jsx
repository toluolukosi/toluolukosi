import React from "react";
import StillLayout from "../../components/StillLayout";

const BrutalistCities = () => {
  return (
    <StillLayout
      title="Brutalist Cities"
      overview={[
        "Brutalist Cities is a poster series that reimagines iconic global locations through the lens of brutalist graphic design.",
        " Using weighty typography, rigid grid systems, grain-heavy textures, and high-contrast duotone palettes, each piece distills a city into bold, minimal landmarks and raw visual rhythm.",
        "The project explores how restraint, structure, and “material” noise can communicate identity with impact.",
      ]}
      images={[
        "/img/stills/brutalist-cities/bc.webp",
        "/img/stills/brutalist-cities/lagos.webp",
        "/img/stills/brutalist-cities/tokyo.webp",
        "/img/stills/brutalist-cities/london.webp",
        "/img/stills/brutalist-cities/paris.webp",
        "/img/stills/brutalist-cities/ny.webp",
        "/img/stills/brutalist-cities/rome.webp",
      ]}
    />
  );
};

export default BrutalistCities;
