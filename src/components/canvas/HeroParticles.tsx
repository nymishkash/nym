"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;
const CONNECTION_DISTANCE = 0.6;
const MAX_CONNECTIONS = 800;
const MOUSE_INFLUENCE_RADIUS = 2.0;
const MOUSE_REPULSION_STRENGTH = 0.8;

export default function HeroParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const scrollRef = useRef(0);
  const velocitiesRef = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT * 3));
  const originalPositionsRef = useRef<Float32Array | null>(null);
  const { size } = useThree();

  // Generate particle positions in a sphere
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);

    const indigo = new THREE.Color("#6366f1");
    const purple = new THREE.Color("#a855f7");
    const cyan = new THREE.Color("#06b6d4");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Sphere distribution with some randomness
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = (Math.random() - 0.5) * 3;

      // Color gradient based on distance from center
      const dist = Math.sqrt(pos[i3] ** 2 + pos[i3 + 1] ** 2 + pos[i3 + 2] ** 2);
      const t = dist / 4;
      const color = new THREE.Color();
      if (t < 0.5) {
        color.lerpColors(indigo, purple, t * 2);
      } else {
        color.lerpColors(purple, cyan, (t - 0.5) * 2);
      }
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;

      siz[i] = Math.random() * 3 + 1;
    }

    return { positions: pos, colors: col, sizes: siz };
  }, []);

  // Store original positions
  useEffect(() => {
    originalPositionsRef.current = new Float32Array(positions);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(e.clientY / size.height) * 2 + 1;
      mouseRef.current.isActive = true;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [positions, size]);

  // Connection lines geometry
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6);
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !originalPositionsRef.current) return;

    const time = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const colAttr = pointsRef.current.geometry.attributes.color;
    const posArray = posAttr.array as Float32Array;
    const colArray = colAttr.array as Float32Array;
    const velocities = velocitiesRef.current;
    const origPos = originalPositionsRef.current;

    const mx = mouseRef.current.x * 4;
    const my = mouseRef.current.y * 3;
    const scroll = scrollRef.current;

    // Fade and spread based on scroll
    const scrollFade = Math.max(0, 1 - scroll * 1.5);
    const spreadFactor = 1 + scroll * 2;

    const indigo = new THREE.Color("#6366f1");
    const cyan = new THREE.Color("#06b6d4");
    const tempColor = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Target position with organic drift
      const tx = origPos[i3] * spreadFactor + Math.sin(time * 0.3 + i * 0.01) * 0.15;
      const ty = origPos[i3 + 1] * spreadFactor + Math.cos(time * 0.2 + i * 0.013) * 0.15;
      const tz = origPos[i3 + 2] + Math.sin(time * 0.4 + i * 0.007) * 0.1;

      // Mouse repulsion
      const dx = posArray[i3] - mx;
      const dy = posArray[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_INFLUENCE_RADIUS && mouseRef.current.isActive) {
        const force = (1 - dist / MOUSE_INFLUENCE_RADIUS) * MOUSE_REPULSION_STRENGTH;
        const angle = Math.atan2(dy, dx);
        velocities[i3] += Math.cos(angle) * force * 0.05;
        velocities[i3 + 1] += Math.sin(angle) * force * 0.05;
      }

      // Spring back to target
      velocities[i3] += (tx - posArray[i3]) * 0.01;
      velocities[i3 + 1] += (ty - posArray[i3 + 1]) * 0.01;
      velocities[i3 + 2] += (tz - posArray[i3 + 2]) * 0.01;

      // Damping
      velocities[i3] *= 0.92;
      velocities[i3 + 1] *= 0.92;
      velocities[i3 + 2] *= 0.92;

      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Velocity-based color shift
      const speed = Math.sqrt(
        velocities[i3] ** 2 + velocities[i3 + 1] ** 2 + velocities[i3 + 2] ** 2
      );
      const speedT = Math.min(speed * 10, 1);
      tempColor.lerpColors(indigo, cyan, speedT);
      colArray[i3] = tempColor.r;
      colArray[i3 + 1] = tempColor.g;
      colArray[i3 + 2] = tempColor.b;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // Update connections
    if (linesRef.current) {
      const linePos = lineGeometry.attributes.position.array as Float32Array;
      const lineCol = lineGeometry.attributes.color.array as Float32Array;
      let lineCount = 0;

      // Only check a subset for performance
      const step = Math.max(1, Math.floor(PARTICLE_COUNT / 300));
      for (let i = 0; i < PARTICLE_COUNT && lineCount < MAX_CONNECTIONS; i += step) {
        const i3 = i * 3;
        for (let j = i + step; j < PARTICLE_COUNT && lineCount < MAX_CONNECTIONS; j += step) {
          const j3 = j * 3;
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_DISTANCE) {
            const lc = lineCount * 6;
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.5;
            linePos[lc] = posArray[i3];
            linePos[lc + 1] = posArray[i3 + 1];
            linePos[lc + 2] = posArray[i3 + 2];
            linePos[lc + 3] = posArray[j3];
            linePos[lc + 4] = posArray[j3 + 1];
            linePos[lc + 5] = posArray[j3 + 2];

            lineCol[lc] = 0.39 * alpha;
            lineCol[lc + 1] = 0.4 * alpha;
            lineCol[lc + 2] = 0.95 * alpha;
            lineCol[lc + 3] = 0.39 * alpha;
            lineCol[lc + 4] = 0.4 * alpha;
            lineCol[lc + 5] = 0.95 * alpha;

            lineCount++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
    }

    // Rotate the whole system slowly
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.05;
      linesRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
    }

    // Global opacity based on scroll
    if (pointsRef.current.material) {
      (pointsRef.current.material as THREE.PointsMaterial).opacity = scrollFade;
    }
    if (linesRef.current?.material) {
      (linesRef.current.material as THREE.LineBasicMaterial).opacity = scrollFade * 0.6;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_COUNT}
            array={colors}
            itemSize={3}
            args={[colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            count={PARTICLE_COUNT}
            array={sizes}
            itemSize={1}
            args={[sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={1}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
