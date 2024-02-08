import { Grid } from '@mui/material'
import { useQuery } from '@apollo/client';
import { QUERY_SEARCH_ALL_BOOKS } from '../utils/queries';

function SearchResults({ data }) {

    // const { loading, data } = useQuery(QUERY_SEARCH_ALL_BOOKS);




    return (
        <>
            <Grid container>
                <div>
                    {data.map((bookResult) => (
                        <div key={bookResult.id}>{bookResult.name}</div>
                    ))}
                </div>
            </Grid>
        </>
    )
}

export default SearchResults;