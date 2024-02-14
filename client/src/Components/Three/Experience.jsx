import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import BookShelf from './Bookshelf';
// import GrassPlain from './Grassplain';
import Letters from './LiberLetters';

const Experience = () => {
    const { size } = useThree();
    const [showLetters, setShowLetters] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setShowLetters(size.width > 768); 
        };

        handleResize(); 

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [size.width]);

    return (
        <>
            <OrbitControls />
            <ambientLight />
            {showLetters && <Letters />}
            <BookShelf />
            {/* <GrassPlain /> */}
        </>
    );
};

export default Experience;