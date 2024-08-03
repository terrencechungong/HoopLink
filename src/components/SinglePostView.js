import './styles/single-post-view.scss'
import pic from './ChatSettingComponents/piccy.png';
import pic2 from './ChatSettingComponents/defaultprofile.png';
import { useState, useRef, useEffect } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import FilesSinglePostSection from './FilesSinglePostSection';
import SinglePostCarousel from './SinglePostCarousel';
import { globalVariables } from '..';
import ReactDOM from 'react-dom/client';

const SinglePostView = () => {
    const [liked, setLiked] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const hrStyle = { width: '90%', backgroundColor: 'black' };
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    const modalDiv = useRef(false);
    const [isUp, setIsUp] = useState(false);
    let comments = [];
    for (let i = 0; i <= 10; i++) {
        comments.push(<PostComment />);
    }

    const commentValueChange = (e) => {
        setCommentValue(e.target.value);
    }

    const closeModal = () => {
        parentRef.current.removeChild(parentRef.current.firstChild);  // Remove the DOM element
        modalLoaded.current = false;
        globalVariables.postCarouselModalEffect = false;
        setIsUp(false);
    }

    useEffect(() => {
        const func = function (event) {
            if (globalVariables.postCarouselModalEffect === true) {
                const middleDiv = document.getElementById('single-post-carousel-modal');
                if (middleDiv) {
                    if (isUp === false) {
                        setIsUp(true);
                        return;
                    }
                    if (!middleDiv.contains(event.target)) {
                        closeModal();
                    }
                }
            }
        }
        document.addEventListener('click', func);
        return () => {
            document.removeEventListener('click', func);
        };
    })

    const showModal = () => {
        let modal = <SinglePostCarousel closeModalFunction={closeModal} allPhotos={[pic, pic2]} />;
        if (globalVariables.carouselHasBeenShown == false) {
            modalDiv.current = document.createElement('div');
            modalDiv.current.id = "single-post-carousel-modal-container";
            modalRoot.current = ReactDOM.createRoot(modalDiv.current);
            modalRoot.current.render(modal);
            globalVariables.carouselHasBeenShown = true;
        }
        parentRef.current.insertBefore(modalDiv.current, parentRef.current.firstChild);
        modalLoaded.current = true;
        globalVariables.postCarouselModalEffect = true;
    }

    return (
        <div id="single-post-view-screen" ref={parentRef}>
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
                    <FilesSinglePostSection filesThumbnails={[pic, pic, pic, pic, pic, pic, pic]} showModal={showModal} />
                    <hr style={hrStyle}></hr>
                    <div className='single-post-likes-comments'>
                        <button className={liked && 'liked'} onClick={() => setLiked(!liked)}>
                            {!liked && <FaRegHeart size={33} />}
                            {liked && <FaHeart size={33} />}
                        </button>
                        <button ><LuSend size={33} /></button>
                    </div>
                    <hr style={hrStyle}></hr>
                    <div id="add-comment-div">
                        <img src={pic} />
                        <input type="text" placeholder='Leave a comment!' onChange={commentValueChange} />
                        {commentValue !== "" && <button>Post</button>}
                    </div>
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