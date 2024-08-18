import {  gql } from '@apollo/client';

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageMade($chatId: ID!) {
    messageSent(chatId: $chatId) {
        _id
         text
        creationTime
        sender {
            _id
            username
            profilePhoto
        }
    }
  }
`