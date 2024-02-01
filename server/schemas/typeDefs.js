const gql = String.raw

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    password: String
}

type Query {

}

type Mutation {

}

`;

module.exports = typeDefs;