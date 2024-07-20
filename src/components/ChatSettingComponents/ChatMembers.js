import './styles/chat-settings-members.scss'
import pic from './piccy.png'
import { useEffect, useRef, useState } from 'react';
import defaultpic from './defaultprofile.png'
import { FaPlus } from 'react-icons/fa';
import AddMemberModal from './AddMemberModal';
import ReactDOM from 'react-dom/client'

const ChatMembers = ({ settingsModalState }) => {
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    const [settingsModalEffect, setSettingsModalEffect] = settingsModalState;
    const [addMembersModalEffect, setAddMembersModalEffect] = useState(false);
    const membersModalState = [addMembersModalEffect, setAddMembersModalEffect]
    const names = ["Liam", "Emma", "Noah", "Olivia", "William", "Ava", "James", "Isabella", "Oliver", "Sophia"];
    const outerMostParent = document.getElementById('outermost-parent');


    useEffect(() => {
        if (addMembersModalEffect) {
            const modalDiv = document.createElement('div');
            modalDiv.id = "modal-div-root-members"
            modalRoot.current = ReactDOM.createRoot(modalDiv);
            modalRoot.current.render(<AddMemberModal closeModal={closeModal}/>);
            outerMostParent.insertBefore(modalDiv, outerMostParent.firstChild);
            modalLoaded.current = true;
        }
    }, [addMembersModalEffect])

    const closeModal = () => {
        if (addMembersModalEffect) {
            setAddMembersModalEffect(false);
            modalRoot.current.unmount();  // Unmount the React component
            outerMostParent.removeChild(outerMostParent.firstChild);  // Remove the DOM element
            modalLoaded.current = false;
            setSettingsModalEffect(true);
        }
    }

    const addMemberClick = () => {
        setSettingsModalEffect(false);
        setAddMembersModalEffect(true);
    }


    useEffect(() => {
        // console.log(addMembersModalEffect);
    })

    return (
        <div className="chat-members-modal" ref={parentRef}>

            <div className="chat-member-row member-add" onClick={() => addMemberClick()}>
                <img src={defaultpic} />
                <button><FaPlus /> Add a member</button>
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