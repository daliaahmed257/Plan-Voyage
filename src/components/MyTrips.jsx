import { useEffect, useState } from "react"
import Client from "../services/api"

const MyTrips = () => {

    const [trips, setTrips] = useState([])

    useEffect(() => {
        const getTrips = async () => {
            let res = await Client.get('/mytrips')
            setTrips(res.data)
            console.log(res.data)
        }
        getTrips()
    }, [])

    return (
        <div>
            <h1>My Trips</h1>
            {trips.map(trip => (
                <div key={trip._id}>
                    <h3>{trip.country}</h3>
                </div>
            ))}
        </div>

    )
}

export default MyTrips