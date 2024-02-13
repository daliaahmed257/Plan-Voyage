import { useEffect, useState } from "react"
import Client from "../services/api"
import { useNavigate } from 'react-router-dom'
import TripForm from "./TripForm"
import { Link } from "react-router-dom"
import Header from "./Header"

const MyTrips = ({ user }) => {
    let navigate = useNavigate()

    const [trips, setTrips] = useState([])

    useEffect(() => {
        const getTrips = async () => {
            let res = await Client.get(`/mytrips/user/${user.id}`)
            setTrips(res.data)
        }
        getTrips()
    }, [user])

    return user ? (
        <div>
            <div className="hero mytrip-hero">
                <div className="hero-container">
                    <div>
                        <h2>Discover and plan your next trip with ease</h2>
                        <h3>Whether youre a seasoned traveler or a new explore browse through different countries and plan your itinerary</h3>
                    </div>
                    <div className="btns">
                        <Link to="/mytrips/addtrip">
                            <button className="hero-btn">Plan a New Trip</button>
                        </Link>
                        {/* <Link to="/">
                            <button className="hero-btn">Explore Countries to Visit</button>
                        </Link> */}
                    </div>
                </div>
            </div>
            <div className="container">
                <div>
                    <h1>My Trips</h1>
                    <br />
                    <div className="cards-grid">
                        {trips.map(trip => (
                            <Link to={`${trip._id}`} key={trip._id}>
                                <div className="card">
                                    <div className="img-container"><img className="card-img" src={trip.image} alt={trip.country} /></div>
                                    <h3>{trip.city}, {trip.country}</h3>
                                    <p>{new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <h3>Sign in to plan your trip</h3>
            <button onClick={() => navigate('/signin')}>Sign In</button>
        </div>
    )
}

export default MyTrips