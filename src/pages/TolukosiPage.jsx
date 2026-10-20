// src/pages/TolukosiPage.jsx
import React from "react";
import ProjectLayout from "../components/ProjectLayout";

// Frames are rendered from ~/Documents/TOLUKOSI/Identity (bash tools/build.sh),
// copied into images-src/tolukosi and converted with `npm run images`.
const img = (name) => `/img/tolukosi/${name}.webp`;

const TolukosiPage = () => {
  return (
    <ProjectLayout
      title="TOLUKOSI"
      company="Luxury Fashion"
      year="2026"
      // Each section is a row: swipe left/right through its images,
      // scroll up/down to move to the next section.
      sections={[
        {
          // Wordmark, icon and the rules around them
          title: "Logo System",
          images: [
            img("01a-system-sheet"),
            img("03-wordmark"),
            img("06-versions"),
            img("06b-cards"),
          ],
        },
        {
          title: "Colour & Type",
          images: [
            img("07-palette"),
            img("07b-pairings"),
            img("08b-type-scale"),
          ],
        },
        {
          // Campaign imagery with the marks applied
          title: "Campaign",
          images: [img("17-campaign")],
        },
        {
          // Concept applications
          title: "In Use",
          images: [
            img("09a-packaging-mockups"),
            img("11-labels"),
            img("14-signage"),
            img("16-closing"),
          ],
        },
      ]}
      overview={[
        <>
          <strong>TOLUKOSI</strong> is a Lagos menswear house redefining the
          modern suit. Its tailoring is cut for a <strong>relaxed fit</strong>{" "}
          that balances comfort with precision, so each piece moves easily
          between formal and casual settings.
        </>,
        <>
          The identity rests on two marks cut from the same line. The{" "}
          <strong>wordmark</strong> is a high-contrast display serif: the
          right stroke of the U rises above the cap height and curls over,
          while the tail of the L sweeps beneath it. The <strong>icon</strong>{" "}
          is lifted straight from the wordmark. Split the name between the U
          and the K and keep the two strokes that meet there: the K’s upright
          stem becomes a <strong>needle</strong>, and the U’s curving stroke a{" "}
          <strong>thread</strong> pulled through it, the two tools every suit
          begins with.
        </>,
        <>
          The colour system has ten tones in two families:{" "}
          <strong>ivory, sage, olive, umber and ebony</strong>, the colours of
          the cloth, and <strong>blush, rose, burgundy, wine and oxblood</strong>
          , for linings and accents. Every text pairing is checked for
          contrast. Type works in three roles: <strong>Cinzel Decorative</strong>{" "}
          as the signature for the logo, collection names and invitations,{" "}
          <strong>Geista Mond</strong> for campaign headlines, and{" "}
          <strong>Raleway</strong> as the workhorse for labels, navigation and
          care labels, set in widely spaced capitals.
        </>,
        <>
          The system is shown across <strong>concept applications</strong>:
          a business card, garment bag, shopping bag and icon jacquard, woven
          and care labels, hang tags, and boutique signage.
        </>,
      ]}
      contributions={[
        "Defined the brand: a Lagos menswear house built around the relaxed modern suit.",
        "Designed the TOLUKOSI wordmark and the needle-and-thread icon cut from it, with lockups, clear space, minimum sizes and approved colour versions.",
        "Built the ten-tone colour system, with approved logo colourways and contrast-checked text pairings.",
        "Set the typography system: Cinzel Decorative as the signature, Geista Mond for headlines and Raleway as the workhorse.",
        "Designed the icon jacquard pattern for linings, tissue and garment bags.",
        "Extended the identity across concept applications, from packaging and labels to boutique signage.",
      ]}
      credits={[{ name: "Tolu Olukosi", role: "Founder & Creative Director" }]}
    />
  );
};

export default TolukosiPage;
