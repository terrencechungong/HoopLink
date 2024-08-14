import { gql } from '@apollo/client'

export const CREATE_MESSAGE_OBJECT = gql`
    mutation CreateMessageObject($message: CreateMessageInput!) {
        createMessage(message: $message) {
            _id
        }
    }
`

export const UPDATE_SEEN_BY_ON_MESSAGE = gql`
    mutation UpdateSeenByOnMessage($userId: ID!) {
        updateSeenBy(userId: $userId)
    }
`