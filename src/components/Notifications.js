import GlobalSideBar from './GlobalSideBar';
import './styles/notification-screen.scss'
import { Navbar, NotificationType } from './constants';
import pic from './ChatSettingComponents/piccy.png'
import { RiChatNewLine } from "react-icons/ri";
import { LuCrown } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from 'react'
import MvpVoteProgressModal from './MvpVoteProgressModal';
import { AnimatePresence } from 'framer-motion';
import NotificationModal from './NotificationModal';

const Notifications = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationData, setNotificationData] = useState({});
    let notis = [];
    const displayNotifModal = (data) => {
        setNotificationData(data)
        setShowNotification(true);
    }

    for (let i = 0; i <= 2; i++) {
        notis.push(<Notification
            text={`New chat invitation ${i}`}
            isSeen={false}
            links={[]}
            type={NotificationType.CHAT_INVITATION} // make constants
            showModal={displayNotifModal}
        />)
    }

    const hideNotifModal = () => {
        setShowNotification(false);
    }

   

    return (
        <div id="notification-screen">
            <AnimatePresence
                initial={false}
                mode="wait"
            >
                {showNotification && <NotificationModal handleClose={hideNotifModal} notiData={notificationData}/>}
            </AnimatePresence>
            <GlobalSideBar selected={Navbar.NOTIFICATIONS} />
            <div id="notifications-container">
                {notis}
            </div>
        </div>
    )
}

const Notification = ({ text, isSeen, links, type, showModal }) => {

    let button;
    if (type == NotificationType.CHAT_INVITATION) {
        button = <RiChatNewLine size={25} />;
    } else if (type == NotificationType.MVP_VOTING) {
        button = <LuCrown size={25} />;
    } else {
        button = <FaLocationDot size={25} />;
    }

    return (
        <div className='single-notification'>
            <div className='notication-type-icon'>
                {!isSeen && <div className='notification-bubble'></div>}
                {button}
            </div>
            <p>{text}</p>
            <p className='link'
                style={{ cursor: 'pointer' }}
                onClick={() => showModal({type:NotificationType.FRIEND_REQUEST})}
            >See Invitation</p>
        </div>
    )
}

export default Notifications;