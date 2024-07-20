import { useEffect, useState } from 'react';
import './styles/addmembers-modal.scss'

const AddMemberModal = ({closeModal, settingsModalState, membersModalState}) => {
    const [isUp, setIsUp] = useState(false);


    useEffect(() => {
        const func = function(event) {
            const middleDiv = document.querySelector('.addmembers-modal-container');
            if (!middleDiv) {
                return;
            }
            if (isUp === false) {
                setIsUp(true);
                return;
            }
            if (!middleDiv.contains(event.target)) {
                closeModal();
              setIsUp(false);
            }
          };

        document.addEventListener('click', func);
          return () => {
            document.removeEventListener('click', func);
        };
    })

    return (
            <div className="addmembers-modal">
                <div className='addmembers-modal-container'>
                    yoosdosodsmd
                </div>
            </div>
    )
}

export default AddMemberModal;