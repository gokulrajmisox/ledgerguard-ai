'use client';

import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './CrystalizedBall.css';

const hexToRgb = (hex) => {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  if (clean.length === 3) {
    const r = ((bigint >> 8) & 15) * 17;
    const g = ((bigint >> 4) & 15) * 17;
    const b = (bigint & 15) * 17;
    return [r / 255, g / 255, b / 255];
  }
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r / 255, g / 255, b / 255];
};

const vertexShader = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform float uSize;
uniform float uCrackle;
uniform float uFill;
uniform float uHoverStrength;
uniform float uStrands;
uniform float uFlares;
uniform float uGlow;
uniform float uSparks;
uniform vec2 uMouse;
uniform float uShape; // 0: round, 1: square
uniform float uDepth;
uniform float uSway;
uniform float uTwinkle;
uniform float uHaze;
uniform float uIntro;

out vec4 fragColor;

// Simplex/Perlin noise helper
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
  vec2 mouse = (uMouse - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);

  float radius = uSize * 0.46;
  float d = length(uv);

  // Mouse interaction influence
  float mouseDist = length(uv - mouse);
  float mouseInfluence = smoothstep(0.4, 0.0, mouseDist) * uHoverStrength;

  // Sway motion
  vec2 swayOffset = vec2(sin(uTime * 0.8), cos(uTime * 0.6)) * 0.02 * uSway;
  vec2 p = uv + swayOffset;
  float pd = length(p);

  // Ball boundary
  float sphere = 1.0 - smoothstep(radius - 0.005, radius + 0.005, pd);
  float rim = smoothstep(radius - 0.08, radius, pd) * (1.0 - smoothstep(radius, radius + 0.02, pd));
  float outerGlow = exp(-pd * 7.0 / (radius * uGlow)) * uGlow * 0.85;

  // Electric strands around rim
  float angle = atan(p.y, p.x);
  float strandPattern = 0.0;
  for(float i = 1.0; i <= 8.0; i += 1.0) {
    if (i > uStrands) break;
    float freq = i * 2.0;
    float noiseVal = snoise(vec2(angle * freq + uTime * 1.5, i * 10.0));
    float strandDist = abs(pd - (radius - 0.015 - noiseVal * 0.04 * uCrackle));
    strandPattern += smoothstep(0.012, 0.001, strandDist) * (0.6 + 0.4 * sin(angle * 4.0 + uTime * 3.0));
  }

  // Particle swirl inside the ball
  vec2 particleUv = p / radius;
  float pNoise = snoise(particleUv * 6.0 + vec2(uTime * 0.4, uTime * 0.7));
  float particleField = 0.0;

  if (pd < radius) {
    // Normal for 3D sphere refraction
    float z = sqrt(max(0.0, radius * radius - pd * pd));
    vec3 normal = normalize(vec3(p, z * uDepth));

    // Internal particles
    float grid = uShape > 0.5 ? 40.0 : 35.0;
    vec2 pGrid = fract(particleUv * grid + vec2(0.0, uTime * 0.3));
    float pDot = length(pGrid - 0.5);

    if (uShape > 0.5) {
      // Square pixels
      vec2 sq = abs(pGrid - 0.5);
      float sqDist = max(sq.x, sq.y);
      particleField = step(sqDist, 0.25) * (0.5 + 0.5 * sin(uTime * 5.0 + pNoise * 10.0 * uTwinkle));
    } else {
      // Round dots
      particleField = smoothstep(0.35, 0.05, pDot) * (0.5 + 0.5 * sin(uTime * 5.0 + pNoise * 10.0 * uTwinkle));
    }

    particleField *= uFill * (0.4 + 0.6 * pNoise);
  }

  // Flares & Sparks
  float flare = pow(max(0.0, dot(normalize(p), normalize(mouse + 0.0001))), 8.0) * mouseInfluence * uFlares * 2.0;
  float sparks = step(0.92, fract(sin(dot(uv, vec2(12.9898, 78.233)) + uTime * 4.0) * 43758.5453)) * uSparks * rim;

  // Composite Color
  vec3 col = uColor;
  vec3 whiteHot = vec3(1.0, 1.0, 1.0);
  vec3 rimCol = mix(col, whiteHot, rim * 0.7 + strandPattern * 0.5);

  vec3 finalColor = vec3(0.0);
  finalColor += col * outerGlow * 0.9;
  finalColor += rimCol * (rim * 1.8 + strandPattern * 1.5);
  finalColor += col * (particleField * 1.4 + uHaze * 0.15 * sphere);
  finalColor += whiteHot * (flare + sparks);

  float alpha = clamp(sphere + outerGlow + strandPattern + flare, 0.0, 1.0) * uIntro;

  fragColor = vec4(finalColor * alpha, alpha);
}
`;

export default function CrystalizedBall({
  preset = 'plasma',
  color = '#F25BD0',
  size = 0.7,
  crackle = 0.85,
  fill = 0.5,
  interactive = true,
  hoverStrength = 0.7,
  strands = 6,
  flares = 0.65,
  glow = 0.9,
  sparks = 0.6,
  particleCount = 15000,
  motion = 'rise',
  particleShape = 'square',
  depth = 0.6,
  sway = 0.5,
  twinkle = 0.5,
  haze = 0.7,
  dustSpeed = 1,
  speed = 1,
  intro = true,
  paused = false,
  className = '',
  style
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        alpha: true,
        antialias: true
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    if (!renderer.isWebgl2) {
      return;
    }

    const canvas = gl.canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const rgb = hexToRgb(color);

    const uniforms = {
      uResolution: { value: [container.clientWidth || 300, container.clientHeight || 300] },
      uTime: { value: 0 },
      uColor: { value: rgb },
      uSize: { value: size },
      uCrackle: { value: crackle },
      uFill: { value: fill },
      uHoverStrength: { value: hoverStrength },
      uStrands: { value: strands },
      uFlares: { value: flares },
      uGlow: { value: glow },
      uSparks: { value: sparks },
      uMouse: { value: [0, 0] },
      uShape: { value: particleShape === 'square' ? 1.0 : 0.0 },
      uDepth: { value: depth },
      uSway: { value: sway },
      uTwinkle: { value: twinkle },
      uHaze: { value: haze },
      uIntro: { value: intro ? 0.0 : 1.0 }
    };

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });

    const mesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program
    });

    let rafId = 0;
    let startTime = performance.now();
    let isAlive = true;

    const resize = () => {
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      renderer.setSize(w, h);
      uniforms.uResolution.value = [w, h];
    };

    const handlePointerMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = rect.height - (e.clientY - rect.top);
      uniforms.uMouse.value = [x, y];
    };

    const handlePointerLeave = () => {
      uniforms.uMouse.value = [-1000, -1000];
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const loop = (now) => {
      if (!isAlive) return;

      if (!paused) {
        const elapsed = (now - startTime) / 1000;
        uniforms.uTime.value = elapsed * speed;

        if (intro && uniforms.uIntro.value < 1.0) {
          uniforms.uIntro.value = Math.min(1.0, uniforms.uIntro.value + 0.03);
        }

        renderer.render({ scene: mesh });
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      isAlive = false;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [
    color,
    size,
    crackle,
    fill,
    interactive,
    hoverStrength,
    strands,
    flares,
    glow,
    sparks,
    particleShape,
    depth,
    sway,
    twinkle,
    haze,
    speed,
    intro,
    paused
  ]);

  return (
    <div
      ref={containerRef}
      className={`crystalized-ball ${className}`.trim()}
      style={style}
      role="img"
      aria-label="Crystalized Ball WebGL Animation"
    />
  );
}
