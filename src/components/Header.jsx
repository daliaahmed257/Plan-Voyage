import { Link } from 'react-router-dom'

const Header = ({ user, handleLogOut }) => {
    let userOptions
    if (user) {
        userOptions = (
            <div className='user-header'>
                <Link to="/mytrips">
                    <h3>My Trips</h3>
                </Link>
                <Link onClick={handleLogOut} to="/">
                    <h3>Sign Out</h3>
                </Link>
            </div>
        )
    }

    const publicOptions = (
        <div className='user-header'>
            <Link to="register">
                <h3>Register</h3></Link>
            <Link to="/signin">
                <h3>Sign In</h3></Link>
        </div>
    )

    return (
        <header>
            <Link to="/">
                <div>
                    <h1>Plan Voyage</h1>
                </div>
            </Link>
            <Link to="/">
                <h3>Explore</h3>
            </Link>
            {user ? userOptions : publicOptions}
        </header>
    )
}

export default Header