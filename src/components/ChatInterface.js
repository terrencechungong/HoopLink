import ChatSettings from './ChatSettings';
import SideBar from './SideBar';
import './styles/chatinterface.scss'
import { useEffect, useRef } from 'react';

const ChatInterface = () => {
    const stylingRef = useRef(null);

    const toggleShow = () => {
        if (stylingRef.current.style.width == '100%') {
            stylingRef.current.style.width = '80%'
        } else {
            stylingRef.current.style.width = '100%'
        }
    }

    return (
        <div className='outermost-parent'>
                    <ChatSettings/>

            <button className="sidebar-toggle" onClick={() => toggleShow()}>press me</button>
            <SideBar />

            <div className="chat-interface-container" ref={stylingRef}>
                <div className="messages-container-outer">
                    <div className='messages-container-middle'>
                        <div className='chat-title'>
                            New Chat!!!
                            <button>chat detail</button>   
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