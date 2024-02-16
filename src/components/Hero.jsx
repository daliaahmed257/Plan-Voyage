import { Link } from "react-router-dom" 

const Hero = () => {
    return (
        <div className="hero-image">
                <div className="hero-container">
                    <div className="hero-content">
                        <div>
                            <h2>Discover and plan your next trip with ease</h2>
                            {/* <h3>Whether youre a seasoned traveler or a new explore browse through different countries and plan your itinerary</h3> */}
                        </div>
                        <div className="btns">
                            <Link to="/mytrips/addtrip">
                                <button className="hero-btn">Plan a New Trip</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
    )
}

export default Hero