import './styles/signup.scss'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { signin, signUp } from '../supabase-conf/authUtils'
import { globalVariables } from '..'
import { useMutation, gql, useLazyQuery } from '@apollo/client'
import { CREATE_USER_MUTATION } from './graphql/mutations/UserMutations'
import { CHECK_IF_CREDENTIALS_EXIST } from './graphql/queries/UserQueries'

const SignUp = () => {


    const [createUser, data] = useMutation(CREATE_USER_MUTATION)
    const [validCreds, { called, loading, data: queryData }] = useLazyQuery(CHECK_IF_CREDENTIALS_EXIST);

    const navigate = useNavigate();


    const handleClick = async () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const location = document.getElementById('location').value;

        const query = await validCreds({
            variables: {
                username: username,
                email: email,
                phoneNumber: phoneNumber
            }
        });
        console.log(query.data)
        if (!query.data.isCredentialsValid) {
            alert('Email, username, and phone number must be unique') // Make more useful 
        } else {

            const user = await signUp(email, password, firstName, lastName);
            if (user !== false) {
                try {
                    createUser({
                        variables: {
                            input: {
                                firstName,
                                lastName,
                                authId: user.id,
                                username,
                                email,
                                phoneNumber,
                                location
                            }
                        }
                    })
                    console.log('signed up ');
                    
                    navigate('/login')
                } catch (error) {
                    alert("create user mutation", error.message)
                }

            }
        }
    }

    return (
        <div className="signup-container">
            <div id='auth-background'></div>
            <div className="signup-card">
                <div id="inputwrapper">
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '0px' }}>
                        <p style={{ fontSize: '25px', padding: '0', margin: '0' }}>{String.fromCodePoint(0x1F3C0)}</p>
                        <p style={{ fontSize: '25px', padding: '0', margin: '0' }}>{String.fromCodePoint(0x1F517)}</p>
                    </div>
                    <h1>Create an account</h1>
                    <p>Start organizing pick-up games the right way.</p>
                    <input id='firstName' type='text' placeholder={`First Name `} className='signup-input' />
                    <input id='lastName' type='text' placeholder='Last Name' className='signup-input' />
                    <input id='username' type='text' placeholder='Username' className='signup-input' />
                    <input id='password' type='password' placeholder='Password' className='signup-input' />
                    <input id='email' type='email' placeholder='Email' className='signup-input' />
                    <input id='phoneNumber' type='text' placeholder='Phone Number' className='signup-input' />
                    <input id='location' type='text' placeholder='Location' className='signup-input' />
                    <button className="auth-continue-button" onClick={handleClick}>Register</button>
                    <p className="bottom-text">Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;