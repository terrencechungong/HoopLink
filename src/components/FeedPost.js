import './styles/post.scss'
import pic from './ChatSettingComponents/piccy.png'

const FeedPost = () => {
    return (
        <div className='just-2-build'>
            <div className="feed-post-container">
                <div className='feed-post-info'>
                    <img src={pic} alt='lt=profile photo' />
                    <p><strong>Terrence</strong></p>
                    <p>@bigterrencebuilding</p>
                    <p><strog>&bull;</strog></p>
                    <p>Jul 10, 2029</p>
                </div>
                <div className="feed-post-content">
                    {/* make what shows up conditional */}
                    <p>Elon Musk is “hauling ass” on his “Gigafactory of Compute” 
                        project in Memphis. But a whiplash deal, NDAs, and backroom 
                        promises made to the city have lawmakers demanding answers.</p>
                </div>
                <div className='feed-post-likes-and-comments'>
                    <button>C</button>
                    <button>L</button>
                    <button>S</button>
                </div>
            </div>
        </div>
    )
}

export default FeedPost;