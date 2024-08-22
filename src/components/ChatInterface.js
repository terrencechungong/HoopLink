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
import { globalVariables } from '..';
import { useNavigate, useParams } from 'react-router-dom';
import { RiChatNewLine } from "react-icons/ri";
import GlobalSideBar from './GlobalSideBar';
import { Navbar } from './constants';
import { useAuth } from '../context/AuthContext';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_USER_ID_FROM_AUTH_ID, GET_USERS_FRIENDS } from './graphql/queries/UserQueries';
import { CREATE_CHAT } from './graphql/mutations/ChatMutations';
import { useMutation, useSubscription } from '@apollo/client';
import { GET_CHAT_MESSAGES } from './graphql/queries/MessageQueries';
import { GET_USER_CHATS_LIST } from './graphql/queries/ChatQueries';
import { NEW_MESSAGE_SUBSCRIPTION } from './graphql/subscriptions/NewMessage'
import { CREATE_MESSAGE_OBJECT } from './graphql/mutations/MessageMutations';

const ChatInterface = () => {
    const stylingRef = useRef(null);
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [chatMessages, setChatMessages] = useState([])
    const [createChatMutation, createChatData] = useMutation(CREATE_CHAT);
    const navigate = useNavigate();
    const messageContainer = useRef(null);
    const textAreaRef = useRef(null);
    const userObj = JSON.parse(localStorage.getItem('user_object'));
    const { chatId } = useParams();
    const { data: currentChat, loading: loadingCurrentChat, error: errorLoadingChat } = useQuery(GET_CHAT_MESSAGES, {
        variables: {
            chatId: chatId
        }
    });
    console.log(currentChat)
    const [createMessageMutaton, createMessageData] = useMutation(CREATE_MESSAGE_OBJECT);
    const { data: chatData, loading: loadingChatData, error: errorLoadingChats } = useQuery(GET_USER_CHATS_LIST, {
        variables: {
            userId: userObj._id
        }
    });
    const { data, loading, error } = useQuery(GET_USERS_FRIENDS, {
        variables: {
            userId: userObj._id
        }
    });
    const { data: message, loading: messageLoading, error: messageError } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
        variables: { chatId: chatId },
        onData: ({ data }) => {
            console.log(message)
            console.log('New message received:', data.data.messageSent);
            // show new message button
            setChatMessages(prevMessages => [...prevMessages, data.data.messageSent]);
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
            // messageContainer.current.scrollIntoView({ behavior: "smooth" });
            // chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;


        }
    });


    // IF MODAL IS ALREADY UP MAKE DISPLAY NOT NONE

    useEffect(() => {
        if (!loadingCurrentChat) {
            console.log("sdsmid")
            setChatMessages(currentChat.chat.messages)
        }

    }, [loadingCurrentChat]);


    useEffect(() => {
        // console.log(userObj)
        if (messageContainer.current) {
            console.log("snasnfkjsdnkjfnsk")
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
            // messageContainer.current.scrollIntoView({ behavior: "smooth" });

        }

        if (!userObj) {
            navigate('/login')
        }
    });

    const createChatHandler = async (chatData) => {
        await createChatMutation({
            variables: {
                chat: chatData
            }
        })
    }

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
            modal = <ChatSettings
                closeModal={invisibleClick}
                chatMembers={currentChat.chat.chatMembers}
            />
            globalVariables.settingsModalEffect = true;

        } else {
            console.log(data.getUserFriends)
            modal = <NewChatModal
                closeModal={invisibleClick}
                createChat={createChatHandler}
                usersFriends={data.getUserFriends}
                creatorId={userObj._id}
            />;
            globalVariables.newChatModalEffect = true;
        }

        const modalDiv = document.createElement('div');
        modalDiv.id = "modal-div-root"
        modalRoot.current = ReactDOM.createRoot(modalDiv);
        modalRoot.current.render(modal);
        parentRef.current.insertBefore(modalDiv, parentRef.current.firstChild);
        modalLoaded.current = true;
    }

    const executeCreateMessage = async () => {
        // add files later
        const text = textAreaRef.current.value;
        console.log("inner text", text)
        await createMessageMutaton({
            variables:
            {
                message: {
                    sender: userObj._id,
                    chat: chatId,
                    text: text,
                }
            }
        })
    }

    if (loadingChatData || loadingCurrentChat) {
        return <p>Loading...</p>
    } else {
        console.log(errorLoadingChat, currentChat, errorLoadingChat)
        return (
            <div id='outermost-parent' className='outermost-parent' ref={parentRef}>
                <GlobalSideBar selected={Navbar.CHATS} />



                <SideBar chatData={chatData.getUserChats} stylingRef={stylingRef} showModal={showModal} />



                <div id="chat-interface-container" ref={stylingRef}>
                    <div className="messages-container-outer">
                        <div className='messages-container-middle' ref={messageContainer}>
                            <div className='chat-title'>
                                {currentChat.chat.chatName}
                                <button onClick={() => showModal('SETTINGS')}><MdOutlineInfo size={28} /></button>
                            </div>
                            <div className="messages-container-inner" >
                                {chatId !== 'NEW_CHAT' ? chatMessages.map((message) => {
                                    // console.log(JSON.stringify(message.sender));
                                    // console.log(userObj._id)
                                    // console.log(JSON.stringify(userObj));
                                    // console.log(userObj._id == message.sender._id);
                                    // console.log(userObj._id, message.sender);

                                    return (
                                        <div style={{ alignSelf: (message.sender._id == userObj._id) ? 'flex-end' : "" }}>
                                            <p style={{ color: 'grey', alignSelf: (message.sender._id == userObj._id) ? 'flex-end' : "", fontSize: '14px' }}>{message.sender.username}</p>
                                            <div style={{ display: 'flex', flexDirection: (message.sender._id == userObj._id) ? 'row-reverse' : 'row', gap: '4px' }}>
                                                <img style={{ width: '45px', height: '45px', borderRadius: '25px' }} src={message.sender.profilePhoto} />
                                                <p className={message.sender._id == userObj._id ? "me" : "other"}>{message.text}</p>
                                            </div>
                                        </div>

                                    );

                                }) :

                                    <p>Start a new Chat!</p>

                                }
                            </div>
                            <div className="chat-input" >
                                <button id="add-files"><BsPaperclip size={18} /></button>
                                <textarea ref={textAreaRef}></textarea>
                                <button onClick={() => { executeCreateMessage() }} id="send-message"><FiSend size={18} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatInterface;