import { useMutation, gql } from '@apollo/client'

export const CREATE_FILE_OBJECT = gql`
    mutation CreateFile($file: CreateFileInput!) {
        createFile(file: $file) {
            _id
        }
    }
`