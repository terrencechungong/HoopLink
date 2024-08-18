import { gql } from '@apollo/client'

export const GET_USER_CHATS_LIST = gql`
    query GetUserChats($userId: ID!) {
        getUserChats(userId: $userId) {
            _id
            chatName
            chatPhoto
        }
    }
`