import './styles/chat-settings-members.scss'
import pic from './piccy.png'
import { useEffect, useRef, useState } from 'react';
import defaultpic from './defaultprofile.png'
import { FaPlus } from 'react-icons/fa';
import ReactDOM from 'react-dom/client'
import AddMemberModal from './AddMemberModal';
import { setGlobalVariable, getGlobalVariable, globalVariables } from '../../index';

const ChatMembers = () => {
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