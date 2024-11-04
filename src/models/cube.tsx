import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import type { Group } from "three";

useGLTF.preload("robocraft_cube.glb");

export const RobocraftCubeModel = (props: JSX.IntrinsicElements["group"]) => {
  const group = useRef<Group>(null!);
  const { scene } = useGLTF("robocraft_cube.glb");

  useEffect(() => {
    // Apply a glowing effect to the black cube
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x212224,                  // Set base color to black
          // emissive: new THREE.Color(0x38fffc), // Cyan glow color
          emissiveIntensity: 1.5,           // Adjust glow intensity
          metalness: 0.2,
          roughness: 0.1,
        });
      }
    });
  }, [scene]);

  useFrame((state) => {
    // Calculate the up-and-down motion using a sine wave
    if (group.current) {
      const time = state.clock.getElapsedTime();
      group.current.position.y = 2 + Math.sin(time) * 1; // Moves up and down between 1.5 and 2.5
    }
  });

  return (
    <>
      <group ref={group} {...props} scale={[3, 3, 3]} position={[0, 2, 2]}>
        <primitive object={scene} />
      </group>

      {/* Bloom effect to enhance the glow effect */}
      <EffectComposer>
        <Bloom
          intensity={1.2}                 // Bloom intensity to enhance glow
          luminanceThreshold={0.2}        // Threshold for bloom effect
          luminanceSmoothing={0.8}        // Smoothing for soft glow edges
          height={400}
        />
      </EffectComposer>
    </>
  );
};
