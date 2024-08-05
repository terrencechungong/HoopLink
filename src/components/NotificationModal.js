import Backdrop from "./Backdrop"
import { NotificationType } from "./constants";
import './styles/notification-modal.scss'
import pic from './ChatSettingComponents/piccy.png'
import { IoCheckmarkOutline } from "react-icons/io5";
import { RiCloseLargeFill } from "react-icons/ri";
import { SlClose } from "react-icons/sl";


const NotificationModal = ({ handleClose, notiData }) => {

    let sectionOne;
    if (notiData.type == NotificationType.CHAT_INVITATION) {
        sectionOne = (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div id="close-notification-modal-button" onClick={() => handleClose()}>
                    <SlClose size={22}/>
                </div>
                <h3 style={{ alignSelf: 'center', marginBottom: '19px' }}>Invitation to join "Chat name"</h3>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                    <p style={{ margin: 0 }}><strong>Invited By:</strong></p>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '19px' }}>
                        <img src={pic} width={'30px'} height={'30px'} style={{ borderRadius: '14px' }} />
                        <p>Terrence Chungong</p>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ margin: 0 }}><strong>Chat:</strong></p>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                        <img src={pic} width={'30px'} height={'30px'} style={{ borderRadius: '14px' }} />
                        <p>CHAT NAME</p>
                        <span>&bull;</span>
                        <p><strong>Members: </strong> 100</p>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p><strong>Invitation Valid Until: </strong>tommorow bruh</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p><strong>Date sent:</strong> yesterday cuhz</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-around' }}>
                    <div id="reject-button" className="button">Reject < RiCloseLargeFill size={22}/></div>
                    <div id="accept-button" className="button">Accept < IoCheckmarkOutline size={22}/></div>
                </div>
            </div>
        )
    } else if (notiData.type == NotificationType.FRIEND_REQUEST) {
        sectionOne = (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div id="close-notification-modal-button" onClick={() => handleClose()}>
                    <SlClose size={22}/>
                </div>
                <h3 style={{ alignSelf: 'center', marginBottom: '19px', marginTop:'35px' }}>Friend Request from "Person Name"</h3>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '0px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <img src={pic} width={'30px'} height={'30px'} style={{ borderRadius: '14px' }} />
                        <p>Terrence Chungong</p>
                        <span>&bull;</span>
                        <div id="notification-modal-see-profile-button">See Profile </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                    <p><strong>Date sent:</strong> yesterday cuhz</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-around' }}>
                    <div id="reject-button" className="button">Reject < RiCloseLargeFill size={22}/></div>
                    <div id="accept-button" className="button">Accept < IoCheckmarkOutline size={22}/></div>
                </div>
            </div>
        )
    }

    return (
        <Backdrop closeModal={handleClose}>
            <div
                onClick={(e) => e.stopPropagation()}
                id="notification-modal-container"
            >
                {sectionOne}
            </div>
        </Backdrop>
    )
}

export default NotificationModal;


// Notification data:
// const type = chat_INVITATION;
// {
//     sender: userdata,
//     chat: chatinfo,
//     invitationExpiration: Date,
//     member count,
//     sent Date,
// }

// const type = RUN_INVITATION;
// {
//     sender: userdata,
//     chat: chatinfo,
//     invitationExpiration: Date,
//     member count,
//     sent Date,
// click to see more
// }

// FriendRequest
// {
//     sender: userdata,
// click to see more
// }

// mvp win

// like and comment

// run near you