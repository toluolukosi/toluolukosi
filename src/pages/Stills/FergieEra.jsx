import React from "react";
import StillLayout from "../../components/StillLayout";

const FergieEra = () => {
  return (
    <StillLayout
      title="Fergie Era"
      company="Poster series"
      overview={[
        "Fergie Era is a poster series celebrating Manchester United under Sir Alex Ferguson (1986–2013), the most successful period in the club's history.",
        "Each poster honours a figure from that era (Ferguson, Cantona, Beckham, Scholes, Giggs, Solskjær, and the Yorke–Cole partnership) through the visual language of an old matchday programme: club reds, worn textures, collegiate type and trophy tallies.",
        "The series explores how layout and texture can carry nostalgia, making each poster feel like it came from the era it celebrates."
      ]}
      images={[
        "/img/stills/fergie-era/fergie-era-3.webp",
        "/img/stills/fergie-era/saf.webp",
        "/img/stills/fergie-era/db.webp",
        "/img/stills/fergie-era/ps.webp",
        "/img/stills/fergie-era/rg.webp",
        "/img/stills/fergie-era/ogs.webp",
        "/img/stills/fergie-era/ec.webp",
        "/img/stills/fergie-era/dy-ac.webp"
      ]}
    />
  );
};

export default FergieEra;
