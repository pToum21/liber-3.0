import { OrbitControls } from '@react-three/drei'
import BookShelf from './Bookshelf'
import GrassPlain from './Grassplain'


const Experience = () => {
    return (
        // this renders the entire 3d scene which is then used inside of Three
        <>
            <OrbitControls />
            <ambientLight />
            <BookShelf />
            <GrassPlain />
        </>
    )
}

export default Experience;