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
    // Apply a subtle glowing effect to the cube
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          // color: 0x212224,                  // Base color (dark gray/black)
          // emissive: new THREE.Color(0x38fffc), // Subtle cyan glow
          emissiveIntensity: 0.3,           // Low intensity for a subtle glow
          metalness: 0.2,
          roughness: 0.1,
        });
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();

      // Up-and-down motion using a sine wave
      group.current.position.y = 2 + Math.sin(time) * 0.5; // Moves up and down between 1.5 and 2.5

      // Slow rotation
      group.current.rotation.y += delta * 0.5; // Adjust rotation speed as desired
      group.current.rotation.x += delta * 0.2; // Slight rotation along x-axis
    }
  });

  return (
    <>
      <group ref={group} {...props} scale={[3, 3, 3]} position={[0, 2, 2]}>
        <primitive object={scene} />
      </group>

      {/* Bloom effect to enhance the subtle glow effect */}
      <EffectComposer>
        <Bloom
          intensity={0.3}                 // Lower bloom intensity for a subtle glow
          luminanceThreshold={0.3}        // Threshold for bloom effect
          luminanceSmoothing={0.9}        // Smoothing for soft glow edges
          height={300}
        />
      </EffectComposer>
    </>
  );
};
