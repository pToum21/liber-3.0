import React from 'react';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { QUERY_HIGHEST_RATED_BOOK } from '../../utils/queries';
import './spotlightbook.css';

const HighestRatedBook = () => {
    const { loading, error, data } = useQuery(QUERY_HIGHEST_RATED_BOOK);
    if (loading) {

        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress color="success" />
            </div>
        )
    }

    if (error) {
        console.error(error);
        return <p>Error fetching the highest-rated book</p>;
    }

    const highestRatedBook = data?.highestRatedBook;


    return (
        <>
            <Grid container className="from-left-white spotlight-header" style={{ display: 'flex', textAlign: 'left', width: '100%', paddingLeft: '2rem', marginBottom: '1rem' }}>
                <p style={{ fontSize: '2rem', color: '#505050' }} >
                    Spotlight Read
                </p>
            </Grid>

            {highestRatedBook ? (
                <>
                    <Grid container spacing={1} className="bottom-home-div" sx={{
                        marginBottom: '3rem',
                        boxSizing: 'border-box',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#8abbb1',
                        padding: '3rem',
                        flexDirection: 'row',
                    }}>
                        {/* Left */}
                        <Grid item xs={12} sm={6} sx={{ padding: '2rem !important', backgroundColor:'#8ebfb5', borderRadius:'10px'}}>
                            <p className="spotlight-book-text" style={{ fontSize: '2rem', color: '#f3f3ec' }}>
                                The current most-popular book is <em>{highestRatedBook.title}</em>. <br />Take a chance to read this book, and enjoy it with our other users by reading now or saving it for later. Feel free to leave ratings on your favorite book. It may have a chance to be spotlighted here on <span style={{ fontFamily: 'Coventry Garden', whiteSpace: 'nowrap' }}>{'{'} L i b e r {'}'}</span>.
                            </p>
                        </Grid>
                        {/* Right */}
                        <Grid item xs={12} sm={6} sx={{  textAlign: 'center'}}>
                            <div style={{ display: 'block'}}>
                                <div>
                                <img
                                    src={`data:image/jpg;base64,${highestRatedBook.image.data}`}
                                    alt="highest rated book"
                                    style={{outline: '6px double #f3f3ec', padding: '2rem', marginBottom:'1rem'}}
                                />
                                </div>
                                 <p style={{ fontSize: '1.3rem', color: '#f3f3ec' }} >
                                    {highestRatedBook.title}
                                </p>
                                <p style={{marginBottom: '1rem', color: '#f3f3ec'}}>
                                    Author: {highestRatedBook.authors.map((author) => author.name).join(', ')}
                                </p>
                                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                    <Button variant="contained" sx={{backgroundColor:'#f3f3ec', color: '#8abbb1'}} onClick={() => console.log('Save button clicked')}>
                                        Keep Book
                                    </Button>
                                    <Button variant="contained" sx={{backgroundColor:'#f3f3ec', color: '#8abbb1'}} onClick={() => console.log('Read button clicked')}>
                                        Read Now
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <Grid container className="bottom-home-div" style={{ display: 'flex', textAlign: 'left', width: '100%', paddingLeft: '2rem', marginBottom: '1rem' }}>
                    <p style={{ fontSize: '2rem', color: '#505050' }} >No books have been rated yet!</p>
                </Grid>
            )}
        </>

    );
};

export default HighestRatedBook;
