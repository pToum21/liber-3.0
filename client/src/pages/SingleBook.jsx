// hooks etc from react
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MY_LIBRARY, QUERY_ONE_BOOK } from '../utils/queries';
import { Link, useParams } from 'react-router-dom';
// mui
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';

// our files
import { KEEP_BOOK } from '../utils/mutations';
import CommentForm from '../Components/CommentForm';
import CommentList from '../Components/Commentslist'
import { useState, useEffect } from 'react';


function SingleBook() {
    const { id } = useParams();

    const { loading, data } = useQuery(QUERY_ONE_BOOK, {
        variables: { id: id }
    });

    if (loading) {
        console.log(loading)
    } else {
        // console.log(data.getSingleBook.image.data);
    }

    const thisBook = data?.getSingleBook;


    const [keepBookMutation] = useMutation(KEEP_BOOK, {
        refetchQueries: [{ query: QUERY_MY_LIBRARY}]
    });

    const [bookAdded, setBookAdded] = useState(false)

    let [avgRating, setAvgRating] = useState(0);

    function isBookAlreadyAdded(data, bookId) {
        // Assuming userData contains the user's library information
        const userLibrary = data?.myLibrary?.keptBooks || [];

        // Check if the bookId is present in the user's library
        return userLibrary.some((book) => book.bookId === bookId);
    }

    useEffect(() => {
        // Check if the book is already added to the user's library
        const alreadyAdded = isBookAlreadyAdded(data, id);
        setBookAdded(alreadyAdded);

        // calculates average rating
        const ratingCount = data?.getSingleBook.reviews.length;
        let totalRating = 0;
        data?.getSingleBook.reviews.map((book) => {
            // console.log(book.rating);
            totalRating += book.rating
        })

        avgRating = +(totalRating / ratingCount).toFixed(2);
        setAvgRating(avgRating);

        console.log(avgRating);

    }, [data, id]);

    const handleKeepBook = async () => {
        try {
            await keepBookMutation({
                variables: { input: { bookId: id, title: thisBook.title, image: { data: thisBook.image.data } } },
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
        )
    }

    const book = data?.getSingleBook || [];



    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', padding: '20px' }}>
            <h3>Title: {book.title}</h3>
            <h4>
                Authors: {book.authors.map((author, index) => (
                    <span key={index}>{author.name}</span>
                ))}
            </h4>
            <img src={`data:image/jpg;base64,${book.image.data}`} alt={book.title} style={{ maxWidth: '100%', height: 'auto' }} /><br />
            {/* <p> Rating: {avgRating}</p> */}
            <Rating name="read-only" value={avgRating} precision={0.5} readOnly />

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {bookAdded ? (
                    <Button sx={{ backgroundColor: 'grey' }} disabled={true} variant="contained" onClick={handleKeepBook}>
                        Book Saved
                    </Button>
                ) : (
                    <Button sx={{
                        backgroundColor: '#8abbb1',
                        color: '#f3f3ec',
                        '&:hover': {
                            backgroundColor: '#6a8e86',
                        },

                    }} variant="contained" onClick={handleKeepBook}>
                        Keep Book
                    </Button>
                )}
                <Link to={`/bookReader/${id}`}>
                    <Button sx={{
                        backgroundColor: '#8abbb1',
                        color: '#f3f3ec',
                        '&:hover': {
                            backgroundColor: '#6a8e86',
                        },
                    }} variant="contained">Read Now</Button>
                </Link>
            </div>


            <div>

                <CommentList reviews={book.reviews} />
            </div>


            <CommentForm bookId={book._id} />
        </div>
    );
}

export default SingleBook;