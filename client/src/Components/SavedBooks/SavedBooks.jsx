import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MY_LIBRARY } from '../../utils/queries'


const SavedBooks = () => {
    // Execute the query using useQuery hook
    const { loading, error, data } = useQuery(QUERY_MY_LIBRARY);
const myLibrary = data?.myLibrary


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    console.log(data)
    

    return (
        <div>
            <h2>Your Saved Books</h2>
            <ul>
                {myLibrary.keptBooks.map((myLibrary) => (
                    <li key={myLibrary.bookId}>
                        <h3>{myLibrary.title}</h3>
                        {/* <p>Authors: {book.authors.map((author) => author.name).join(', ')}</p> */}
                        <img src={`data:image/jpeg;base64,${myLibrary.image}`} alt={myLibrary.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavedBooks;