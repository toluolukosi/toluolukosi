// src/pages/TolukosiPage.jsx
import React from "react";
import ProjectLayout from "../components/ProjectLayout";

// adjust image paths to your setup (public/images or src/assets)
import Covid1 from "/public/images/Strava-logo.png";
import Covid2 from "/public/images/portfolio-landing-page.jpg";
import Covid3 from "/public/images/Strava-logo.png";

const CovidProjectPage = () => {
  return (
    <ProjectLayout
      title="TOLUKOSI"
      company="Luxury Fashion"
      year="2020"
      type="Mobile"
      heroImages={[Covid1, Covid2, Covid3]}
      overview={[
        "Luxury menswear brand redefining the modern suit.",
        "Tolukosi's designs prioritize a relaxed fit that balances comfort with precision, offering versatility that allows each piece to transition effortlessly between formal and casual settings.",
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
