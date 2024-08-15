import './styles/post.scss'
import FeedPost from './FeedPost';
import { useEffect, useState, useRef } from 'react';
import { globalVariables } from '..';
import ReactDOM from 'react-dom/client';
import CreatePostModal from './CreatePostModal';
import pic from './ChatSettingComponents/piccy.png'
import GlobalSideBar from './GlobalSideBar';
import { Navbar } from './constants';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CREATE_POST_OBJECT } from './graphql/mutations/PostMutations';
import { ADD_POST_TO_USER_OBJECT } from './graphql/mutations/UserMutations';
import { useMutation } from '@apollo/client';
import { CREATE_FILE_OBJECT } from './graphql/mutations/FileMutations';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_ID_FROM_AUTH_ID } from './graphql/queries/UserQueries';
import { ADD_FILES_TO_POST } from './graphql/mutations/PostMutations';

const Feed = () => {
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    const modalDiv = useRef(false);
    const [isUp, setIsUp] = useState(false);
    const navigate = useNavigate()
    const user = useRef(null);
    const getUser = useAuth().getUser;
    const filesState = useState([]);
    const captionState = useState("");
    const captionRef = useRef("");
    const textAreaHeightState = useState("");
    // IF MODAL IS ALREADY UP MAKE DISPLAY NOT NONE
    const [createPostObject, createPostMutationData] = useMutation(CREATE_POST_OBJECT)
    const [createFileObject, createFileMutationData] = useMutation(CREATE_FILE_OBJECT)
    const [getUserWithAuthId, data] = useLazyQuery(GET_USER_ID_FROM_AUTH_ID);
    const [addFilesToPost, addFilesToPostData] = useMutation(ADD_FILES_TO_POST)
    const fileData = useRef([]);
    const postLocation = useRef("");

    // implemet error handling for when the server is down

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


    const createFilesAndPosts = async () => {
        // Create Post'
        const postData = await createPostObject({
            variables: {
                post: {
                    creator: user.current.dbId,
                    creationTime: (new Date()).toISOString(),
                    location: postLocation.current,
                    caption: captionRef.current,
                    files: []
                }
            }
        });
        // console.log(postData)
        // console.log(postData.data.createPost._id);
        const postId = postData.data.createPost._id

        // Create Files
        let fileIds = []
        for (let i = 0; i < fileData.current.length; i++) {
            const formData = new FormData();
            formData.append('file', fileData.current[0]);
            console.log(fileData.current[0])

            try {
                const response = await fetch('http://localhost:3030/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result)
                    const fileMutationData = await createFileObject({
                        variables: {
                            file: { ...result, fileType: fileData.current[0].type, post: postId }
                        }
                    });
                    console.log(fileMutationData.data.createFile._id);
                    fileIds.push(fileMutationData.data.createFile._id)
                } else {
                    console.log(response)
                    throw new Error('File upload failed');
                }
            } catch (error) {
                alert('Error: ' + error.message);
                return false;
            }
        }
        return true;
    }




    let feedPosts = [];
    for (let i = 0; i <= 40; i++) {
        feedPosts.push(<FeedPost />);
    }

    const closeModal = () => {
        globalVariables.postsShowingPostsModal = true;
        console.log(filesState[0]);
        console.log(captionState[0])
        parentRef.current.removeChild(parentRef.current.firstChild);  // Remove the DOM element
        modalLoaded.current = false;
        globalVariables.settingsModalEffect = false;
        setIsUp(false);
    }

    useEffect(() => {
        globalVariables.postModalHasBeenShown = false;
        const func = function (event) {
            if (globalVariables.postModalEffect === true) {
                const middleDiv = document.getElementById('create-a-post-modal');
                console.log(event.target);
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
        let modal = <CreatePostModal
            closeModalFunction={closeModal}
            filesState={filesState}
            captionState={captionState}
            textAreaHeightState={textAreaHeightState}
            uploadPostMutation={createPostObject}
            fileData={fileData}
            uploadPost={createFilesAndPosts}
            captionRef={captionRef}
            postLocation={postLocation}
        />;
        if (globalVariables.postModalHasBeenShown == false) {
            modalDiv.current = document.createElement('div');
            modalDiv.current.id = "modal-div-root";
            modalRoot.current = ReactDOM.createRoot(modalDiv.current);
            modalRoot.current.render(modal);
            globalVariables.postModalHasBeenShown = true;
        }
        parentRef.current.insertBefore(modalDiv.current, parentRef.current.firstChild);
        modalLoaded.current = true;
        globalVariables.postModalEffect = true;
    }


    return (
        <div className="feed-container" ref={parentRef}>
            <GlobalSideBar selected={Navbar.FEED} />
            <div className="feed">
                <CreateAPost clickFunction={() => showModal()} />
                {feedPosts}
            </div>
        </div>
    );
}

const CreateAPost = ({ clickFunction }) => {
    return (
        <div className='create-a-post'>
            <div className='top-half'>
                <img src={pic} />
                <input type="text" placeholder="Create a new post" onClick={clickFunction} />
            </div>
        </div>
    )
}

export default Feed;