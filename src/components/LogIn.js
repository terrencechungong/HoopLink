import './styles/signup.scss'
import { useAuth } from '../context/AuthContext'

const LogIn = () => {

    const handleClick = () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const location = document.getElementById('location').value;
        console.log(`First Name: ${firstName}`);
        console.log(`Last Name: ${lastName}`);
        console.log(`Email: ${email}`);
        console.log(`Phone Number: ${phoneNumber}`);
        console.log(`Location: ${location}`);
    }

    return (
        <div className="signup-container">
            <div className="login-card">
                <h3>Sign in to your account</h3>
                <p>Start organizing pick-up games the right way.</p>
                <input id='email' type='text' placeholder='Email' className='signup-input' />
                <input id='password' type='text' placeholder='Password' className='signup-input' />
                <button className="auth-continue-button" onClick={handleClick}>Log in</button>
                <p classNames="bottom-text">Don't have an account? <span>Register</span></p>
            </div>
        </div>
    )
}

export default LogIn;