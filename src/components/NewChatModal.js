
import { useEffect, useState } from 'react';
import './styles/new-chat-modal.scss'
import { globalVariables } from '..';
import { SlClose } from "react-icons/sl";
import pic from '../components/ChatSettingComponents/piccy.png'
import { IoCloseCircleOutline } from "react-icons/io5";
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CiSquarePlus } from "react-icons/ci";

const NewChatModal = ({ closeModal }) => {
    const [isUp, setIsUp] = useState(false);
    const [showFriendsList, setShowFriendsList] = useState(false);
    const index = useRef(0);
    const [addedUsers, setAddedUsers] = useState([]);
    const [userFocused, setUserFocused] = useState(false)
    const [userOptions, setUserOptions] = useState([{ profilePhoto: pic, name: "eiroerieoir", id: uuidv4() },
    { profilePhoto: pic, name: "eiroerieoir", id: uuidv4() },
    { profilePhoto: pic, name: "eiroerieoir", id: uuidv4() },
    { profilePhoto: pic, name: "eiroerieoir", id: uuidv4() },
    { profilePhoto: pic, name: "eiroerieoir", id: uuidv4() },
    { profilePhoto: pic, name: "eiroerieoir", id: uuidv4() }
    ]);

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


    const concatNameForDropDown = (text) => {
        if (text.length > 14) {
            return `${text.substring(0, 13)}...`
        } else {
            return text
        }
    }


    const addUserToSection = (userId) => {
        if (index.current == 0) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '246px';
        }
        if (index.current == 1) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '366px';
        }
        const user = userOptions.find(user => user.id === userId);
        setAddedUsers((prev) => [...prev, user]);
        index.current += 1;
        // removeUserFromOptions(userId)
    }

    const removeFromUserSection = (userId) => {
        const user = addedUsers.find(user => user.id === userId);
        setAddedUsers(addedUsers.filter(user => user.id !== userId));
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
                    <input type="text" placeholder='e.g. New chat name' />
                </div>
                <div>
                    <h2><strong>Add members to your new chat: </strong></h2>
                    <div id='added-members-to-section'>
                        {addedUsers.map((user, index) => (
                            <div key={user.id} id={`added-person-${index}`} className='individual-dropdown-selection'
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation()
                                    // removeUserFromOptions(user.id)
                                }}
                            >
                                <img src={user.profilePhoto} />
                                <p>
                                    {`${concatNameForDropDown(user.name)}`}
                                </p>
                                <IoCloseCircleOutline size={15} onClick={() => { removeFromUserSection(user.id) }} />
                            </div>
                        ))}
                        <div className='individual-dropdown-selection'
                            onClick={(e) => {
                                setUserFocused(true); e.stopPropagation()
                                e.stopPropagation()
                            }}
                        >
                            <p>Choose friends to add</p>
                        </div>
                    </div>
                </div>
                <div style={{ position: 'relative' }}>
                    {userFocused && <div className='selection-options-added-members' onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation()
                    }}>
                        {userOptions.filter(userOption => !addedUsers.some(addedUser => addedUser.id === userOption.id))
                            .map((user, index) =>
                                <div key={user.id} id={`user-${index}`} className='individual-dropdown-selection'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addUserToSection(user.id);
                                    }}
                                >
                                    <img src={user.profilePhoto} />
                                    <p>
                                        {`${concatNameForDropDown(user.name)}`}
                                    </p>
                                </div>)}
                    </div>}
                    <h2><strong>Description: </strong></h2>
                    <textarea placeholder='Ex: Chat for the greatest hoopers in the city'></textarea>
                </div>
                <button onClick={() => { addUserToSection() }}>Create</button>
            </div>
        </div>
    );
}

export default NewChatModal;