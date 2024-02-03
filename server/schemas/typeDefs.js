const gql = String.raw

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
    keptBooks: [Book]
}

type Author {
    _id: ID
    name: String
}

type Comments {
    _id: ID
    comments: String
}

type Book {
    # unsure if id will need to be a different property
    _id: ID
    title: String
    bookId: Int
    authors: [Author]
    image: String
    text: String
}

type Review {
    _id: ID
    comments: [Comments]
    rating: Int
}

type Auth {
    token: ID!
    user: User
}

type Query {
    myLibrary: User
    getBooks: [Book]
    getSingleBook(bookId: ID!): Book
}

input KeepBookInput {
    _id: ID
    title: String
    authors: [String]
    image: String
    text: String
    bookId: Int
}

type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    keepBook(input: KeepBookInput!): User
    removeBook(_id: ID): User
    addReview(_id: ID): User
}

`;

module.exports = typeDefs;