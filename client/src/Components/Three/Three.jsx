import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import Experience from './Experience';

function Light({ brightness, color }) {
    return (
        <rectAreaLight
            width={5}
            height={5}
            color={color}
            intensity={brightness}
        />
    );
}

const Three = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Canvas style={{ width: '100%', height: '100%' }}>
                {/* <PerspectiveCamera makeDefault position={[100, 150, 400 ]} /> */}
                <Light brightness={20} color={'#ff0000'} />
                <Experience />
            </Canvas>
        </div>
    );
};

export default Three;
