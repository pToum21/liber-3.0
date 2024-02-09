// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_MY_LIBRARY } from '../../utils/queries'


// const SavedBooks = () => {
//     // Execute the query using useQuery hook
//     const { loading, error, data } = useQuery(QUERY_MY_LIBRARY);
//     console.log(data);
//     if (loading) {
//         console.log('loading')
//     } else {
//     console.log(data.myLibrary.keptBooks);
//     }
// const myBooks = data?.myLibrary.keptBooks;


//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;


//     console.log(data)
    

//     return (
//         <div>
//             <h2>MyBookshelf</h2>
//             <ul>
//                 {myBooks.map((myBook) => (
//                     <li key={myBook.bookId}>
//                         <h3>{myBook.title}</h3>
//                         {/* <p>Authors: {book.authors.map((author) => author.name).join(', ')}</p> */}
//                         <img src={`data:image/jpeg;base64,${myBook.image.data}`} alt={myBook.title} />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default SavedBooks;

import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MY_LIBRARY } from '../../utils/queries';
import { Link } from 'react-router-dom';

const SavedBooks = () => {
    const { loading, error, data } = useQuery(QUERY_MY_LIBRARY);
    const myBooks = data?.myLibrary.keptBooks;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>MyBookshelf</h2>
            <ul>
                {myBooks.map((myBook) => (
                    <li key={myBook.bookId}>
                        <Link to={`/singleBook/${myBook.bookId}`}>
                            <h3>{myBook.title}</h3>
                            <img src={`data:image/jpeg;base64,${myBook.image.data}`} alt={myBook.title} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavedBooks;
