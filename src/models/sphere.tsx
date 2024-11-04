import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import type { Group, MeshStandardMaterial, PointLight } from "three";
import { Color } from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

// Preload the GLTF model
useGLTF.preload("sphere_and_rotated_rings.glb");

export const Model = () => {
    const group = useRef<Group>(null!); // Non-null assertion avoids casting
    const pointLightRef = useRef<PointLight>(null!); // Non-null assertion avoids casting
    const { materials, animations, scene } = useGLTF("sphere_and_rotated_rings.glb");
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        const mainAction = actions?.CINEMA_4D_Main;

        if (mainAction) {
            mainAction.play();
            mainAction.paused = false;
        }

        // Change the sphere color to cyan with an emissive glow
        const sphereMaterial = materials["Mat.1"] as MeshStandardMaterial | undefined;
        if (sphereMaterial) {
            sphereMaterial.emissive = new Color(0x38fffc);
            sphereMaterial.emissiveIntensity = 10;
        }

        // Change the tube (ring) color to black
        const tubeMaterial = materials.material as MeshStandardMaterial | undefined;
        if (tubeMaterial) {
            tubeMaterial.color = new Color(0x000000); // Set color to black
        }

        return () => {
            if (mainAction) {
                mainAction.stop();
            }
        };
    }, [actions, materials]);

    useFrame((state, delta) => {
        const mainAction = actions?.CINEMA_4D_Main;
        const slowFactor = 0.1;
        if (mainAction?.isRunning()) {
            mainAction.time += delta * slowFactor;
            if (mainAction.time > mainAction.getClip().duration) {
                mainAction.time = 0;
            }
        }

        if (group.current) {
            group.current.rotation.y += delta * 0.02;

            if (pointLightRef.current) {
                pointLightRef.current.position.copy(group.current.position);
            }
        }
    });

    return (
        <>
            <group ref={group}>
                <pointLight
                    ref={pointLightRef}
                    intensity={100}
                    distance={10}
                    decay={2}
                    castShadow
                    color={0xffffff} // Simplified color definition
                />

                <mesh>
                    <sphereGeometry args={[0.2, 20, 20]} />
                    <meshBasicMaterial color={0x38fffc} /> {/* Simplified color */}
                </mesh>

                <primitive object={scene} />
            </group>

            <EffectComposer>
                <Bloom
                    intensity={0.1}
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.8}
                    height={400}
                />
            </EffectComposer>
        </>
    );
};
