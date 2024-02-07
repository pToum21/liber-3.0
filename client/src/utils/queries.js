// purely to add color to text in our code for readability
import { gql } from '@apollo/client';

// queries all books
// may need to refactor the reviews part, because we may be unnecessarily querying ids or user info
export const QUERY_ALL_BOOKS = gql`
query getBooks($skip: Int) {
  getBooks(skip: $skip) {
    books {
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
        userId {
          username
        }
      }
    }
    bookCount
  }
}
`;

// queries a single book
export const QUERY_ONE_BOOK = gql`
query getSingleBook($id: ID!) {
  getSingleBook(_id: $id) {
    _id
    title
    bookId
    authors {
      _id
      name
    }
    image {
      data
      contentType
    }
    reviews {
      _id
      rating
      content
      comments {
        _id
        userId
        content
      }
    }
    text
  }
}
`;

export const QUERY_SEARCH_ALL_BOOKS = gql`
query Query {
  searchAllBooks {
    _id
    title
    authors {
      name
    }
  }
}
`;