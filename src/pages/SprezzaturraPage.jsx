// src/pages/SprezzaturaPage.jsx
import React from "react";
import ProjectLayout from "../components/ProjectLayout";

// adjust image paths to your setup (public/images or src/assets)
import Covid1 from "/public/images/Strava-logo.png";
import Covid2 from "/public/images/portfolio-landing-page.jpg";
import Covid3 from "/public/images/Strava-logo.png";

const CovidProjectPage = () => {
  return (
    <ProjectLayout
      title="SPREZZATURA"
      company="Ministry of Health"
      year="2020"
      type="Mobile"
      heroImages={[Covid1, Covid2, Covid3]}
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
