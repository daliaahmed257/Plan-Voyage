import { Link } from 'react-router-dom'

const Header = ({ user, handleLogOut }) => {
    let userOptions
    if (user) {
        userOptions = (
            <div className='user-header'>
                <Link to="/mytrips">
                    <h4>My Trips</h4>
                </Link>
                <Link onClick={handleLogOut} to="/signin">
                    <h4>Sign Out</h4>
                </Link>
            </div>
        )
    }

    const publicOptions = (
        <div className='user-header'>
            <Link to="register">
                <h4>Register</h4></Link>
            <Link to="/signin">
                <h4>Sign In</h4></Link>
        </div>
    )

    return (
        <header>
            <Link to="/">
                <div>
                    <h2>Journey Plan</h2>
                </div>
            </Link>
            <div className='nav-items'>
                <Link to="/">
                    <h4>Explore</h4>
                </Link>
                {user ? userOptions : publicOptions}
            </div>
        </header>
    )
}

export default Header