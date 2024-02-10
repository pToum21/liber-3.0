import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import Experience from './Experience';
import BookFlipper from '../BookFlipper/BookFlipper';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HomeIcon from '@mui/icons-material/Home';
import PauseIcon from '@mui/icons-material/Pause';
import './three.css';
import { Link } from 'react-router-dom';

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
    const [isLoading, setIsLoading] = useState(true);
    const [fadeIn, setFadeIn] = useState(false); // State for fade-in effect
    const audioRef = useRef(new Audio('/3dModels/forestsounds.mp3'));

    useEffect(() => {
        const fakeLoadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(fakeLoadingTimeout);
    }, []);

    const handleCanvasClick = () => {
        setIsCanvasClicked(true);
        setFadeIn(true); // Trigger fade-in effect
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
        <div className={`${isLoading ? 'loading' : 'loaded'}`} style={{ backgroundColor: 'transparent', position: 'relative', height: '100vh' }}>
            {isLoading && (
                <div className="loading-overlay">
                    <p>Loading...</p>
                </div>
            )}

            {isCanvasClicked && (
                <div
                    style={{
                        position: 'absolute',
                        top: '55%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: '2',
                        opacity: fadeIn ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                    }}
                >
                    <BookFlipper />
                </div>
            )}


            <div className="controls-for-3d" style={{
                position: 'absolute',
                top: '5%',
                left: '5%',
                padding: '13px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '10px',
                maxWidth: '70rem',
                maxHeight: '9rem',
                zIndex: '1',
            }}>
                <h1 style={{ color: 'black', fontFamily: 'Press Start 2P', fontSize: '24px', marginBottom: '10px' }}>
                    Library Instructions
                    <Link to={`/`}>
                        <IconButton style={{ fontSize: '16px' }}>
                            <HomeIcon style={{ color: 'black' }} />
                        </IconButton>
                    </Link>

                </h1>

                <p style={{
                    color: 'black',
                    fontFamily: 'Press Start 2P',
                    fontSize: '1rem',
                    lineHeight: '1.5'
                }}>
                    Press <span style={{ color: '#ff0000' }}>Left Click</span> anywhere to sit at the desk and read your selected Book.
                </p>
                <p style={{
                    color: 'black',
                    fontFamily: 'Press Start 2P',
                    fontSize: '1rem',
                    lineHeight: '1.5'
                }}>
                    Press <span style={{ color: '#004c00' }}>Right Click</span> to grab and pan around the room.
                </p>



            </div>
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '10%',
                padding: '13px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '10px',
                maxWidth: '70rem',
                maxHeight: '9rem',
                zIndex: '1',
            }}>
                <IconButton className='sound-button' onClick={toggleAudio} style={{ fontSize: '16px' }}>
                    <p style={{ color: 'black' }}>Hear the Sounds of The Forest</p> {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>

            </div>



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
