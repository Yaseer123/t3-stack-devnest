import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

useGLTF.preload("art_sphere.glb");

export const movingSphere = (props: JSX.IntrinsicElements["group"]) => {
  // Explicit casting to resolve ref error
  const group = useRef<Group>(null!); // Non-null assertion
  const { animations, scene } = useGLTF("meeet-1.glb")
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const mainAction = actions?.Action;
    if (mainAction) {
      mainAction.play();
      mainAction.paused = false;
    }

    // Traverse the scene and apply material to meshes
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: 0xaaaaaa,
          metalness: 1,
          roughness: 0.2,
        });
      }
    });

    return () => {
      if (mainAction) mainAction.stop();
    };
  }, [actions, scene]);

  useFrame((state, delta) => {
    const mainAction = actions?.Action;
    const slowFactor = 0.1;
    if (mainAction?.isRunning()) {
      mainAction.time += delta * slowFactor;
      if (mainAction.time > mainAction.getClip().duration) {
        mainAction.time = 0;
      }
    }

    if (group.current) {
      group.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={group} {...props} scale={[3, 3, 3]} position={[0, 2, 2]}>
      <primitive object={scene} />
    </group>
  );
};
