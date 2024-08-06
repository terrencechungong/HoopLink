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
            <div>

            </div>
        </div>
    )
}

export default ProfileSearchResultCard;