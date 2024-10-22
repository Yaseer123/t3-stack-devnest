"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import type { Group } from "three"; // Import type only for Group

// Load and render the GLTF model
function Model() {
  const gltf = useGLTF('/model/meett.glb');
  const modelRef = useRef<Group | null>(null); // Explicitly type the ref

  // Animate rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Adjust rotation speed
    }
  });

  return (
    <primitive 
      object={gltf.scene} 
      scale={1} 
      ref={modelRef} 
    />
  );
}

export default function SplineModel() {
  return (
    <div className="h-screen w-full">
      <Canvas>
        {/* Ambient light for general illumination */}
        <ambientLight intensity={1} color={"#ffffff"} />

        {/* Directional light to cast shadows and give depth */}
        <directionalLight position={[10, 10, 5]} intensity={2} />

        {/* Emissive Point Light for Glow */}
        <pointLight intensity={2.5} color={"#00aaff"} position={[0, 2, 2]} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        {/* Controls to rotate, pan, and zoom the model */}
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
