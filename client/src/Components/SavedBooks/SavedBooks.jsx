import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MY_LIBRARY } from '../../utils/queries';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';


const SavedBooks = () => {
    const { loading, error, data } = useQuery(QUERY_MY_LIBRARY);
    const myBooks = data?.myLibrary.keptBooks;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>My Bookshelf</h2>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                {myBooks.map((myBook) => (
                    <Box
                        key={myBook.bookId}
                        sx={{
                            flex: '1 0 100%',  // One book per row by default
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
                                flex: '1 0 50%',  // Two books per row on larger screens
                            },
                        }}
                    >
                        <Link to={`/singleBook/${myBook.bookId}`} style={{ textDecoration: 'none', display: 'block', position: 'relative' }}>
                            <img
                                src={`data:image/jpeg;base64,${myBook.image.data}`}
                                alt={myBook.title}
                                style={{ width: '100%', height: '20rem', borderRadius: '8px' }}
                            />
                            <div className="titleOverlay" style={{ position: 'absolute', top: '0', left: '0', width: '100%', background: 'rgba(0, 0, 0, 0.7)', boxSizing: 'border-box', color: '#fff', opacity: 0, transition: 'opacity 0.3s' }}>
                                <h3 style={{ fontSize: '12px', margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {myBook.title}
                                </h3>
                            </div>
                        </Link>
                    </Box>
                ))}
            </Box>
        </div>
    );
};

export default SavedBooks;
