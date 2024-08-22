import { useMutation, gql } from '@apollo/client'

export const CREATE_CHAT_MUTATION = gql`
    mutation CreateChat($chat: CreateChatInput) {
        createChat(chat: $chat) {
            chatName
            _id
        }
    }
`

export const ADD_MESSAGE_TO_CHAT_OBJECT = gql`
    mutation AddMessageToChatObject($chatId: ID!, $messageId: ID!) {
        addMessageToChat(chatId: $chatId, messageId: $messageId)
    }
`

export const ADD_USER_TO_CHAT_OBJECT = gql`
    mutation AddUserToChatObject($chatId: ID!, $userId: ID!) {
        addUserToChat(chatId:$chatId, userId: $userId)
    }
`

export const REMOVE_USER_FROM_CHAT_OBJECT = gql`
    mutation RemoveUserFromChatObject($chatId: ID!, $userId: ID!) {
        removeUserFromChat(chatId: $chatId, userId: $userId)
    }
`

export const CREATE_CHAT = gql`
    mutation CreateChat($chat: CreateChatInput!) {
        createChat(chat: $chat) {
            _id
        }
    }
`