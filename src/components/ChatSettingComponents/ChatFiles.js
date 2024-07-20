import pic from './piccy.png'
import defaultpic from './defaultprofile.png'
import { FaPlus } from 'react-icons/fa';


const ChatFiles = () => {
    const names = ["Liam.jpg", "Emma", "Noah", "Olivia", "William", "Ava", "James", "Isabella", "Oliver", "Sophia"];

    return (
        <div className="chat-files-modal">

            {names.map(name =>
                <div className="chat-file-row">
                    <img src={pic} />
                    <div>
                        <p>{name}</p>
                        <i>Shared by {name} on yesterday</i>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChatFiles;