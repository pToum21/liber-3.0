
import { useQuery } from '@apollo/client'
import { QUERY_ONE_BOOK } from '../utils/queries'
import { useParams } from 'react-router-dom'


function SingleBook() {
    const { id } = useParams();

    const { loading, data } = useQuery(QUERY_ONE_BOOK, {
        variables: { id: id}
    });

    const book = data?.getBooks || [];

    console.log(data);

    if (loading) {
        return <div>Loading....</div>
    }



    return (
        <div >
            <h3>book: {data.getSingleBook.title}</h3>
            {/* <p style={{fontSize: '.7rem'}}>{data.getSingleBook.text}</p>*/}
            
        </div>
    )
}


export default SingleBook;