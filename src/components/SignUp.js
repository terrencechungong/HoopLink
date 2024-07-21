import './styles/signup.scss'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../firebase-config/authUtils'
import { globalVariables } from '..'
const SignUp = () => {

    const navigate = useNavigate();

    const handleClick = async () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const location = document.getElementById('location').value;
        console.log(`First Name: ${firstName}`);
        console.log(`Last Name: ${lastName}`);
        console.log(`Email: ${email}`);
        console.log(`Phone Number: ${phoneNumber}`);
        console.log(`Location: ${location}`);
        const user = await signUp(email, password, firstName, lastName);
        if (user !== false) {
            globalVariables.user = user;
            console.log('signed up in');
            navigate('/chats');
        }
    }

    return (
        <div className="signup-container">
            <div id='auth-background'></div>
            <div className="signup-card">
                <h3>Create an account</h3>
                <p>Start organizing pick-up games the right way.</p>
                <input id='firstName' type='text' placeholder={`First Name `} className='signup-input' />
                <input id='lastName' type='text' placeholder='Last Name' className='signup-input' />
                <input id='password' type='password' placeholder='Password' className='signup-input' />
                <input id='email' type='email' placeholder='Email' className='signup-input' />
                <input id='phoneNumber' type='text' placeholder='Phone Number' className='signup-input' />
                <input id='location' type='text' placeholder='Location' className='signup-input' />
                <button className="auth-continue-button" onClick={handleClick}>Register</button>
                <p classNames="bottom-text">Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
            </div>
        </div>
    )
}

export default SignUp;