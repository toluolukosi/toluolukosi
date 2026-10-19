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
      year="2024"
      // Each section is a row: swipe left/right through its images,
      // scroll up/down to move to the next section.
      sections={[
        {
          // Wordmark, monogram and the rules around them
          title: "Logo System",
          images: [
            img("01-cover"),
            img("02-essence"),
            img("03-wordmark"),
            img("04-clearspace"),
            img("05-monogram"),
            img("06-versions"),
          ],
        },
        {
          title: "Colour & Type",
          images: [
            img("07-palette"),
            img("07b-pairings"),
            img("08-type"),
            img("08b-type-scale"),
            img("09-pattern"),
          ],
        },
        {
          // Concept applications
          title: "In Use",
          images: [
            img("10-stationery"),
            img("11-labels"),
            img("12-packaging"),
            img("13-invitation"),
            img("14-signage"),
            img("15-hardware"),
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
          The identity rests on two marks. The <strong>wordmark</strong> is a
          high-contrast display serif with one gesture: the tail of the L and
          the hook of the U join the middle of the name into a single stroke,
          the way a well-cut jacket reads as one line. The{" "}
          <strong>monogram</strong> takes the last two letters, an S drawn as
          the tailor’s curve beside an upright I, and signs the work from the
          inside: buttons, linings, seals and labels.
        </>,
        <>
          The palette is <strong>emerald, burgundy, charcoal and cream</strong>
          , with <strong>antique gold</strong> kept for foil and brass, never
          flat ink. Every text pairing is checked for contrast. Type pairs{" "}
          <strong>Cormorant Garamond</strong> for editorial expression with{" "}
          <strong>Raleway</strong> in light, widely spaced capitals for labels
          and details, echoing the LAGOS line under the marks.
        </>,
        <>
          The system is shown across <strong>concept applications</strong>:
          stationery, woven and care labels, hang tags, packaging, a show
          invitation, boutique signage and monogrammed brass buttons.
        </>,
      ]}
      contributions={[
        "Defined the brand: a Lagos menswear house built around the relaxed modern suit.",
        "Designed the TOLUKOSI wordmark and the SI monogram, with clear space, minimum sizes and approved colour versions.",
        "Built the colour system, with usage proportions, material roles and contrast-checked text pairings.",
        "Set the typography: Cormorant Garamond and Raleway, with a full type scale from display to price labels.",
        "Designed the monogram jacquard pattern for linings, tissue and garment bags.",
        "Extended the identity across concept applications, from stationery and labels to packaging, invitations, signage and hardware.",
      ]}
      credits={[{ name: "Tolu Olukosi", role: "Founder & Creative Director" }]}
    />
  );
};

export default TolukosiPage;
