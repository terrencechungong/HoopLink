import { useNavigate } from "react-router-dom";
import { BsPostcard } from "react-icons/bs";
import './styles/profile-view-post.scss'

const ProfileViewPost = ({caption, postId, creationTime}) => {
    const navigate = useNavigate();

    return (
        <div className='single-post-run-view'>
            <div className='single-post-run-view-wrap'>
                <p style={{ color: "white" }}> {caption}</p>
                <span>&bull;</span>
                <p className='single-post-run-view-loca' style={{ color: "white" }}>LOCATION</p>
                <span>&bull;</span>
                <p className='single-post-run-view-time' style={{ color:  "white" }}>Ended 1w ago</p>
            </div>
            <BsPostcard size={30} onClick={() => { navigate(`/viewpost/${postId}`) }} style={{ cursor: 'pointer' }} />
        </div>
        //render background different based on start end
    )
}

export default ProfileViewPost;