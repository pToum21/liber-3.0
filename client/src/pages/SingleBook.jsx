import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ONE_BOOK } from '../utils/queries';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { KEEP_BOOK } from '../utils/mutations';
import CommentForm from '../Components/CommentForm';
import CommentList from '../Components/Commentslist'
import { useState } from 'react';


function SingleBook() {
    const { id } = useParams();

    const { loading, data } = useQuery(QUERY_ONE_BOOK, {
        variables: { id: id }
    });

    const [keepBookMutation] = useMutation(KEEP_BOOK);

    const [bookAdded, setBookAdded] = useState(false)


    const handleKeepBook = async () => {
        try {
            await keepBookMutation({
                variables: { input: { bookId: id } },
            });

            setBookAdded(true);

        } catch (error) {
            console.error('Error adding book to MyLibrary', error);
        }
    };

    handleKeepBook ? setBookAdded : true

    if (loading) {
        return <div>Loading....</div>;
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
            <img src={`data:image/jpg;base64,${book.image.data}`} alt={book.title} style={{ maxWidth: '100%', height: 'auto' }} />
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {bookAdded ? (
                    <Button sx={{ backgroundColor: 'grey' }}  disabled={true} variant="contained" onClick={handleKeepBook}>
                    Book Saved
                </Button>
                ) : (
                    <Button sx={{ backgroundColor: '#8abbb1' }} variant="contained" onClick={handleKeepBook}>
                        MyLibrary
                    </Button>
                )}
                <Link to={`/bookReader/${id}`}>
                    <Button sx={{ backgroundColor: '#8abbb1' }} variant="contained">Read Now</Button>
                </Link>
            </div>
            <div>
                <div>
                    <div>

                        <CommentList reviews={book.reviews} />
                    </div>
                </div>
            </div>
            <CommentForm bookId={book._id} />
        </div>
    );
}

export default SingleBook;
