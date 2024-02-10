import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS_WITH_PAGINATION } from '../../utils/queries';

const AllBooks = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50; 

    const { loading, error, data } = useQuery(GET_ALL_BOOKS_WITH_PAGINATION, {
        variables: { page: currentPage, itemsPerPage: itemsPerPage },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( Please try again</p>;

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < data.getAllBooks.paginationInfo.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <h2>All Books</h2>
            <div>
                {data && data.getAllBooks.books.map((book) => (
                    <div key={book._id}>
                        <h3>{book.title}</h3>
                        {book.image && (
                            <img src={`data:image/jpg;base64,${book.image.data}`} alt={book.title} style={{ maxWidth: '100%', height: 'auto' }} />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <button onClick={handlePrevPage} disabled={currentPage <= 1}>Previous</button>
                <span>Page {currentPage} of {data && data.getAllBooks.paginationInfo.totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage >= data.getAllBooks.paginationInfo.totalPages}>Next</button>
            </div>
        </div>
    );
};

export default AllBooks;
