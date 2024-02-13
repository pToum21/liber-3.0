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
import CircularProgress from '@mui/material/CircularProgress';

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
    const audioRef = useRef(new Audio('/3dModels/foresetSounds.mp3'));

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);

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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress color="success" />
                </div>
            )}

            {isCanvasClicked && (
                <div
                    style={{
                        position: 'absolute',
                        top: '60%',
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
                <p style={{
                    color: 'black',
                    fontFamily: 'Press Start 2P',
                    fontSize: '1rem',
                    lineHeight: '1.5'
                }}>
                    <strong>CLICK HOME</strong>
                    <Link to={`/`}>
                        <IconButton style={{ fontSize: '16px' }}>
                            <HomeIcon style={{ color: 'black' }} />
                        </IconButton>
                    </Link>
                </p>

                <p style={{
                    color: 'black',
                    fontFamily: 'Press Start 2P',
                    fontSize: '1rem',
                    lineHeight: '1.5'
                }}>
                    <strong>LEFT CLICK</strong>: read book
                </p>
                <p style={{
                    color: 'black',
                    fontFamily: 'Press Start 2P',
                    fontSize: '1rem',
                    lineHeight: '1.5'
                }}>
                    <strong>RIGHT CLICK HOLD</strong>: look around
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
