import { useEffect, useState } from "react"
import Client from "../services/api"
import { useNavigate } from 'react-router-dom'
import TripForm from "./TripForm"
import { Link } from "react-router-dom"

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
            <div className="hero">
                <h2>Discover and plan your next trip with ease. Whether youre a seasoned travelor or a first time explorer browse through an array captivating countries to visit and craft your perfect interary.</h2>
                <Link to="/mytrips/addtrip">
                    <button>Plan a New Trip</button>
                </Link>
                <Link to="/">
                    <button>Explore Countries to Visit</button>
                </Link>
            </div>
            <div className="trips-container">
                <h1>My Trips</h1>
                {trips.map(trip => (
                <Link to={`${trip._id}`} key={trip._id}>
                    <div className="trip-card">
                        <h3>{trip.country}</h3>
                    </div>
                </Link>
                ))}
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