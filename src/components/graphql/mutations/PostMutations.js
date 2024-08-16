import { gql } from '@apollo/client'

export const CREATE_POST_OBJECT = gql`
    mutation CreatePostObject($post: CreatePostInput!) {
        createPost(post: $post) {
            _id
        }
    }
`

export const ADD_COMMENT_TO_POST_OBJECT = gql`
    mutation AddCommentToPostObject($postId: ID!, $commentId: ID!) {
        addCommentToPost(postId: $postId, commentId: $commentId)
    }
`

export const ADD_LIKE_TO_POST_OBJECT = gql`
    mutation AddLikeToPostObject($postId: ID!, $userId: ID!) {
        addLikeToPost(postId: $postId, userId: $userId)
    }
`

export const REMOVE_LIKE_FROM_POST = gql`
    mutation RemoveLikeFromPost($postId: ID!, $userId: ID!) {
        removeLikeFromPost(postId: $postId, userId: $userId)
    }
`

export const REMOVE_COMMENT_FROM_POST = gql`
    mutation RemoveCommentFromPost($postId: ID!, $commentId: ID!) {
        removeCommentFromPost(postId: $postId, commentId: $commentId)
    }
`

export const ADD_FILES_TO_POST = gql`
    mutation AddFilesToPost($postId: ID!, $fileIds: [String!]!) {
        addFilesToPost(postId: $postId, fileIds: $fileIds)
    }
`


export const GET_USER_FEED = gql`
    query GetUserFeed($userrrId: ID!) {
        getUserFeed(userId: $userrrId) {
            _id
            files {
                awsUri
            }
            caption
            creationTime
            location
            comments {
                creator {
                    profilePhoto
                    username
                    authId
                }
                text
                creationTime
            }
            likers {
                username
                profilePhoto
                authId
            }
            creator {
                username
                profilePhoto
                authId
                firstName
                lastName
            }
        }
    }
`