import './styles/single-profile-view.scss'
import pic from '../components/ChatSettingComponents/piccy.png'

const SingleProfileView = () => {

    return (
        <div id="single-profile-view-screen">
            <div id="single-profile-view-container">
                <div id="single-profile-header">
                    <img src={pic} />
                    <div id="single-profile-header-info">
                        <div id="username-friend">
                            <p>
                                bigteethabuilder
                            </p>
                            <button>
                                Add Friend
                            </button>
                        </div>
                        <div id="profile-stats">
                            <p> 2 posts </p>
                            <p> 2 friends </p>
                            <p> 2 runs </p>
                            <p> 2 mvps </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SingleProfileView;