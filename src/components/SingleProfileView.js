import './styles/single-profile-view.scss'
import pic from '../components/ChatSettingComponents/piccy.png'
import { useState } from 'react';
import GlobalSideBar from './GlobalSideBar';
import { Navbar } from './constants';
import ProfileViewRun from './ProfileViewRun';
import ProfileViewPost from './ProfileViewPost';


const SingleProfileView = () => {
    const [current, setCurrent] = useState('Posts');
    const [posts, setPosts] = useState(true);
    const [runs, setRuns] = useState(false);
    const [media, setMedia] = useState(false);

    let postss = [];
    let runss = [];
    for (let i = 0; i<25; i++) {
        runss.push(<ProfileViewRun/>);
        postss.push(<ProfileViewPost/>);
    }


    const funcMapper = {
        'Posts': setPosts,
        'Runs': setRuns,
        'Media': setMedia,
    }

    const handleModalSelection = (selection) => {
        if (selection !== current) {
            funcMapper[current](false);
            funcMapper[selection](true);
            setCurrent(selection);
        }
    }


    return (
        <div id="single-profile-view-screen">
            <GlobalSideBar selected={Navbar.PROFILE} />
            <div id="single-profile-wrapper">

                <div id="single-profile-view-container">
                    <div id="single-profile-header">
                        <img src={pic} />
                        <div id="single-profile-header-info">
                            <div id="username-friend">
                                <p>
                                    <strong>bigteethabuilder</strong>
                                </p>
                                <button > 
                                    Add Friend
                                </button>
                            </div>
                            <div id="profile-stats">
                                <p> <strong>2</strong> posts </p>
                                <p> <strong>2</strong> friends </p>
                                <p> <strong>2</strong> runs </p>
                                <p><strong>2</strong> mvps </p>
                            </div>
                        </div>
                    </div>
                    <div id="single-view-profile-content-selection">
                        <p className={`${posts ? 'selectedContent' : ''}`} onClick={() => handleModalSelection('Posts')}>Posts</p>
                        <p className={`${runs ? 'selectedContent' : ''}`} onClick={() => handleModalSelection('Runs')}>Runs</p>
                        <p className={`${media ? 'selectedContent' : ''}`} onClick={() => handleModalSelection('Media')}>Media</p>
                    </div>
                    <div id="single-profile-view-posts-container">
                        {posts && postss}
                        {runs && runss}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SingleProfileView;


// post modal
// post screen
// comments modal

// scale pic/thumbnail and fformat it when uploading to post and let it be displayes the same whay in single post/feed post and profile view post