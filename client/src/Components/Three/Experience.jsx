import { OrbitControls } from '@react-three/drei'
import BookShelf from './Bookshelf'
import GrassPlain from './Grassplain'



const Experience = () => {
    return (
        <>

            <OrbitControls />
            <ambientLight />
            <BookShelf />
            <GrassPlain />

        </>

    )
}

export default Experience