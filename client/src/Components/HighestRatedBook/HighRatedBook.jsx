import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_HIGHEST_RATED_BOOK } from '../../utils/queries';

const HighestRatedBook = () => {
    const { loading, error, data } = useQuery(QUERY_HIGHEST_RATED_BOOK);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error(error);
        return <p>Error fetching the highest-rated book</p>;
    }

    const highestRatedBook = data.highestRatedBook;

    return (
        <div>
            <h2>Highest Rated Book</h2>
            {highestRatedBook ? (
                <>
                    <p>Title: {highestRatedBook.title}</p>
                    <p>Authors: {highestRatedBook.authors.map(author => author.name).join(', ')}</p>
                    {/* <p>Rating: {highestRatedBook.reviews[0].rating}</p> */}
                    <img  src={`data:image/jpg;base64,${highestRatedBook.image.data}`} alt="" />
                </>
            ) : (
                <p>No highest-rated book found</p>
            )}
        </div>
    );
};

export default HighestRatedBook;