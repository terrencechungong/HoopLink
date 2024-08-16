import { gql } from '@apollo/client'

export const GET_POST_USING_POST_ID = gql`
    query GetPostUsingPostId($id: ID!) {
        post(_id: $id) {
            _id
            creator {
                _id
                username
                firstName
                lastName
                profilePhoto
            }
            creationTime
            location
            caption
            files {
                awsUri
            }
            likers {
                profilePhoto
                username
            }
            comments {
                text
                creator {
                    username
                    profilePhoto
                }
            }
        }
    }
`