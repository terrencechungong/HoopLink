import GlobalSideBar from './GlobalSideBar';
import './styles/notification-screen.scss'
import { Navbar, NotificationType } from './constants';
import pic from './ChatSettingComponents/piccy.png'
import { RiChatNewLine } from "react-icons/ri";
import { LuCrown } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";

const Notifications = () => {

    let notis = [];
    for (let i = 0; i <= 20; i++) {
        notis.push(<Notification
            text={"jdkfdfdf"}
            isSeen={false}
            links={[]}
            type={NotificationType.MVP_VOTING} // make constants
        />)
    }

    return (
        <div id="notification-screen">
            <GlobalSideBar selected={Navbar.NOTIFICATIONS} />
            <div id="notifications-container">
                {notis}
            </div>
        </div>
    )
}

const Notification = ({ text, isSeen, links, type }) => {

    let button;
    if (type == NotificationType.CHAT_INVITATION) {
        button = <RiChatNewLine size={25}/>;
    } else if (type == NotificationType.MVP_VOTING) {
        button = <LuCrown size={25}/>;
    } else {
        button = <FaLocationDot size={25}/>;
    }

    return (
        <div className='single-notification'>
            <div className='notication-type-icon'>
                {!isSeen && <div className='notification-bubble'></div>}
                {button}
            </div>
            <p>{text}</p>
            <p className='link'>See Invitation</p>
        </div>
    )
}

export default Notifications;