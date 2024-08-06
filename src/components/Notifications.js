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
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { PiCourtBasketballDuotone } from "react-icons/pi";

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
            type={NotificationType.RUN_NEARBY} // make constants
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

    let button, content;
    if (type == NotificationType.CHAT_INVITATION) {
        button = <RiChatNewLine size={25} />;
        content = (
            <div className='chat-invitation-content'>
                <p>New Chat invitation</p>
            </div>
        );
    } else if (type == NotificationType.MVP_VOTING) {
        button = <LuCrown size={25} />;
        content = (
            <div className='mvp-voting-content'>
                <p style={{fontSize:'12px', color:'grey'}}><strong>MVP Voting for "RUN NAME" is complete!</strong></p>
            </div>
        );
    } else if  (type == NotificationType.FRIEND_REQUEST) {
        button = <IoPersonAddSharp size={25} />;
        content = (
            <div className='friend-request-content'>
                <p style={{fontSize:'12px', color:'grey'}}><strong>Friend Request from Darell</strong></p>
            </div>
        );
    } else if  (type == NotificationType.POST_LIKE) {
        button = <FaRegThumbsUp size={25} />;
        content = (
            <div className='post-like-content'>
                <p style={{fontSize:'12px', color:'grey'}}><strong>Darell liked your post</strong></p>
            </div>
        );
     }else if  (type == NotificationType.POST_COMMENT) {
        button = <FaRegCommentDots size={25} />;
        content = (
            <div className='post-comment-content'>
                <p style={{fontSize:'9px', color:'grey'}}><strong>Darell commented on your post</strong></p>
                <p style={{fontSize:'14px'}}> content</p>
            </div>
        );
    } else {  
        button = <PiCourtBasketballDuotone size={25} />;
        content = (
            <div className='post-comment-content'>
                <p style={{fontSize:'9px', color:'grey'}}><strong>A run near you is coming up!</strong></p>
                <p style={{fontSize:'14px'}}>5 miles away</p>
            </div>
        );
    }

    return (
        <div className='single-notification'>
            <div className='notication-type-icon'>
                {!isSeen && <div className='notification-bubble'></div>}
                {button}
            </div>
            {content}
            <p className='link'
                style={{ cursor: 'pointer', fontSize:'10px' }}
                onClick={() => showModal({type:NotificationType.FRIEND_REQUEST})}
            >See Invitation</p>
        </div>
    )
}

export default Notifications;