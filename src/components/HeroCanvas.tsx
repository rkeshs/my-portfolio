import { useEffect, useRef } from "react";

const GRID_GAP = 26;
const INFLUENCE_RADIUS = 160;
const BASE_RADIUS = 1;
const MAX_RADIUS = 2.6;
const BASE_ALPHA = 0.18;
const MAX_ALPHA = 0.9;
const PUSH_STRENGTH = 14;
const RETURN_SPEED = 0.08;

interface Dot {
  x: number;
  y: number;
  ox: number;
  oy: number;
}

/**
 * Interactive dot-field for the hero band. Dots are drawn in the section's
 * text color (canvas `color`), so the effect inverts with the theme for free.
 */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999 };

    const buildGrid = () => {
      dots = [];
      for (let y = GRID_GAP / 2; y < height; y += GRID_GAP) {
        for (let x = GRID_GAP / 2; x < width; x += GRID_GAP) {
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
      if (reduceMotion) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const color = getComputedStyle(canvas).color;

      for (const dot of dots) {
        const dx = dot.ox - pointer.x;
        const dy = dot.oy - pointer.y;
        const dist = Math.hypot(dx, dy);
        const t = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
        const eased = t * t;

        if (!reduceMotion && eased > 0 && dist > 0.001) {
          const targetX = dot.ox + (dx / dist) * PUSH_STRENGTH * eased;
          const targetY = dot.oy + (dy / dist) * PUSH_STRENGTH * eased;
          dot.x += (targetX - dot.x) * 0.2;
          dot.y += (targetY - dot.y) * 0.2;
        } else {
          dot.x += (dot.ox - dot.x) * RETURN_SPEED;
          dot.y += (dot.oy - dot.y) * RETURN_SPEED;
        }

        const radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * eased;
        const alpha = BASE_ALPHA + (MAX_ALPHA - BASE_ALPHA) * eased;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!running && !reduceMotion) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full text-background pointer-events-none"
      aria-hidden="true"
    />
  );
}
