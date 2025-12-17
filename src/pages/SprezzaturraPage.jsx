// src/pages/SprezzaturaPage.jsx
import React from "react";
import ProjectLayout from "../components/ProjectLayout";

// 🔁 REMOVE these:
// import Covid1 from "/public/images/Strava-logo.png";
// import Covid2 from "/public/images/portfolio-landing-page.jpg";
// import Covid3 from "/public/images/Strava-logo.png";

// ✅ ADD Cloudinary URLs as plain constants instead:
const SprezzaturaImg1 =
  "https://res.cloudinary.com/dzl5osene/image/upload/v1765984749/TOKYO_1_h6aerr.png";
const SprezzaturaImg2 =
  "https://res.cloudinary.com/dzl5osene/image/upload/v1734510558/NEXLDSABUJA_p5gons.png";
const SprezzaturaImg3 =
  "https://res.cloudinary.com/dzl5osene/image/upload/v1734510558/NEXLDSABUJA_p5gons.png";

const CovidProjectPage = () => {
  return (
    <ProjectLayout
      title="SPREZZATURA"
      company="Music Project"
      year="2020"
      type="Mobile"
      heroImages={[SprezzaturaImg1, SprezzaturaImg2, SprezzaturaImg3]}
      overview={[
        "In the early days of the COVID-19 pandemic in Brazil, the Ministry of Health faced an urgent challenge: to swiftly and accurately provide citizens with official health information while also gathering data on their health status.",
        "The solution was an intuitive progressive web app designed to inform, guide, and track the pandemic's progression. This app provided critical information to the public and gathered essential data to shape public policies.",
      ]}
      contributions={[
        "Conducted interviews with epidemiology experts, desk research of global solutions, and benchmark analyses to derive insights and shape the app's foundational strategy.",
        "Developed a user-centric interface complemented by diverse, color-coded virtual screening illustrations and consistent iconography to enhance user engagement and comprehension.",
        "Introduced features such as GPS-based Health Unit locator, symptom self-assessment flows, and tailored recommendations based on risk categorization.",
      ]}
    />
  );
};

export default CovidProjectPage;
