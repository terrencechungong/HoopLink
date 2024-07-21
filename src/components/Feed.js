import './styles/post.scss'
import FeedPost from './FeedPost';

const Feed = () => {
    let feedPosts = []
    for (let i = 0; i <= 40; i++) {
        feedPosts.push(<FeedPost />);
    }

    return (
        <div className="feed">
            <CreateAPost />
            {feedPosts}
        </div>
    );
}

const CreateAPost = () => {
    return (
        <div className='create-a-post'>
                Create a post my boy
        </div>
        // this takes to a new screen not a modal. then they come back to feed after post
    )
}

export default Feed;