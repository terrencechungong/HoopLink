import './styles/chat-settings-members.scss'
import pic from './piccy.png'
import defaultpic from './defaultprofile.png'
import { FaPlus } from 'react-icons/fa';

const ChatMembers = () => {
    const names = ["Liam", "Emma", "Noah", "Olivia", "William", "Ava", "James", "Isabella", "Oliver", "Sophia"];

    return (
        <div className="chat-members-modal">
            <div className="chat-member-row">
                    <img src={defaultpic} />
                    <p><FaPlus/> Add a member</p>
                </div>
            {names.map(name =>
                 <div className="chat-member-row">
                    <img src={pic} />
                    <p>{name}</p>
                </div>
                )}
        </div>
    )
}

export default ChatMembers;