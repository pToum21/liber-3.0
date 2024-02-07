import { useQuery } from '@apollo/client';
import { QUERY_ONE_BOOK } from '../utils/queries';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import CommentForm from '../Components/CommentForm';


function SingleBook() {
    const { id } = useParams();

    const { loading, data } = useQuery(QUERY_ONE_BOOK, {
        variables: { id: id }
    });

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
                <Button sx={{ backgroundColor: '#8abbb1' }} variant="contained">MyLibrary</Button>
                <Link to={`/bookReader/${id}`}>
                    <Button sx={{ backgroundColor: '#8abbb1' }} variant="contained">Read Now</Button>
                </Link>

            </div>
            <CommentForm />
        </div>
    );
}

export default SingleBook;
