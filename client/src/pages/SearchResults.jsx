import { Grid } from '@mui/material'
import { useQuery } from '@apollo/client';
import { QUERY_SEARCH_ALL_BOOKS } from '../utils/queries';

function SearchResults() {

    const searchTerm = localStorage.getItem('searchTerm');

    // pass searchTerm into query

    const { loading, data, error } = useQuery(QUERY_SEARCH_ALL_BOOKS, { variables: {searchTerm}});

if (loading) {
    console.log(loading)
} else {
    console.log(data)
}




    return (
        <>
            <Grid container>
                <div>
                    <p>Hi</p>
                </div>
            </Grid>
        </>
    )
}

export default SearchResults;