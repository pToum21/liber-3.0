import React from 'react';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import { QUERY_HIGHEST_RATED_BOOK } from '../../utils/queries';

const Container = styled('div')({
    width: '100vw',
    height: '40vh',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8abbb1',
    padding: theme => theme.spacing(2),
    flexDirection: 'row', // default direction
    '@media (max-width: 600px)': {
        flexDirection: 'column', // switch to column on smaller screens
    },
});

const LeftSide = styled('div')({
    flex: 1,
    textAlign: 'left',
    padding: theme => theme.spacing(2),
});

const RightSide = styled('div')({
    flex: 1,
    textAlign: 'center',
    padding: theme => theme.spacing(2),
});

const BookInfo = styled('div')({
    textAlign: 'center',
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
        <div style={{ height: '60vh', marginTop: '10rem' }}>

            <Typography variant="h4" gutterBottom>
                Highest Rated Book
            </Typography>
            <Container>

                <LeftSide>
                    <Typography variant="body1">
                        The highest Rated book of the day is, {highestRatedBook.title} take a chance to read this book and enjoy it with our other users by reading now or save it for later. Feel free to leave ratings on your favorite book to have it added to the spotlight
                    </Typography>
                </LeftSide>
                <RightSide>
                    <BookInfo>
                        {highestRatedBook ? (
                            <>
                                <Typography variant="h6" gutterBottom>
                                     {highestRatedBook.title}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Written By {highestRatedBook.authors.map((author) => author.name).join(', ')}
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
                </RightSide>
            </Container>

        </div>

    );
};

export default HighestRatedBook;
