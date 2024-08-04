import './styles/profile-view-run.scss'
import { CgInfo } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const ProfileViewRun = () => {
    const navigate = useNavigate();

    return (
        <div className='single-profile-run-view'>
            <div className='single-profile-run-view-wrap'>
                <p> Profile run bitch</p>
                <span>&bull;</span>
                <p className='single-profile-run-view-loca' style={{ color: 'rgb(110, 110, 110)' }}>LOCATION</p>
                <span>&bull;</span>
                <p className='single-profile-run-view-time' style={{ color: 'rgb(110, 110, 110)' }}>Ended 1w ago</p>
            </div>
            <CgInfo size={30} onClick={() => { navigate('/single-run-view') }} style={{ cursor: 'pointer' }} />
        </div>
        //render background different based on start end
    )
}

export default ProfileViewRun;