const gql = String.raw

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
}

type Book {
    _id: ID
    title: String
    authors: [String]
    image: String
    text: String
}

type Auth {
    token: ID!
    user: User
}

type Query {

}

type Mutation {

}

`;

module.exports = typeDefs;