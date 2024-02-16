import { useEffect, useState } from "react"
import Client from "../services/api"
import { useNavigate } from 'react-router-dom'
import TripForm from "./TripForm"
import { Link } from "react-router-dom"
import Header from "./Header"
import Explore from "./Explore"
import Hero from "./Hero"

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
            <Hero />
            <br />
            <div className="container">
                <div>
                    <h2 className="page-title">My Trips</h2>
                    <br />
                    <br />
                    {trips.length > 0 ? (
                        <div className="cards-grid">
                            {trips.map(trip => (
                                <Link to={`${trip._id}`} key={trip._id}>
                                    <div className="card">
                                        <div className="img-container"><img className="card-img" src={trip.image} alt={trip.country} /></div>
                                        <p className="card-title">{trip.city}, {trip.country}</p>
                                        <p className="card-subtitle">{new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="cards-grid">
                            <Link to="/mytrips/addtrip" className="card">
                                <div className="img-empty-container"><i className="material-icons" style={{ fontSize: '60px', color: '#5f8489' }}>add</i></div>
                                <p className="card-title">No Trips Yet</p>
                                <p className="card-subtitle">Add New</p>
                            </Link>
                        </div>
                    )}

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