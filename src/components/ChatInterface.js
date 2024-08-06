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
import NewChatModal from './NewChatModal';
import { setGlobalVariable, globalVariables } from '..';
import { getGlobalVariable } from '..';
import { useNavigate } from 'react-router-dom';
import { RiChatNewLine } from "react-icons/ri";
import GlobalSideBar from './GlobalSideBar';
import { Navbar } from './constants';

const ChatInterface = () => {
    const stylingRef = useRef(null);
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    // IF MODAL IS ALREADY UP MAKE DISPLAY NOT NONE

    useEffect(() => {
        if (globalVariables.user == null) {
            // console.log("no user");
            // navigate('/login');
        }
        console.log(globalVariables.user);
    })

    const invisibleClick = () => {
        console.log()

        if (globalVariables.settingsModalEffect) {
            modalRoot.current.unmount();  // Unmount the React component
            parentRef.current.removeChild(parentRef.current.firstChild);  // Remove the DOM element
            modalLoaded.current = false;
            globalVariables.settingsModalEffect = false;
        }
        if (globalVariables.newChatModalEffect) {
            modalRoot.current.unmount();  // Unmount the React component
            parentRef.current.removeChild(parentRef.current.firstChild);  // Remove the DOM element
            modalLoaded.current = false;
            globalVariables.newChatModalEffect = false;
        }


    }

    const showModal = (modalType) => {
        let modal;
        if (modalType == 'SETTINGS') {
            modal = <ChatSettings closeModal={invisibleClick} />
            globalVariables.settingsModalEffect = true;

        } else {
            modal = <NewChatModal closeModal={invisibleClick} />;
            globalVariables.newChatModalEffect = true;
        }

        const modalDiv = document.createElement('div');
        modalDiv.id = "modal-div-root"
        modalRoot.current = ReactDOM.createRoot(modalDiv);
        modalRoot.current.render(modal);
        parentRef.current.insertBefore(modalDiv, parentRef.current.firstChild);
        modalLoaded.current = true;
    }


    let messages = []
    for (let i = 0; i <= 80; i++) {
        messages.push(<p className="me">yoooyy</p>)
        messages.push(<p className="other">yoooyy</p>)
    }

    return (
        <div id='outermost-parent' className='outermost-parent' ref={parentRef}>
            <GlobalSideBar selected={Navbar.CHATS}/>
            <SideBar stylingRef={stylingRef} showModal={showModal}/>

            <div id="chat-interface-container" ref={stylingRef}>
                <div className="messages-container-outer">
                    <div className='messages-container-middle'>
                        <div className='chat-title'>
                            New Chat!!!
                            <button onClick={() => showModal('SETTINGS')}><MdOutlineInfo size={28} /></button>
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