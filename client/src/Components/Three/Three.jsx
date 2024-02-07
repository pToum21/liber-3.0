import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import Experience from './Experience';
import BookFlipper from '../BookFlipper/BookFlipper';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './three.css'; 

function Light({ brightness, color, position }) {
    return (
        <rectAreaLight width={100} height={100} color={color} intensity={brightness} position={position} />
    );
}

const Skybox = () => {
    const gltf = useLoader(GLTFLoader, '/3dModels/skybox.glb');
    gltf.scene.position.set(-150, 200, 200);

    return <primitive object={gltf.scene} />;
};

const Three = () => {
    const [isCanvasClicked, setIsCanvasClicked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New state for loading animation
    const audioRef = useRef(new Audio('/public/forestsounds.mp3'));

    useEffect(() => {
        
        const fakeLoadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 300); 

        
        return () => clearTimeout(fakeLoadingTimeout);
    }, []);

    const handleCanvasClick = () => {
        setIsCanvasClicked(true);
    };

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={`fade-in ${isLoading ? 'loading' : 'loaded'}`} style={{ backgroundColor: 'transparent', position: 'relative', height: '100vh' }}>
            {isLoading && (
                <div className="loading-overlay">
                    <p>Loading...</p>
                </div>
            )}
            <div style={{
                position: 'absolute',
                top: '5%',
                left: '5%',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '10px',
                maxWidth: '300px',
                zIndex: '1',
            }}>
                <h1 style={{ color: 'black', fontFamily: 'Press Start 2P', fontSize: '24px', marginBottom: '10px' }}>
                    Library Instructions
                </h1>
                <p style={{
                    color: 'black',
                    fontFamily: 'Press Start 2P',
                    fontSize: '16px',
                    lineHeight: '1.5'
                }}>
                    Press <span style={{ color: '#ff0000' }}>Left Click</span> anywhere to sit at the desk and read your selected Book.
                </p>
                <p style={{
                    color: 'black',
                    fontFamily: 'Press Start 2P',
                    fontSize: '16px',
                    lineHeight: '1.5'
                }}>
                    Press <span style={{ color: '#004c00' }}>Right Click</span> to grab and pan around the room.
                </p>
                <IconButton onClick={toggleAudio} style={{ fontSize: '16px' }}>
                    <p style={{ color: '#8abbb1' }}>Hear the Sounds of The Forest</p> {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
            </div>
            {isCanvasClicked && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: '2',
                    }}
                >
                    <BookFlipper />
                </div>
            )}
            <Canvas
                style={{ width: '100%', height: '100%', zIndex: '0' }}
                onClick={handleCanvasClick}
            >
                <Skybox />
                <Light brightness={40} color={'yellow'} position={[100, 200, 300]} />
                <Experience />
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default Three;
