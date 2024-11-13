"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { ArtSphereModel } from "~/models/art-sphere";
import { Model } from "~/models/sphere";
import { AbstractSphereModel } from "~/models/abstract-sphere";
import { AbstractShapeModel } from "~/models/abstract-shape";
import { RobocraftCubeModel } from "~/models/cube";
import { DiamondModel } from "~/models/diamond";

const ThreeDModel = () => {
    return (
        <div className="h-[100vh] w-[100vw]">
            <RotateSphere />
        </div>
    );
};

export default ThreeDModel;

export const ArtSphere = () => {
    return (
        <Canvas
            gl={{ antialias: true }}
            dpr={[1, 1.5]}
            className="relative h-svh"
            camera={{ position: [0, -3, -3], fov: 50 }} // Set initial camera position
        >
            <directionalLight position={[-6, -6, -6]} intensity={4} />
            <Environment preset="studio" />
            <Suspense>
                <ArtSphereModel />
            </Suspense>
        </Canvas>
    );
};

export const RotateSphere = () => {
    return (
        <div className="bg-black h-[100vh] w-[100vw]">
            <Canvas
                gl={{ antialias: true }}
                dpr={[1, 1.5]}
                className="h-full w-full"
                camera={{ position: [0, 600, 600], fov: 50 }}
            >
                <directionalLight position={[-6, -6, -6]} intensity={4} />
                <Environment preset="studio" />
                <Suspense>
                    <Model /> {/* Render Model inside the Canvas */}
                </Suspense>
            </Canvas>
        </div>
    );
};
export const RotateSphere1 = () => {
    return (
        <div className="bg-neutral-850 h-[200px] w-[200px]">
            <Canvas
                gl={{ antialias: true }}
                dpr={[1, 1.5]}
                className="h-full w-full"
                camera={{ position: [0, 600, 600], fov: 40 }}
            >
                <directionalLight position={[-6, -6, -6]} intensity={4} />
                <Environment preset="studio" />
                <Suspense>
                    <Model /> {/* Render Model inside the Canvas */}
                </Suspense>
            </Canvas>
        </div>
    );
};

export const AbstractSphere = () => {
  return (
    <div className="bg-transparent h-[200px] w-[200px]"> {/* Adjusted size */}
      <Canvas
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        className="h-full w-full"
        camera={{ position: [200, 100, 60], fov: 25 }} 
      >
        <directionalLight position={[2, 2, 2]} intensity={1.5} /> {/* Adjusted light position */}
        <Environment preset="studio" />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
        <Suspense fallback={null}>
          <AbstractSphereModel /> {/* Render Model inside the Canvas */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export const AbstractShape = () => {
    return (
        <div className="bg-neutral-850 h-[250px] w-[250px]"> {/* Reduced dimensions */}
            <Canvas
                gl={{ antialias: true }}
                dpr={[1, 1.5]}
                className="h-full w-full"
                camera={{ position: [0, 17, 15], fov: 1.5 }} 
            >
                <directionalLight position={[-6, -6, -6]} intensity={4} />
                <Environment preset="studio" />
                <OrbitControls enableZoom={false} />
                <Suspense fallback={null}>
                    <AbstractShapeModel />
                </Suspense>
            </Canvas>
        </div>
    );
};
export const Diamond = () => {
    return (
        <div className="bg-black h-[100vh] w-[100vw]">
            <Canvas
                gl={{ antialias: true }}
                dpr={[1, 1.5]}
                className="h-full w-full"
                camera={{ position: [0, 50, 50], fov: 50 }}
            >
                <directionalLight position={[-6, -6, -6]} intensity={4} />
                <Environment preset="studio" />
                <OrbitControls/>
                <Suspense>
                    <DiamondModel /> {/* Render Model inside the Canvas */}
                </Suspense>
            </Canvas>
        </div>
    );
};
export const RobocraftCube = () => {
    return (
        <div className="bg-natural-850  h-[200px] w-[200px]">
            <Canvas
                gl={{ antialias: true }}
                dpr={[1, 1.5]}
                className="h-full w-full"
                camera={{ position: [0, 55, 55], fov: 8 }}
            >
                <directionalLight position={[-6, -6, -6]} intensity={4} />
                <Environment preset="studio" />
                <OrbitControls/>
                <Suspense>
                    <RobocraftCubeModel /> {/* Render Model inside the Canvas */}
                </Suspense>
            </Canvas>
        </div>
    );
};

