import { Link } from 'react-router-dom'

const Signup = () => {

    const googleAuth = () => {
        window.open(
            `${process.env.VITE_BASE_URL}/auth/google/callback`,
            "_self"
        );
    }
    return (
        <div>
            <h1>Sign Up Form</h1>
            <div>
                {/* <input type="text" placeholder='Email' />
                <input type="text" placeholder='Password'/>
                <button>Sign In</button> */}
                <button onClick={googleAuth}>Sign Up</button>
                <p>Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
