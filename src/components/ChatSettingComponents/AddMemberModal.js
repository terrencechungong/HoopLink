import { useEffect, useState } from 'react';
import './styles/addmembers-modal.scss'
import { globalVariables } from '../..';

const AddMemberModal = ({ closeModal }) => {
    const [isUp, setIsUp] = useState(false);


    useEffect(() => {

        const func = function (event) {
            if (globalVariables.addMembersModalEffect) {

                const middleDiv = document.querySelector('.addmembers-modal-container');
                if (!middleDiv) {
                    return;
                }
                if (isUp === false) {
                    setIsUp(true);
                    return;
                }
                console.log("memberessss")
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
        <div className="addmembers-modal">
            <div className='addmembers-modal-container'>
                <h2>Add people to New Chat</h2>
                <input className='addmembers-search-bar' />
            </div>
        </div>
    )
}

export default AddMemberModal;