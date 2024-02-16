import { Link } from "react-router-dom"

const Hero = ({ user }) => {

    

    return (
        <div className="hero-image">
            <div className="hero-container">
                <div className="hero-content">
                    <div>
                        <h2>Discover and plan your next trip with ease</h2>
                    </div>
                    <div className="btns">
                        {user ? (
                            <Link to="/mytrips/addtrip">
                                <button className="hero-btn">Plan a New Trip</button>
                            </Link>
                        ) : (
                            <Link to="/signin">
                                <button className="hero-btn">Plan a New Trip</button>
                            </Link>
                        )}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero