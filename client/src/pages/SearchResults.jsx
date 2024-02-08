import { Grid } from '@mui/material'
import { useQuery } from '@apollo/client';
import { QUERY_SEARCH_ALL_BOOKS } from '../utils/queries';
import { Link } from 'react-router-dom';

function SearchResults() {

    const searchTerm = localStorage.getItem('searchTerm');

    if (searchTerm === '') {
        console.log('Oh no, honey, that book doesn\'t exist.');
        return;
    }

    // pass searchTerm into query
    const { loading, data, error } = useQuery(QUERY_SEARCH_ALL_BOOKS, { variables: { searchTerm } });

    if (loading) {
        return <p>Loading...</p>; 
    }

    if (error) {
        console.error('Error fetching data:', error);
        return <p>Error fetching data. Please try again later.</p>; 
    }


    if (loading) {
        console.log(loading)
    } else {
        console.log(data.searchAllBooks)
    }

    const searchedBooks = data?.searchAllBooks;



    return (
        <>
            <Grid container>
                {/* each book will be in its own div */}
                {searchedBooks.map((book, index) => (
                    <Grid className="ind-book" item key={book._id} xs={2.3} sx={{ animationDelay: `${index * 0.3}s` }}>
                        <Link to={`/singleBook/${book._id}`}>
                            <img style={{ width: '100%', height: '25vw' }} src={`data:image/jpg;base64,${book.image.data}`} />
                        </Link>
                        <p className="home-book-titles" style={{ fontSize: '0.8rem', textWrap: 'wrap' }}>
                            {book.title}
                        </p>

                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default SearchResults;