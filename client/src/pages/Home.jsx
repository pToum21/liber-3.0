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
//hooks from react
import { useState, useEffect } from 'react';
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
    const [books, setBooks] = useState(null);

    // data under the method of getBooks is an array of 589(currently) elements.

    // // IF YOU WANT TO SEE BOOK DATA LOGGED, UNCOMMENT BELOW
    // if (loading) {
    //     console.log('Loading...');
    // } else {
    //     // Once data is available, accesses and logs single book and corresponding properties on the book object
    //     console.log(data);
    //     //change number in index for a different single book
    //     const oneBook = data.getBooks[588];
    //     console.log('One Book:', oneBook.image);
    // }

    // We use this effect to conditionally render content in books div.
    useEffect(() => {
        // if data is not loading, and data exists, if our books data exists, if there is more than 0 elements in this data, we change state/value of oneBook (using setBooks()) from null to a book's data!
        if (!loading && data && data.getBooks && data.getBooks.length > 0) {
            setBooks(data.getBooks);
        }
    }, [loading, data]);


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
                                {/* whiteSpace property prevent text of Liber from wrapping on small screens */}
                                <p>Welcome to <span style={{ fontFamily: 'Coventry Garden', whiteSpace: 'nowrap' }}>{'{'} L i b e r {'}'}</span>. Our extended collection of free, classic novels and reads are digitized and waiting to be discovered.</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-slide">
                        <div className="overlay">
                            <img src={image1} alt="" />
                            <div className="text-overlay">
                                <h2 className="text-title">FREE BESTSELLERS</h2>
                                <p>Join our fellow readers! Find free and discounted bestsellers and add them directly to your Library for ease of reading. Rate and discuss your favorite books! </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-slide">
                        <div className="overlay">
                            <img src={image3} alt="" />
                            <div className="text-overlay">
                                <h2 className="text-title">MyLibrary</h2>
                                <p>Add books directly to the MyLibrary section.  Once a book is added, you can come back and read it whenever you like.  To gain access to the feature, sign up or log in Now! </p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

            {/* all books div*/}
            <Grid container>
                {/* in this container, if books is null, it renders loading message, otherwise, we can render data in a new div! */}
                {!books ?
                    (
                        <p>Loading...</p>
                    ) :
                    (
                        books.map((book) => (
                            <div key={book._id}>
                                <p> The title of this book is {book.title}</p>
                            </div>
                        ))
                    )

                }
            </Grid>


        </>
    );
}

export default Home;
