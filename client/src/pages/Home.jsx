// Home.js
import React from 'react';
import Slider from 'react-slick';
// must npm i for react slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// images for slick carousel
import image1 from '../assets/firstcarousel.jpg';
import image2 from '../assets/secondcarousel.jpg';
import image3 from '../assets/thirdcarousel.jpg'
import '../styles/home.css';
// mui components
import Grid from "@mui/material/Grid";

function Home() {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
    };

    return (
        <>
            <div>
                <Slider {...settings}>
                    <div className="carousel-slide">
                        <div className="overlay">
                            <img src={image2} alt="" />
                            <div className="text-overlay">
                                <h2>LOTS OF EBOOKS. 100 % FREE</h2>
                                <p>Welcome to your friendly neighborhood library. We have more than 50,000 free ebooks waiting to be discovered.</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-slide">
                        <div className="overlay">
                            <img src={image1} alt="" />
                            <div className="text-overlay">
                                <h2>FREE AND DISCOUNTED BESTSELLERS</h2>
                                <p>Join our fellow readers! Find free and discounted bestsellers and add them directly to your Library for ease of reading. </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-slide">
                        <div className="overlay">
                            <img src={image3} alt="" />
                            <div className="text-overlay">
                                <h2>MyLibrary</h2>
                                <p>Add books directly to the MyLibrary section.  Once a book is added you can come back and read it whenever you like.  To gain access to the feature Sign Up or Log In Now! </p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </>
    );
}

export default Home;
