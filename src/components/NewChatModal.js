
import { useEffect, useState } from 'react';
import './styles/new-chat-modal.scss'
import { globalVariables } from '..';

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
                <div>
                    <h2>Chat Name: </h2>
                    <input type="text" />
                </div>
                <div>
                    <h2>Description: </h2>
                    <textarea></textarea>
                </div>
                <div>
                    <h2>Add members to your new chat: </h2>
                    <input type="text" />
                </div>
                <button>Create</button>
            </div>
        </div>
    );
} 

export default NewChatModal;