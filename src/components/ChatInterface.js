import ChatSettings from './ChatSettings';
import SideBar from './SideBar';
import './styles/chatinterface.scss'
import { useEffect, useRef, useState } from 'react';
import { MdOutlineInfo } from "react-icons/md";
import ReactDOM from 'react-dom/client'
import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
import { BsPaperclip } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

import { setGlobalVariable, globalVariables } from '..';
import { getGlobalVariable } from '..';

const ChatInterface = () => {
    const stylingRef = useRef(null);
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    const [expanded, setExpanded] = useState(false);
    // IF MODAL IS ALREADY UP MAKE DISPLAY NOT NONE
    const invisibleClick = () => {
        console.log()
        if (globalVariables.settingsModalEffect) {
            modalRoot.current.unmount();  // Unmount the React component
            parentRef.current.removeChild(parentRef.current.firstChild);  // Remove the DOM element
            modalLoaded.current = false;
            globalVariables.settingsModalEffect = false;
        }
    }

    const showSettingsModal = () => {
        globalVariables.settingsModalEffect = true;
        const modalDiv = document.createElement('div');
        modalDiv.id = "modal-div-root"
        modalRoot.current = ReactDOM.createRoot(modalDiv);
        modalRoot.current.render(
            <ChatSettings closeModal={invisibleClick} />);
        parentRef.current.insertBefore(modalDiv, parentRef.current.firstChild);
        modalLoaded.current = true;

    }

    const toggleShow = () => {
        if (stylingRef.current.style.width == '100%') {
            setExpanded(false);
            stylingRef.current.style.width = '80%'
        } else {
            setExpanded(true);
            stylingRef.current.style.width = '100%'
        }
    }

    let messages = []
    for (let i = 0; i <= 80; i++) {
        messages.push(<p className="me">yoooyy</p>)
        messages.push(<p className="other">yoooyy</p>)
    }

    return (
        <div id='outermost-parent' className='outermost-parent' ref={parentRef}>

            <button className="sidebar-toggle" onClick={() => toggleShow()}>
                {expanded && <GoSidebarCollapse size={32} />}
                {!expanded && <GoSidebarExpand size={32} />}
            </button>
            <SideBar />

            <div className="chat-interface-container" ref={stylingRef}>
                <div className="messages-container-outer">
                    <div className='messages-container-middle'>
                        <div className='chat-title'>
                            New Chat!!!
                            <button onClick={() => showSettingsModal()}><MdOutlineInfo size={28} /></button>
                        </div>
                        <div className="messages-container-inner">
                            {messages.map(message => message)}
                        </div>
                        <div className="chat-input" >
                            <button id="add-files"><BsPaperclip size={18} /></button>
                            <textarea ></textarea>
                            <button id="send-message"><FiSend size={18} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface;