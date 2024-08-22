import './styles/chat-settings-members.scss'
import defaultpic from './defaultprofile.png'
import { FaPencilAlt } from 'react-icons/fa';
import { FaDoorOpen } from 'react-icons/fa';
import { updateUserObj } from '../../supabase-conf/authUtils';

const ChatSettingsModalSection = ({removeUser, chatId, userId, authId}) => {
    return (
        <div className="chat-settings-modal">
            <div className='chat-photo-settings-modal'>
                <img src={defaultpic} alt="group chat photo" />
                <button><FaPencilAlt/></button>
            </div>
            <div className="chat-settings-modal-section">
                <p><strong>Name:   </strong>NAME HERE</p>
                <button>Edit</button>
            </div>
            <div className="chat-settings-modal-section">
                <p><strong>Description:   </strong>Description HERE</p>
                <button>Edit</button>
            </div>
            <div className="leave-chat-button">
                <button 
                onClick={async () => {
                    const refreshButton = document.getElementById('chat-icon-on-navbar');
                    if (window.confirm("Are you sure you want to leave this chat?")) {
                        await removeUser({
                            variables: {
                                chatId: chatId,
                                userId: userId
                            }
                        })
                        await updateUserObj(authId);
                    }
                    if (refreshButton) {
                        refreshButton.click()
                    }
                }}
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>Leave Chat <FaDoorOpen/></button>
            </div>
        </div>
    )
}

export default ChatSettingsModalSection;