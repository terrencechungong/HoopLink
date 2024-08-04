import './styles/globalnavbar.scss'
import { FaRegNewspaper } from "react-icons/fa";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Navbar } from './constants';

const GlobalSideBar = ({selected}) => {
    // feed, runsfeed, chats, profile, notifications MAKE RED CIRCLE
    const navigate = useNavigate();

    return (
        <div id="navbar-container">
            <button 
                onClick={() => navigate('/feed')}
                className={`${selected == Navbar.FEED ? 'selected' : ''}`}
            ><FaRegNewspaper size={28}/></button>
            <button 
                onClick={() => navigate('/runs-feed')}
                className={`${selected == Navbar.RUNS_FEED ? 'selected' : ''}`}
                ><MdOutlineSportsBasketball size={28}/></button>
            <button
                onClick={() => navigate('/chats')}
                className={`${selected == Navbar.CHATS ? 'selected' : ''}`}
                ><IoChatbubbleOutline size={28}/></button>
            <button
                onClick={() => navigate('/single-profile-view')}
                className={`${selected == Navbar.PROFILE ? 'selected' : ''}`}
                ><IoPersonCircleOutline size={28}/></button>
            <button
            onClick={() => navigate('/notifications')}
            className={`${selected == Navbar.NOTIFICATIONS ? 'selected' : ''}`}
            ><FaRegBell size={28}/></button>   
        </div>
    )
}

export default GlobalSideBar;