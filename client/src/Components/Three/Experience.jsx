import { OrbitControls } from '@react-three/drei'
import BookShelf from './Bookshelf'



const Experience = () => {
    return (
        <>

            <OrbitControls />
            <ambientLight />
            <BookShelf />


        </>

    )
}

export default Experience