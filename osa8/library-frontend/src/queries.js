import { gql, useQuery } from '@apollo/client'


export const ALL_PERSONS = gql`
query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
query {
  allBooks{
    title
    author
    published
  }
}`


export const ADD_BOOK = gql` 
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author
  }
}
`

export const EDIT_BORN_YEAR = gql`
mutation changeBornYear($name: String!, $setBornTo: Int!){
  editAuthor(
    name: $name, 
    setBornTo: $setBornTo
    ) {
      name
      born
  }
}
`


