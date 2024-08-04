import './styles/feed-run.scss'
import { useNavigate } from 'react-router-dom';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import GlobalSideBar from './GlobalSideBar';

const FeedRun = () => {
    const navigate = useNavigate();

    return (
        <div id="feed-run-container">

            <div id="dots"  onClick={() => navigate('/single-run-view')}>
                <HiOutlineDotsHorizontal />
            </div>
            <div className='feed-run-section'>
                <p><strong>RUN NAME</strong></p>
                <p>NAME HERE</p>
            </div>
            <div className='feed-run-section'>
                <p><strong>RUN CREATOR</strong></p>
                <p>CREATOR NAME</p>
            </div>
            <div className='feed-run-section'>
                <p><strong>RUN CHAT</strong></p>
                <p>CHAT LINK</p>
            </div>
            <div className='feed-run-section'>
                <p><strong>RUN STATUS</strong></p>
                <p>START/END TIME</p>
            </div>
            <div className='feed-run-section'>
                <p>
                    MVP STUFF
                </p>
            </div>
            <div className='feed-run-section'>
                Location
            </div>
        </div>
    )
}

export default FeedRun;