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
    // Placeholder – swap in the real project details + route when ready
    title: "project 04",
    year: "2026",
    line1: "Coming soon",
    line2: "In the works",
    placeholder: true,
  },
];

export default projects;
