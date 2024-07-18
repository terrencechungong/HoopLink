import './styles/chat-settings.scss'
import { useEffect, useRef, useState } from 'react';

const ChatSettings = () => {
    const overlay = useRef(null);
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
        <div className="chatsettings-overlay" ref={overlay}>
            <div className='chatsettings-modal'>
                <div className='chatsettings-modal-middle'>
                    <div className='modal-screen-selection-bar'>
                        <p className={'modal-selection-item ' + (about == true ? 'selected' : '')}>About</p>
                        <p className={'modal-selection-item ' + (members == true ? 'selected' : '')}>Members</p>
                        <p className={'modal-selection-item ' + (files == true ? 'selected' : '')}>Files</p>
                        <p className={'modal-selection-item ' + (pastRuns == true ? 'selected' : '')}>Past Runs</p>
                        <p className={'modal-selection-item ' + (settings == true ? 'selected' : '')}>Settings</p>
                    </div>
                    <button>X</button>
                </div>
            </div>
        </div>
    )
}


export default ChatSettings;