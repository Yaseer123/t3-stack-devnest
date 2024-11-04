import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import type { Group } from "three";

useGLTF.preload("abstract_sphere.glb");

export const AbstractSphereModel = (props: JSX.IntrinsicElements["group"]) => {
  const group = useRef<Group>(null!);
  const { animations, scene } = useGLTF("abstract_sphere.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    console.log("Available animation names:", animations.map(anim => anim.name));

    // Play "Take 001" animation if available
    const mainAction = actions?.["Take 001"];
    if (mainAction) {
      mainAction.play();
      mainAction.paused = false;
    }

    // Traverse the scene to apply materials selectively
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child as THREE.Mesh;

        // Apply cyan glow to the innermost mesh (assuming it’s named "CenterMesh" or a specific part)
        if (mesh.name === "S3__0") {  // Replace with the correct name of the inner mesh
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x000000,                 // Base color
            emissive: new THREE.Color(0x38fffc), // Bright cyan color for center glow
            emissiveIntensity: 1.5,          // Strong emissive for bright glow
            metalness: 0.3,
            roughness: 0.1,
          });
        } else {
          // Apply a different material to outer parts
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x505050,                 // Darker gray for outer metallic look
            metalness: 0.6,                  // High metalness for reflectivity
            roughness: 0.5,                  // Roughness for texture
          });
        }
      }
    });

    return () => {
      if (mainAction) mainAction.stop();
    };
  }, [actions, animations, scene]);

  useFrame((state, delta) => {
    const mainAction = actions?.["Take 001"];
    const slowFactor = 0.1;
    if (mainAction?.isRunning()) {
      mainAction.time += delta * slowFactor;
      if (mainAction.time > mainAction.getClip().duration) {
        mainAction.time = 0;
      }
    }

    if (group.current) {
      group.current.rotation.y += delta * 0.02; // Slow rotation for a dynamic effect
    }
  });

  return (
    <>
      <group ref={group} {...props} scale={[3, 3, 3]} position={[0, 2, 2]}>
        <primitive object={scene} />
      </group>

      {/* Bloom effect to enhance the glow effect on the center */}
      <EffectComposer>
        <Bloom
          intensity={0.5}                // Adjust bloom intensity to highlight the glow
          luminanceThreshold={0.3}       // Threshold to avoid bloom on non-emissive parts
          luminanceSmoothing={0.9}       // Smooth bloom edges for a softer effect
          height={300}                   // Bloom texture size
        />
      </EffectComposer>
    </>
  );
};
