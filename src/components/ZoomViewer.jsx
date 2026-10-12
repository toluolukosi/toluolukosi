// src/components/ZoomViewer.jsx
// Full-screen image viewer: pinch or double-tap to zoom (click on desktop),
// drag to move around, arrows to step through the images of a section.
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import NavIconButton from "./NavIconButton";

const MAX_SCALE = 4;
const TAP_SCALE = 2.5; // zoom level for double-tap / click

const ZoomViewer = ({ images, index, onIndexChange, onClose, label }) => {
  const boxRef = useRef(null); // scroll container (panning = native scroll)
  const imgRef = useRef(null);
  const scaleRef = useRef(1);
  const lastTouchRef = useRef(0);
  const [zoomed, setZoomed] = useState(false);

  const src = images[index];
  const hasMultiple = images.length > 1;

  // Size the image as "fit the screen" × zoom, keeping the point under the
  // finger / cursor (focal) in place.
  const applyScale = useCallback((next, focal) => {
    const box = boxRef.current;
    const img = imgRef.current;
    if (!box || !img || !img.naturalWidth) return;

    const scale = Math.min(Math.max(next, 1), MAX_SCALE);
    const fit = Math.min(
      box.clientWidth / img.naturalWidth,
      box.clientHeight / img.naturalHeight
    );
    const fx = focal?.x ?? box.clientWidth / 2;
    const fy = focal?.y ?? box.clientHeight / 2;

    const before = img.getBoundingClientRect();
    const relX = before.width ? (fx - before.left) / before.width : 0.5;
    const relY = before.height ? (fy - before.top) / before.height : 0.5;

    img.style.width = `${img.naturalWidth * fit * scale}px`;
    img.style.height = `${img.naturalHeight * fit * scale}px`;

    const after = img.getBoundingClientRect();
    box.scrollLeft += after.left + relX * after.width - fx;
    box.scrollTop += after.top + relY * after.height - fy;

    scaleRef.current = scale;
    setZoomed(scale > 1.01);
  }, []);

  const toggleZoom = useCallback(
    (focal) => applyScale(scaleRef.current > 1.01 ? 1 : TAP_SCALE, focal),
    [applyScale]
  );

  const go = useCallback(
    (dir) => {
      if (!hasMultiple) return;
      onIndexChange((index + dir + images.length) % images.length);
    },
    [hasMultiple, index, images.length, onIndexChange]
  );

  // Keyboard + refit when the screen changes (rotation / resize)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const onResize = () => applyScale(1);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [onClose, go, applyScale]);

  // Pinch, double-tap and ctrl/trackpad-pinch zoom
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const dist = (t) =>
      Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const mid = (t) => ({
      x: (t[0].clientX + t[1].clientX) / 2,
      y: (t[0].clientY + t[1].clientY) / 2,
    });

    let pinch = null;
    let tap = null; // { time, x, y } of the previous tap
    let moved = false;

    const onStart = (e) => {
      moved = false;
      if (e.touches.length === 2) {
        pinch = { dist: dist(e.touches), scale: scaleRef.current };
      }
    };
    const onMove = (e) => {
      moved = true;
      if (e.touches.length === 2 && pinch) {
        e.preventDefault();
        applyScale(
          (pinch.scale * dist(e.touches)) / pinch.dist,
          mid(e.touches)
        );
      }
    };
    const onEnd = (e) => {
      lastTouchRef.current = Date.now();
      if (e.touches.length < 2) pinch = null;
      if (e.touches.length > 0 || moved) return;
      if (e.target !== imgRef.current) return;

      const t = e.changedTouches[0];
      const now = Date.now();
      if (
        tap &&
        now - tap.time < 300 &&
        Math.hypot(t.clientX - tap.x, t.clientY - tap.y) < 30
      ) {
        toggleZoom({ x: t.clientX, y: t.clientY });
        tap = null;
      } else {
        tap = { time: now, x: t.clientX, y: t.clientY };
      }
    };
    const onWheel = (e) => {
      if (!e.ctrlKey) return; // plain wheel = normal scrolling
      e.preventDefault();
      applyScale(scaleRef.current * Math.exp(-e.deltaY / 100), {
        x: e.clientX,
        y: e.clientY,
      });
    };

    box.addEventListener("touchstart", onStart, { passive: true });
    box.addEventListener("touchmove", onMove, { passive: false });
    box.addEventListener("touchend", onEnd);
    box.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      box.removeEventListener("touchstart", onStart);
      box.removeEventListener("touchmove", onMove);
      box.removeEventListener("touchend", onEnd);
      box.removeEventListener("wheel", onWheel);
    };
  }, [applyScale, toggleZoom]);

  // Mouse: a click on the image toggles zoom, a click on the black closes.
  // (Taps also fire click, so ignore clicks that follow a touch.)
  const fromTouch = () => Date.now() - lastTouchRef.current < 600;

  const stepClass = `
    w-10 h-10
    rounded-full!
    border! border-white/20!
    bg-black/60!
    p-0!
    flex items-center justify-center
    text-sm text-white
    cursor-pointer
    hover:border-white/50!
    transition-colors
  `;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label ?? "Image viewer"}
      className="fixed inset-0 z-[80] bg-black select-none"
    >
      <div
        ref={boxRef}
        onClick={(e) => e.target === boxRef.current && onClose()}
        className="absolute inset-0 flex overflow-auto overscroll-contain no-scrollbar touch-pan-x touch-pan-y"
      >
        <img
          key={src}
          ref={imgRef}
          src={src}
          alt={label ?? ""}
          draggable={false}
          onLoad={() => applyScale(1)}
          onClick={(e) =>
            !fromTouch() && toggleZoom({ x: e.clientX, y: e.clientY })
          }
          className={`m-auto block flex-none max-w-none ${
            zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
        />
      </div>

      <NavIconButton
        onClick={onClose}
        icon="close"
        label="Close"
        className="absolute top-4 right-4"
      />

      {/* Bottom bar: step through the section + how-to hint */}
      <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4 pointer-events-none">
        {hasMultiple && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className={`${stepClass} pointer-events-auto`}
          >
            &lt;
          </button>
        )}
        <span className="px-3 py-1.5 rounded-full bg-black/60 text-[10px] uppercase tracking-[0.2em] font-thedus-condensed text-white/80">
          {hasMultiple && `${index + 1}/${images.length} · `}
          <span className="lg:hidden">Pinch or double-tap to zoom</span>
          <span className="hidden lg:inline">Click to zoom</span>
        </span>
        {hasMultiple && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className={`${stepClass} pointer-events-auto`}
          >
            &gt;
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ZoomViewer;
