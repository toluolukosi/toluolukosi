// src/data/projects.js
// Shared list of project cards (home page + /projects page)
const projects = [
  {
    title: "eclipse",
    year: "2024",
    image:
      "https://res.cloudinary.com/dzl5osene/image/upload/v1767624920/Eclipsequad_uvcdec.png",
    logo: "https://res.cloudinary.com/dzl5osene/image/upload/v1767626188/eclipselogo_j90npw.png",
    line1: "Event",
    line2: "Dinner & Awards event",
    route: "/project1",
  },
  {
    title: "otis",
    year: "2023",
    image:
      "https://res.cloudinary.com/dzl5osene/image/upload/v1768218445/OTIS_1_ge0anb.png",
    logo: "https://res.cloudinary.com/dzl5osene/image/upload/v1791284623/Frame_216_ywctna.png",
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
      "https://res.cloudinary.com/dzl5osene/image/upload/v1767629352/Tolukosi_1_spx2br.png",
    logo: "https://res.cloudinary.com/dzl5osene/image/upload/v1765545164/tolukosiicon_qodiyw.png",
    line1: "Luxury Fashion",
    line2: "Suits, Concept Fashion",
    route: "/tolukosi",
  },
  {
    title: "shangeit",
    year: "2026",
    image: "/images/shangeit/ad-5.jpg",
    logo: "/images/shangeit/wordmark-white.png",
    // wide wordmark: size it by height instead of the default logo height
    logoStyle: { height: 26, width: "auto", marginTop: 6 },
    line1: "Property Marketplace",
    line2: "Brand Management, Motion Design",
    route: "/shangeit",
  },
];

export default projects;
