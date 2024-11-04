import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import type { Group } from "three";

useGLTF.preload("abstract_shape.glb");

export const AbstractShapeModel = (props: JSX.IntrinsicElements["group"]) => {
  const group = useRef<Group>(null!);
  const { animations, scene } = useGLTF("abstract_shape.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    console.log(
      "Available animation names:",
      animations.map((anim) => anim.name),
    );

    const mainAction = actions?.["Take 001"];
    if (mainAction) {
      mainAction.play();
      mainAction.paused = false;
    }

    // Traverse the scene and set material colors
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child as THREE.Mesh;

        // Apply custom cyan color to the inner "glow" part
        if (mesh.name === "Glow_m_Glow_0") { // Assuming Glow mesh has this name
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#00e5ff"), // Approximated cyan color from image
            emissive: new THREE.Color("#000000"), // Emissive color to enhance brightness
            emissiveIntensity: 1.0, // Reduced emissive intensity for a softer glow
            metalness: 0.2,
            roughness: 0.3,
          });
        } else if (mesh.name === "Frame_m_Frame_0") {
          // Keep the outer frame as it is
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x111111, // Dark gray/black for outer frame
            metalness: 0.6,
            roughness: 0.7, // Higher roughness for a matte look
          });
        }
      }
    });

    return () => {
      if (mainAction) mainAction.stop();
    };
  }, [actions, animations, scene]);

  useFrame((state, delta) => {
    const mainAction = actions?.["Static pose"];
    const slowFactor = 0.1;
    if (mainAction?.isRunning()) {
      mainAction.time += delta * slowFactor;
      if (mainAction.time > mainAction.getClip().duration) {
        mainAction.time = 0;
      }
    }

    if (group.current) {
      // Apply rotation and subtle bobbing effect
      group.current.rotation.y += delta * 0.02;
      group.current.position.y = 2 + Math.sin(state.clock.getElapsedTime()) * 0.1; // Very subtle bobbing
    }
  });

  return (
    <>
      <group ref={group} {...props} scale={[3, 3, 3]} position={[0, 2, 2]}>
        <primitive object={scene} />
      </group>

      {/* Add Bloom effect to create the glow */}
      <EffectComposer>
        <Bloom
          intensity={0.3} // Lower bloom intensity for a more subtle glow
          luminanceThreshold={0.4} // Keep threshold to affect only bright parts
          luminanceSmoothing={0.85} // Slightly less smoothing for a focused glow
          height={300} // Resolution of the bloom effect
        />
      </EffectComposer>
    </>
  );
};
