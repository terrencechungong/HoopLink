import { gql } from '@apollo/client'

export const CHECK_IF_CREDENTIALS_EXIST = gql`
    query CheckIfCredentialsExist($username: String!, $email: String!, $phoneNumber: String!) {
        isCredentialsValid(username: $username, email: $email, phoneNumber: $phoneNumber)
    }
`

export const GET_USER_DATA_FOR_SELF_VIEW = gql`
    query GetUserForSelfView($authId: String!) {
        getUserWithAuthId(authId: $authId) {
            _id
            username
            mvpCount
            profilePhoto
            posts {
                caption
                creationTime
            }
            friends {
                _id
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

export const CHECK_IF_USERS_ARE_FRIENDS = gql`
    query CheckIfUsersAreFriends($currentUserId: ID!, $loggedInUserId: ID!) {
        areUsersFriends(aId: $currentUserId, bId: $loggedInUserId)
    }
`

export const SEARCH_FOR_USERS = gql`
    query SearchForUsers($query: String!) {
        searchForUsers(query: $query) {
            authId
            username
            firstName
            lastName
            profilePhoto
        }
    }
`