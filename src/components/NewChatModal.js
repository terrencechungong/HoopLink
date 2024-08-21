import { useEffect, useState } from 'react';
import './styles/new-chat-modal.scss'
import './styles/add-and-display-users.scss'
import { globalVariables } from '..';
import { SlClose } from "react-icons/sl";
import { useRef } from 'react';
import { AddedUsersDropdown, AddedUserDisplay } from './AddUsersDropdown';


const NewChatModal = ({ closeModal, createChat, creatorId, usersFriends }) => {
    const [isUp, setIsUp] = useState(false);
    const [showFriendsList, setShowFriendsList] = useState(false);
    const [addedUsers, setAddedUsers] = useState([]);
    const [userFocused, setUserFocused] = useState(false);
    const [userOptions, setUserOptions] = useState(usersFriends);
    const index = useRef(0);

    useEffect(() => {
        const func = function (event) {
            if (userFocused) { setUserFocused(false) }
            if (globalVariables.newChatModalEffect) {
                const middleDiv = document.querySelector('.new-chat-modal-container');
                if (!middleDiv) {
                    return;
                }
                if (isUp === false) {
                    setIsUp(true);
                    return;
                }
                console.log("settings")
                if (!middleDiv.contains(event.target)) {
                    closeModal();
                    setIsUp(false);
                }
            };
        }

        document.addEventListener('click', func);

        return () => {
            document.removeEventListener('click', func);
        };

    });

    const executeCreateChat = async () => {
        // get data
        // users is addedUsers ids


        // chatName: String!
        const chatName = document.getElementById('chat-name-input').value;
        if (chatName == "") {
            alert("must have a chat name");
            return
        }
        // chatCreator: User
        const chatCreator = creatorId;
        // chatMembers: [User!]
        const chatMembers = addedUsers.map(user => user._id).concat([creatorId]); // add the creator
        // isDm: Boolean! 
        const isDm = chatMembers.length == 2;
        // creationTime: String!
        const creationTime = (new Date()).toISOString();
        // lastMessageTime: String change this
        const lastMessageTime = (new Date()).toISOString();
        // isRunChat: Boolean!
        const isRunChat = false;
        // isActive: Boolean!
        const isActive = true;


        await createChat({
            chatName,
            chatCreator,
            chatMembers,
            isDm,
            creationTime,
            lastMessageTime,
            isRunChat,
            isActive,
            chatCreator
        })

    }

    const removeFromUserSection = (userId) => {
        const user = addedUsers.find(user => user._id === userId);
        setAddedUsers(addedUsers.filter(user => user._id !== userId));
        if (index.current == 2) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '246px';
        }
        if (index.current == 1) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '126px';
        }
        index.current -= 1;
        // addUserToOptions(user)
    }




    // on hover show more info asbout the user

    return (
        <div className="new-chat-modal-overlay">
            <div className="new-chat-modal-container">
                <h1><strong>Create a new Chat!</strong></h1>
                <button id="close-create-new-chat-modal" onClick={closeModal}><SlClose size={25} /></button>
                <div>
                    <h2><strong>Chat Name: </strong></h2>
                    <input id="chat-name-input" type="text" placeholder='e.g. New chat name' />
                </div>
                <AddedUserDisplay
                    addedUsers={addedUsers}
                    removeFromUserSection={removeFromUserSection}
                    setUserFocused={setUserFocused}
                    modalType={"new chat"} />

                <div style={{ position: 'relative' }}>
                    {userFocused && <AddedUsersDropdown
                        userOptionState={[userOptions, setUserOptions]}
                        addedUsersState={[addedUsers, setAddedUsers]}
                        index={index}
                    />
                    }
                    <h2><strong>Description: </strong></h2>
                    <textarea placeholder='Ex: Chat for the greatest hoopers in the city'></textarea>
                </div>
                <button onClick={() => { executeCreateChat() }}>Create</button>
            </div>
        </div>
    );
}

export default NewChatModal;