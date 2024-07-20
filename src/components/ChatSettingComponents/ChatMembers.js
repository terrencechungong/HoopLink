import './styles/chat-settings-members.scss'
import pic from './piccy.png'
import defaultpic from './defaultprofile.png'

const ChatMembers = () => {
    const names = ["Liam", "Emma", "Noah", "Olivia", "William", "Ava", "James", "Isabella", "Oliver", "Sophia"];

    return (
        <div className="chat-members-modal">
            <div className="chat-member-row">
                    <img src={defaultpic} />
                    <p>+ add a member</p>
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