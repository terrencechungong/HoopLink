import './styles/post.scss'
import FeedPost from './FeedPost';

const Feed = () => {
    let feedPosts = []
    for (let i = 0; i<= 40; i++) {
        feedPosts.push(<FeedPost/>);
    }

    return (
        <div className="feed"> 
        {feedPosts}
        </div>
    );
}

export default Feed;