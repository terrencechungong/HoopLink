import './styles/search-results.scss'
import pic from './ChatSettingComponents/piccy.png'

const ProfileSearchResultCard = () => {
    return (
        <div className="profile-search-result-card">
            <div className='person-search-result-sec-one'>
                <img src={pic} />
                {/* show ... if name is too long */}
                <p>Jojhhns John</p>
            </div>
            <button className='person-search-result-add-friend-button'>Add friend</button>
        </div>
    )
}

export default ProfileSearchResultCard;