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
// import mui
import { Grid } from '@mui/material';
// hooks from apollo
import { useQuery } from '@apollo/client';
// import any queries and mutations
import { QUERY_ALL_BOOKS } from '../utils/queries';


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

    // using our query to get data from db
    const { loading, data } = useQuery(QUERY_ALL_BOOKS);

    // data under the method of getBooks is an array of 589(currently) elements, and all 589 are grouped into sub arrays; each subarray holds 100 books.

    // this log works, shows all the books
    console.log(data);

    // TODO: put this logic into books div, probs via props, otherwise whole page will say loading; only commented out for now so loading thing doesnt take up the page while others code.
    // if (loading) {
    //     return <p>Loading...</p>;
    // };

    // if (!data || !data.getBooks) {
    //     // Data or getBooks is undefined, we handle accordingly (e.g., show an error message)
    //     return <p>Error loading data</p>;
    // };

    // this is returning undefined
    // console.log(data.getBooks[0][0]);



    return (
        <>
            {/* Slick carousel */}
            <div>
                <Slider {...settings}>
                    <div className="carousel-slide">
                        <div className="overlay">
                            <img src={image2} alt="" />
                            <div className="text-overlay">
                                <h2 className="text-title">LOTS OF EBOOKS. 100 % FREE</h2>
                                <p>Welcome to your friendly neighborhood library. We have more than 50,000 free ebooks waiting to be discovered.</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-slide">
                        <div className="overlay">
                            <img src={image1} alt="" />
                            <div className="text-overlay">
                                <h2 className="text-title">FREE AND DISCOUNTED BESTSELLERS</h2>
                                <p>Join our fellow readers! Find free and discounted bestsellers and add them directly to your Library for ease of reading. </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-slide">
                        <div className="overlay">
                            <img src={image3} alt="" />
                            <div className="text-overlay">
                                <h2 className="text-title">MyLibrary</h2>
                                <p>Add books directly to the MyLibrary section.  Once a book is added you can come back and read it whenever you like.  To gain access to the feature Sign Up or Log In Now! </p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

            {/* all books div*/}
            <Grid container>
                <div>

                </div>
            </Grid>


        </>
    );
}

export default Home;
