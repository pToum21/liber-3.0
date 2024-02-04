// purely to add color to text in our code for readability
import { gql } from '@apollo/client';

// may need to refactor the reviews part, because we may be unnecessarily querying ids or user info
export const QUERY_ALL_BOOKS = gql`
query Query {
    getBooks {
      _id
      title
      bookId
      authors {
        name
      }
      image {
        data
      }
      text
      reviews {
        _id
        comments {
          _id
          comments
          userId
        }
        rating
        userId {
          username
          _id
        }
      }
    }
  }
`;