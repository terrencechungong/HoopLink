import { gql } from '@apollo/client'

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(user: $input) {
            firstName
    }
}`