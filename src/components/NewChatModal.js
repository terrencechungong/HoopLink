
import { useEffect, useState } from 'react';
import './styles/new-chat-modal.scss'
import { globalVariables } from '..';
import { SlClose } from "react-icons/sl";

const NewChatModal = ({closeModal}) => {
    const [isUp, setIsUp] = useState(false)

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

    })

    return (
        <div className="new-chat-modal-overlay">
            <div className="new-chat-modal-container">
                <h1><strong>Create a new Chat!</strong></h1>
                <button id="close-create-new-chat-modal" onClick={closeModal}><SlClose size={25}/></button>
                <div>
                    <h2><strong>Chat Name: </strong></h2>
                    <input type="text" placeholder='e.g. New chat name'/>
                </div>
                <div>
                    <h2><strong>Description: </strong></h2>
                    <textarea placeholder='Ex: Chat for the greatest hoopers in the city'></textarea>
                </div>
                <div>
                    <h2><strong>Add members to your new chat: </strong></h2>
                    <input type="text" />
                </div>
                <button>Create</button>
            </div>
        </div>
    );
} 

export default NewChatModal;