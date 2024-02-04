// Home.js

import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import image1 from '../assets/firstcarousel.jpg';
import '../styles/home.css'; // Import your CSS file for styling

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            <Slider {...settings}>
                <div className="carousel-slide">
                    <div className="overlay">
                        <img src={image1} alt="" />
                        <div className="text-overlay">
                            <p>Libre</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Slide 2</p>
                </div>
                <div>
                    <p>Slide 3</p>
                </div>
            </Slider>
        </div>
    );
}

export default Home;
