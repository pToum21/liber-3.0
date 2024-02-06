import { Canvas } from '@react-three/fiber';
import Experience from './Experience';


function Light({ brightness, color }) {
    <rectAreaLight
        width={5}
        height={5}
        color={color}
        intensity={brightness}
    />
}
const Three = () => {
    return (
        <Canvas>
            <Light brightness={20} color={'#ff0000'} />
            <Experience />
        </Canvas>
    )

}

export default Three
