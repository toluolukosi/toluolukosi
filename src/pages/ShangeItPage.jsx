// src/pages/ShangeItPage.jsx
import React from "react";
import ProjectLayout from "../components/ProjectLayout";

const ShangeItPage = () => {
  return (
    <ProjectLayout
      title="ShangeIt"
      company="Property Marketplace"
      year="2026"
      // The ad lives outside the gallery: a "Watch the ad" button in the side
      // panel opens it full-screen with sound.
      film={{
        src: "/videos/shangeit-brand-ad.mp4",
        poster: "/images/shangeit/poster-brand-ad.jpg",
        label: "Watch the ad",
        note: "Sound on · 15 seconds",
        aspect: 9 / 16,
      }}
      // Each section is a row: swipe left/right through its media,
      // scroll up/down to move to the next section.
      sections={[
        {
          title: "Brand Ad",
          images: [
            "/images/shangeit/ad-1.jpg",
            "/images/shangeit/ad-2.jpg",
            "/images/shangeit/ad-3.jpg",
            "/images/shangeit/ad-4.jpg",
            "/images/shangeit/ad-5.jpg",
            "/images/shangeit/ad-6.jpg",
          ],
        },
        {
          title: "Product Motion",
          images: [
            "/videos/shangeit-ui-loop.mp4",
            "/videos/shangeit-map-pin.mp4",
            "/videos/shangeit-3d-tour.mp4",
          ],
        },
      ]}
      overview={[
        <>
          <strong>ShangeIt</strong> is a Lagos property marketplace built on
          one promise: every home is{" "}
          <strong>visited, photographed and verified</strong> before it is
          listed.
        </>,
        <>
          I joined the team as <strong>Brand Manager</strong>, responsible for
          how the brand looks, sounds and shows up everywhere people meet it.
          My first job was <strong>consistency</strong>: refining the use of
          logo, colour, type and tone of voice so that every post, video and
          page reads as the same brand.
        </>,
        <>
          The 15-second ad turns the logo into the idea. The two halves of the
          ShangeIt mark become <strong>viewfinder brackets</strong> that frame
          real listings. Each one is circled, checked and ticked in brand
          teal, and the word <strong>“hope” resolves into “home”</strong>.
        </>,
        <>
          Three <strong>product loops</strong> (search, map and 3D tour)
          rebuild the real interface as clean, cursor-led animations, so each
          feature can be understood in under 15 seconds with the sound off.
        </>,
      ]}
      contributions={[
        "Refined brand consistency across the team's output, aligning logo use, colour, typography and tone of voice so every touchpoint reads as one brand.",
        "Planned and directed social content, from scripts and shot lists to presenter and creator videos, keeping each piece on message.",
        "Developed the concept and art direction for the brand ad, built around “hope to home” and the logo as a viewfinder.",
        "Designed and produced the product motion (search, map and 3D tour), building each piece in code so every frame could be timed and revised precisely.",
        "Tracked social performance and used the results to decide what the brand made next.",
      ]}
      credits={[
        // required credit: the Map Pin loop is drawn from OpenStreetMap data
        { name: "Map data", role: "© OpenStreetMap contributors" },
      ]}
    />
  );
};

export default ShangeItPage;
