import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import Client from "../services/api"
import { useNavigate } from "react-router-dom"

const TripDetails = () => {

    let navigate = useNavigate()

    let { id } = useParams();

    const [trip, setTrip] = useState('');

    const fetchTrip = async () => {
        let res = await Client.get(`/mytrips/${id}`)
        setTrip(res.data)
    }

    const deleteTrip = async () => {
        await Client.delete(`/mytrips/${id}`)
        navigate('/mytrips')
    }

    const editTrip = async (e) => {
        e.preventDefault()
        navigate(`/mytrips/${id}/edit`)
    }

    useEffect(() => {
        fetchTrip()
    }, [id])

    const getDays = () => {
        const startDate = new Date(trip.startDate)
        const endDate = new Date(trip.endDate)
        const days = []
        let date = new Date(startDate)
        console.log(startDate)

        while (date <= endDate) {
            days.push(
                <div key={date.toISOString()}>
                    {date.toDateString()}
                </div>
            );
            date.setDate(date.getDate() + 1)
        }
        return days
    }

    return trip ? (
        <div>
            <section>
                <h3>{trip.country}</h3>
                <h3>{trip.city}</h3>
                <h3>{trip.startDate}</h3>
                <h3>{trip.endDate}</h3>
                <button onClick={deleteTrip}>delete</button>
                <button onClick={editTrip}>edit</button>
            </section>
            <section>
                <h3>Itinerary</h3>
                {getDays()}
            </section>
        </div>
    ) : null
}

export default TripDetails