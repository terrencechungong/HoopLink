import './styles/signup.scss'
import { useAuth } from '../context/AuthContext'
import {signin} from '../firebase-config/authUtils'
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(`Phone Number: ${email}`);
        console.log(`Location: ${password}`);
        signin(email, password);
    }   

    return (
        <div className="signup-container">
            <div id='auth-background'></div>
            <div className="login-card">
                <h3>Sign in to your account</h3>
                <p>Start organizing pick-up games the right way.</p>
                <input id='email' type='text' placeholder='Email' className='signup-input' />
                <input id='password' type='text' placeholder='Password' className='signup-input' />
                <button className="auth-continue-button" onClick={handleClick}>Log in</button>
                <p classNames="bottom-text">Don't have an account? <span onClick={() => navigate('/signup')}>Register</span></p>
            </div>
        </div>
    )
}

export default LogIn;