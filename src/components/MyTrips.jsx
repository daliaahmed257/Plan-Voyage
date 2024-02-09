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
            let res = await Client.get('/mytrips')
            setTrips(res.data)
        }
        getTrips()
    }, [])

    return user ? (
        <div>
            <div>
                <h1>Welcome</h1>
                <Link to="/mytrips/addtrip">
                    <button>Start a New Trip</button>
                </Link>
            </div>
            <div>
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