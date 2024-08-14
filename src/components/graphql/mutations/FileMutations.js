import { useMutation, gql } from '@apollo/client'

export const CREATE_FILE_MUTATION = gql`
    mutation CreateFile($file: CreateFileInput!) {
        createFile(file: $file) {
            _id
            postId
            messageId
            awsUri
        }
    }
`