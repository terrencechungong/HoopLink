import './styles/sidebar-style.scss'
import pic from './ChatSettingComponents/piccy.png';
import { useState } from 'react';
import { GoSidebarCollapse } from "react-icons/go";
import { RiChatNewLine } from "react-icons/ri";
import { GoSidebarExpand } from "react-icons/go";
const SideBar = ({stylingRef, showModal}) => {
    const [expanded, setExpanded] = useState(false);

    let chats = [
        "marker", "revolution", "clip", "branch", "flashlight", "apple", "mirror",
        "basket", "dragon", "orchard", "crayon", "cloud", "spider", "quilt", "arrow",
        "mountain", "ocean", "guitar", "piano", "helicopter", "button", "school",
        "monster", "flower", "bicycle", "balloon", "bottle", "kitten", "window", "book"
    ];

    const toggleShow = () => {
        if (stylingRef.current.style.width == '100%') {
            setExpanded(false);
            stylingRef.current.style.width = '80%'
        } else {
            setExpanded(true);
            stylingRef.current.style.width = '100%'
        }
    }

    return (
        <div className='sidebar-container'>
            <div id="sidebar-buttons-wrapper">

            <button className="sidebar-toggle" onClick={() => toggleShow()}>
                {expanded && <GoSidebarCollapse size={32} />}
                {!expanded && <GoSidebarExpand size={32} />}
            </button>
            <button id="new-chat-creator-button" onClick={() => showModal('NEW_CHAT')}><RiChatNewLine size={30} /></button>
            </div>
            {chats.map(el => (
                <div className='chat-row'>
                    <img src={pic} width="50px" height="50px" style={{ borderRadius: '24px' }} />
                    <p>{el}</p>
                </div>
            ))}
        </div>
    )
}

export default SideBar;