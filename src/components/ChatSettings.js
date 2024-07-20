import './styles/chat-settings.scss'
import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import ChatMembers from './ChatSettingComponents/ChatMembers';
import ChatAbout from './ChatSettingComponents/ChatAbout';
import ChatFiles from './ChatSettingComponents/ChatFiles';
import ChatSettingsModalSection from './ChatSettingComponents/ChatSettingsModalSection';
import ChatPastRuns from './ChatSettingComponents/ChatPastRuns';

const ChatSettings = ({closeModal, settingsModalState}) => {
    const overlay = useRef(null);
    const [isUp, setIsUp] = useState(false);
    const [current, setCurrent] = useState('Members');
    const [about, setAbout] = useState(false);
    const [members, setMembers] = useState(true);
    const [files, setFiles] = useState(false);
    const [pastRuns, setPastRuns] = useState(false);
    const [settings, setSettings] = useState(false);

    const funcMapper = {
        'About': setAbout,
        'Members': setMembers,
        'Files': setFiles,
        'Past Runs': setPastRuns,
        'Settings': setSettings
    }

    useEffect(() => {
        const fooItems = document.querySelectorAll('.modal-selection-item');

        fooItems.forEach(item => {
            item.onclick = function () {
                handleModalSelection(item.innerText);
            }
        });

        const func = function(event) {
            const middleDiv = document.querySelector('.chatsettings-modal');
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

    const handleModalSelection = (selection) => {
        if (selection !== current) {
            funcMapper[current](false);
            funcMapper[selection](true);
            setCurrent(selection);
        }
    }

// ADD ONCLICK SO IF ANYTHING OTHER THAN THE MIDDLE DIV OR ITS CHILDREN IS CLICKED IT DISSAPEARS

    return (
        <div className="chatsettings-overlay" id="settings-modal" ref={overlay}>
            <div className='chatsettings-modal'>
                <div className='chatsettings-modal-middle'>
                    <div className='modal-screen-selection-bar'>
                        <p className={'modal-selection-item ' + (about == true ? 'selected' : '')}>About</p>
                        <p className={'modal-selection-item ' + (members == true ? 'selected' : '')}>Members</p>
                        <p className={'modal-selection-item ' + (files == true ? 'selected' : '')}>Files</p>
                        <p className={'modal-selection-item ' + (pastRuns == true ? 'selected' : '')}>Past Runs</p>
                        <p className={'modal-selection-item ' + (settings == true ? 'selected' : '')}>Settings</p>
                    </div>
                    <button onClick={() => closeModal()}><FaTimes size={25}/></button>
                </div>
                {members && <ChatMembers settingsModalState={settingsModalState} />}
                {about && <ChatAbout/>}
                {files && <ChatFiles/>}
                {pastRuns && <ChatPastRuns/>}
                {settings && <ChatSettingsModalSection/>}
            </div>
        </div>
    )
}


export default ChatSettings;