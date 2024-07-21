import './styles/post.scss'
import pic from './ChatSettingComponents/piccy.png'
import { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";

const FeedPost = () => {
    const [liked, setLiked] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
    const text = "Elon Musk is hauling ass on his “Gigafactory of Compute \
    project in Memphis. But a whiplash deal, NDAs, and backroom \
    promises made to the city have lawmakers demanding answers. \
    Musk is hauling ass on his “Gigafactory of Compute \
    project in Memphis. But a whiplash deal, NDAs, and backroom \
    promises made to the city have lawmakers demanding answers. \
    on Musk is hauling ass on his “Gigafactory of Compute \
    project in Memphis. But a whiplash deal, NDAs, and backroom \
    promises made to the city have lawmakers demanding answers. \
    Musk is hauling ass on his “Gigafactory of Compute \
    project in Memphis. But a whiplash deal, NDAs, and backroom \
    promises made to the city have lawmakers demanding answers."


    return (
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
                    <DisplayText text={text} />
                    {/* Add Files */}

                </div>
                <div className='feed-post-likes-and-comments'>
                    <button className={liked && 'liked'} onClick={() => setLiked(!liked)}>
                        {!liked && <FaRegHeart size={22} />}
                        {liked && <FaHeart size={22} />}
                    </button>
                    <button><FaRegComment size={25} /></button>
                    <button ><LuSend size={22} /></button>
                </div>
            </div>
    )
}


const DisplayText = ({ text }) => {
    const [seeMore, setSeeMore] = useState(false);
    let displayText;
    if (text.length > 475) {
        displayText = <p>
            {text.substring(0, 474)}...<strong id="read-more-post" onClick={() => setSeeMore(true)}>Read More</strong>
            </p>
    } else {
        displayText = <p>{text}</p>
    }
    return (
        <>
            {seeMore && <p>{text}</p>}
            {!seeMore && displayText}
        </>
    )
}

export default FeedPost;