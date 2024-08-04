import { useMutation, gql } from '@apollo/client'

const CREATE_USER_MUTATION = gql`
mutation CreateUser($input: CreateUserInput!) {
    createUser(user: $input) {
        firstName
    }
}`

const CREATE_NOTIFICATION_MUTATION = gql`
mutation CreateNotification ($notif: CreateNotificationInput!){
  createNotification(notif: $notif) {
    _id
    text
    type
    userId
  }
 }
`

const CREATE_FILE_MUTATION = gql`
    mutation CreateFile($file: CreateFileInput!) {
        createFile(file: $file) {
            _id
            postId
            messageId
            awsUri
        }
    }
`

const CREATE_COMMENT_MUTATION = gql`
 mutation CreateComment($comment: CreateCommentInput!) {
   createComment(comment: $comment) {
     _id
   }
 }
`

const CREATE_CHAT_MUTATION = gql`
    mutation CreateChat($chat: CreateChatInput) {
        createChat(chat: $chat) {
            chatName
            _id
        }
    }
`

const CREATE_CHAT_FOR_USER = gql`
 mutation CreateChatForuser($chatForUser: CreateChatForUserInput) {
   createChatForUser(chatForUser: $chatForUser) {
     chatId
     _id
     lastMessageTime
     userId
   }
 }
`

const CREATE_RUN_MUTATION = gql`
 mutation CreateRun($run: CreateRunInput!) {
   createRun(run: $run) {
     _id
     runName
     mvpVotingStatus
   }
 }
`