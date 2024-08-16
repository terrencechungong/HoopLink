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
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_POST_USING_POST_ID } from './graphql/queries/PostQueries';
import { formatISODate } from './utils/utility';
import { CREATE_COMMENT_OBJECT } from './graphql/mutations/CommentMutations';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_ID_FROM_AUTH_ID } from './graphql/queries/UserQueries';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CHECK_IF_USERS_ARE_FRIENDS } from './graphql/queries/UserQueries';

const SinglePostView = () => {
    const [liked, setLiked] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const hrStyle = { width: '90%', backgroundColor: 'black' };
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    const modalDiv = useRef(false);
    const [isUp, setIsUp] = useState(false);
    const commentTextRef = useRef(null);
    const [createCommentMutation, createCommentData] = useMutation(CREATE_COMMENT_OBJECT)
    const { postId } = useParams();
    const user = useRef(null);
    const [getUserWithAuthId, getUserAuthIdData] = useLazyQuery(GET_USER_ID_FROM_AUTH_ID);
    const getUser = useAuth().getUser;
    const navigate = useNavigate();

    const { data, loading, error } = useQuery(GET_POST_USING_POST_ID, {
        variables: {
            id: postId
        }
    });
    console.log(data);

    useEffect(() => {
        const setUser = async () => {
            if (!user.current) {
                user.current = await getUser();
                const userId = await getUserWithAuthId({
                    variables: {
                        authId: user.current.id
                    }
                });
                if (!user.current) {
                    // console.log(user)
                    console.log("no user");
                    navigate('/login');
                }
                // wait until its done
                console.log(userId.data.getUserWithAuthId._id)
                user.current = { ...user.current, dbId: userId.data.getUserWithAuthId._id }
                // console.log(user.current)
            }
        }
        console.log("run")
        setUser()
    }, [user.current]);

    const likesStyle = {
        display: 'flex',
        flexDirection: 'row',
        gap: '4px',
        fontSize: '13px',
        alignItems: 'center'
    }


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

    const createComment = async () => {
        await createCommentMutation({
            variables: {
                comment: {
                    text: commentTextRef.current.value,
                    creator: user.current.dbId,
                    creationTime: (new Date()).toISOString(),
                    post: data.post._id
                }
            }
        })
        commentTextRef.current.value = ""
    };


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
        let modal = <SinglePostCarousel closeModalFunction={closeModal} allPhotos={data.post.files.map(file => file.awsUri)} />;
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
                    {!loading ? <img src={data.post.creator.profilePhoto} /> : <div className='skeleton' style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '30px',
                        marginLeft: '20px',
                    }}>

                    </div>}
                    <div className='post-header-section'>
                        {!loading ? <p><strong>{data.post.creator.firstName}{' '}{data.post.creator.lastName}</strong></p> : <div className='skeleton' style={{ width: '120px', height: '15px' }}></div>}
                        {!loading ? <p>@{data.post.creator.username}</p> : <div className='skeleton' style={{ width: '120px', height: '15px', marginTop: '5px' }}></div>}
                    </div>
                    <div className='post-header-section'>
                        <p><strong>&bull;</strong></p>
                    </div>
                    {!loading ? <p>{formatISODate(data.post.creationTime)}</p> : <div className='skeleton' style={{ width: '120px', height: '20px' }}></div>}
                </div>
                <div className='single-post-content'>
                    <p>{!loading && data.post.caption}</p>
                    {!loading &&
                        <FilesSinglePostSection filesThumbnails={data.post.files.map(file => file.awsUri)} showModal={showModal} />
                    }
                    <hr style={hrStyle}></hr>
                    <div className='single-post-likes-comments'>
                        <button className={liked && 'liked'} onClick={() => setLiked(!liked)}>
                            {!liked && <div style={likesStyle}><FaRegHeart size={28} />{!loading && data.post.likers.length} likes</div>}
                            {liked && <div style={likesStyle}><FaHeart size={28} />{!loading && data.post.likers.length} likes</div>}
                        </button>
                        <button ><LuSend size={28} /></button>
                    </div>
                    <hr style={hrStyle}></hr>
                    <div id="add-comment-div">
                        {!loading ? <img src={user.current.dbId} /> :
                            <div className='skeleton' style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '25px',
                                marginLeft: '20px',
                            }}>
        
                            </div>
                        }
                        {/* I can keep a like AND Comment state and update when actions are taken for immediate ui updates */}
                        <input ref={commentTextRef} type="text" placeholder='Leave a comment!' onChange={commentValueChange} />
                        {commentValue !== "" && <button onClick={() => { createComment() }}>Post</button>}
                    </div>
                    {!loading &&
                        <div className='single-post-comment-section'>
                            {data.post.comments.length == 0 && "Be the first to leave a comment!"}
                            {data.post.comments.map((comment) =>
                                <PostComment
                                    username={comment.creator.username}
                                    date={comment.creationTime}
                                    profilePhoto={comment.creator.profilePhoto}
                                    text={comment.text} />
                            )}
                        </div>}
                </div>
            </div>
        </div>
    );
}


const PostComment = ({ username, date, profilePhoto, text }) => {
    console.log(date)
    return (
        <div className='single-post-comment'>
            <img src={profilePhoto} />
            <div className='comment-content'>
                <p><strong>{username}</strong> &bull; {formatISODate(date)}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default SinglePostView;