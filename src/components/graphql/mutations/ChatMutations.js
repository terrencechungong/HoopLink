import { useMutation, gql } from '@apollo/client'

export const CREATE_CHAT_MUTATION = gql`
    mutation CreateChat($chat: CreateChatInput) {
        createChat(chat: $chat) {
            chatName
            _id
        }
    }
`
