// src/components/FilmPlayer.jsx
// Full-screen video player with sound (click outside, × or Esc to close).
// Rendered on <body> so it covers the screen even when the page has scrolled.
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import NavIconButton from "./NavIconButton";

// film = { src, poster, label, note, aspect }  (aspect = width / height, default 16:9)
const FilmPlayer = ({ film, onClose }) => {
  const videoRef = useRef(null);
  const aspect = film.aspect ?? 16 / 9;

  // Latest onClose without re-running the effect below on every parent render
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Start playing on open (the click that opened it allows sound; if a
  // browser still blocks it, the controls are there). Esc closes.
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={film.label ?? "Film"}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-black flex flex-col items-center justify-center px-4 py-16 md:px-10"
    >
      <NavIconButton
        onClick={onClose}
        icon="close"
        label="Close film"
        className="absolute top-4 right-4"
      />
      <video
        ref={videoRef}
        src={film.src}
        poster={film.poster}
        controls
        playsInline
        onClick={(e) => e.stopPropagation()}
        // as large as fits: full width, but never taller than 80% of the screen
        style={{
          aspectRatio: aspect,
          width: `min(100%, calc(80vh * ${aspect}))`,
        }}
        className="object-contain rounded-[10px] bg-black"
      />
      {film.note && (
        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.18em] font-thedus-condensed text-gray-400">
          {film.note}
        </p>
      )}
    </div>,
    document.body
  );
};

export default FilmPlayer;
