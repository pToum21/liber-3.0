// this is likely where we will put div with scrolling books displaying

// maybe even include bookshelf here, but when books are a dull/grey color, so then when user is signed in, they light up or become more vibrant and this will be their library?
import React from 'react';
import { Carousel, CarouselItem, Paper, Typography } from '@mui/material';


const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
];

function Home() {
    return (
        <Carousel>
            {images.map((image, index) => (
                <CarouselItem key={index}>
                    <Paper>
                        <img src={image} alt={`slide-${index}`} style={{ width: '100%' }} />
                    </Paper>
                </CarouselItem>
            ))}
        </Carousel>
    );
}

export default Home;