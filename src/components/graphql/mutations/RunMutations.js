import { useMutation, gql } from '@apollo/client'

export const CREATE_RUN_MUTATION = gql`
 mutation CreateRun($run: CreateRunInput!) {
   createRun(run: $run) {
     _id
     runName
     mvpVotingStatus
   }
 }
`