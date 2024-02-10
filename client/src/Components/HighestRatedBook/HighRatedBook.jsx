import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { QUERY_HIGHEST_RATED_BOOK } from '../../utils/queries';
import './spotlightbook.css';
import { Link, useParams } from 'react-router-dom';
import { KEEP_BOOK } from '../../utils/mutations';

const HighestRatedBook = () => {
    const { id } = useParams();

    const { loading, error, data } = useQuery(QUERY_HIGHEST_RATED_BOOK);

    const [bookAdded, setBookAdded] = useState(false);

    const [keepBookMutation] = useMutation(KEEP_BOOK);

    const highestRatedBook = data?.highestRatedBook;



    const handleKeepBook = async () => {
        try {
            await keepBookMutation({
                variables: { input: { bookId: highestRatedBook?.id, title: highestRatedBook?.title, image: { data: highestRatedBook?.image.data } } },
            });

            // Set bookAdded to true when the book is successfully added
            setBookAdded(true);
        } catch (error) {
            console.error('Error adding book to MyLibrary', error);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress color="success" />
            </div>
        );
    }

    if (error) {
        console.error(error);
        return <p>Error fetching the highest-rated book</p>;
    }

    return (
        <>
            <Grid
                container
                className="from-left-white spotlight-header"
                style={{
                    display: 'flex',
                    textAlign: 'left',
                    width: '100%',
                    paddingLeft: '2rem',
                    marginBottom: '1rem',
                }}
            >
                <p style={{ fontSize: '2rem', color: '#505050' }}>Spotlight Read</p>
            </Grid>

            {highestRatedBook ? (
                <>
                    <Grid
                        container
                        spacing={1}
                        className="bottom-home-div"
                        sx={{
                            marginBottom: '3rem',
                            boxSizing: 'border-box',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#8abbb1',
                            padding: '3rem',
                            flexDirection: 'row',
                        }}
                    >
                        {/* Left */}
                        <Grid item xs={12} sm={6} sx={{ padding: '2rem !important', backgroundColor: '#8ebfb5', borderRadius: '10px' }}>
                            <p className="spotlight-book-text" style={{ fontSize: '2rem', color: '#f3f3ec' }}>
                                The current most-popular book is <em>{highestRatedBook.title}</em>. <br />Take a chance to read this book, and enjoy it with our other users by reading now or saving it for later. Feel free to leave ratings on your favorite book. It may have a chance to be spotlighted here on{' '}
                                <span style={{ fontFamily: 'Coventry Garden', whiteSpace: 'nowrap' }}>{'{'} L i b e r {'}'}</span>.
                            </p>
                        </Grid>
                        {/* Right */}
                        <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
                            <div style={{ display: 'block' }}>
                                <div>
                                    <img src={`data:image/jpg;base64,${highestRatedBook.image.data}`} alt="highest rated book" style={{ outline: '6px double #f3f3ec', padding: '2rem', marginBottom: '1rem' }} />
                                </div>
                                <p style={{ fontSize: '1.3rem', color: '#f3f3ec' }}>{highestRatedBook.title}</p>
                                <p style={{ marginBottom: '1rem', color: '#f3f3ec' }}>Author: {highestRatedBook.authors.map((author) => author.name).join(', ')}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Button sx={{ backgroundColor: bookAdded ? 'grey' : '#8abbb1', color: '#f3f3ec' }} variant="contained" onClick={handleKeepBook} disabled={bookAdded}>
                                        {bookAdded ? 'Book Saved' : 'Keep Book'}
                                    </Button>

                                    <Link to={`/bookReader/${id}`}>
                                        <Button sx={{ backgroundColor: '#8abbb1', color: '#f3f3ec' }} variant="contained">
                                            Read Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <Grid container className="bottom-home-div" style={{ display: 'flex', textAlign: 'left', width: '100%', paddingLeft: '2rem', marginBottom: '1rem' }}>
                    <p style={{ fontSize: '2rem', color: '#505050' }}>No books have been rated yet!</p>
                </Grid>
            )}
        </>
    );
};

export default HighestRatedBook;
