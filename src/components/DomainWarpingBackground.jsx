import React, { useEffect, useRef } from 'react';

// Vertex shader: Fullscreen quad
const VS_SOURCE = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment shader: Domain Warping GLSL with pastel coffee and rose tones
const FS_SOURCE = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_scroll;

  // 2D Simplex Noise algorithm
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractional Brownian Motion (FBM) with organic angle
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(cos(0.52), sin(0.52), -sin(0.52), cos(0.52));
    for (int i = 0; i < 4; ++i) {
      v += a * snoise(p);
      p = rot * p * 2.02 + vec2(42.0, 19.0);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    
    // Center-origin coordinates, scaled nicely to viewport
    vec2 p = (st - 0.5) * vec2(aspect, 1.0) * 2.4;

    // Organic continuous ambient movement
    float t = u_time * 0.09;

    // Dynamic scroll displacement: shifts and warps the fluid marble streams
    p.y += u_scroll * 1.6;
    p.x += sin(u_scroll * 1.5 + t * 0.3) * 0.35;

    // Interactive mouse fluid repulsion
    vec2 mouseNorm = u_mouse / u_resolution;
    mouseNorm.y = 1.0 - mouseNorm.y;
    vec2 mousePos = (mouseNorm - 0.5) * vec2(aspect, 1.0) * 2.4;
    vec2 dMouse = p - mousePos;
    float distMouse = length(dMouse);
    p += normalize(dMouse) * exp(-distMouse * 2.5) * 0.45;

    // ========================================================
    // DOMAIN WARPING (Inspired directly by the reference video)
    // ========================================================
    // Layer 1 warp: q
    vec2 q = vec2(
      fbm(p + vec2(0.0, 0.0) + t * 0.4),
      fbm(p + vec2(5.2, 1.3) + t * 0.32)
    );

    // Layer 2 warp: r
    vec2 r = vec2(
      fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 0.26 + u_scroll * 0.5),
      fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.2)
    );

    // Final warped field: f
    float f = fbm(p + 3.8 * r + t * 0.15);
    float n = clamp((f + 1.0) * 0.5, 0.0, 1.0);

    // ========================================================
    // RICH PASTEL COFFEE & ROSE PALETTE (Visually Captivating)
    // ========================================================
    // Base: Soft warm cream/ivory
    vec3 cIvory = vec3(0.97, 0.94, 0.91);

    // Pastel Coffee / Moka Latte (#C5A894 / #B89680)
    vec3 cCoffee = vec3(0.77, 0.66, 0.57);

    // Pastel Romantic Rose / Blush Pink (#EAAFB9 / #E29CA8)
    vec3 cRose = vec3(0.92, 0.70, 0.76);

    // Warm Rosewood / Terracotta Moka Accent (#A66F65)
    vec3 cRosewood = vec3(0.72, 0.50, 0.47);

    // Creamy Caramel Silk Vein (#D8BA9E)
    vec3 cSilk = vec3(0.85, 0.73, 0.62);

    // Calculate fluid mixing factors
    float w1 = smoothstep(0.05, 0.85, length(q));
    float w2 = smoothstep(0.02, 0.80, length(r));
    float w3 = smoothstep(0.15, 0.88, n);

    // Blend layers into marbled liquid silk
    vec3 color = mix(cIvory, cCoffee, w1 * 0.85);
    color = mix(color, cRose, w2 * 0.80);
    color = mix(color, cRosewood, pow(w3, 1.6) * 0.52);
    color = mix(color, cSilk, clamp(q.x * r.y, 0.0, 1.0) * 0.4);

    // Silky pearlescent specular sheen
    color += vec3(0.045, 0.040, 0.035) * pow(n, 3.2);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function DomainWarpingBackground() {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false
    });

    if (!gl) {
      console.warn('WebGL not supported, using CSS gradient fallback');
      return;
    }

    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, VS_SOURCE);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uScroll = gl.getUniformLocation(program, 'u_scroll');

    const handleResize = () => {
      if (!canvas) return;
      // Size the canvas to the current viewport dimensions
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(window.innerWidth * scale);
      const height = Math.floor(window.innerHeight * scale);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      targetMouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      targetScrollRef.current = scrollY * 0.0012;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let startTime = performance.now();
    const render = () => {
      const currentTime = (performance.now() - startTime) * 0.001;

      // Smooth liquid easing
      currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.07;
      currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.07;
      currentScrollRef.current += (targetScrollRef.current - currentScrollRef.current) * 0.09;

      gl.useProgram(program);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, currentTime);
      gl.uniform2f(uMouse, currentMouseRef.current.x * (canvas.width / window.innerWidth), currentMouseRef.current.y * (canvas.height / window.innerHeight));
      gl.uniform1f(uScroll, currentScrollRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div className="sticky top-0 h-screen w-full pointer-events-none -z-0 overflow-hidden select-none">
      {/* Fallback CSS gradient in pastel coffee and pastel rose */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5EBE6] via-[#EBD5CD] to-[#F5ECE5]" />

      {/* WebGL Canvas running Domain Warping Shader */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block opacity-95 transition-opacity duration-1000"
      />

      {/* Sheer gradient veil at the top to melt naturally into the Hero section */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-sand-100 via-sand-100/40 to-transparent pointer-events-none" />

      {/* Sheer gradient veil at the bottom to melt smoothly into the dark luxury footer */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-charcoal-800 via-charcoal-800/40 to-transparent pointer-events-none" />
    </div>
  );
}
