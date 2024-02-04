import { useQuery } from '@apollo/client'
import { QUERY_ONE_BOOK } from '../utils/queries'
import { useParams } from 'react-router-dom'


function BookReader() {
    const { bookId } = useParams();

    const { loading, data } = useQuery(QUERY_ONE_BOOK, {
        variables: { id: bookId}
    });

    const book = data?.book || {};

    console.log(book);

    if (loading) {
        return <div>Loading....</div>
    }



    return (
        <div>
            <h3>book: {book.title}</h3>
            <p>{book.text}</p>
        </div>
    )
}


export default BookReader
