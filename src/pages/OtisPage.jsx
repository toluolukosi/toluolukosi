// src/pages/OtisPage.jsx
import React from "react";
import ProjectLayout from "../components/ProjectLayout";

const OtisPage = () => {
  return (
    <ProjectLayout
      title="OTIS"
      company="Multidisciplinary Creative Company"
      year="2026"
      // Each section is a row: swipe left/right through its images,
      // scroll up/down to move to the next section.
      sections={[
        {
          // Identity: the OTIS stamp, its variants and rules
          title: "Logo System",
          images: [
            "/img/otis/logo-system.webp",
          ],
        },
        {
          // Collection 01: cover, five tech-pack sheets, two lookbook photos
          title: "Unkultured",
          images: [
            "/img/otis/unkultured-00-cover.webp",
            "/img/otis/unkultured-01-iron.webp",
            "/img/otis/unkultured-02-the-worm.webp",
            "/img/otis/unkultured-03-balo.webp",
            "/img/otis/unkultured-04-abami-eda.webp",
            "/img/otis/unkultured-05-zazu.webp",
            { src: "/img/otis/unkultured-06-lookbook-worm.webp", note: "AI-generated" },
            { src: "/img/otis/unkultured-07-lookbook-balo.webp", note: "AI-generated" },
          ],
        },
        {
          // Collection 02: cover + nine national-team ringer tees
          title: "Jogo Bonito",
          images: [
            "/img/otis/jogo-bonito-00-cover.webp",
            "/img/otis/jogo-bonito-01-bra.webp",
            "/img/otis/jogo-bonito-02-por.webp",
            "/img/otis/jogo-bonito-03-fra.webp",
            "/img/otis/jogo-bonito-04-ger.webp",
            "/img/otis/jogo-bonito-05-jpn.webp",
            "/img/otis/jogo-bonito-06-esp.webp",
            "/img/otis/jogo-bonito-07-arg.webp",
            "/img/otis/jogo-bonito-08-eng.webp",
            "/img/otis/jogo-bonito-09-nga.webp",
          ],
        },
        {
          // Collection 03: coming soon
          title: "Creative Dictator",
          images: [
            "/img/otis/creative-dictator-00-cover.webp",
          ],
        },
      ]}
      overview={[
        <>
          <strong>OTIS</strong> is a multidisciplinary creative company built
          to make and produce media in every form: design, fashion, film and
          music. It starts with apparel, released in small, numbered
          collections.
        </>,
        <>
          The identity is the <strong>OTIS stamp</strong>, an ambigram with
          rotational symmetry that reads the same upside down. Beneath it sits
          a phonetic rendering of the name in Yoruba orthography, chosen for
          the rhythm of its tone marks rather than any meaning. The brand
          works like the mark: limited runs, coded language, made for people
          who look twice.
        </>,
        <>
          <strong>Collection 01, Unkultured</strong>, celebrates people who
          refused to express themselves the way they were told to: Mike Tyson,
          Dennis Rodman, Mario Balotelli, Fela Kuti and Portable, printed
          tonal on acid-washed black tees and vests.
        </>,
        <>
          <strong>Collection 02, Jogo Bonito</strong>, is a set of ringer tees
          for nine national football teams, each crest redrawn to carry the
          OTIS stamp. <strong>Collection 03, Creative Dictator</strong>, is in
          development.
        </>,
      ]}
      contributions={[
        "Founded OTIS in 2026 and lead its creative direction across every release.",
        "Designed the OTIS stamp and its logo system: horizontal and vertical lockups, monochrome and inverted versions, minimum size, clear space, construction and misuse rules.",
        "Designed each collection end to end, from concept and naming to the graphics, tech-pack sheets and garment specifications.",
        "Built a coded system for the range, with collection numbers, season tags and design codes (OTS-C01-01) carried from the sheets onto the labels.",
      ]}
      credits={[{ name: "Tolu Olukosi", role: "Founder & Creative Director" }]}
    />
  );
};

export default OtisPage;
