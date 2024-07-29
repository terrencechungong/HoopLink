import './styles/post.scss'
import FeedPost from './FeedPost';
import { useEffect, useState, useRef } from 'react';
import { globalVariables } from '..';
import ReactDOM from 'react-dom/client';
import CreatePostModal from './CreatePostModal';
import pic from './ChatSettingComponents/piccy.png'

const Feed = () => {
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    const modalDiv = useRef(false);
    const [isUp, setIsUp] = useState(false);

    let feedPosts = [];
    for (let i = 0; i <= 40; i++) {
        feedPosts.push(<FeedPost />);
    }

    const closeModal = () => {
        globalVariables.postsShowingPostsModal = true;
        const textArea = document.getElementById('text-area');
        const locationSlide = document.getElementById("location-area");
        locationSlide.className = " isOut"
        textArea.style.display = ''

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
        let modal = <CreatePostModal closeModalFunction={closeModal} />;
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
                <input type="text" placeholder="Create a new" onClick={clickFunction} />
            </div>
          
        </div>
    )
}

export default Feed;