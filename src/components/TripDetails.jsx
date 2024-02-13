import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import Client from "../services/api"
import { useNavigate } from "react-router-dom"
import Activities from "./Activities"

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

    const viewDays = (dateString) => {
        navigate(`/mytrips/${id}/activities/${dateString}`);
    };

    const getDays = () => {
        const startDate = new Date(trip.startDate);
        const endDate = new Date(trip.endDate);
        const days = [];
        let currentDate = new Date(startDate);
    
        while (currentDate <= endDate) {
            const dateString = currentDate.toISOString().split('T')[0]; // Get the date string in 'YYYY-MM-DD' format
            days.push(
                <div key={dateString}>
                    {currentDate.toDateString()}
                    <button onClick={() => viewDays(dateString)}>View Activities</button>
                </div>
            );
            currentDate.setDate(currentDate.getDate() + 1);
            console.log(days)
        }
        return days;
    };
    

    return trip ? (
        <div>
            <section>
                <h3>{trip.country}</h3>
                <h3>{trip.city}</h3>
                <h3>{new Date (trip.startDate).toISOString().split('T')[0]}</h3>
                <h3>{new Date (trip.endDate).toISOString().split('T')[0]}</h3>
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