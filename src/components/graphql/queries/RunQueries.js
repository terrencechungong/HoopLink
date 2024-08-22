import { gql } from '@apollo/client'

export const GET_USER_RUNS_LIST = gql`
  query GetUserRuns($userId: ID!) {
        getUserRuns(userId: $userId) {
            _id
            runName
            runCreator {
              _id
              authId
              profilePhoto
              username
            }
            runStatus
            mvpVotingStatus
            location
            players {
              _id
              profilePhoto
              username
            }
        }
    }
`

export const GET_RUN_DATA = gql`
    query GetRunData($runId: ID!) {
  run(_id: $runId) {
    _id
    runName
    location
    runStatus
    startDate
    startTime
    mvpVotingStatus
    runCreator {
      authId
      profilePhoto
      username
    }
    players {
      _id
      profilePhoto
      username
    }
    mvpVotes {
      voter {
        _id
      }
      nominee {
        _id
      }
    }
  }
}
`