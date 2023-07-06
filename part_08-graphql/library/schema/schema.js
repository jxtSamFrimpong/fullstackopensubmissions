const typeDefs = `
    type User {
        name: String!
        username: String! 
        favoriteGenre: String!
        id: ID!
    }
    type Token {
        value: String!
      }
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int
    }
    type Genre {
        name: String!
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [Genre!]!
        id: ID!
    }
    type Query {
        dummy: Int
        me: User
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        allGenres: [String!]!
    }
    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String]!
            ): Book
        editAuthor(
            born: Int
            name: String!
        ): Author

        createUser(
            name: String
            username: String!
            password: String!
            favoriteGenre: String!
          ): User
        login(
            username: String!
            password: String!
        ): Token
    }

    type Subscription {
        bookAdded: Book!
      }
`
module.exports = typeDefs