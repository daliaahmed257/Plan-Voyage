import { useEffect, useState } from "react"
import Client from "../services/api"
import { Link } from "react-router-dom"

const Explore = ({ user }) => {

    const [places, setPlaces] = useState([])

    useEffect(() => {
        const getPlaces = async () => {
            let res = await Client.get('/explore')
            setPlaces(res.data)
        }
        getPlaces()
    }, [])

    return (
        <div>
            <div className="hero explore-hero">
                <div className="hero-container explore">
                    <div>
                        <h2>Discover and plan your next trip with ease</h2>
                        <h3>Whether youre a seasoned traveler or a new explore browse through different countries and plan your itinerary</h3>
                    </div>
                    <div className="btns">
                        {user ? (<Link to="/mytrips/addtrip">
                            <button className="hero-btn">Plan a New Trip</button>
                        </Link>
                        ) : <Link to="/register">
                            <button className="hero-btn">Plan a New Trip</button>
                        </Link>
                        }
                        {/* <Link to="/">
                            <button className="hero-btn">Explore Countries to Visit</button>
                        </Link> */}
                    </div>
                </div>
            </div>
            <div className="container">
                <div>
                    <h1>Explore New Places to Visit</h1>
                    <br />
                    <div className="cards-grid">
                        <div className="card">
                            {places.map(place => (
                                <Link to={`/explore/${place._id}`}>
                                <div key={place._id}>
                                    <div className="img-container"><img className="card-img" src={place.image} alt={place.country} /></div>
                                    <h3>{place.country}</h3>
                                    <p>{place.description}</p>
                                </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore