import './styles/chat-settings-members.scss'
import defaultpic from './defaultprofile.png'
import { FaPencilAlt } from 'react-icons/fa';
import { FaDoorOpen } from 'react-icons/fa';

const ChatSettingsModalSection = () => {
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
                <button>Leave Chat <FaDoorOpen/></button>
            </div>
        </div>
    )
}

export default ChatSettingsModalSection;