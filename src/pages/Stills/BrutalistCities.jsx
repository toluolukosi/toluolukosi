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
        "https://res.cloudinary.com/dzl5osene/image/upload/v1765987428/BC_ovhoa6.png",
        "https://res.cloudinary.com/dzl5osene/image/upload/v1765987428/LAGOS_mm0r7l.png",
        "https://res.cloudinary.com/dzl5osene/image/upload/v1765987428/TOKYO_xbnsrq.png",
        "https://res.cloudinary.com/dzl5osene/image/upload/v1765987429/LONDON_unjtjz.png",
        "https://res.cloudinary.com/dzl5osene/image/upload/v1765987427/PARIS_kwm2yu.png",
        "https://res.cloudinary.com/dzl5osene/image/upload/v1765987428/NY_e30eem.png",
        "https://res.cloudinary.com/dzl5osene/image/upload/v1765987428/ROME_abfkvi.png",
      ]}
    />
  );
};

export default BrutalistCities;
