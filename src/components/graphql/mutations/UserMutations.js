import { gql } from '@apollo/client'

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(user: $input) {
          firstName
    }
}`

export const REMOVE_FRIEND_MUTATION = gql`
    mutation RemoveFriend($userId: ID!, $friendId: ID!) {
        removeFriend(userId: $userId, friendId: $friendId)
    }
`

export const ADD_FRIEND_MUTATION = gql`
    mutation AddFriend($userId: ID!, $friendId: ID!) {
        addFriend(userId: $userId, friendId: $friendId)
    }
`

export const ADD_POST_TO_USER_OBJECT = gql`
    mutation AddPostToUserObject($authId: String!, $postId: ID!) {
        addPost(authId: $authId, postId: $postId)
    }
`

export const DELETE_POST_FROM_USER_OBJECT = gql`
    mutation DeletePostFromUserObject($userId: ID!, $postId: ID!) {
        addPost(userId: $userId, postId: $postId)
    }
`

export const ADD_RUN_TO_USER_OBJECT = gql`
    mutation AddRunToUserObject($userId: ID!, $runId: ID!) {
        addRun(userId: $userId, runId: $runId)
    }
`

export const DELETE_RUN_FROM_USER_OBJECT = gql`
    mutation DeleteRunFromUserObject($userId: ID!, $runId: ID!) {
        deleteRun(userId: $userId, runId: $runId)
    }
`

export const ADD_NOTIFICATION_TO_USER_OBJECT = gql`
    mutation AddNotificationToUserOnject($userId: ID!, $notifId: ID!) {
        addNotification(userId: $userId, notifId: $notifId)
    }
`

export const REMOVE_NOTIFICATION_FROM_USER_OBJECT = gql`
    mutation RemoveNotificationFromUserOnject($userId: ID!, $notifId: ID!) {
        removeNotification(userId: $userId, notifId: $notifId)
    }
`