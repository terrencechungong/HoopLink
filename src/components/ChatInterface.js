import ChatSettings from './ChatSettings';
import SideBar from './SideBar';
import './styles/chatinterface.scss'
import { useRef } from 'react';
import ReactDOM from 'react-dom/client'

const ChatInterface = () => {
    const stylingRef = useRef(null);
    const parentRef = useRef(null);

    // IF MODAL IS ALREADY UP MAKE DISPLAY NOT NONE

    const showSettingsModal = () => {
        const modalDiv = document.createElement('div');
        const modalRoot = ReactDOM.createRoot(modalDiv);
        modalRoot.render(<ChatSettings/>);
        parentRef.current.insertBefore(modalDiv, parentRef.current.firstChild);
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