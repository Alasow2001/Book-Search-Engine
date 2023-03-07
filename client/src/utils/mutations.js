import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gpl`
  mutation saveBook($bookData: bookData){
    saveBook(bookData: bookData){
        _id
        username 
        email
        savedBooks{
            author
            description
            title
            image
            link
            bookId
        }
    }
  }
`

export const REMOVE_BOOK = gpl`
  mutation removeBook(bookId: ID!){
    deleteBook(bookId: ID!){
        _id
        username 
        email
        savedBooks{
            author
            description
            title
            image
            link
            bookId
        }
    }
  }
`