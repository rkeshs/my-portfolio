import { useEffect, useRef } from "react";

const VERTEX_SHADER = `#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 resolution;
uniform vec2 pointer;
uniform float pointerStrength;
uniform float time;
uniform float scroll;
uniform float darkMode;

out vec4 color;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float aspect = resolution.x / resolution.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 cursor = vec2((pointer.x / resolution.x - 0.5) * aspect, pointer.y / resolution.y - 0.5);

  float t = time * 0.22 + scroll * 0.35;
  float bands = sin((p.x * 4.0 + sin(p.y * 5.0 - t) * 0.65 + t) * 3.1);
  float fold = sin((p.y * 5.5 + cos(p.x * 4.0 + t * 0.8) * 0.7 - t * 0.6) * 2.4);

  vec2 orbA = vec2(sin(t * 0.9) * 0.42, cos(t * 0.7) * 0.3);
  vec2 orbB = vec2(cos(t * 0.55 + 2.0) * 0.5, sin(t * 0.85 + 1.0) * 0.36);
  float glowA = exp(-3.8 * length(p - orbA));
  float glowB = exp(-4.6 * length(p - orbB));

  float cursorDistance = length(p - cursor);
  float ripple = sin(cursorDistance * 34.0 - time * 8.0)
    * exp(-cursorDistance * 5.0)
    * pointerStrength;
  float cursorGlow = exp(-cursorDistance * 5.5) * pointerStrength;

  vec3 mist = vec3(0.95, 0.95, 0.92);
  vec3 ember = vec3(0.95, 0.055, 0.015);
  vec3 orange = vec3(1.0, 0.30, 0.015);
  vec3 acid = vec3(0.62, 0.98, 0.02);
  vec3 sun = vec3(1.0, 0.72, 0.04);
  vec3 ink = vec3(0.035, 0.018, 0.008);

  float emberField = smoothstep(-0.75, 0.9, bands + glowA * 1.8);
  float orangeField = smoothstep(-0.45, 1.25, fold + glowB * 1.4);
  vec3 lightColor = mix(mist, ember, emberField * 0.62);
  lightColor = mix(lightColor, orange, orangeField * 0.5);
  lightColor = mix(lightColor, sun, glowA * 0.42);
  lightColor = mix(lightColor, orange, glowB * 0.28);
  lightColor += mix(sun, ember, uv.x) * (ripple * 0.16 + cursorGlow * 0.1);

  vec3 darkColor = mix(ink, ember, emberField * 0.72);
  darkColor = mix(darkColor, orange, orangeField * 0.52);
  darkColor += acid * glowA * 0.44;
  darkColor += sun * glowB * 0.36;
  darkColor += mix(sun, acid, uv.x) * (ripple * 0.32 + cursorGlow * 0.28);

  float vignette = smoothstep(0.95, 0.18, length(p * vec2(0.8, 1.0)));
  lightColor = mix(mist, lightColor, 0.94 + vignette * 0.05);
  darkColor *= 0.62 + vignette * 0.55;
  vec3 finalColor = mix(lightColor, darkColor, darkMode);
  finalColor += (hash(gl_FragCoord.xy + time) - 0.5) * 0.025;

  color = vec4(finalColor, 1.0);
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    const uniforms = {
      resolution: gl.getUniformLocation(program, "resolution"),
      pointer: gl.getUniformLocation(program, "pointer"),
      pointerStrength: gl.getUniformLocation(program, "pointerStrength"),
      time: gl.getUniformLocation(program, "time"),
      scroll: gl.getUniformLocation(program, "scroll"),
      darkMode: gl.getUniformLocation(program, "darkMode"),
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const pointer = { x: 0, y: 0, strength: 0, targetStrength: 0 };
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let lastFrame = 0;
    let darkMode = document.documentElement.classList.contains("dark") ? 1 : 0;
    let targetDarkMode = darkMode;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, coarsePointer ? 1.5 : 2);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      if (pointer.x === 0 && pointer.y === 0) {
        pointer.x = width * 0.72;
        pointer.y = height * 0.52;
      }
    };

    const setPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) * (canvas.width / rect.width);
      pointer.y = (rect.bottom - event.clientY) * (canvas.height / rect.height);
    };

    const onPointerDown = (event: PointerEvent) => {
      setPointer(event);
      pointer.targetStrength = 1;
    };
    const onPointerMove = (event: PointerEvent) => {
      setPointer(event);
      pointer.targetStrength = event.pointerType === "mouse" ? 0.9 : 1;
    };
    const releasePointer = () => {
      pointer.targetStrength = coarsePointer ? 0.18 : 0;
    };

    const render = (now: number) => {
      if (!visible) return;
      const minFrameTime = coarsePointer ? 1000 / 30 : 1000 / 60;
      if (now - lastFrame >= minFrameTime || reduceMotion) {
        lastFrame = now;
        const seconds = reduceMotion ? 2.5 : now / 1000;
        if (coarsePointer && pointer.targetStrength < 0.3) {
          pointer.x = width * (0.5 + Math.sin(seconds * 0.55) * 0.28);
          pointer.y = height * (0.52 + Math.cos(seconds * 0.42) * 0.24);
        }
        pointer.strength +=
          (pointer.targetStrength - pointer.strength) * (coarsePointer ? 0.1 : 0.14);
        darkMode += (targetDarkMode - darkMode) * (reduceMotion ? 1 : 0.08);

        gl.uniform2f(uniforms.resolution, width, height);
        gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
        gl.uniform1f(uniforms.pointerStrength, pointer.strength);
        gl.uniform1f(uniforms.time, seconds);
        gl.uniform1f(uniforms.scroll, window.scrollY / Math.max(height, 1));
        gl.uniform1f(uniforms.darkMode, darkMode);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      if (!reduceMotion) raf = requestAnimationFrame(render);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      visible = true;
      raf = requestAnimationFrame(render);
    };
    const stop = () => {
      visible = false;
      cancelAnimationFrame(raf);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) render(0);
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !document.hidden) start();
      else stop();
    });
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    const themeObserver = new MutationObserver(() => {
      targetDarkMode = document.documentElement.classList.contains("dark") ? 1 : 0;
      if (reduceMotion) render(0);
    });

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    if (!coarsePointer) {
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerup", releasePointer, { passive: true });
      window.addEventListener("pointercancel", releasePointer, { passive: true });
      window.addEventListener("pointerleave", releasePointer, { passive: true });
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    render(0);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      if (!coarsePointer) {
        window.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", releasePointer);
        window.removeEventListener("pointercancel", releasePointer);
        window.removeEventListener("pointerleave", releasePointer);
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full bg-hero-background"
      aria-hidden="true"
    />
  );
}
