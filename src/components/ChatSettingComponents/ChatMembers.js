import './styles/chat-settings-members.scss'
import pic from './piccy.png'
import { useEffect, useRef, useState } from 'react';
import defaultpic from './defaultprofile.png'
import { CiSquarePlus } from "react-icons/ci";
import ReactDOM from 'react-dom/client'
import AddMemberModal from './AddMemberModal';
import { setGlobalVariable, getGlobalVariable, globalVariables } from '../../index';

const ChatMembers = ({ chatMembers }) => {
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    const names = ["Liam", "Emma", "Noah", "Olivia", "William", "Ava", "James", "Isabella", "Oliver", "Sophia"];
    const outerMostParent = document.getElementById('outermost-parent');

    const closeModal = () => {
        if (globalVariables.addMembersModalEffect) {
            globalVariables.addMembersModalEffect = false;
            modalRoot.current.unmount();  // Unmount the React component
            outerMostParent.removeChild(outerMostParent.firstChild);  // Remove the DOM element
            modalLoaded.current = false;
            globalVariables.settingsModalEffect = true;
        }
    }

    const addMemberClick = () => {
        globalVariables.addMembersModalEffect = true;
        globalVariables.settingsModalEffect = false

        console.log("sdsd");
        console.log(globalVariables.settingsModalEffect)
        console.log(globalVariables.addMembersModalEffect)
        const modalDiv = document.createElement('div');
        modalDiv.id = "modal-div-root-members"
        modalRoot.current = ReactDOM.createRoot(modalDiv);

        modalRoot.current.render(<AddMemberModal closeModal={closeModal} />);
        outerMostParent.insertBefore(modalDiv, outerMostParent.firstChild);
        modalLoaded.current = true;

    }



    return (
        <div className="chat-members-modal" ref={parentRef}>
            <div className="chat-member-row member-add" onClick={() => addMemberClick()}>
                <img src={defaultpic} />
                <button style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}><CiSquarePlus size={22} /> Add a member</button>
            </div>
            {chatMembers.map(user =>
                <div className="chat-member-row" style={{ cursor: 'pointer' }}
                    onClick={() => {
                        const aTag = document.getElementById(`${user.authId}`);
                        if (aTag) aTag.click();
                    }}>
                    <a id={user.authId} href={`/profile/${user.authId}`} />
                    <img src={user.profilePhoto} />
                    <p>{user.username}</p>
                </div>
            )}
        </div>
    )
}

export default ChatMembers;