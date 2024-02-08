import { Link } from 'react-router-dom'

const Login = () => {

    const googleAuth = () => {
        window.open(
            `${import.meta.env.VITE_BASE_URL}/auth/google/callback`,
            "_self"
        );
    }
    return (
        <div>
            <h1>Log in Form</h1>
            <div>
                {/* <input type="text" placeholder='Email' />
                <input type="text" placeholder='Password'/>
                <button>Sign In</button> */}
                <button onClick={googleAuth}>Log In</button>
                <p>New? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login