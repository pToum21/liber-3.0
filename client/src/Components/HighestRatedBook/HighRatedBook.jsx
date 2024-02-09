import React from 'react';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { QUERY_HIGHEST_RATED_BOOK } from '../../utils/queries';

const Container = styled('div')({
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8abbb1',
    padding: '100px',
    flexDirection: 'row',
    '@media (max-width: 600px)': {
        flexDirection: 'column',
    },
});

const LeftSide = styled('div')({
    flex: 1,
    textAlign: 'left',
});

const RightSide = styled('div')({
    flex: 1,
    textAlign: 'center',   
});

const BookInfo = styled('div')({
    textAlign: 'center',
});

const BookImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '70vh',  
});

const ButtonContainer = styled('div')({
    
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
                {highestRatedBook ? (
                    <>
                        <LeftSide>
                            <Typography variant="body1">
                                The highest Rated book of the day is, {highestRatedBook.title} take a chance to read this book and enjoy it with our other users by reading now or save it for later. Feel free to leave ratings on your favorite book to have it added to the spotlight
                            </Typography>
                        </LeftSide>
                        <RightSide>
                            <BookInfo>
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
                                <ButtonContainer>
                                    <Button variant="contained" color="primary" onClick={() => console.log('Save button clicked')}>
                                        MyLibrary
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => console.log('Read button clicked')}>
                                        Read Now
                                    </Button>
                                </ButtonContainer>
                            </BookInfo>
                        </RightSide>
                    </>
                ) : (
                    <Typography variant="body1">No highest-rated book found</Typography>
                )}
            </Container>
        </div>

    );
};

export default HighestRatedBook;
