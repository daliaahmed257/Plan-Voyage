import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <Link to="/">
                <div>
                    <h1>Plan Voyage</h1>
                </div>
            </Link>
            <Link to="/">
                <div>
                    <h3>Explore</h3>
                </div>
            </Link>
            <Link to="/mytrips">
                <div>
                    <h3>My Trips</h3>
                </div>
            </Link>
        </header>
    )
}

export default Header