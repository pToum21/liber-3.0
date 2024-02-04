// purely to add color to text in our code for readability
import { gql } from '@apollo/client';

// queries all books
// may need to refactor the reviews part, because we may be unnecessarily querying ids or user info
export const QUERY_ALL_BOOKS = gql`
query allBooks {
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

// queries a single book
export const QUERY_ONE_BOOK = gql`
query oneBook($id: ID!) {
  getSingleBook(_id: $id) {
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
        userId
        comments
      }
      rating
      userId {
        _id
        username
        email
        role
      }
    }
  }
}
`;