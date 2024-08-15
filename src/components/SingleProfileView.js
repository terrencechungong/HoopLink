import './styles/single-profile-view.scss'
import pic from '../components/ChatSettingComponents/piccy.png'
import { useState, useEffect } from 'react';
import GlobalSideBar from './GlobalSideBar';
import { Navbar } from './constants';
import ProfileViewRun from './ProfileViewRun';
import ProfileViewPost from './ProfileViewPost';
import { useParams } from 'react-router-dom';
import { GET_USER_DATA_FOR_SELF_VIEW } from './graphql/queries/UserQueries';
import { useQuery } from '@apollo/client';

const SingleProfileView = () => {
    const [current, setCurrent] = useState('Posts');
    const [posts, setPosts] = useState(true);
    const [runs, setRuns] = useState(false);
    const [media, setMedia] = useState(false);
    const { authId } = useParams();
    console.log(authId)
    // make more secure

    const { data, loading, error } = useQuery(GET_USER_DATA_FOR_SELF_VIEW, {
        variables: { authId }
    });
    console.log({ data, loading, error } )
    let postss = [];
    let runss = [];
    for (let i = 0; i < 25; i++) {
        runss.push(<ProfileViewRun />);
        postss.push(<ProfileViewPost />);
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
                        {!loading ?
                            <img src={pic} /> :
                            <div className='skeleton' style={{width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                margin: '18px',}}>

                            </div>
                        }
                        <div id="single-profile-header-info">
                            {!loading ?
                                <div id="username-friend">
                                    <p>
                                        <strong>{data.getUserWithAuthId.username}</strong>
                                    </p>
                                    <button >
                                        Add Friend
                                    </button>
                                </div> : <p style={{ width: '250px', height: '25px', }} className='skeleton'></p>}
                            {!loading ?
                                <div id="profile-stats">
                                    <p> <strong>{data.getUserWithAuthId.posts.length}</strong> posts </p>
                                    <p> <strong>{data.getUserWithAuthId.friends.length}</strong> friends </p>
                                    <p> <strong>{data.getUserWithAuthId.runs.length}</strong> runs </p>
                                    <p><strong>{data.getUserWithAuthId.mvpCount}</strong> mvps </p>
                                </div> : <p style={{ width: '275px', height: '25px', }} className='skeleton'></p>}
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