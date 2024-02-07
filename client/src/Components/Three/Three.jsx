import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import Experience from './Experience';
import BookFlipper from '../BookFlipper/BookFlipper';

function Light({ brightness, color, position }) {
    return (
        <rectAreaLight width={100} height={100} color={color} intensity={brightness} position={position} />
    );
}

const Skybox = () => {
    const gltf = useLoader(GLTFLoader, '/3dModels/skybox.glb'); // Replace with the actual path to your GLB file

    // Adjust the position of the skybox
    gltf.scene.position.set(-150, 200, 200); // Replace with your desired coordinates

    return <primitive object={gltf.scene} />;
};

const Three = () => {
    return (
        <div style={{ backgroundColor: '#161520', position: 'relative', height: '100vh' }}>
            <div
                style={{
                    position: 'absolute',
                    top: '5%',
                    left: '5%',
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '10px',
                    maxWidth: '300px',
                    zIndex: '1',
                }}
            >
                <h1 style={{ color: 'black', fontFamily: 'Press Start 2P', fontSize: '24px', marginBottom: '10px' }}>
                    Library Instructions
                </h1>
                <p style={{ color: 'black', fontFamily: 'Press Start 2P', fontSize: '16px', lineHeight: '1.5' }}>
                    Press <span style={{ color: '#ff0000' }}>Left Click</span> anywhere to sit at the desk and read.
                </p>
                <p style={{ color: 'black', fontFamily: 'Press Start 2P', fontSize: '16px', lineHeight: '1.5' }}>
                    Press <span style={{ color: '#00ff00' }}>Right Click</span> to grab and pan around the room.
                </p>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '2',
                }}
            >
                <BookFlipper style={{ width: '200px', height: '300px' }} />
            </div>
            <Canvas style={{ width: '100%', height: '100%', zIndex: '0' }}>
                <Skybox />
                <Light brightness={40} color={'yellow'} position={[100, 200, 300]} />
                <Experience />
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default Three;
