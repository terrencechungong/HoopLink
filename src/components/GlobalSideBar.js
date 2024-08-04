import './styles/globalnavbar.scss'
import { FaRegNewspaper } from "react-icons/fa";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const GlobalSideBar = ({selected}) => {
    // feed, runsfeed, chats, profile, notifications MAKE RED CIRCLE
    const navigate = useNavigate();
    return (
        <div id="navbar-container">
            <button onClick={() => navigate('/feed')}><FaRegNewspaper size={28}/></button>
            <button onClick={() => navigate('/runs-feed')}><MdOutlineSportsBasketball size={28}/></button>
            <button onClick={() => navigate('/chats')}><IoChatbubbleOutline size={28}/></button>
            <button onClick={() => navigate('/single-profile-view')}><IoPersonCircleOutline size={28}/></button>
            <button onClick={() => navigate('/notifications')}><FaRegBell size={28}/></button>   
        </div>
    )
}

export default GlobalSideBar;