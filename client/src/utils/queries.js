import { gql } from '@apollo/client';

export const GET_ME = gpl`
    query me{
        me{
            _id
            username
            email
            bookCount
            saveBooks{
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