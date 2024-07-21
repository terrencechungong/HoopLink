
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

            </div>
        </div>
    );
} 

export default NewChatModal;