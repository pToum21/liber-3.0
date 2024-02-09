import React from 'react';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { QUERY_HIGHEST_RATED_BOOK } from '../../utils/queries';

const Container = styled('div')({
    width: '100vw',
    height: '50vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

const BookInfo = styled('div')({
    textAlign: 'center',
    marginTop: theme => theme.spacing(2),
});

const BookImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '70vh', 
    marginTop: theme => theme.spacing(2),
});

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
        <Container>
            <BookInfo>
                <Typography variant="h4" gutterBottom>
                    Highest Rated Book
                </Typography>
                {highestRatedBook ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Title: {highestRatedBook.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Authors: {highestRatedBook.authors.map((author) => author.name).join(', ')}
                        </Typography>

                        <BookImage
                            src={`data:image/jpg;base64,${highestRatedBook.image.data}`}
                            alt="highest rated book"
                        />
                    </>
                ) : (
                    <Typography variant="body1">No highest-rated book found</Typography>
                )}
            </BookInfo>
        </Container>
    );
};

export default HighestRatedBook;
