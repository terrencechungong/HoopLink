import { gql } from '@apollo/client';

export const GET_CHAT_MESSAGES = gql`
    query GetChatData($chatId: ID!) {
        chat(_id: $chatId) { 
            _id
            chatName
            chatMembers {
                authId
                username
                profilePhoto
            }
            messages {
                _id
                text
                creationTime
                sender {
                    username
                    profilePhoto
                }
            }
        }
    }

`