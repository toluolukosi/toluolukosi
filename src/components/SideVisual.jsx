// src/components/SideVisual.jsx
// Animated tile backgrounds for the home page sides (white dots on a navy glow)
//   type="sound" → circular audio visualiser
//   type="live"  → broadcast pulse (rings of dots radiating from a centre dot)
//   type="dev"   → lines of "code" typing out in dots with a blinking cursor
import React, { useEffect, useRef } from "react";

const BG_INNER = "#22324a";
const BG_OUTER = "#050609";

// ---------- drawing helpers ----------

const drawBackground = (ctx, w, h) => {
  const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6);
  g.addColorStop(0, BG_INNER);
  g.addColorStop(1, BG_OUTER);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
};

const dot = (ctx, x, y, r) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
};

const capsule = (ctx, x1, y1, x2, y2, width) => {
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

// ---------- SOUND: circular visualiser ----------

const drawSound = (ctx, w, h, t, energy) => {
  const u = Math.min(w, h) / 250;
  const cx = w / 2;
  const cy = h / 2;
  const R = 70 * u;
  const count = 64;
  const size = 3.6 * u;
  const beat = 0.75 + 0.25 * Math.abs(Math.sin(t * 2.4));

  ctx.strokeStyle = "rgba(255,255,255,0.95)";
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2;
    // layered waves travelling round the ring → organic "spectrum" bumps
    let amp =
      Math.sin(a * 2 + t * 1.1) * 0.55 +
      Math.sin(a * 3 - t * 1.7) * 0.35 +
      Math.sin(a * 5 + t * 2.3) * 0.2;
    amp = Math.max(0, amp);
    amp = amp * amp * beat * energy;

    const len = amp * 34 * u;
    const x1 = cx + Math.cos(a) * R;
    const y1 = cy + Math.sin(a) * R;
    const x2 = cx + Math.cos(a) * (R + len);
    const y2 = cy + Math.sin(a) * (R + len);
    capsule(ctx, x1, y1, x2 + 0.01, y2, size);
  }
};

// ---------- LIVE: broadcast pulse ----------

const drawLive = (ctx, w, h, t, energy) => {
  const u = Math.min(w, h) / 250;
  const cx = w / 2;
  const cy = h / 2;
  const maxR = 110 * u;
  const period = 1.3 / energy; // a new ring every period seconds
  const life = 3.9; // seconds a ring takes to reach maxR
  const spacing = 11 * u;

  // rings of dots
  const newest = Math.floor(t / period);
  for (let k = newest; k > newest - Math.ceil(life / period) - 1; k--) {
    const age = t - k * period;
    if (age < 0 || age > life) continue;
    const p = age / life; // 0 → 1
    const r = 14 * u + (maxR - 14 * u) * (1 - Math.pow(1 - p, 2)); // ease out
    const alpha = Math.pow(1 - p, 1.6);
    const count = Math.max(8, Math.round((Math.PI * 2 * r) / spacing));
    const size = (2.6 - 1.2 * p) * u;
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + k * 0.35; // each ring slightly rotated
      dot(ctx, cx + Math.cos(a) * r, cy + Math.sin(a) * r, size);
    }
  }

  // centre "on air" dot with a soft glow, beating with each new ring
  const since = (t % period) / period;
  const pulse = 1 + 0.35 * Math.pow(1 - since, 3);
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26 * u * pulse);
  glow.addColorStop(0, "rgba(255,255,255,0.35)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  dot(ctx, cx, cy, 26 * u * pulse);
  ctx.fillStyle = "rgba(255,255,255,1)";
  dot(ctx, cx, cy, 7 * u * pulse);
};

// ---------- DEV: typing code in dots ----------

// each line: [indent, ...token lengths] (lengths in "characters")
const CODE = [
  [0, 5, 7, 2],
  [1, 4, 9, 3],
  [2, 6, 3, 8],
  [2, 3, 5],
  [1, 7, 2, 4],
  [2, 10, 3],
  [1, 2],
  [0, 3, 6],
];
const CODE_CHARS = CODE.map(([, ...toks]) => toks.reduce((s, n) => s + n + 1, 0));
const TOTAL_CHARS = CODE_CHARS.reduce((s, n) => s + n, 0);
const WIDEST = Math.max(...CODE.map(([indent], i) => indent * 2 + CODE_CHARS[i]));

const drawDev = (ctx, w, h, t, energy, frozen) => {
  const u = Math.min(w, h) / 250;
  const cw = 6.2 * u; // character width
  const lh = 17 * u; // line height
  const size = 3.6 * u; // dot thickness
  const blockW = WIDEST * cw;
  const blockH = CODE.length * lh;
  const x0 = (w - blockW) / 2;
  const y0 = (h - blockH) / 2 + lh / 2;

  const cps = 26 * energy; // characters per second
  const typeTime = TOTAL_CHARS / cps;
  const hold = 1.6;
  const fade = 0.6;
  const cycle = typeTime + hold + fade;
  const ct = frozen ? typeTime : t % cycle;

  const typed = Math.min(TOTAL_CHARS, ct * cps);
  const alpha = ct > typeTime + hold ? 1 - (ct - typeTime - hold) / fade : 1;

  let remaining = typed;
  let cursorX = x0;
  let cursorY = y0;

  CODE.forEach(([indent, ...toks], li) => {
    const y = y0 + li * lh;
    let x = x0 + indent * 2 * cw;
    if (remaining <= 0) return;
    cursorY = y;
    cursorX = x;
    toks.forEach((len, ti) => {
      if (remaining <= 0) return;
      const shown = Math.min(len, remaining);
      remaining -= len + 1;
      // first token of each line a little brighter, like a keyword
      const a = (ti === 0 ? 0.95 : 0.6) * alpha;
      ctx.strokeStyle = `rgba(255,255,255,${a})`;
      capsule(ctx, x, y, x + Math.max(0.01, (shown - 1) * cw), y, size);
      x += (len + 1) * cw;
      cursorX = x - (len + 1 - shown) * cw;
    });
  });

  // blinking cursor
  const typing = !frozen && typed < TOTAL_CHARS;
  const on = typing || Math.floor(t * 2.2) % 2 === 0;
  if (on && alpha > 0) {
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    capsule(ctx, cursorX + cw * 0.4, cursorY - 6 * u, cursorX + cw * 0.4, cursorY + 6 * u, 2.4 * u);
  }
};

const DRAW = { sound: drawSound, live: drawLive, dev: drawDev };

// ---------- component ----------

const SideVisual = ({ type, className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const draw = DRAW[type];
    if (!canvas || !draw) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let t = 0;
    let last = performance.now();
    let energy = 1; // eases up on hover
    let target = 1;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      drawBackground(ctx, w, h);
      draw(ctx, w, h, t, energy, reduced);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      energy += (target - energy) * Math.min(1, dt * 4);
      t += dt * energy;
      render();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduced || raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // livelier while the tile is hovered
    const tile = canvas.closest(".group") || canvas.parentElement;
    const onEnter = () => (target = 1.6);
    const onLeave = () => (target = 1);
    tile.addEventListener("mouseenter", onEnter);
    tile.addEventListener("mouseleave", onLeave);

    // only animate while on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      tile.removeEventListener("mouseenter", onEnter);
      tile.removeEventListener("mouseleave", onLeave);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

export default SideVisual;
