import './styles/sidebar-style.scss'

const SideBar = () => {

    let chats = [
        "marker", "revolution", "clip", "branch", "flashlight", "apple", "mirror",
        "basket", "dragon", "orchard", "crayon", "cloud", "spider", "quilt", "arrow",
        "mountain", "ocean", "guitar", "piano", "helicopter", "button", "school",
        "monster", "flower", "bicycle", "balloon", "bottle", "kitten", "window", "book"
    ];

    return (
        <div className='sidebar-container'>
            <br></br>
            <br></br>
            {chats.map(el => (
                <div className='chat-row'>
                    <div>picc</div>
                   <p>{el}</p>
                </div>
            ))}
        </div>
    )
}

export default SideBar;