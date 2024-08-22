import { useMutation, gql } from '@apollo/client'

export const CREATE_RUN_OBJECT_MUTATION = gql`
 mutation CreateRun($run: CreateRunInput!) {
   createRun(run: $run) {
     _id
   }
 }
`

export const CREATE_VOTE_OBJECT_MUTATION = gql`
 mutation CreateVote($vote: CreateVoteInput!, $run: ID!) {
    createVote(vote: $vote, run: $run) {
     _id
   }
 }
`

export const SET_MVP_ON_RUN_OBJECT = gql`
 mutation SetMvpObject($mvpId: ID!) {
    setMvp(mvpId: $mvpId)
 }
`

export const ADD_USER_TO_RUN_OBJECT = gql`
 mutation AddUserToRunObject($userId: ID!, $runId: ID!) {
    addUserToRun(userId: $userId, runId: $runId)
 }
`

export const REMOVE_USER_FROM_RUN_OBJECT = gql`
    mutation RemoveUserFromRunObject($userId: ID!, $runId: ID!) {
        removeUserFromRun(userId: $userId, runId: $runId)
    }
`

export const SET_MVP_VOTING_STATUS = gql`
 mutation SetMvpVotingStatus($runId: ID!, $mvpVoteStatus: String!) {
    setMvpVotingStatus(runId: $runId, mvpVoteStatus: $mvpVoteStatus)
 }
`

export const SET_RUN_STATUS = gql`
 mutation SetRunStatus($runId: ID!, $runStatus: String!) {
    setRunStatus(runId: $runId, runStatus: $runStatus)
 }
`
