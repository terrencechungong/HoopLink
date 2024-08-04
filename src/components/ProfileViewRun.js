import './styles/profile-view-run.scss'

const ProfileViewRun = () => {
    return (
        <div className='single-profile-run-view'>
           <p> Profile run bitch</p>
           <span>&bull;</span>

           <p className='single-profile-run-view-loca' style={{color:'rgb(110, 110, 110)'}}>LOCATION</p>
           <span>&bull;</span>
           <p className='single-profile-run-view-time' style={{color:'rgb(110, 110, 110)'}}>Ended 1w ago</p>
        </div>
        //render background different based on start end
    )
}

export default ProfileViewRun;