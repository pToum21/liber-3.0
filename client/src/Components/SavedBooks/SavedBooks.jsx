import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MY_LIBRARY } from '../../utils/queries';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { REMOVE_BOOK } from '../../utils/mutations';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import './SavedBooks.css';

const SavedBooks = () => {
    const { loading, error, data, refetch } = useQuery(QUERY_MY_LIBRARY);
    const myBooks = data?.myLibrary.keptBooks;

    const myData = data?.myLibrary;
    // fields are: username, email, role, keptBooks.title


    const [removeBook] = useMutation(REMOVE_BOOK);

    const handleRemove = async (bookId) => {
        try {
            await removeBook({
                variables: {
                    bookId: bookId,
                },
            });

            // Refetch data after removing the book
            const { data: refetchedData } = await refetch();

            // You can update the state or perform any other actions with the refetched data if needed
            // For example, if you're using state:
            // setMyBooks(refetchedData?.myLibrary.keptBooks);
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Grid container>
            <Grid item className="slide-from-left" mb={3} p={3} sx={{ width: '100%', fontSize: '1.8rem', color: '#f3f3ec' }}>
                <em className="my-lib-head">Welcome to your MyLibrary, {myData.username.charAt(0).toUpperCase() + myData.username.slice(1)}... </em>
            </Grid>


            <Grid className="books-container" container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'center', padding: '5vw', border: 'double 10px #cae4df', marginLeft: '5rem', marginRight: '5rem', marginBottom: '2rem' }}>

                {/* each book will be in its own div */}
                {myBooks.map((myBook, index) => (
                    <Grid className="ind-book" item key={myBook.bookId} xs={2.3} sx={{ animationDelay: `${index * 0.3}s` }}>
                        {/* image */}
                        <div style={{ width: '100%' }}>
                            <Link to={`/singleBook/${myBook._id}`}>
                                <img style={{ width: '100%', height: '23vw' }} src={`data:image/jpg;base64,${myBook.image.data}`} />
                            </Link>
                        </div>

                        {/* title */}
                        <div style={{ width: '100%' }}>
                            <p className="home-book-titles" style={{ fontSize: '0.8rem', textWrap: 'wrap' }}>
                                {myBook.title}
                            </p>
                        </div>


                    </Grid>
                ))}
            </Grid>


        </Grid>
    );
};

export default SavedBooks;
