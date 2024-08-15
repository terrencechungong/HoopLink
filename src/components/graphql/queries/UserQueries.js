import { gql } from '@apollo/client'

export const CHECK_IF_CREDENTIALS_EXIST = gql`
    query CheckIfCredentialsExist($username: String!, $email: String!, $phoneNumber: String!) {
        isCredentialsValid(username: $username, email: $email, phoneNumber: $phoneNumber)
    }
`

export const GET_USER_DATA_FOR_SELF_VIEW = gql`
    query GetUserForSelfView($authId: String!) {
        getUserWithAuthId(authId: $authId) {
            username
            mvpCount
            posts {
                caption
                creationTime
            }
            friends {
                username
                authId
            }
            runs {
                runName
            }
        }
    }
`

export const GET_USER_ID_FROM_AUTH_ID = gql`
    query GetUserId($authId: String!) {
        getUserWithAuthId(authId: $authId) {
            _id
        }
    }
`