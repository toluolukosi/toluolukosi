// src/data/projects.js
// Shared list of project cards (home page + /projects page)
const projects = [
  {
    title: "eclipse",
    year: "2024",
    image:
      "/img/projects/eclipsequad.webp",
    logo: "/img/projects/eclipselogo.webp",
    line1: "Event",
    line2: "Dinner & Awards event",
    route: "/project1",
  },
  {
    title: "otis",
    year: "2023",
    image:
      "/img/projects/otis-card.webp",
    logo: "/img/brand/otis-ambigram.webp",
    // new PNG has no top/bottom margin: match the old logo's width (71px) and position
    logoStyle: { width: 71, height: "auto", marginTop: 11 },
    line1: "Multidisciplinary Creative Company",
    line2: "Design, Fashion, Film, Lifestyle, Music",
    route: "/otis",
  },
  {
    title: "tolukosi",
    year: "2024",
    image:
      "/img/projects/tolukosi-1.webp",
    logo: "/img/projects/tolukosiicon.webp",
    line1: "Luxury Fashion",
    line2: "Suits, Concept Fashion",
    route: "/tolukosi",
  },
  {
    title: "shangeit",
    year: "2026",
    // ShangeIt-listed homes, darkened, with the wordmark over them (like the TOLUKOSI card)
    image: "/img/projects/shangeit-card.webp",
    logo: "/img/shangeit/icon-white.webp",
    // solid monogram reads heavier than the other icons: size it down a little
    logoStyle: { height: 44, width: "auto", marginTop: 8 },
    line1: "Proptech",
    line2: "Property Marketplace",
    route: "/shangeit",
  },
];

export default projects;
