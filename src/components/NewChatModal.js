
import { useEffect, useState } from 'react';
import './styles/new-chat-modal.scss'
import { globalVariables } from '..';
import { SlClose } from "react-icons/sl";
import pic from '../components/ChatSettingComponents/piccy.png'
import { IoCloseCircleOutline } from "react-icons/io5";
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NewChatModal = ({ closeModal }) => {
    const [isUp, setIsUp] = useState(false);
    const [showFriendsList, setShowFriendsList] = useState(false);
    const index = useRef(0);
    const [addedUsers, setAddedUsers] = useState([]);
    const [userOptions, setUserOptions] = useState([]);

    useEffect(() => {
        const func = function (event) {
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
    let strings = ['sdjfnaskdfjnsjdnfksadf', "yoo", "terrence", "chungong", "sds"]
    let peopleOptions = [];
    let pplOps2 = [];
    for (let i = 0; i < 1; i++) {
        peopleOptions.push(
            <div data-key={`${i}`} className='individual-dropdown-selection'
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation()
                    console.log(Number(e.currentTarget.getAttribute('data-key')));
                }}
            >
                <img src={pic} />
                <p>
                    {`${concatNameForDropDown(strings[i])}`}
                </p>
            </div>)

        pplOps2.push(
            <div id={`person${i}`} className='individual-dropdown-selection'
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation()
                    console.log(Number(e.currentTarget.getAttribute('data-key')));
                }}
            >
                <img src={pic} />
                <p>
                    {`${concatNameForDropDown(strings[i])}`}
                </p>
                <IoCloseCircleOutline size={15} />
            </div>)
    }

    const addUserToSection = () => {
        if (index.current == 1) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '246px';
        }
        if (index.current == 2) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '366px';
        }
        setAddedUsers((prev) => [...prev, { profilePhoto: pic, name: "eiroerieoir", id: uuidv4() }]);
        index.current += 1
    }

    const removeFromUserSection = (userId) => {
        setAddedUsers(addedUsers.filter(user => user.id !== userId));
        if (index.current == 3) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '246px';
        }
        if (index.current == 2) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '126px';
        }
        index.current -= 1
    }


    const addUserToOptions = () => {

    }

    const removeUserFromOptions = () => {

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
                            <div id={`added-person-${index}`} className='individual-dropdown-selection'
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation()
                                }}
                            >
                                <img src={user.profilePhoto} />
                                <p>
                                    {`${concatNameForDropDown(user.name)}`}
                                </p>
                                <IoCloseCircleOutline size={15} onClick={() => {removeFromUserSection(user.id)}}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{position:'relative'}}>
                {true && <div className='selection-options-added-members' onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation()
                    }}>
                        {peopleOptions} {peopleOptions}
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