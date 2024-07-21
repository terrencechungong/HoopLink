import './styles/view-profile.scss'
import pic from './ChatSettingComponents/defaultprofile.png'
import { FaPencilAlt } from 'react-icons/fa'
import { useEffect } from 'react'

const ViewProfile = () => {

    useEffect(() => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.onclick = () => {
                console.log(button.id);
                let buttonId = button.id.replace('-button', '');
                console.log(buttonId);
                // document.getElementById(buttonId);
                // update field functionality
            }
        });
    })

    return (
        <div className="view-profile-container">
            <div className="view-profile-div">
                <div id="view-profile-profile-pic">
                    <img src={pic} alt="profile pic" />
                    <button><FaPencilAlt/></button>
                </div>
                <div className='profile-userData-row'>
                    <p>First Name</p>
                    <div>
                        <input type='text' id="first-name" placeholder='FIRST NAME' disabled/>
                        <button id="first-name-button"><FaPencilAlt/></button>
                    </div>
                </div>
                <div className='profile-userData-row'>
                    <p>Last Name</p>
                    <div>
                        <input type='text' id="last-name" placeholder='LAST NAME' disabled/>
                        <button id="last-name-button"><FaPencilAlt/></button>
                    </div>
                </div>
                <div className='profile-userData-row'>
                    <p>Email</p>
                    <div>
                        <input type='email' id="email" placeholder='EMAIL' disabled/>
                        <button id="email-button"><FaPencilAlt/></button>
                    </div>
                </div>
                <div className='profile-userData-row'>
                    <p>Phone Number</p>
                    <div>
                        <input type='text' id="phone-number" placeholder='PHONE NUMBER' disabled/>
                        <button id="phone-number-button"><FaPencilAlt/></button>
                    </div>
                </div>
                <div className='profile-userData-row'>
                    <p>Location</p>
                    <div>
                        <input id="location" type='text' placeholder='LOCATION' disabled/>
                        <button id="location-button"><FaPencilAlt/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile;