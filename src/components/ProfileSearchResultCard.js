import './styles/search-results.scss'
import { useRef } from 'react';
const ProfileSearchResultCard = ({user}) => {
    const linkRef = useRef(null);

    return (
        <div className="profile-search-result-card">
            <div className='person-search-result-sec-one'>
                <img src={user.profilePicture} style={{cursor:'pointer'}} onClick={() => {
                    if(linkRef) {
                        linkRef.current.click()
                    }
                }}/>
                <a ref={linkRef} href={`/profile/${user.authId}`} style={{display:'none'}}></a>
                {/* show ... if name is too long */}
                <div>
                <p>{`${user.firstName} ${user.lastName}`}</p>
                <>@{`${user.username}`}</>
                </div>
            </div>
            <button className='person-search-result-add-friend-button'>Add friend</button>
        </div>
    )
}

export default ProfileSearchResultCard;