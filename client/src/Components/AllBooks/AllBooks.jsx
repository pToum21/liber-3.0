import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS_WITH_PAGINATION } from '../../utils/queries';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                {data && data.getAllBooks.books.map((book) => (
                    <Box
                        key={book._id}
                        sx={{
                            flex: '1 0 100%', // One book per row by default
                            maxWidth: '200px',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover .titleOverlay': {
                                opacity: 1,
                            },
                            '&:hover img': {
                                filter: 'brightness(0.7)',
                            },
                            '@media (min-width: 600px)': {
                                flex: '1 0 50%', // Two books per row on larger screens
                            },
                        }}
                    >
                        <Link to={`/singleBook/${book._id}`} style={{ textDecoration: 'none', display: 'block', position: 'relative' }}>
                            <img
                                src={`data:image/jpg;base64,${book.image.data}`}
                                alt={book.title}
                                style={{ width: '100%', height: '20rem', borderRadius: '8px' }}
                            />
                            <div
                                className="titleOverlay"
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    width: '100%',
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    boxSizing: 'border-box',
                                    color: '#fff',
                                    opacity: 0,
                                    transition: 'opacity 0.3s',
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: '12px',
                                        margin: '0',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {book.title}
                                </h3>
                            </div>
                        </Link>
                    </Box>
                ))}
            </Box>
            <div>
                <button onClick={handlePrevPage} disabled={currentPage <= 1}>Previous</button>
                <span>Page {currentPage} of {data && data.getAllBooks.paginationInfo.totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage >= data.getAllBooks.paginationInfo.totalPages}>Next</button>
            </div>
        </div>
    );
};

export default AllBooks;
