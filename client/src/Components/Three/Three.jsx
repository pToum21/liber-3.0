import React from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';


function Light({ brightness, color, position }) {
    return (
        <rectAreaLight
            width={100}
            height={100}
            color={color}
            intensity={brightness}
            position={position}
        />
    );
}

const Three = () => {
    return (
        <>
            
            <div style={{
                position: 'absolute',
                marginTop: '5%',
                left: '5%',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '10px',
                maxWidth: '300px',
                zIndex: '1',
            }}>
                <h1 style={{ color: 'black', fontFamily: 'Press Start 2P', fontSize: '24px', marginBottom: '10px' }}>Library Instructions</h1>
                <p style={{ color: 'black', fontFamily: 'Press Start 2P', fontSize: '16px', lineHeight: '1.5' }}>
                    Press <span style={{ color: '#ff0000' }}>Left Click</span> anywhere to sit at the desk and read.
                </p>
                <p style={{ color: 'black', fontFamily: 'Press Start 2P', fontSize: '16px', lineHeight: '1.5' }}>
                    Press <span style={{ color: '#00ff00' }}>Right Click</span> to grab and pan around the room.
                </p>
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Canvas style={{ width: '100%', height: '100%', zIndex: '0' }}>
                
                    <Light brightness={40} color={'yellow'} position={[100, 200, 300]} />
                    <Experience />
                </Canvas>
            </div>
        </>
    );
};

export default Three;
