// src/pages/SprezzaturaPage.jsx
import React from "react";
import ProjectLayout from "../components/ProjectLayout";

const EclipseLoop =
  "https://res.cloudinary.com/dzl5osene/video/upload/v1790342274/Untitled_design_1_vcngzo.mp4";
// q_auto,w_1280 = Cloudinary-compressed (≈9.5MB instead of the 63MB original)
const EclipseFilm =
  "https://res.cloudinary.com/dzl5osene/video/upload/q_auto,w_1280/v1790496971/A_BLACK_AFFAIR_1_vv9q9q.mp4";
// Still frame at 0:40, cropped to leave out the subtitle
const EclipseFilmPoster =
  "https://res.cloudinary.com/dzl5osene/video/upload/so_40,c_crop,g_north,h_0.78,w_1.0/c_fill,w_640,h_360,f_jpg,q_auto/v1790496971/A_BLACK_AFFAIR_1_vv9q9q.jpg";

const EclipsePage = () => {
  return (
    <ProjectLayout
      title="eclipse"
      company="Event"
      year="2024"
      // The film lives outside the gallery: a "Watch the film" button in the
      // side panel opens it full-screen with sound.
      film={{
        src: EclipseFilm,
        poster: EclipseFilmPoster,
        label: "Watch the film",
        note: "Sound on · Music: “Black” by Dave, arranged for orchestra by Tolu Olukosi",
      }}
      // Each section is a row: swipe left/right through its media,
      // scroll up/down to move to the next section.
      sections={[
        {
          title: "Branding",
          images: [
            "/img/eclipse/frame-227.webp",
            "/img/eclipse/frame-238.webp",
            EclipseLoop,
          ],
        },
        {
          title: "In Use",
          images: [
            "/img/eclipse/frame-230.webp",
            "/img/eclipse/frame-236.webp",
            "/img/eclipse/frame-231.webp",
            "/img/eclipse/frame-234.webp",
            "/img/eclipse/frame-233.webp",
            "/img/eclipse/frame-232.webp",
            "/img/eclipse/frame-237.webp",
          ],
        },
        {
          title: "Website",
          images: [
            {
              src: "/img/eclipse/website.webp",
              link: "https://ail-eclipse.netlify.app/",
            },
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
        <>
          The event film is scored with my own{" "}
          <strong>orchestral reworking of the melody from Dave's “Black”</strong>
          . A song about the weight and beauty of Black identity felt like the
          right foundation for “A Black Affair”, and re-arranging it for
          orchestra turned its quiet intensity into something grand enough for
          an awards night.
        </>,
      ]}
      contributions={[
        "Set the creative vision for Eclipse, defining “light emerging from darkness” as the concept behind every visual and written decision.",
        "Led the visual identity, from the eclipse/crescent mark and the “A Black Affair” signature to the typography system and monochrome palette.",
        "Art directed the photography and video, shaping the lighting, mood and styling of the shoots.",
        "Guided the tone of voice and copy so the words carried the same restraint and elegance as the visuals.",
        "Extended the identity across every touchpoint, from invitations and tickets to signage and stage graphics, keeping the guest experience consistent from first impression to the night itself.",
        "Brought together and directed the photographers, videographers and copywriter, reviewing work at each stage through to final delivery.",
        "Arranged and produced the film's soundtrack, reinterpreting the melody of Dave's “Black” for orchestral instruments.",
      ]}
      credits={[
        { name: "Kareem Saheed", role: "Photographer & Videographer" },
        { name: "Laolu Majekodunmi", role: "Photographer" },
        { name: "David Shitta-Bey", role: "Videographer" },
        { name: "Okiki Adeyeye", role: "Copy" },
        { name: "Tobe Ezimorah", role: "Dev" },
        { name: "Tolu Olukosi", role: "Music: “Black” (Dave), orchestral arrangement" },
      ]}
    />
  );
};

export default EclipsePage;
