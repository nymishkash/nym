"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import HeroParticles from "./HeroParticles";

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <HeroParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
