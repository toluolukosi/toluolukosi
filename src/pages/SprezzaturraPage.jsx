// src/pages/SprezzaturaPage.jsx
import React from "react";
import ProjectLayout from "../components/ProjectLayout";

const EclipseLoop =
  "https://res.cloudinary.com/dzl5osene/video/upload/v1790342274/Untitled_design_1_vcngzo.mp4";
const EclipseFilm =
  "https://res.cloudinary.com/dzl5osene/video/upload/v1790496971/A_BLACK_AFFAIR_1_vv9q9q.mp4";

const EclipsePage = () => {
  return (
    <ProjectLayout
      title="eclipse"
      company="Event"
      year="2024"
      // Each section is a row: swipe left/right through its media,
      // scroll up/down to move to the next section.
      sections={[
        {
          title: "Branding",
          images: [
            "https://res.cloudinary.com/dzl5osene/image/upload/v1790489765/Frame_227_oq4drk.png",
            "https://res.cloudinary.com/dzl5osene/image/upload/v1790489780/Frame_238_p1ojnn.png",
            EclipseLoop,
          ],
        },
        {
          title: "In Use",
          images: [
            "https://res.cloudinary.com/dzl5osene/image/upload/v1790489763/Frame_230_fx15cv.png",
            "https://res.cloudinary.com/dzl5osene/image/upload/v1790489768/Frame_236_cl590r.png",
            "https://res.cloudinary.com/dzl5osene/image/upload/v1790489773/Frame_231_lqrufp.png",
            "https://res.cloudinary.com/dzl5osene/image/upload/v1790489783/Frame_234_i0s3q2.png",
            "https://res.cloudinary.com/dzl5osene/image/upload/v1790489772/Frame_233_uc23qt.png",
            "https://res.cloudinary.com/dzl5osene/image/upload/v1790489773/Frame_232_ish5ca.png",
            "https://res.cloudinary.com/dzl5osene/image/upload/v1790489878/Frame_237_xsmuvx.png",
          ],
        },
        {
          title: "MP4",
          images: [{ src: EclipseFilm, muted: false }],
        },
        {
          title: "Website",
          images: [
            { src: "https://ail-eclipse.netlify.app/", website: true },
          ],
        },
      ]}
      overview={[
        <>
          <strong>Eclipse: A Black Affair</strong> is a luxury visual identity
          created for an <strong>exclusive dinner and awards night</strong>{" "}
          celebrating excellence, recognition, and community.
        </>,
        <>
          The identity is built around the concept of{" "}
          <strong>light emerging from darkness</strong>, expressed through
          dramatic monochromatic photography, the eclipse/crescent symbol,
          refined typography, and generous negative space.
        </>,
        <>
          The system combines <strong>Cormorant Garamond</strong> for elegance
          and editorial expression with <strong>Montserrat</strong> for modern
          structure and clarity. At the heart of the identity is{" "}
          <strong>“A Black Affair”</strong>, developed as a distinctive
          signature expression that can exist independently of the Eclipse
          logo.
        </>,
        <>
          The branding extends across the complete event experience, including{" "}
          <strong>
            invitations, menus, table tags, tickets, signage, social media,
            stage graphics, and event materials
          </strong>
          , creating a cohesive and sophisticated atmosphere from first
          impression to the night itself.
        </>,
      ]}
      contributions={[
        "Set the creative vision for Eclipse, defining “light emerging from darkness” as the concept behind every visual and written decision.",
        "Led the visual identity, from the eclipse/crescent mark and the “A Black Affair” signature to the typography system and monochrome palette.",
        "Art directed the photography and video, shaping the lighting, mood and styling of the shoots.",
        "Guided the tone of voice and copy so the words carried the same restraint and elegance as the visuals.",
        "Extended the identity across every touchpoint, from invitations and tickets to signage and stage graphics, keeping the guest experience consistent from first impression to the night itself.",
        "Brought together and directed the photographers, videographers and copywriter, reviewing work at each stage through to final delivery.",
      ]}
      credits={[
        { name: "Kareem Saheed", role: "Photographer & Videographer" },
        { name: "Laolu Majekodunmi", role: "Photographer" },
        { name: "David Shitta-Bey", role: "Videographer" },
        { name: "Okiki Adeyeye", role: "Copy" },
        { name: "Tobe Ezimorah", role: "Dev" },
      ]}
    />
  );
};

export default EclipsePage;
