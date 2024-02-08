import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SavedBooks = () => {
    // Execute the query using useQuery hook
    const { loading, error, data } = useQuery(QUERY_MY_LIBRARY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Extract the relevant data from the query response
    const { myLibrary } = data;

    return (
        <div>
            <h2>Your Saved Books</h2>
            <ul>
                {myLibrary.keptBooks.map((book) => (
                    <li key={book.bookId}>
                        <h3>{book.title}</h3>
                        <p>Authors: {book.authors.map((author) => author.name).join(', ')}</p>
                        <img src={`data:image/jpeg;base64,${book.image.data}`} alt={book.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavedBooks;