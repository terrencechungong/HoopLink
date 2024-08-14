import { useMutation, gql } from '@apollo/client'

export const CREATE_COMMENT_OBJECT = gql`
 mutation CreateComment($comment: CreateCommentInput!) {
   createComment(comment: $comment) {
     _id
   }
 }
`