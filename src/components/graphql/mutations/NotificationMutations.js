import { gql } from '@apollo/client'

export const CREATE_NOTIFICATION_MUTATION = gql`
    mutation CreateNotification ($notif: CreateNotificationInput!){
        createNotification(notif: $notif) {
            _id
        }
 }
`

export const SET_NOTIFICATION_SEEN = gql`
    mutation SetNotificationSeen($notifId: ID!) {
        setSeen(notifId: $notifId) {
            _id
        }
    }
`