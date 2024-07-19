import ChatSettings from './ChatSettings';
import SideBar from './SideBar';
import './styles/chatinterface.scss'
import { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client'

const ChatInterface = () => {
    const stylingRef = useRef(null);
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    // IF MODAL IS ALREADY UP MAKE DISPLAY NOT NONE
    const invisibleClick = () => {
        console.log("sdsds")
        modalRoot.current.unmount();  // Unmount the React component
        parentRef.current.removeChild(parentRef.current.firstChild);  // Remove the DOM element
        modalLoaded.current = false;
    }

    const showSettingsModal = () => {
            const modalDiv = document.createElement('div');
            modalDiv.id = "modal-div-root"
            modalRoot.current = ReactDOM.createRoot(modalDiv);
            modalRoot.current.render(<ChatSettings closeModal={invisibleClick}/>);
            parentRef.current.insertBefore(modalDiv, parentRef.current.firstChild);
            modalLoaded.current = true;
    }

    const toggleShow = () => {
        if (stylingRef.current.style.width == '100%') {
            stylingRef.current.style.width = '80%'
        } else {
            stylingRef.current.style.width = '100%'
        }
    }

    return (
        <div className='outermost-parent' ref={parentRef}>

            <button className="sidebar-toggle" onClick={() => toggleShow()}>press me</button>
            <SideBar />

            <div className="chat-interface-container" ref={stylingRef}>
                <div className="messages-container-outer">
                    <button id="hidden-button" onClick={() => invisibleClick()} style={{display:'none'}}></button>
                    <div className='messages-container-middle'>
                        <div className='chat-title'>
                            New Chat!!!
                            <button onClick={() => showSettingsModal()}>chat detail</button>
                        </div>
                        <div className="messages-container-inner">
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>

                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                            <p className="me">yoooyy</p>
                            <p className="other">toooooo</p>
                        </div>
                        <div className="chat-input" >
                            <button>Add File</button>
                            <textarea ></textarea>
                            <button>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface;