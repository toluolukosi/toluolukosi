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
      "/img/projects/otis-1.webp",
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
    // a real listing from the site: Oribanwa Phase 2, Lekki
    image: "/img/shangeit/card-oribanwa.webp",
    logo: "/img/shangeit/logo-white.webp",
    // wide logo (monogram + wordmark): size it by height instead of the default
    logoStyle: { height: 26, width: "auto", marginTop: 6 },
    line1: "Proptech",
    line2: "Property Marketplace",
    route: "/shangeit",
  },
];

export default projects;
