import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_ONE_BOOK } from '../../utils/queries'; 

import './BookFlipper.css';

const BookFlipper = () => {
    const { bookId } = useParams(); // Get the bookId from the URL
    const { loading, error, data } = useQuery(QUERY_ONE_BOOK, {
        variables: { id: bookId }, // Pass the bookId as a variable to the query
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { title, authors, text } = data.getSingleBook;

    return (
        <main className="unique-main-class">
            <div className="book unique-book-class">
                <div className="book-cover unique-book-cover-class">
                    <div className="unique-cover-div-class">
                        {/* title */}
                        <h1 className="unique-h1-class">{title}</h1>
                        <div className="separator unique-separator-class"></div>
                        {/* authors */}
                        <h2 className="unique-h2-class">by {authors.map(author => author.name).join(', ')}</h2>
                    </div>
                </div>
                <div className="book-content unique-book-content-class">
                    {/* the actual text from the book */}
                    <p className="unique-p-class">{text}</p>
                </div>
            </div>
        </main>
    );
};

export default BookFlipper;
