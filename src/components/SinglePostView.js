import './styles/single-post-view.scss'
import pic from './ChatSettingComponents/piccy.png'
import { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import FilesSinglePostSection from './FilesSinglePostSection';

const SinglePostView = () => {
    const [liked, setLiked] = useState(false);
    const hrStyle = { width: '90%', backgroundColor: 'black' };
    let comments = [];
    for  (let i = 0; i <=10; i++) {
        comments.push(<PostComment />);
    }

    return (
        <div id="single-post-view-screen">
            <div id="single-post-view-container">
                <div id="single-post-header">
                    <img src={pic} />
                    <div className='post-header-section'>
                        <p><strong>Terrence</strong></p>
                        <p>@bigterrencebuilding</p>
                    </div>
                    <div className='post-header-section'>
                        <p><strong>&bull;</strong></p>
                    </div>
                    <p>Jul 10, 2029</p>
                </div>
                <div className='single-post-content'>
                    <p>uisdfhishfisbdifubsaiufiusdb
                        sndfnasdifnskdfdsdfsdfsdfsdfsdfsdfsdfsfsksbfsdjkfksdnf
                        sdnfksndfkjsnkfdnkjsfksdfsdfsdfsdfsdfs
                    </p>
                    <div className='single-post-files-section'>
                        {/* <div className='top-third-fourth'>

                        </div>
                        <div className='bottom-fourth'>

                        </div>
                        <div className='bottom-fourth'>

                        </div>
                        <div className='bottom-fourth '>
                            <div className='over-four-cover'></div>
                        </div>  CREATE FILE SECTION HEERE*/}
                        <FilesSinglePostSection filesThumbnails={[pic]} />
                    </div>
                    <hr style={hrStyle}></hr>
                    <div className='single-post-likes-comments'>
                        <button className={liked && 'liked'} onClick={() => setLiked(!liked)}>
                            {!liked && <FaRegHeart size={33} />}
                            {liked && <FaHeart size={33} />}
                        </button>
                        <button ><LuSend size={33} /></button>
                    </div>
                    <hr style={hrStyle}></hr>
                    <div className='single-post-comment-section'>
                        {comments.length == 0 && "Be the first to leave a comment!"}
                        {comments}
                    </div>
                </div>
            </div>
        </div>
    );
}


const PostComment = () => {
    return (
        <div className='single-post-comment'>
            <img src={pic} />
            <div className='comment-content'>
                <p><strong>NAME</strong></p>
                <p>SDSDSFSDFSDFSDFSDFSDFASDAFSDFDSFDSAF</p>
            </div>

        </div>
    )
}

export default SinglePostView;