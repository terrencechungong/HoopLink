import { useMutation, gql } from '@apollo/client'

export const CREATE_NOTIFICATION_MUTATION = gql`
mutation CreateNotification ($notif: CreateNotificationInput!){
  createNotification(notif: $notif) {
    _id
    text
    type
    userId
  }
 }
`
